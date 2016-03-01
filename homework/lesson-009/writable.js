"use strict";
var Writable = require('stream').Writable;
const logger = require('./logger');
var fs = require('fs');

class FileWriteStream extends Writable{
    constructor(properties) {
        super(properties);
        this.wstream = fs.createWriteStream(properties.fileName, {flags: 'w+' });
        this.wstream.on('error', function (err) {
            logger.error(err);
        });
    }

    writesome(chunk, next, context) {
        logger.info("Writing " + chunk.length);
        logger.info("Object " + this);
        var writesuccess = this.wstream.write(chunk);
        if (!writesuccess) {
            logger.info("Write error:" + chunk + "with next: " + next);
            this.wstream.once("drain", next);
        }
        else {
            logger.info("Write result:" + writesuccess);
            next();
        }
    };

    _write(chunk, enc, next) {
        this.writesome(chunk, next, this);
    };

}

module.exports = {};
module.exports.FileWriteStream = FileWriteStream;