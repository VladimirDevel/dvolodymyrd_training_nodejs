"use strict";
const Readable = require('stream').Readable;
const logger = require('./logger');
const crypto = require('crypto');

class ReadableGenerator extends Readable{
    constructor(properties) {
        super(properties);
        this.properties = properties;
        logger.info("called")
    }
    _read() {
        this.push(crypto.randomBytes(Math.floor(Math.random() * (1000 - 5) + 5)));
    };
}

module.exports = {};
module.exports.ReadableGenerator = ReadableGenerator;