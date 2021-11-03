/* antiDelete By @moo-d */
let { decryptMedia } = require('@open-wa/wa-decrypt');
let fs = require('fs');
let chalk = require('chalk');
let _antidel = JSON.parse(fs.readFileSync('./lib/database/antidelete.json'))
let { color } = require('./lib/function');

module.exports = antiDelete = async (Senko = new Client, message) => {
  console.log(color('[READING MSG INFO]', 'yellow'));
  console.info(message);
  console.log(color('[DELETE MSG DETECTED!]', 'yellow'));
  let { type, from, isGroupMsg, chat, caption, mimetype, mentionedJidList } = message;
  let { body } = message;
  filecpt = caption || '';
  let uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36';
  var sender = message.author;
  var tagsnd = '@' + sender;
  if (type === 'image') {
    var mediaData = await decryptMedia(message, uaOverride);
    var getImageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`;
    await Senko.sendImage(from, getImageBase64, null, '┏┅ *≡ ✗ ANTI DELETE ✗*\n⊙ User : ' + tagsnd.replace('@c.us', '') + '\n⊙ Message Type : ' + type + '\n⊙ Caption : ' + filecpt + '\n┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅');
  } else if (type === 'video') {
    var mediaData = await decryptMedia(message, uaOverride);
    var getVideoBase64 = `data:${mimetype};base64,${mediaData.toString('Base64')}`;
    await Senko.sendFile(from, getVideoBase64, null, '┏┅ *≡ ✗ ANTI DELETE ✗*\n⊙ User : ' + tagsnd.replace('@c.us', '') + '\n⊙ Message Type : ' + type + '\n⊙ Caption : ' + filecpt + '\n┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅');
  } else if (type === 'sticker') {
    var mediaData = await decryptMedia(message, uaOverride);
    var getStickerBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`;
    await Senko.sendTextWithMentions(from, '┏┅ *≡ ✗ ANTI DELETE ✗*\n⊙ User : ' + tagsnd.replace('@c.us', '') + '\n⊙ Message Type : ' + type + '\n┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅\n\n*Note :* Sticker will be sent within ± 1 minute');
    await Senko.sendImageAsSticker(from, getStickerBase64);
  } else if (type === 'document') {
    var mediaData = await decryptMedia(message);
    var getDocBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`;
    await Senko.sendTextWithMentions(from, '┏┅ *≡ ✗ ANTI DELETE ✗*\n⊙ User : ' + tagsnd.replace('@c.us', '') + '\n⊙ Message Type : ' + type + '\n┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅\n\n*Note :* File will be sent within ± 1 minute');
    await Senko.sendFile(from, getDocBase64, message.filename, null);
  } else if (type === 'audio') {
    var mediaData = await decryptMedia(message, uaOverride);
    var getAudioBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`;
    await Senko.sendTextWithMentions(from, `┏┅ *≡ ✗ ANTI DELETE ✗*\n⊙ User : ' + tagsnd.replace('@c.us', '') + '\n⊙ Message Type : ' + type + '\n┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅\n\n*Note :* Audio will be sent within ± 1 minute');
    await Senko.sendAudio(from, getAudioBase64, message.filename);
  } else if (type === 'ptt') {
    var mediaData = await decryptMedia(message, uaOverride)
    var getPttBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
    await Senko.sendTextWithMentions(from, '┏┅ *≡ ✗ ANTI DELETE ✗*\n⊙ User : ' + tagsnd.replace('@c.us', '') + '\n⊙ Message Type : ' + type + '\n┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅\n\n*Note :* Ptt will be sent within ± 1 minute');
    await Senko.sendPtt(from, getPttBase64);
  } else {
    await Senko.sendTextWithMentions(from, '┏┅ *≡ ✗ ANTI DELETE ✗*\n⊙ User : ' + tagsnd.replace('@c.us', '') + '\n⊙ Message Type : ' + type + '\n⊙ Text : ' + body + '\n┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')
  }
};
