# Quoted Printable Stream

[![Travis CI Test Status](https://travis-ci.org/connrs/node-quoted-printable-stream.png)](https://travis-ci.org/connrs/node-quoted-printable-stream)

A transform stream to convert text to quoted printable.

To install with NPM type:

    npm install quoted-printable-stream

To use:

    var quotedPrintableStream = require('quoted-printable-stream');
    someReadableStream.pipe(quotedPrintableStream()).pipe(process.stdout);
