import fs from "fs";
import path from "path";
import OpenAi from "openai";
import { config } from "dotenv";
config();

const openai = new OpenAi({ apiKey: process.env.OPENAI_API_KEY });

const resumeChunks = JSON.parse(
  fs.readFileSync(path.resolve("resume_chunks.json"), "utf-8")
);

const embedMessage = async (message) => {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: message,
  });
  return response.data[0].embedding;
};

const cosineSimilarity = (vecA, vecB) => {
  const dot = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
};

export const handler = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const { messages } = req.body;
  const lastMessage = messages[messages.length - 1].content;

  try {
    const userEmbedding = await embedMessage(lastMessage);

    const topChunks = resumeChunks
      .map((chunk) => ({
        ...chunk,
        similarity: cosineSimilarity(userEmbedding, chunk.embedding),
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5);

    const context = topChunks.map((c) => c.text).join("\n---\n");

    const prompt = [
      {
        role: "system",
        content:
          "You are Tmoodbot, a helpful assistant that knows everything about Tamer Mahmoud based on their resume and knowlege base",
      },
      {
        role: "user",
        content: `Answer based on this resume data:\n\n${context}`,
      },
      ...messages,
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: prompt,
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ reply: "Something went wrong.." });
  }
};
