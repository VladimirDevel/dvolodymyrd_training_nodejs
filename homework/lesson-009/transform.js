"use strict";
var Transform = require('stream').Transform;
const logger = require('./logger');

class DataFilterStream extends Transform{
    constructor(properties) {
        super(properties);
        logger.stats('Filter constructor');
        this.totalBytes = 0;
        this.last_processing = new Date();
        setInterval(function() {
            var previous = this.last_processing;
            this.last_processing = new Date();
            var time_spent = this.last_processing - previous;
            logger.stats(Math.round(this.totalBytes / time_spent * 100) + " bps");
            this.totalBytes = 0;
        }.bind(this), 1000);
    }
    _transform(chunk, enc, next) {
        var result = chunk.slice(0,10);
        this.totalBytes += result.length;
        this.push(result);
        next();
    };
    _flush(chunk, enc, next) {
        logger.info("Processing done...");
    };

}

module.exports = {};
module.exports.DataFilterStream = DataFilterStream;