function processInput(text){
  const words = text.split(/\s+/).filter(Boolean);
  const counts = {};
  words.forEach(w => counts[w] = (counts[w]||0)+1);
  return Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,3).map(e=>e[0]);
}

module.exports = { processInput };
