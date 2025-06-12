const crypto = require('crypto');

async function generateShortlink(url){
  const hash = crypto.createHash('md5').update(url + Date.now()).digest('hex').slice(0,6);
  return `https://short.example.com/${hash}`;
}

module.exports = { generateShortlink };
