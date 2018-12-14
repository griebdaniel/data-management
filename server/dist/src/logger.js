"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
exports.logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
            level: 'debug'
        }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ]
});
//# sourceMappingURL=logger.js.map