const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const bot = new TelegramBot(token, {polling: false});

function sendMessage(message){
  if(!token || !chatId) return;
  bot.sendMessage(chatId, message).catch(err => {
    fs.appendFileSync('LOGS/error.log', `[${new Date().toISOString()}] Telegram error: ${err}\n`);
  });
}

module.exports = { sendMessage };
