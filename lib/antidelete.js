let { decryptMedia } = require('@open-wa/wa-decrypt');
let fs = require('fs');
let chalk = require('chalk');
let _antidel = JSON.parse(fs.readFileSync('./lib/database/antidelete.json'))
