const fs = require('fs');
const { scrapeTrending } = require('../DIABLO_DIGITAL_BRAIN/void_instinct');
const { generateShortlink } = require('../MONETIZATION_CORE/dread_mirror');
const { sendMessage } = require('../UTILS/telegram_notifier');

async function createLinks() {
  try {
    const trends = await scrapeTrending();
    const out = [];
    for (const t of trends) {
      const url = `https://example.com/?q=${encodeURIComponent(t)}`;
      const short = await generateShortlink(url);
      out.push({ topic: t, short });
    }
    const file = 'DATABASE/viral_links.json';
    const data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];
    fs.writeFileSync(file, JSON.stringify(data.concat(out), null, 2));
  } catch (err) {
    sendMessage(`viral_linkgen error: ${err.message}`);
  }
}

function startGen() {
  createLinks();
  setInterval(createLinks, 60 * 60 * 1000);
}

if (require.main === module) startGen();
module.exports = { startGen };
