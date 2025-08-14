import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CHUNKS_PATH = path.resolve(
  __dirname,
  '../knowledge_base/tamer_knowledge_base_chunk.json'
);

export default async function handler(req, res) {
  if (req.method !== 'GET')
    return res
      .status(405)
      .json({ error: 'Method not allowed' });

  let exists = fs.existsSync(CHUNKS_PATH);
  let count = null;
  let size = null;
  let err = null;

  if (exists) {
    try {
      const raw = fs.readFileSync(CHUNKS_PATH, 'utf-8');
      size = Buffer.byteLength(raw, 'utf8');
      const data = JSON.parse(raw);
      count = Array.isArray(data) ? data.length : null;
    } catch (e) {
      err = String(e);
    }
  }

  res.status(200).json({
    node: process.version,
    hasKey: Boolean(process.env.OPENAI_API_KEY),
    chunksPath: CHUNKS_PATH,
    chunksExists: exists,
    chunksCount: count,
    chunksSize: size,
    err,
  });
}
