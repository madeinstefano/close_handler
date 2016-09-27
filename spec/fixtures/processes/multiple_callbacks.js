require('rootpath')();

const CloseHandler = require('close_handler');
const spawn = require('child_process').spawn;
const handler = CloseHandler.init();

handler.add(function () {
  console.log('exit 1');
});
handler.add(function () {
  console.log('exit 2');
});
handler.add(function () {
  console.log('exit 3');
});

var grep = spawn( "grep", [ "ssh"] );

grep.kill( "SIGHUP" );
