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

// Auto-reply feature
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.toLowerCase() || "";

  if (text.includes("hi") || text.includes("hello")) {
    bot.sendMessage(chatId, "👋 Hello! How can I help you today?");
  } else if (text.includes("bye")) {
    bot.sendMessage(chatId, "👋 Goodbye! Have a nice day!");
  } else {
    bot.sendMessage(chatId, "🤖 I’m your auto-reply bot, made by Najmul Hossain!");
  }
});

// ✅ Keep-alive server for Render
const app = express();
app.get("/", (req, res) => res.send("🤖 Telegram Auto-Reply Bot is running successfully!"));
app.listen(3000, () => console.log("✅ Server is live on Render (Port 3000)."));
