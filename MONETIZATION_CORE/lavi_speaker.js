function monetizeText(text){
  const words = text.split(/\s+/).filter(Boolean);
  const earnings = words.length * 0.001; // pretend money earned per word
  return { earnings, summary: words.slice(0,20).join(' ') };
}

module.exports = { monetizeText };
