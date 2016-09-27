require('rootpath')();

const CloseHandler = require('close_handler');
const handler = CloseHandler.init();

handler.add(function () {
  console.log('exit callback when there is an error');
});

// a.b = 3;
// throw 'E';

setTimeout(function () {
  a.b = 2;
}, 100);
