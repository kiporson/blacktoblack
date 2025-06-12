const schedule = require('node-schedule');
const fs = require('fs');

function logRitual(){
  const msg = `[${new Date().toISOString()}] ritual executed\n`;
  fs.appendFileSync('LOGS/ritual_history.log', msg);
  console.log(msg.trim());
}

schedule.scheduleJob('33 3 * * *', logRitual);

module.exports = { logRitual };
