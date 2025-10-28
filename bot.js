import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

// 🔑 Load Telegram Bot Token
const TELEGRAM_TOKEN = process.env.BOT_TOKEN;

// 🚀 Initialize Telegram bot
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// 🗨️ Handle incoming messages
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();

  // Ignore empty or command messages
  if (!text || text.startsWith("/")) return;

  console.log(`💬 Message from ${msg.from.username || "User"}: ${text}`);

  // ✉️ Custom auto-reply
  const reply = `Hi ${msg.from.first_name || "there"} 👋\nYou said: "${text}"\n\n🤖 This is an automatic reply from GAMING CLUBS Bot!`;

  await bot.sendMessage(chatId, reply);
  console.log(`✅ Auto-replied to ${msg.from.username || "user"}`);
});

// 🌍 Small Express server to keep bot alive on Render
const app = express();
app.get("/", (req, res) => res.send("🤖 Telegram Auto-Reply Bot is running!"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Keep-alive server running on port ${PORT}`);
});

console.log("🤖 Telegram Auto-Reply Bot is online!");
