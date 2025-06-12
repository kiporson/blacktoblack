const axios = require('axios');
const { sendMessage } = require('../UTILS/telegram_notifier');

const TARGETS = [
  'https://example.com/api/comment',
  'https://example.org/api/post'
];

async function seed(link) {
  for (const url of TARGETS) {
    try {
      await axios.post(url, { comment: link });
    } catch (err) {
      sendMessage(`backlink_seed error on ${url}: ${err.message}`);
    }
  }
}

if (require.main === module) {
  seed(process.argv[2] || 'https://example.com');
}

module.exports = { seed };
