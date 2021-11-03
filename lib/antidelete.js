let { decryptMedia } = require('@open-wa/wa-decrypt');
let fs = require('fs');
let chalk = require('chalk');
let _antidel = JSON.parse(fs.readFileSync('./lib/database/antidelete.json'))
let { color } = require('./lib/function');

module.exports = antiDelete = async (Senko = new Client, message) => {
  console.log(color('[READING MSG INFO]', 'yellow'));
  console.info(message);
  console.log(color('[DELETE MSG DETECTED!]', 'yellow'))
  let { type, from, isGroupMsg, chat, caption, mimetype, mentionedJidList } = message;
  let { body } = message;
  filecpt = caption || '';
  let uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36';
  var sender = message.author
  var tagsnd = '@' + sender
  if (type === 'image') {
    var mediaData = await decryptMedia(message, uaOverride)
    var getImageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
    await Senko.sendImage(from, getImageBase64, null)
  }
}
