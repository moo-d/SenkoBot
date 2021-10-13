let { decryptMedia } = require('@open-wa/wa-decrypt')
let { color } = require('./lib/function');
let fs = require('fs-extra');
let get = require('got');
let moment = require('moment-timezone');
moment.tz.setDefault('Asia/Jakarta').locale('id');
let axios = require('axios');
let config = JSON.parse(fs.readFileSync('./config.json'));
let apilist = JSON.parse(fs.readFileSync('./lib/apilist.json'));
let _welcome = JSON.parse(fs.readFileSync('./lib/database/welcome.json'));
let _level = JSON.parse(fs.readFileSync('./lib/database/level.json'));
let _leveling = JSON.parse(fs.readFileSync('./lib/database/leveling.json'));
let { level } = require('./lib/level');
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
    let isWelcome = isGroupMsg ? _welcome.includes(groupId) : false;
    let isLeveling = isGroupMsg ? _leveling.includes(groupId) : false;
    let isVideo = type === 'video';
    let isGif = mimetype === 'image/gif';
    let isQuotedVideo = quotedMsg && quotedMsg.type === 'video';
    let isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif';

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

    /**
     * This Leveling Created By @SlavyanDesu
     */
    if (isGroupMsg && !level.isGained(sender.id) && isLeveling) {
      try {
	level.addCooldown(sender.id)
	let currentLevel = level.getLevelingLevel(sender.id, _level)
	let amountXp = Math.floor(Math.random() * (15 - 25 + 1) + 15)
	let requiredXp = 5 * Math.pow(currentLevel, 2) + 50 * currentLevel + 100
	level.addLevelingXp(sender.id, amountXp, _level)
	if (requiredXp <= level.getLevelingXp(sender.id, _level)) {
	  level.addLevelingLevel(sender.id, 1, _level)
	  let userLevel = level.getLevelingLevel(sender.id, _level)
	  let fetchXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100
	  let pic = await Senko.getProfilePicFromServer(sender.id)
	  if (pic === `ERROR: 401`) {
	    var picx = `https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png`
	  } else if (pic === `ERROR: 404`) {
	    var picx = `https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg`
	  } else {
	    picx = pic
	  }
	  const levelup = await new canvas.Up()
	  .setAvatar(picx)
	  .toAttachment();
	  const base64 = `data:image/png;base64,${levelup.toBuffer().toString('base64')}`
	  await Senko.sendFile(from, base64, 'levelup.png', `Selamat ${pushname}!\nXP kamu sekarang: ${level.getLevelingXp(sender.id, _level)} / ${fetchXp}`)
	}
      } catch(err) {
	console.log(err)
      }
    }

    const levelRole = level.getLevelingLevel(sender.id, _level)
    var role = 'https://multiboosting.com/app/plugins/multiboosting-calculator-plugin/public/images/rainbowsix/copper-v.png'
    if (levelRole >= 5) {
      role = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg3DBfYqQMAyBroX-_tqv6cxEK9iUBuInVcg&usqp=CAU'
    }
    if (levelRole >= 10) {
      role = 'https://i.imgur.com/zx5KbBOg.png'
    }
    if (levelRole >= 15) {
      role = 'data:image/png;base64,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'
    }
    if (levelRole >= 20) {
      role = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-TJmMtRjmfymty8jZgDaxoczpH1RgYUwwjg&usqp=CAU'
    }
    if (levelRole >= 25) {
      role = 'https://multiboosting.com/app/plugins/multiboosting-calculator-plugin/public/images/rainbowsix/silver-v.png'
    }
    if (levelRole >= 30) {
      role = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxqlI-y8ih0shQZQnkr90Pj5IZ-kGp31EUCA&usqp=CAU'
    }
    if (levelRole >= 35) {
      role = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWfmjESVMS4L09-QqcsvrERWAh7h3Yz9b5IQ&usqp=CAU'
    }
    if (levelRole >= 40) {
      role = 'https://raw.githubusercontent.com/moo-d/moo-d/main/assets/20211008_104125.png'
    }
    if (levelRole >= 45) {
      role = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ERsqu-iuGVDyX5LRPptoBIoNFuqzYribSA&usqp=CAU'
    }
    if (levelRole >= 50) {
      role = 'https://static.wikia.nocookie.net/valorant/images/9/91/TX_CompetitiveTier_Large_12.png/revision/latest/scale-to-width-down/250?cb=20200623203413'
    }
    if (levelRole >= 55) {
      role = 'https://static.wikia.nocookie.net/valorant/images/4/45/TX_CompetitiveTier_Large_13.png/revision/latest/scale-to-width-down/250?cb=20200623203415'
    }
    if (levelRole >= 60) {
      role = 'https://raw.githubusercontent.com/moo-d/moo-d/main/assets/20211008_112120.png'
    }
    if (levelRole >= 65) {
      role = 'https://raw.githubusercontent.com/moo-d/moo-d/main/assets/20211008_114437.png'
    }
    if (levelRole >= 70) {
      role = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmVg4mkzqgQKUJnwWZTCBDPcWkdTdkeL246g&usqp=CAU'
    }
    if (levelRole >= 75) {
      role = 'https://multiboosting.com/app/plugins/multiboosting-calculator-plugin/public/images/rainbowsix/platinum-i.png'
    }
    if (levelRole >= 80) {
      role = 'https://trackercdn.com/cdn/r6.tracker.network/ranks/s23/diamond-3.png'
    }
    if (levelRole >= 85) {
      role = 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1yXN9oMKkeAvgRFR7vZNo8/2efc56be886b09178a7af99ccab8606a/RANK_L_Diamond_02.png'
    }
    if (levelRole >= 90) {
      role = 'https://raw.githubusercontent.com/moo-d/moo-d/main/assets/20211008_121640.png'
    }
    if (levelRole >= 95) {
      role = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfJJZtWqfIq_QbTitthx9scqqG1cSzwdQGfA&usqp=CAU'
    }
    if (levelRole >= 100) {
      role = 'https://static.wikia.nocookie.net/valorant/images/2/24/TX_CompetitiveTier_Large_24.png/revision/latest/scale-to-width-down/250?cb=20200623203621'
    }

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
      case prefix + 'ytmp3':
        if (args.length == 0) return Senko.reply(from, mess.needUrl(), id);
        var isLinks = args[1].match(/(?:https?\/{2})?(?:w{3}\.)youtu?(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        if (!isLinks) return Senko.reply(mess.wrongUrl);
        await Senko.reply(from, mess.wait(), id);
        try {
          var geturl = await axios.get(`${apilist.hadi}yt2/audio?url=${args[1]}`);
          var filesize = geturl.data.result.size;
          if (Number(filesize.split(' MB')[0]) > 30.00) return Senko.reply(from, mess.durationfile(), id);
          if (geturl.data.msg) return Senko.reply(from, geturl.data.msg, id);
          await Senko.sendFileFromUrl(from, geturl.data.result.thumb, `${geturl.data.result.title}.jpg`, mess.yt3found(geturl), id);
          await Senko.sendAudio(from, geturl.data.result.download_audio_2, id);
          console.log(color('[DOWNLOAD] Ytmp3 Downloaded!', 'blue'));
        } catch(err) {
          console.log(err);
          await Senko.reply(from, 'Error!', id);
        }
      break
      case prefix + 'play':
        if (args.length == 0) return Senko.reply(from, mess.needQuery(), id);
        try {
          await Senko.reply(from, mess.wait(), id);
          var geturl = await axios.get(`${apilist.hadi}ytplay?url=${args[1]}`);
          filesize = geturl.data.result.size;
          if (Number(filesize.split(' MB')[0]) > 30.00) return Senko.reply(from, mess.durationfile(), id);
          await Senko.sendFileFromUrl(from, `${geturl.data.result.thumb}`, `${geturl.data.result.title}.jpg`, mess.playfound(geturl), id);
          await Senko.sendFileFromUrl(from, `${geturl.data.result.download_audio}`)
        } catch(err) {
          console.log(err);
          await Senko.reply(from, 'Error!', id);
        }
      break
      case prefix + 'welcome':
        if (!isGroupMsg) return Senko.reply(from, mess.onlyGroup(), id);
        if (!isGroupAdmins) return Senko.reply(from, mess.onlyAdminGroup(), id);
        if (args.length === 0) return Senko.reply(from, mess.enaordisa(), id);
        if (args[1] === 'enable') {
          if (isWelcome) return Senko.reply(from, mess.hasOn(), id);
          _welcome.push(groupId, 1);
          fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(_welcome));
          await Senko.reply(from, mess.featOn(), id);
        } else if (args[1] === 'disable') {
          _welcome.splice(groupId, 1);
          fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(_welcome));
          await Senko.reply(from, mess.featOff, id);
        };
      break
      case '!sticker':
      case '!stiker':
        if (isMedia && type === 'image') {
          const mediaData = await decryptMedia(message, uaOverride)
          const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
          await Senko.sendImageAsSticker(from, imageBase64)
        } else if (quotedMsg && quotedMsg.type == 'image') {
          const mediaData = await decryptMedia(quotedMsg, uaOverride)
          const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
          await Senko.sendImageAsSticker(from, imageBase64)
        } else if (args.length === 2) {
          const url = args[1]
          if (url.match(isUrl)) {
            await Senko.sendStickerfromUrl(from, url, { method: 'get' })
            .catch(err => console.log('Caught exception: ', err))
          } else {
            Senko.reply(from, mess.wrongUrl(), id)
          }
        } else {
          Senko.reply(from, mess.error.St, id)
        }
      break
      case '!stickergif':
      case '!stikergif':
      case '!sgif':
        if (isMedia && isVideo || isGif || isQuotedVideo || isQuotedGif) {
          await Senko.reply(from, mess.wait, id);
          try {
            const encryptMedia = isQuotedGif || isQuotedVideo ? quotedMsg : message;
            const mediaData = await decryptMedia(encryptMedia, uaOverride);
            const _mimetype = isQuotedVideo || isQuotedGif ? quotedMsg.mimetype : mimetype;
            const videoBase64 = `data:${_mimetype};base64,${mediaData.toString('Base64')}`;
            await Senko.sendMp4AsSticker(from, videoBase64, null, {
              stickerMetadata: true,
              author: pushname,
              pack: `SenkoBot`,
              keepScale: true,
              fps: 30,
              startTime: `00:00:00.0`,
              endTime: `00.00.05.0`,
              crop: false,
              loop: 0
            });
            console.log(`Sticker Created!`);
          } catch(err) {
            console.log(err);
            await Senko.reply(from, 'Error!', id);
          }
        }
      break
      case prefix + 'leveling':
	if (!isGroupMsg) return Senko.reply(from, mess.onlyGroup(), id)
	if (!isGroupAdmins) return Senko.reply(from, mess.onlyAdminGroup(), id)
	if (args[1] === 'enable') {
	  if (isLeveling) return await Senko.reply(from, mess.hasOn, id)
	  _leveling.push(groupId, 1)
	  fs.writeFileSync('./lib/database/leveling.json', JSON.stringify(_leveling))
	  await Senko.reply(from, mess.featOn(), id)
	} else if (args[1] === 'disable') {
	  _leveling.splice(groupId, 1)
	  fs.readFileSync('./lib/database/leveling.json', JSON.parse(_leveling))
	  await Senko.reply(from, mess.featOff(), id)
	} else {
	  await Senko.reply(from, mess.enaordisa(), id)
	}
      break
      case prefix + 'level':
	if (!isLeveling) return Senko.reply(from, mess.featOff(), id)
        if (!isGroupMsg) return Senko.reply(from, mess.onlyGroup(), id)
	const userLevel = level.getLevelingLevel(sender.id, _level)
	const userXp = level.getLevelingXp(sender.id, _level)
	try {
	  const ppLink = await Senko.getProfilePicFromServer(sender.id)
	  if (ppLink === `ERROR: 401`) {
	    var pepe = errorImg
	  } else if (ppLink === `ERROR: 404`) {
	    var pepe = `https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg`
	  } else {
	    pepe = ppLink
	  }
	  requiredXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100
	  const rank = await new canvas.Rank()
	  .setAvatar(pepe)
	  .setUsername(pushname)
	  .setBg('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQZxWt5-o6VVDuIYb05SWfmu-1CHSYjV5-0w&usqp=CAU')
	  .setNeedxp(requiredXp)
	  .setCurrxp(userXp)
	  .setLevel(userLevel)
	  .setRank(role)
	  .toAttachment()
	  const outbuf = `data:image/png;base64,${rank.toBuffer().toString('base64')}`
	  await Senko.sendFile(from, outbuf, 'rank.png', '')
        } catch(err) {
	  console.log(err)
	  await Senko.reply(from, 'Error!', id)
	}
      break
    }
  } catch (err) {
    console.error(color('[ERROR]', 'red'), err)
  }
}
