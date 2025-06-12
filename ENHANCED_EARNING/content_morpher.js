const fs = require('fs');
const { scrapeTrending } = require('../DIABLO_DIGITAL_BRAIN/void_instinct');
const { sendMessage } = require('../UTILS/telegram_notifier');

function morph(text) {
  return text.split(' ').reverse().join(' ');
}

async function rewrite() {
  try {
    const trends = await scrapeTrending();
    const output = trends.map(t => ({ original: t, morphed: morph(t) }));
    const file = 'DATABASE/morphed_content.json';
    const data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];
    fs.writeFileSync(file, JSON.stringify(data.concat(output), null, 2));
  } catch (err) {
    sendMessage(`content_morpher error: ${err.message}`);
  }
}

function startMorph() {
  rewrite();
  setInterval(rewrite, 2 * 60 * 60 * 1000);
}

if (require.main === module) startMorph();
module.exports = { startMorph };
