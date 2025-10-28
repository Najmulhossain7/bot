import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";

dotenv.config();

// 🔑 Load API keys from .env
const TELEGRAM_TOKEN = process.env.BOT_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// 🚀 Initialize Telegram bot
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// 🧠 Initialize Gemini AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// 🗨️ Handle incoming messages
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();

  // Ignore empty messages or commands
  if (!text || text.startsWith("/")) return;

  try {
    console.log(`💬 Message from ${msg.from.username || "User"}: ${text}`);

    // Generate AI response using Gemini
    const result = await model.generateContent(text);
    const response = await result.response;
    const reply = response.text() || "🤖 Sorry, Gemini AI didn’t return a message.";

    await bot.sendMessage(chatId, reply);
    console.log(`✅ Replied to ${msg.from.username || "user"}`);
  } catch (error) {
    console.error("❌ Gemini Error Details:", error.message);
    await bot.sendMessage(
      chatId,
      "⚠️ Something went wrong while talking to Gemini AI.\nPlease try again later."
    );
  }
});

// 🌍 Small Express server to keep bot alive on Render
const app = express();
app.get("/", (req, res) => res.send("🤖 Gemini AI Telegram Bot is running!"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Keep-alive server running on port ${PORT}`);
});

console.log("🤖 Gemini AI Telegram Bot is online!");
