import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// Load API keys
const TELEGRAM_TOKEN = process.env.BOT_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!TELEGRAM_TOKEN || !GEMINI_API_KEY) {
  console.error("❌ Missing BOT_TOKEN or GEMINI_API_KEY in .env file");
  process.exit(1);
}

// Initialize Telegram bot
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

console.log("🤖 Gemini AI Telegram Bot is online!");

// Handle user messages
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text) return;

  try {
    // Generate AI reply
    const result = await model.generateContent(`User said: ${text}`);
    const reply = result.response.text() || "🤖 Sorry, I couldn't understand that.";
    await bot.sendMessage(chatId, reply);
  } catch (error) {
    console.error("❌ Error:", error);
    await bot.sendMessage(chatId, "⚠️ Something went wrong while talking to Gemini AI.");
  }
});

// ✅ Keep-alive server for Render
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("✅ Najmul's Gemini AI Telegram Bot is running perfectly!");
});

app.listen(PORT, () => {
  console.log(`✅ Keep-alive server is live on Render (Port ${PORT}).`);
});
