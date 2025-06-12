const fs = require('fs');
const { sendMessage } = require('../UTILS/telegram_notifier');

function extractEmails(text) {
  const re = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  return Array.from(text.matchAll(re)).map(m => m[0]);
}

function mine(files) {
  try {
    const found = new Set();
    files.forEach(f => {
      if (fs.existsSync(f)) {
        const txt = fs.readFileSync(f, 'utf8');
        extractEmails(txt).forEach(e => found.add(e));
      }
    });
    const file = 'DATABASE/email_list.json';
    const existing = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];
    fs.writeFileSync(file, JSON.stringify([...new Set([...existing, ...found])], null, 2));
  } catch (err) {
    sendMessage(`email_miner error: ${err.message}`);
  }
}

if (require.main === module) {
  mine(process.argv.slice(2));
}

module.exports = { mine };
