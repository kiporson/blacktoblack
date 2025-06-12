const express = require('express');
const path = require('path');
const { sendMessage } = require('../UTILS/telegram_notifier');

function start(port = 4000) {
  const app = express();
  app.use('/converted', express.static(path.join(__dirname, '../PUBLIC/converted')));
  app.use('/mirage', express.static(path.join(__dirname, '../PUBLIC/mirage')));

  app.use((err, req, res, next) => {
    sendMessage(`UI error: ${err.message}`);
    res.status(500).send('Internal error');
  });

  return new Promise(res => {
    const server = app.listen(port, () => {
      console.log(`UI server on ${port}`);
      res(server);
    });
  });
}

if (require.main === module) start();
module.exports = { start };
