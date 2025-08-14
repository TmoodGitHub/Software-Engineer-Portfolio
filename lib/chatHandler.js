import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { getEmbedding, cosineSimilarity } from './utils.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Prefer process.cwd() with a static path segment so bundling can find it
const CHUNKS_PATH = path.join(
  process.cwd(),
  'knowledge_base',
  'tamer_knowledge_base_chunk.json'
);

let chunks = [];
try {
  chunks = JSON.parse(
    fs.readFileSync(CHUNKS_PATH, 'utf-8')
  );
} catch (e) {
  console.error(
    'Failed to load knowledge base:',
    CHUNKS_PATH,
    e
  );
  chunks = [];
}

export const chatHandler = async (messages = []) => {
  const userMessage =
    messages[messages.length - 1]?.content || '';
  if (!userMessage)
    return 'Ask me something about Tamer Mahmoud.';

  const inputEmbedding = await getEmbedding(userMessage);

  const scored = chunks
    .filter(
      (c) =>
        Array.isArray(c.embedding) &&
        typeof c.content === 'string'
    )
    .map((c) => ({
      ...c,
      score: cosineSimilarity(inputEmbedding, c.embedding),
    }))
    .sort((a, b) => b.score - a.score);

  const relevantChunks = scored
    .slice(0, 5)
    .map((c) => c.content)
    .filter(Boolean);

  if (relevantChunks.length === 0) {
    return 'I don’t know based on the info I have.';
  }

  const systemPrompt = `
You are TmoodBot, an AI assistant trained exclusively on Tamer Mahmoud's resume, GitHub, and LinkedIn.
Answer questions strictly using the provided context.
If the context doesn’t include an answer, say: "I don’t know based on the info I have."
Do not fabricate credentials, technologies, or project experience.
  `.trim();

  const response = await openai.chat.completions.create({
    // Use a current model
    model: 'gpt-4o-mini',
    temperature: 0,
    top_p: 0.8,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages.slice(0, -1),
      {
        role: 'user',
        content: `Here is some context:\n${relevantChunks.join(
          '\n---\n'
        )}\n\nNow answer this question:\n${userMessage}`,
      },
    ],
  });

  let reply =
    response.choices?.[0]?.message?.content?.trim() ||
    'I don’t know based on the info I have.';

  const bad = [
    'as an ai',
    'based on my training',
    "i don't have access",
    'i do not have access',
    'i was trained on',
    'i cannot provide',
    'i do not have personal experience',
    'as a language model',
    'tamer mahmoud has worked on',
    'i don’t know anything about tamer mahmoud',
  ];
  if (bad.some((t) => reply.toLowerCase().includes(t))) {
    reply = 'I don’t know based on what I have.';
  }
  return reply;
};
