import fs from "fs";
import path from "path";
import { OpenAI } from "openai";
import { config } from "dotenv";
import { getEmbedding, cosineSimilarity } from "../lib/utils";

config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const CHUNKS_PATH = path.join(
  process.cwd(),
  "knowledge_base",
  "tamer_knowledge_base_chunk.json"
);
const chunks = JSON.parse(fs.readFileSync(CHUNKS_PATH, "utf-8"));

// Helper: Get top N most relevant chunks based on cosine similarity
const getRelevantChunks = async (userInput, topN = 5) => {
  const inputEmbedding = await getEmbedding(userInput);
  const scored = chunks.map((chunk) => ({
    ...chunk,
    score: cosineSimilarity(inputEmbedding, chunk.embedding),
  }));
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map((c) => c.content);
};

export default async function chatHandler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;
  const userMessage = messages[messages.length - 1]?.content;

  try {
    const relevantChunks = await getRelevantChunks(userMessage);

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

    const reply = response.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
