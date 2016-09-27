require('rootpath')();

var chai = require('chai');
var expect = chai.expect;
var should = require('chai').should();

const fs = require('fs');
const process = require('child_process');

describe('CloseHandler Test', () => {
  
  it('Should execute callback when it ends', function (done) {
    
    process.exec('node ./spec/fixtures/processes/simple.js', function (err, stdout, stderr) {
      stdout.should.eql('exit callback\n');
      done();
    });
  });
  
  it('Should execute multiple callbacks when it ends', function (done) {
    
    process.exec('node ./spec/fixtures/processes/multiple_callbacks.js', function (err, stdout, stderr) {
      stdout.should.eql('exit 1\nexit 2\nexit 3\n');
      done();
    });
  });
  
  it('Should execute multiple callbacks from multiple handlers when it ends', function (done) {
    
    process.exec('node ./spec/fixtures/processes/multiple_handlers.js', function (err, stdout, stderr) {
      stdout.should.eql('handler 1 - cb 1\nhandler 1 - cb 2\nhandler 2 - cb 1\nhandler 2 - cb 2\nhandler 3 - cb 1\n');
      done();
    });
  });

  it('Should execute callback when it crashes', function (done) {
    
    process.exec('node ./spec/fixtures/processes/defective.js', function (err, stdout, stderr) {
      stdout.should.eql('exit callback when there is an error\n');
      done();
    });
  });
  
  it('Should keep logging stack trace when it crashes', function (done) {
    
    process.exec('node ./spec/fixtures/processes/defective.js', function (err, stdout, stderr) {
      (/^ReferenceError: a is not defined\n/.test(stderr)).should.eql(true);
      done();
    });
  });
  
  it('Should release callbacks from single handler', function (done) {
    
    process.exec('node ./spec/fixtures/processes/release.js', function (err, stdout, stderr) {
      stdout.should.eql('');
      done();
    });
  });
  
  it('Should release callbacks from multiple handler', function (done) {
    
    process.exec('node ./spec/fixtures/processes/release_all.js', function (err, stdout, stderr) {
      stdout.should.eql('');
      done();
    });
  });
});
