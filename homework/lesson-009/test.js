"use strict";
const ReadableGenerator = require('./readable.js').ReadableGenerator;
const FileWriteStream = require('./writable.js').FileWriteStream;
const DataFilterStream = require('./transform.js').DataFilterStream;

var generator = new ReadableGenerator({});
var transformer = new DataFilterStream({});
var writer = new FileWriteStream({"fileName" : "outfile.txt"});

generator.pipe(transformer).pipe(writer);

