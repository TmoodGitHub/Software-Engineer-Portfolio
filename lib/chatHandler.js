import fs from "fs";
import path from "path";
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

  const relevantChunks = chunks
    .map((chunk) => ({
      ...chunk,
      score: cosineSimilarity(inputEmbedding, chunk.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((c) => c.content);

  const systemPrompt = `You are TmoodBot, an AI assistant trained on Tamer Mahmoud's resume, GitHub, and LinkedIn. Be helpful, friendly, casual, and answer only if you have relevant information.`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
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

  return response.choices[0].message.content;
};
