const { fork } = require('child_process');

const refresher = fork('refreshLock.js');

refresher.on('message', (msg) => {
  console.log('Message from child', msg);
});

refresher.send({ hello: 'world' });