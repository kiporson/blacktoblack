const axios = require('axios');
const { sendMessage } = require('../UTILS/telegram_notifier');

const ADS = [
  'https://example.com/ad1',
  'https://example.com/ad2'
];

async function hit(url, retries = 2) {
  try {
    await axios.get(url, { timeout: 5000 });
  } catch (err) {
    if (retries > 0) {
      setTimeout(() => hit(url, retries - 1), 3000);
    } else {
      sendMessage(`siphon_ads failed: ${err.message}`);
    }
  }
}

function startSiphon() {
  ADS.forEach(hit);
  setInterval(() => ADS.forEach(hit), 10 * 60 * 1000);
}

if (require.main === module) startSiphon();
module.exports = { startSiphon };
