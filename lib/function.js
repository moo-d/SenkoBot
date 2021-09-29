let chalk = require('chalk');
let moment = require('moment-timezone');
moment.tz.setDefault('Asia/Jakarta').locale('id');

/**
 * Get text with color.
 * @param {string} text 
 * @param {string} [color] 
 */

const color = (text, color) => {
  return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

/**
 * URL validator.
 * @param {string} url 
 * @returns {boolean}
 */

const isUrl = (url) => {
  return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi))
}

/**
 * Get time duration.
 * @param {Date} timestamp 
 * @param {Date} now 
 * @returns {number}
 */

const processTime = (timestamp, now) => {
  return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

module.exports = { color, isUrl, processTime }
