var encodeQuotedPrintable = require('encode-quoted-printable');
var Transform = require('stream').Transform;

function QuotedPrintableStream() {
  Transform.apply(this, arguments);
  this._text = '';
}

QuotedPrintableStream.prototype = Object.create(Transform.prototype, {
  constructor: QuotedPrintableStream
});

QuotedPrintableStream.prototype._transform = function (chunk, encoding, callback) {
  this._text += chunk.toString();
  callback();
};

QuotedPrintableStream.prototype._flush = function (callback) {
  this.push(encodeQuotedPrintable(this._text));
  callback();
};

function quotedPrintableStream() {
  return new QuotedPrintableStream();
}

module.exports = quotedPrintableStream;
