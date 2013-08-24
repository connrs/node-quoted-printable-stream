var test = require('tape');
var quotedPrintableStream = require('../');
var Writable = require('stream').Writable;

test('a=b=c', function (t) {
  var qps = quotedPrintableStream();
  var output = '';
  qps.end('a=b=c');
  qps.on('data', function (data) {
    output += data.toString();
  });
  qps.on('end', function () {
    t.equal(output, 'a=3Db=3Dc');
    t.end();
  });
});

test('Newlines', function (t) {
  var qps = quotedPrintableStream();
  var output = '';
  qps.end('abc   \r\n123   \r\n');
  qps.on('data', function (data) {
    output += data.toString();
  });
  qps.on('end', function () {
    t.equal(output, 'abc  =20\r\n123  =20\r\n');
    t.end();
  });
});

test('Long string', function (t) {
  var qps = quotedPrintableStream();
  var output = '';
  qps.end('0123456789012345678901234567890123456789012345678901234567890123456789012345');
  qps.on('data', function (data) {
    output += data.toString();
  });
  qps.on('end', function () {
    t.equal(output, '012345678901234567890123456789012345678901234567890123456789012345678901234=\r\n5');
    t.end();
  });
});

test('UTF-8 Characters', function (t) {
  var qps = quotedPrintableStream();
  var output = '';
  qps.end((new Array(51)).join('строка в юникоде'));
  qps.on('data', function (data) {
    output += data.toString();
  });
  qps.on('end', function () {
    t.equal(output, '=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=\r\n=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=\r\n=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=\r\n=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =\r\n=D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=\r\n=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=\r\n=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=\r\n=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=\r\n=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=\r\n=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=\r\n=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =\r\n=D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=\r\n=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=\r\n=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=\r\n=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=\r\n=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=\r\n=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=\r\n=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =\r\n=D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=\r\n=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=\r\n=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=\r\n=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=\r\n=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=\r\n=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=\r\n=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =\r\n=D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=\r\n=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=\r\n=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=\r\n=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=\r\n=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=\r\n=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=\r\n=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =\r\n=D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=\r\n=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=\r\n=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=\r\n=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=\r\n=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=\r\n=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=\r\n=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =\r\n=D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=\r\n=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=\r\n=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=\r\n=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=\r\n=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=\r\n=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=\r\n=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =\r\n=D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=\r\n=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=\r\n=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=\r\n=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=\r\n=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=\r\n=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=\r\n=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =\r\n=D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=\r\n=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=D1=81=D1=82=\r\n=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=D0=B4=D0=B5=\r\n=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=D0=BA=D0=BE=\r\n=D0=B4=D0=B5=D1=81=D1=82=D1=80=D0=BE=D0=BA=D0=B0 =D0=B2 =D1=8E=D0=BD=D0=B8=\r\n=D0=BA=D0=BE=D0=B4=D0=B5');
    t.end();
  });
});

test('Lots of null characters', function (t) {
  var qps = quotedPrintableStream();
  var output = '';
  qps.end((new Array(201)).join('\u0000'));
  qps.on('data', function (data) {
    output += data.toString();
  });
  qps.on('end', function () {
    t.equal(output, '=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=\r\n=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=\r\n=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=\r\n=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=\r\n=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=\r\n=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=\r\n=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=\r\n=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00=00');
    t.end();
  });
});
