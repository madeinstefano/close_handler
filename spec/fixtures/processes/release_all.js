require('rootpath')();

const CloseHandler = require('close_handler');
const spawn = require('child_process').spawn;
const handler1 = CloseHandler.init();
const handler2 = CloseHandler.init();
const handler3 = CloseHandler.init();

handler1.add(function () {
  console.log('exit handler 1');
});

handler2.add(function () {
  console.log('exit handler 2');
});

handler3.add(function () {
  console.log('exit handler 3');
});

CloseHandler.releaseAll();

var grep = spawn( "grep", [ "ssh"] );

grep.kill( "SIGHUP" );
