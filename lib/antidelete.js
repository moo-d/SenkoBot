let { decryptMedia } = require('@open-wa/wa-decrypt');
let fs = require('fs');
let chalk = require('chalk');
let _antidel = JSON.parse(fs.readFileSync('./lib/database/antidelete.json'))
let { color } = require('./lib/function');

module.exports = antiDelete = async (Senko = new Client, message) => {
  console.log(color('[READING MSG INFO]', 'yellow'));
  console.info(message);
  console.log(color('[DELETE MSG DETECTED!]', 'yellow'))
  let { type, from, sender, isGroupMsg, chat, caption, mimetype, mentionedJidList } = message;
  let { body } = message;
  let { name, formattedTitle } = chat;
  let { pushname, verifiedName, formattedName } = sender;
  pushname = pushname || verifiedName || formattedName;
  filemsg = caption || '';
  let uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36';
}
