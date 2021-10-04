let { color } = require('./lib/function');
let fs = require('fs-extra');
let get = require('got');
let moment = require('moment-timezone')
let config = JSON.parse(fs.readFileSync('./config.json'));
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
    body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : '';
    let args =  commands.split(' ');
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
      case 'help':
        Senko.reply(from, mess.help(prefix), id);
      break
    }
  } catch (err) {
    console.error(color('[ERROR]', 'red'), err)
  }
}
