let { fetchJson } = require('./fetcher');
let fs = require('fs');
let apilist = JSON.parse(fs.readFileSync('./apilist.json'));

/**
 * Get YouTube audio from URL.
 * @param {string} url
 * @returns {Promise<object>} 
 */
const ytdl = (url) => new Promise((resolve, reject) => {
  console.log(`Get YouTube media from ${url}`)
  fetchJson(`${apilist.hadi}yt2/audio?url=${url}`)
  .then((result) => resolve(result))
  .catch((err) => reject(err))
})

module.exports = { ytdl }
