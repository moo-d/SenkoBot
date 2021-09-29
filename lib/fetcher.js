let fetch = require('node-fetch');
let { fromBuffer } = require('file-type');
let fs = require('fs-extra');
let FormData = require('form-data');

/**
 * Fetch JSON from URL.
 * @param {string} url 
 * @param {object} [options]
 * @returns {Promise<object>} 
 */
const fetchJson = (url, options) => {
  return new Promise((resolve, reject) => {
    return fetch(url, options)
    .then((response) => response.json())
    .then((json) => resolve(json))
    .catch((err) => reject(err));
  });
}:

/**
 * Fetch text from URL.
 * @param {string} url 
 * @param {object} [options]
 * @returns {Promise<string>}
 */
const fetchText = (url, options) => {
  return new Promise((resolve, reject) => {
    return fetch(url, options)
    .then((response) => response.text())
    .then((text) => resolve(text))
    .catch((err) => reject(err));
  });
};

/**
 * Get buffer from direct media.
 * @param {string} url 
 * @param {object} [options]
 * @returns {Promise<Buffer>}
 */

const getBuffer = (url, options) => {
  return new Promise((resolve, reject) => {
    return fetch(url, options)
    .then((response) => response.buffer())
    .then((result) => resolve(result))
    .catch((err) => reject(err));
  });
};

module.exports = { fetchJson, fetchText, getBuffer }
