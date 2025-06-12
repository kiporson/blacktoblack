const say = require('say');
const { sendMessage } = require('../UTILS/telegram_notifier');

function speak(text) {
  return new Promise((resolve, reject) => {
    say.speak(text, undefined, 1.0, err => {
      if (err) {
        sendMessage(`Voice error: ${err.message}`);
        return reject(err);
      }
      resolve();
    });
  });
}

if (require.main === module) {
  speak('Diablo voice activated.');
}

module.exports = { speak };
