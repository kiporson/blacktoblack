const { scrapeTrending } = require('./void_instinct');
const { processInput } = require('./echo_reactor');
const { generateShortlink } = require('../MONETIZATION_CORE/dread_mirror');
const { saveLead } = require('../MONETIZATION_CORE/nazhar_gate');
const schedule = require('node-schedule');

async function runCycle(){
  try {
    const trending = await scrapeTrending();
    const processed = processInput(trending.join(' '));
    const link = await generateShortlink('https://example.com');
    await saveLead({ trending, processed, link });
  } catch(err){
    console.error('Cycle error', err);
  }
}

schedule.scheduleJob('*/10 * * * *', runCycle);

module.exports = { runCycle };
