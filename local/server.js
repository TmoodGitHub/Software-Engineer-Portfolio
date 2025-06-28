import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { chatHandler } from "../lib/chatHandler.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const reply = await chatHandler(messages);
    res.json({ reply });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
