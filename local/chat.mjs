import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';
import { config } from 'dotenv';
import {
  getEmbedding,
  cosineSimilarity,
} from '../lib/utils';

config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const CHUNKS_PATH = path.join(
  process.cwd(),
  'knowledge_base',
  'tamer_knowledge_base_chunk.json',
);
const chunks = JSON.parse(
  fs.readFileSync(CHUNKS_PATH, 'utf-8'),
);

const SIMILARITY_THRESHOLD = 0.75;
const TOP_N = 5;

// Returns top N chunks above the similarity threshold, or empty if nothing is relevant
const getRelevantChunks = async (
  userInput,
  topN = TOP_N,
) => {
  const inputEmbedding = await getEmbedding(userInput);
  const scored = chunks.map((chunk) => ({
    ...chunk,
    score: cosineSimilarity(
      inputEmbedding,
      chunk.embedding,
    ),
  }));
  return scored
    .filter((c) => c.score >= SIMILARITY_THRESHOLD)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map((c) => c.content);
};

const buildSystemPrompt = (relevantChunks) => {
  const context =
    relevantChunks.length > 0
      ? `Here is relevant information about Tamer:\n\n${relevantChunks.join('\n---\n')}`
      : null;

  return [
    `You are TmoodBot, a conversational AI assistant for Tamer Mahmoud's engineering portfolio.`,
    `Your job is to help recruiters, hiring managers, and engineers learn about Tamer's background, experience, skills, and projects.`,
    ``,
    `Guidelines:`,
    `- Be direct and conversational. Answer like a knowledgeable colleague, not a press release.`,
    `- Keep answers concise. If a question has a short answer, give the short answer.`,
    `- If asked something outside Tamer's background (politics, weather, general coding help, etc.), politely redirect: "I'm only set up to answer questions about Tamer. Is there something about his background or experience I can help with?"`,
    `- If you don't have enough information to answer confidently, say so honestly. Don't guess or fabricate details.`,
    `- Do not repeat the same information across multiple answers unless directly asked.`,
    `- Never refer to yourself as ChatGPT or any other AI product. You are TmoodBot.`,
    context ? `\n${context}` : '',
  ]
    .filter(Boolean)
    .join('\n');
};

export default async function chatHandler(req, res) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (
    !messages ||
    !Array.isArray(messages) ||
    messages.length === 0
  ) {
    return res
      .status(400)
      .json({ error: 'Invalid messages payload' });
  }

  const userMessage =
    messages[messages.length - 1]?.content;

  if (!userMessage) {
    return res
      .status(400)
      .json({ error: 'Missing user message' });
  }

  try {
    const relevantChunks =
      await getRelevantChunks(userMessage);
    const systemPrompt = buildSystemPrompt(relevantChunks);

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 500,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
    });

    const reply = response.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    if (error?.status === 429) {
      console.error(
        'OpenAI rate limit hit:',
        error.message,
      );
      return res
        .status(429)
        .json({
          error:
            'Rate limit reached. Try again in a moment.',
        });
    }
    if (error?.status === 401) {
      console.error(
        'OpenAI auth error — check OPENAI_API_KEY',
      );
      return res
        .status(500)
        .json({ error: 'Something went wrong.' });
    }
    console.error('Chat error:', error);
    res
      .status(500)
      .json({ error: 'Something went wrong.' });
  }
}
