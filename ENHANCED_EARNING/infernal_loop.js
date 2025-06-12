const { runCycle } = require('../DIABLO_DIGITAL_BRAIN/mission_loop');
const { sendMessage } = require('../UTILS/telegram_notifier');

async function executeCycle() {
  try {
    await runCycle();
  } catch (err) {
    sendMessage(`Infernal loop error: ${err.message}`);
    throw err;
  }
}

function startLoop() {
  executeCycle();
  setInterval(() => {
    let retries = 2;
    const attempt = () => executeCycle().catch(e => {
      if (retries-- > 0) {
        sendMessage('Retrying infernal loop');
        setTimeout(attempt, 5000);
      }
    });
    attempt();
  }, 30 * 60 * 1000);
}

if (require.main === module) startLoop();
module.exports = { startLoop };
