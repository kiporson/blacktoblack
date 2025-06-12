const fs = require('fs');

function saveLead(lead){
  const data = JSON.parse(fs.readFileSync('DATABASE/user_leads.json','utf8'));
  data.push({...lead, date: new Date().toISOString()});
  fs.writeFileSync('DATABASE/user_leads.json', JSON.stringify(data, null, 2));
}

module.exports = { saveLead };
