const axios = require('axios');
const { sendMessage } = require('../UTILS/telegram_notifier');

const SERVICES = [
  'https://www.google.com/ping?sitemap=',
  'https://bing.com/ping?sitemap='
];

async function index(link) {
  for (const base of SERVICES) {
    try {
      await axios.get(base + encodeURIComponent(link));
    } catch (err) {
      sendMessage(`auto_indexer fail ${base}: ${err.message}`);
    }
  }
}

if (require.main === module) {
  index(process.argv[2] || 'https://example.com/sitemap.xml');
}

module.exports = { index };
