const express = require('express');
const path = require('path');

function startServer(port){
  const app = express();
  app.use('/download', express.static(path.join(__dirname, '../PUBLIC/mirage')));
  return new Promise(res=>{
    const server = app.listen(port, ()=>{
      console.log(`Mirage trap on ${port}`);
      res(server);
    });
  });
}

module.exports = { startServer };
