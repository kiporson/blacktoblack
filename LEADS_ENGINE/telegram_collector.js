const axios = require('axios');
const fs = require('fs');
const { sendMessage } = require('../UTILS/telegram_notifier');

async function collect() {
  try {
    const resp = await axios.get('https://t.me/s/telegram');
    const re = /(https?:\/\/t.me\/[a-zA-Z0-9_]+)/g;
    const groups = Array.from(resp.data.matchAll(re)).map(m => m[1]);
    const file = 'DATABASE/telegram_groups.json';
    const existing = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];
    fs.writeFileSync(file, JSON.stringify([...new Set([...existing, ...groups])], null, 2));
  } catch (err) {
    sendMessage(`telegram_collector error: ${err.message}`);
  }
}

function start() {
  collect();
  setInterval(collect, 12 * 60 * 60 * 1000);
}

if (require.main === module) start();
module.exports = { start };
