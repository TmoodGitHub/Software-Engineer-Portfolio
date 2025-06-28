import { chatHandler } from "../lib/chatHandler.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;
    const reply = await chatHandler(messages);
    res.status(200).json({ reply });
  } catch (err) {
    console.error("API Chat Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
