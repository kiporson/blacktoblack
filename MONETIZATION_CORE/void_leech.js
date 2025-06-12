function startLeech(){
  setInterval(()=>{
    console.log('Leeching ad impression');
  }, 60000);
}

module.exports = { startLeech };
