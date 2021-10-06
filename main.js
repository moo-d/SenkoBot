let { color } = require('./lib/function');
let fs = require('fs-extra');
let get = require('got');
let moment = require('moment-timezone');
let axios = require('axios');
let config = JSON.parse(fs.readFileSync('./config.json'));
let apilist = JSON.parse(fs.readFileSync('./lib/apilist.json'));
let { ind } = require('./language');
let mess = ind;

module.exports = msgHandler = async (Senko = new Client, message) => {
  try {
    let { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message;
    let { body } = message;
    let { name, formattedTitle } = chat;
    let { pushname, verifiedName, formattedName } = sender;
    pushname = pushname || verifiedName || formattedName;
    const cmd = caption || body || '';
    const command = cmd.toLowerCase().split(' ')[0] || '';
    commands = caption || body || '';
    let args = commands.split(' ');
    var prefix = config.prefix;
    let time = moment(t * 1000).format('DD/MM HH:mm:ss');
    let botNumber = await Senko.getHostNumber();
    let blockNumber = await Senko.getBlockedIds();
    let groupId = isGroupMsg ? chat.groupMetadata.id : '';
    let groupAdmins = isGroupMsg ? await Senko.getGroupAdmins(groupId) : '';
    let isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false;
    let isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false;
    let ownerNumber = [`${config.ownernum}@c.us`]; // replace with your whatsapp number
    let isOwner = ownerNumber.includes(sender.id);
    let uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36';
    let isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi);

    /**
     * Get command message
     * @param {string} message
     */
    const msgs = (message) => {
      if (command.startsWith(prefix)) {
        if (message.length >= 10) {
          return `${message.substr(0, 15)}`;
        } else {
          return `${message}`;
        };
      };
    };

    if (!isGroupMsg && command.startsWith('!')) console.log(color('[CLIENT]', 'green'), time, color(msgs(command)), 'from', color(pushname));
    if (isGroupMsg && command.startsWith('!')) console.log(color('[CLIENT]', 'green'), time, color(msgs(command)), 'from', color(pushname), 'in', color(formattedTitle));
    switch(command) {
      case prefix + 'help':
      case prefix + 'menu':
        Senko.reply(from, mess.help(prefix, pushname), id);
      break
      case prefix + 'darkjokes':
        await Senko.reply(from, mess.wait(), id);
        try {
          var geturl = await axios.get(`${apilist.hadi}darkjokes`);
          if (geturl.data.error) return Senko.reply(from, geturl.data.error, id);
          await Senko.sendFileFromUrl(from, geturl.data.result, 'memes.jpg', mess.done(), id);
        } catch(err) {
          console.log(err);
          Senko.reply(from, 'Error!', id);
        }
      break
      case 'ytmp3':
        var isLinks = args[1].match(/(?:https?\/{2})?(?:w{3}\.)youtu?(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
        if (!isLinks) return Senko.reply(mess.wrongUrl)
        await Senko.reply(from, mess.wait(), id);
        try {
          var geturl = await axios.get(`${apilist.hadi}yt2/audio?url=${query}`);
          if (geturl.data.msg) return Senko.reply(from, geturl.data.msg, id);
          await Senko.sendFileFromUrl(from, geturl.data.result.thumb, `${geturl.data.result.title}.jpg`, mess.yt3found(geturl), id);
          await Senko.sendAudio(from, geturl.data.result.download_audio_2, id);
          console.log(color('[DOWNLOAD] Ytmp3 Downloaded!', 'blue'));
        } catch(err) {
          console.log(err);
          Senko.reply(from, 'Error', id)
        }
      break
    }
  } catch (err) {
    console.error(color('[ERROR]', 'red'), err)
  }
}
