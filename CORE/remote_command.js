const TelegramBot = require('node-telegram-bot-api');
const { sendMessage } = require('../UTILS/telegram_notifier');
require('dotenv').config();
const fs = require('fs');

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/status/, (msg) => {
  bot.sendMessage(msg.chat.id, 'DIABLO is running.');
});

bot.onText(/\/restart/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Restarting...');
  process.exit(0);
});

bot.onText(/\/leads/, (msg) => {
  const data = fs.readFileSync('DATABASE/user_leads.json', 'utf8');
  bot.sendMessage(msg.chat.id, `Current leads: ${data}`);
});

bot.on('polling_error', (err) => {
  sendMessage(`Polling error: ${err.message}`);
});
