import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// These 3 lines replace __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the root .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import fs from "fs";
import { OpenAI } from "openai";
import { getEmbedding, cosineSimilarity } from "./utils.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const CHUNKS_PATH = path.join(
  process.cwd(),
  "knowledge_base",
  "tamer_knowledge_base_chunk.json"
);

const chunks = JSON.parse(fs.readFileSync(CHUNKS_PATH, "utf-8"));

export const chatHandler = async (messages) => {
  const userMessage = messages[messages.length - 1]?.content;
  const inputEmbedding = await getEmbedding(userMessage);

  const scoredChunks = chunks
    .filter(
      (chunk) =>
        Array.isArray(chunk.embedding) && typeof chunk.content === "string"
    )
    .map((chunk) => ({
      ...chunk,
      score: cosineSimilarity(inputEmbedding, chunk.embedding),
    }));

  scoredChunks.forEach((c, i) => {
    console.log(`🔍 Chunk ${i}: score=${c.score.toFixed(4)}`);
  });

  const relevantChunks = scoredChunks
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((c) => c.content);

  console.log("🔍 Selected Chunks:\n", relevantChunks.join("\n---\n"));

  if (
    relevantChunks.length === 0 ||
    relevantChunks.every((c) => typeof c === "string" && c.trim() === "")
  ) {
    return "I don’t know based on the info I have.";
  }

  const systemPrompt = `You are TmoodBot, an AI assistant trained exclusively on Tamer Mahmoud's resume, GitHub, and LinkedIn.

    Answer questions strictly using the provided context.
    
    NEVER guess, generalize, or make assumptions. If the context doesn’t include an answer, say:
    
    “I don’t know based on the info I have.”
    
    Do NOT fabricate credentials, technologies, or project experience. Your tone is friendly and casual, but your answers must stay grounded in the context.`;

  const userPrompt = `Using only the information below, answer the question.

Context:
${relevantChunks.join("\n---\n")}

Question:
${userMessage}`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0,
    top_p: 0.8,
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.slice(0, -1),
      {
        role: "user",
        content: `Here is some context:\n${relevantChunks.join(
          "\n---\n"
        )}\n\nNow answer this question:\n${userMessage}`,
      },
    ],
  });

  let reply = response.choices[0].message.content.trim();

  // 🚨 Runtime guardrail
  const hallucinationTriggers = [
    "as an ai",
    "based on my training",
    "i don't have access",
    "i do not have access",
    "i was trained on",
    "i cannot provide",
    "i do not have personal experience",
    "as a language model",
    "tamer mahmoud has worked on",
    "i don’t know anything about tamer mahmoud",
  ];

  const lowerReply = reply.toLowerCase();
  if (hallucinationTriggers.some((trigger) => lowerReply.includes(trigger))) {
    reply = "I don’t know based on what I have.";
  }

  return reply;
};
