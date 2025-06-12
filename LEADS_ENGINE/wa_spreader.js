const fs = require('fs');
const { sendMessage } = require('../UTILS/telegram_notifier');

function spread() {
  try {
    const file = 'DATABASE/viral_links.json';
    if (!fs.existsSync(file)) return;
    const links = JSON.parse(fs.readFileSync(file));
    links.forEach(l => {
      fs.appendFileSync('LOGS/wa_spread.log', `Sent ${l.short} at ${new Date().toISOString()}\n`);
    });
  } catch (err) {
    sendMessage(`wa_spreader error: ${err.message}`);
  }
}

function start() {
  spread();
  setInterval(spread, 24 * 60 * 60 * 1000);
}

if (require.main === module) start();
module.exports = { start };
