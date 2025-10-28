import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import express from "express";

// Load environment variables
dotenv.config();

// Get bot token from environment variable
const token = process.env.BOT_TOKEN;
if (!token) {
  console.error("❌ BOT_TOKEN not found in environment variables!");
  process.exit(1);
}

// Create the Telegram bot
const bot = new TelegramBot(token, { polling: true });

console.log("🤖 Telegram Auto-Reply Bot is now online!");

// Auto-reply logic
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.toLowerCase() || "";

  if (text.includes("hi") || text.includes("hello")) {
    bot.sendMessage(chatId, "👋 Hello! How can I help you today?");
  } else if (text.includes("bye")) {
    bot.sendMessage(chatId, "👋 Goodbye! Have a great day!");
  } else if (text.includes("who made you") || text.includes("creator")) {
    bot.sendMessage(chatId, "🧠 I was created by Najmul Hossain!");
  } else {
    bot.sendMessage(chatId, "🤖 I'm your auto-reply bot, always here to chat!");
  }
});

// ✅ Keep-alive server for Render
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("✅ Telegram Auto-Reply Bot by Najmul Hossain is running smoothly!");
});

app.listen(PORT, () => {
  console.log(`✅ Keep-alive server is live on Render (Port ${PORT}).`);
});
