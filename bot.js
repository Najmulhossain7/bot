import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables from .env file
dotenv.config();

// Get API keys
const TELEGRAM_TOKEN = process.env.BOT_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Check if keys are available
if (!TELEGRAM_TOKEN || !GEMINI_API_KEY) {
  console.error("❌ Missing BOT_TOKEN or GEMINI_API_KEY in .env file");
  process.exit(1);
}

// Initialize Telegram bot
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Initialize Gemini AI client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

console.log("🤖 Gemini AI Telegram Bot is online!");

// Handle incoming messages
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text) return;

  try {
    // Send typing action
    await bot.sendChatAction(chatId, "typing");

    // Generate AI response
    const result = await model.generateContent(`User said: ${text}`);
    const reply = result.response.text() || "🤖 Sorry, I couldn't understand that.";

    // Send AI reply to Telegram user
    await bot.sendMessage(chatId, reply);
  } catch (error) {
    console.error("❌ Error:", error);
    await bot.sendMessage(chatId, "⚠️ Something went wrong while talking to Gemini AI.");
  }
});

// ✅ Keep-alive web server (needed for Render)
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("✅ Najmul's Gemini AI Telegram Bot is running perfectly!");
});

app.listen(PORT, () => {
  console.log(`✅ Keep-alive server is live on Render (Port ${PORT}).`);
});
