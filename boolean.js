// Copyright (c) 2015 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

'use strict';

var bufrw = require('bufrw');
var errors = require('bufrw/errors');
var TYPE = require('./TYPE');

var BooleanRW = bufrw.Base(
    booleanByteLength,
    readTBooleanFrom,
    writeTBooleanInto);

function booleanByteLength() {
    return new bufrw.LengthResult(null, bufrw.UInt8.width);
}

function readTBooleanFrom(buffer, offset) {
    var res = bufrw.UInt8.readFrom(buffer, offset);
    // istanbul ignore else
    if (!res.err) {
        res.value = Boolean(res.value);
    }
    return res;
}

function writeTBooleanInto(bool, buffer, offset) {
    if (typeof bool !== 'boolean') {
        return new bufrw.WriteResult(errors.expected(bool, 'a boolean'), offset);
    }
    return bufrw.UInt8.writeInto(Number(bool), buffer, offset);
}

function ThriftBoolean() { }
ThriftBoolean.prototype.rw = BooleanRW;
ThriftBoolean.prototype.name = 'boolean';
ThriftBoolean.prototype.typeid = TYPE.BOOL;
ThriftBoolean.prototype.surface = Boolean;

module.exports.BooleanRW = BooleanRW;
module.exports.ThriftBoolean = ThriftBoolean;
