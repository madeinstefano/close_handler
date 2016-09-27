require('rootpath')();

const CloseHandler = require('close_handler');
const spawn = require('child_process').spawn;
const handler = CloseHandler.init();

handler.add(function () {
  console.log('exit callback');
});

var grep = spawn( "grep", [ "ssh"] );

grep.kill( "SIGHUP" );
