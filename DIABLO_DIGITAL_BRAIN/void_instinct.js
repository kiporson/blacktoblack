const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeTrending(){
  const url = 'https://github.com/trending';
  const resp = await axios.get(url);
  const $ = cheerio.load(resp.data);
  const repos = [];
  $('article.Box-row h2 a').each((i, el) => {
    repos.push($(el).text().trim());
  });
  return repos.slice(0, 5);
}

module.exports = { scrapeTrending };
