require('rootpath')();

const CloseHandler = require('close_handler');
const spawn = require('child_process').spawn;
const handler1 = CloseHandler.init();
const handler2 = CloseHandler.init();
const handler3 = CloseHandler.init();

handler1.add(function () {
  console.log('handler 1 - cb 1');
});
handler1.add(function () {
  console.log('handler 1 - cb 2');
});

handler2.add(function () {
  console.log('handler 2 - cb 1');
});
handler2.add(function () {
  console.log('handler 2 - cb 2');
});

handler3.add(function () {
  console.log('handler 3 - cb 1');
});

var grep = spawn( "grep", [ "ssh"] );

grep.kill( "SIGHUP" );
