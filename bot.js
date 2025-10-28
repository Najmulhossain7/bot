import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

console.log('🤖 Telegram Auto-Reply Bot is now online!');

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.toLowerCase() || '';

  console.log(`📩 Message from ${msg.chat.username || 'Unknown'}: ${text}`);

  if (text.includes('hi') || text.includes('hello')) {
    bot.sendMessage(chatId, '👋 Hello! How can I help you today?');
  } else if (text.includes('bye')) {
    bot.sendMessage(chatId, '👋 Goodbye! Take care!');
  } else if (text.includes('help')) {
    bot.sendMessage(chatId, '🧠 You can say "hi", "bye", or ask anything!');
  } else {
    bot.sendMessage(chatId, '🤖 Thanks for your message!');
  }
});
import express from "express";
const app = express();
app.get("/", (req, res) => res.send("🤖 Telegram Auto-Reply Bot is running!"));
app.listen(3000, () => console.log("✅ Server is live on Render."));
