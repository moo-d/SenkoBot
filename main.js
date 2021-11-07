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
let game = require('./lib/game');
let level = require('./lib/level');
let _premium = JSON.parse(fs.readFileSync('./lib/database/premium.json'));
let premium = require('./lib/premium');
let { ind, eng } = require('./language');
let mess = ind;

ckl = [];
suk = [];
ckl = [];
tek = [];
tkk = [];
teg = [];
tel = [];
mathr = [];
gamewaktu = 60;

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
    let chats = (type === 'chat') ? body : ((type === 'image' || type === 'video')) ? caption : ''
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
    body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : '';
    let args2 = body.trim().split(/ +/).slice(1);
    let q = args2.join(' ');
    let ar = args2.map((v) => v.toLowerCase());
    let url = args.length !== 0 ? args[0] : '';
    let isPremium = premium.checkPremiumUser(sender.id, _premium)
    let isVideo = type === 'video';
    let isGif = mimetype === 'image/gif';
    let isQuotedVideo = quotedMsg && quotedMsg.type === 'video';
    let isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif';
    let isQuotedText = quotedMsg && quotedMsg.type === 'chat';
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
	level.addCooldown(sender.id);
	let currentLevel = level.getLevelingLevel(sender.id, _level);
	let amountXp = Math.floor(Math.random() * (15 - 25 + 1) + 15);
	let requiredXp = 5 * Math.pow(currentLevel, 2) + 50 * currentLevel + 100;
	level.addLevelingXp(sender.id, amountXp, _level);
	if (requiredXp <= level.getLevelingXp(sender.id, _level)) {
	  level.addLevelingLevel(sender.id, 1, _level);
	  let userLevel = level.getLevelingLevel(sender.id, _level);
	  let fetchXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100;
	  let pic = await Senko.getProfilePicFromServer(sender.id);
	  if (pic === `ERROR: 401`) {
	    var picx = `https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png`;
	  } else if (pic === `ERROR: 404`) {
	    var picx = `https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg`;
	  } else {
	    picx = pic;
	  };
	  const levelup = await new canvas.Up()
	  .setAvatar(picx)
	  .toAttachment();
	  const base64 = `data:image/png;base64,${levelup.toBuffer().toString('base64')}`;
	  await Senko.sendFile(from, base64, 'levelup.png', `Selamat ${pushname}!\nXP kamu sekarang: ${level.getLevelingXp(sender.id, _level)} / ${fetchXp}`);
	};
      } catch(err) {
	console.log(err);
      }
    };

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

    /* Siapakah By @mrfzvx12 */
    game.cekWaktuCkl(Senko, ckl);
    if (game.isCkl(from, ckl)) {
      if (!quotedMsg || !quotedMsgObj.fromMe) return
      if (chats.toLowerCase().includes(game.getJawabanCkl(from, ckl))) {
        if (isPremium) {
          var rewardxp = Math.ceil(Math.random() * 500);
        } else {
          var rewardxp = Math.ceil(Math.random() * 250);
        };
        await Senko.reply(from, `*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanCkl(from, ckl)}\n\n+${rewardxp}`, id);
        ckl.splice(game.getCklPosi(from, ckl), 1);
        level.addLevelingXp(sender.id, rewardxp, _level);
      } else {
        await Senko.reply(from, 'jawaban salah', id);
      }
    };

    /* Susun Kata By @moo-d */
    game.cekWaktuCkl(Senko, suk);
    if (game.isCkl(from, suk)) {
      if (!quotedMsg || !quotedMsgObj.fromMe) return
      if (chats.toLowerCase().includes(game.getJawabanCkl(from, suk))) {
        if (isPremium) {
          var rewardxp = Math.ceil(Math.random() * 500);
        } else {
	  var rewardxp = Math.ceil(Math.random() * 250);
        };
	await Senko.reply(from, `*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanCkl(from, suk)}\n\n+${rewardxp}`, id);
	suk.splice(game.getCklPosi(from, suk), 1);
	level.addLevelingXp(sender.id, rewardxp, _level);
      } else {
	await Senko.reply(from, 'jawaban salah', id);
      }
    };

    /* Tebak Kalimat By @moo-d */
    game.cekWaktuCkl(Senko, tek);
    if (game.isCkl(from, tek)) {
      if (!quotedMsg || !quotedMsgObj.fromMe) return
      if (chats.toLowerCase().includes(game.getJawabanCkl(from, tek))) {
        if (isPremium) {
          var rewardxp = Math.ceil(Math.random() * 500);
        } else {
	  var rewardxp = Math.ceil(Math.random() * 250);
        };
	await Senko.reply(from, `*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanCkl(from, tek)}\n\n+${rewardxp}`, id);
	tek.splice(game.getCklPosi(from, tek), 1);
	level.addLevelingXp(sender.id, rewardxp, _level);
      } else {
	await Senko.reply(from, 'jawaban salah', id);
      }
    };

    /* Tebak Kata By @moo-d */
    game.cekWaktuCkl(Senko, tkk);
    if (game.isCkl(from, tkk)){
      if (!quotedMsg || !quotedMsgObj.fromMe) return
      if (chats.toLowerCase().includes(game.getJawabanCkl(from, tkk))) {
        if (isPremium) {
          var rewardxp = Math.ceil(Math.random() * 500);
        } else {
	  var rewardxp = Math.ceil(Math.random() * 250);
        };
	await Senko.reply(from, `*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanCkl(from, tkk)}\n\n+${rewardxp}`, id);
	tkk.splice(game.getCklPosi(from, tkk), 1);
	level.addLevelingXp(sender.id, rewardxp, _level);
      } else {
	await Senko.reply(from, 'jawaban salah', id);
	console.log('Wrong');
      }
    };

    /* Tebak Gambar By @moo-d */
    game.cekWaktuCkl(Senko, teg);
    if (game.isCkl(from, teg)){
      if (!quotedMsg || !quotedMsgObj.fromMe) return
      if (chats.toLowerCase().includes(game.getJawabanCkl(from, teg))){
	if (isPremium) {
          var hent = Math.ceil(Math.random() * 500);
        } else {
          var hent = Math.ceil(Math.random() * 250);
        };
	await Senko.reply(from, `*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanCkl(from, teg)}\n\n+${hent} XP`, id);
	level.addLevelingXp(sender.id, hent, _level);
	teg.splice(game.getCklPosi(from, teg), 1);
      } else {
	await Senko.reply(from, 'jawaban salah', id);
      }
    };

    /* Teka Teki By @moo-d
    game.cekWaktuCkl(Senko, ttk);
    if (game.isCkl(from, ttk)) {
      if (!quotedMsg || !quotedMsgObj.fromMe) return
      if (chats.toLowerCase().includes(game.getJawabanCkl(from, ttk))) {
	if (isPremium) {
          var rewardxp = Math.ceil(Math.random() * 500);
        } else {
	  var rewardxp = Math.ceil(Math.random() * 250);
        };
	await Senko.reply(from, `*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanCkl(from, ttk)}\n\n+${rewardxp}`, id);
	ttk.splice(game.getCklPosi(from, ttk), 1);
	level.addLevelingXp(sender.id, rewardxp, _level);
      } else {
	await Senko.reply(from, 'jawaban salah', id);
      }
    };

    /* Cak Lontong By @moo-d */
    let caklDesc = `${game.getDescCkl(from, clo)}`;
    game.cekWaktuCklWithDesc(Senko, caklDesc, clo);
    if (game.isCkl(from, clo)) {
      if (!quotedMsg || !quotedMsgObj.fromMe) return
      if (chats.toLowerCase().includes(game.getJawabanCkl(from, clo))) {
	if (isPremium) {
          var rewardxp = Math.ceil(Math.random() * 500);
        } else {
	  var rewardxp = Math.ceil(Math.random() * 250);
        };
        await Senko.reply(from, `*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanCkl(from, clo)}\n*Penjelasan :* ${game.getDescCkl(from, clo)}\n\n+${rewardxp}`, id);
	clo.splice(game.getCklPosi(from, clo), 1);
	level.addLevelingXp(from, rewardxp, _level);
      } else {
	await Senko.reply(from, 'Jawaban salah!', id);
      }
    };

    /* Tebak Lirik By @moo-d */
    game.cekWaktuCkl(Senko, tel);
    if (game.isCkl(from, tel)) {
      if (!quotedMsg || !quotedMsgObj.fromMe) return
      if (chats.toLowerCase().includes(game.getJawabanCkl(from, tel))) {
	rewardxp = Math.ceil(Math.random() * 250);
	await Senko.reply(from, `*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanCkl(from, tel)}\n\n+${rewardxp}`, id);
	tel.splice(game.getCklPosi(from, tel), 1);
	level.addLevelingXp(sender.id, rewardxp, _level)
      } else {
	await Senko.reply(from, 'jawaban salah', id);
      }
    };

    /**
     * Premium created By @SlavyanDesu
     */
    premium.expiredCheck(_premium);

    if (!isGroupMsg && command.startsWith('!')) console.log(color('[CMD]', 'green'), time, color(msgs(command)), 'from', color(pushname));
    if (isGroupMsg && command.startsWith('!')) console.log(color('[CMD]', 'green'), time, color(msgs(command)), 'from', color(pushname), 'in', color(formattedTitle));
    switch(command) {
      case prefix + 'help':
      case prefix + 'menu':
        Senko.reply(from, mess.help(prefix, pushname), id);
      break
      case prefix + 'jokes':
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
      case prefix + 'cecan':
	await Senko.reply(from, mess.wait(), id);
	var geturl = await axios.get(apilist.hadi + `pinterest?q=cecan`);
        var geturl2 = await axios.get(apilist.hadi + `randomImage/cecan`);
        var urls = ['url1', 'url2'];
        var getrndurls = urls[Math.floor(Math.random() * urls.length)];
        if (getrndurls === `url1`) {
	  var gtrnd = geturl.data.hasil[Math.floor(Math.random() * geturl.data.hasil.length)];
	  await Senko.sendFileFromUrl(from, gtrnd, 'cecan.jpg', '', id);
        } else {
          await Senko.sendFileFromUrl(from, geturl2, 'cecan.jpg', mess.done(), id);
        }
      break
      case prefix + 'cogan':
	await Senko.reply(from, mess.wait(), id);
	var geturl = await axios.get(apilist.hadi + `pinterest?q=cogan`);
	var rslt = geturl.data.hasil[Math.floor(Math.random() * geturl.data.hasil.length)];
	await Senko.sendFileFromUrl(from, rslt, 'cogan.jpg', mess.done(), id);
      break
      case prefix + 'play':
	if (args.length == 0) return Senko.reply(from, mess.needQuery(), id);
	try {
	  await Senko.reply(from, mess.wait(), id);
	  var geturl = await axios.get(apilist.hadi + `ytplay?q=${args[1]}`);
	  var filesize = geturl.data.result.size;
          if (geturl.data.msg) return Senko.reply(from, mess.msgChannel(), id);
	  if (Number(filesize.split(' MB')[0]) > 30.00) return Senko.reply(from, mess.durationfile(), id);
	  await Senko.sendFileFromUrl(from, `${geturl.data.result.thumb}`, `${geturl.data.result.title}.jpg`, mess.playfound(geturl), id);
	  await Senko.sendFileFromUrl(from, geturl.data.result.download_audio, `${geturl.data.result.title}.mp3`, '', id);
	} catch(err) {
	  console.log(err);
	  Senko.reply(from, 'Error!', id);
	}
      break
      case prefix + 'ytmp4':
	if (args.length === 0) return Senko.reply(from, mess.needUrl(), id);
	await Senko.reply(from, mess.wait(), id);
        try {
	 var geturl = await axios.get(apilist.hadi + `yt2/video?url=${args[1]}`);
	  var filesize = geturl.data.result.size;
	  if (Number(filesize.split(' MB')[0]) >= 30.00) return Senko.reply(from, mess.durationfile(), id);
	  var teks = mess.yt4found(geturl);
	  await Senko.sendFileFromUrl(from, geturl.data.result.thumb, mess.durationfile(), teks, id);
	  await Senko.sendFileFromUrl(from, geturl.data.result.download_video, `${geturl.data.result.title}.mp4`, mess.done(), id);
        } catch(err) {
          console.log(err);
          await Senko.reply(from, 'Error!', id);
        }
      break
      case prefix + 'siapakah':
        if (!isGroupMsg) return Senko.reply(from, mess.onlyGroup(), id);
        if (!isLeveling) return Senko.reply(from, mess.featOff(), id);
        if (game.isCkl(from, ckl)) return Senko.reply(from, `Masih ada soal yang belum di selesaikan`, id);
	var data = fs.readFileSync('./lib/database/siapakah.json');
        var list = JSON.parse(data);
        vae random = Math.floor(Math.random() * list.length);
        var v = list[random]
        var petunjuk = v.jawaban.replace(/[aiueoAIUEO]/gi, '□');
        await Senko.reply(from, `*Soal :*\n${v.soal}\n*Clue :* ${petunjuk}\n\nWaktu : ${gamewaktu}s\n*Note* : Reply pertanyaan ini untuk menjawab.`, id);
	var anih = v.jawaban.toLowerCase();
        game.addckl(from, anih, gamewaktu, ckl);
      break
      case prefix+'premium':
	if (!isOwner) return await Senko.reply(from, mess.onlyOwner(), id);
	if (args[1] === 'add') {
	  if (mentionedJidList.length !== 0) {
	    for (let prem of mentionedJidList) {
              if (args.length === 2) {
                mazn = 2592000000;
              } else {
                mazn = args2[2];
              };
	      if (prem === botNumber) return await Senko.reply(from, 'Hmm!', id);
	      premium.addPremiumUser(prem, mazn, _premium);
	      await Senko.reply(from, `*┏══ *✅PREMIUM ADDED✅* ══┅┅┅*\n\n❥ *ID*: ${prem}\n❥ *Expired*: ${ms(toMs(args2[2])).days} day(s) ${ms(toMs(args2[2])).hours} hour(s) ${ms(toMs(args2[2])).days} day(s) ${ms(toMs(args2[2])).hours} hour(s) ${ms(toMs(args2[2])).minutes} minute(s)\n┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅`, id);
	    };
	  } else {
            if (args.length === 2) {
              mazn = 2592000000;
            } else {
              mazn = args2[2];
            };
	    premium.addPremiumUser(args2[1] + '@c.us', mazn, _premium);
	    await Senko.reply(from, `*┏══ *✅PREMIUM ADDED✅* ══┅┅┅*\n\n❥ *ID*: ${args2[1]}@c.us\n❥ *Expired*: ${ms(toMs(args2[2])).days} day(s) ${ms(toMs(args2[2])).hours} hour(s) ${ms(toMs(args2[2])).minutes} minute(s)┗┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅`, id);
	  };
	} else if (args[1] === 'del') {
	  if (mentionedJidList.length !== 0) {
	    if (mentionedJidList[0] === botNumber) return await Senko.reply(from, '....', id);
	    _premium.splice(premium.getPremiumPosition(mentionedJidList[0], _premium), 1);
	    fs.writeFileSync('./lib/database/premium.json', JSON.stringify(_premium));
	    await Senko.reply(from, mess.done(), id);
	  } else {
	    _premium.splice(premium.getPremiumPosition(args[1] + '@c.us', _premium), 1);
	    fs.writeFileSync('./lib/database/premium.json', JSON.stringify(_premium));
	    await Senko.reply(from, mess.done(), id);
	  };
	} else {
	  await Senko.reply(from, 'Hmm', id);
	};
      break
      case prefix+'premiumcheck':
      case prefix+'cekpremium':
	if (!isPremium) return await Senko.reply(from, 'Kamu tidak terdaftar dalam user premium', id);
	const cekExp = ms(premium.getPremiumExpired(sender.id, _premium) - Date.now());
	await Senko.reply(from, `*── 「 PREMIUM EXPIRED 」 ──*\n\n➸ *ID*: ${sender.id}\n➸ *Premium left*: ${cekExp.days} day(s) ${cekExp.hours} hour(s) ${cekExp.minutes} minute(s)`, id);
      break
      case prefix+'premiumlist':
      case prefix+'listpremium':
	let listPremi = '*── 「 PREMIUM USERS 」 ──*\n\n';
	const deret = premium.getAllPremiumUser(_premium);
	const arrayPremi = [];
	  for (let i = 0; i < deret.length; i++) {
	  const checkExp = ms(premium.getPremiumExpired(deret[i], _premium) - Date.now());
	  arrayPremi.push(await Senko.getContact(premium.getAllPremiumUser(_premium)[i]));
	  listPremi += `${i + 1}. wa.me/${premium.getAllPremiumUser(_premium)[i].replace('@c.us', '')}\n➸ *Name*: ${arrayPremi[i].pushname}\n➸ *Expired*: ${checkExp.days} day(s) ${checkExp.hours} hour(s) ${checkExp.minutes} minute(s)\n\n`;
	};
	await Senko.reply(from, listPremi, id);
      break
      case prefix + 'tebakgambar':
        if (!isGroupMsg) return Senko.reply(from, mess.onlyGroup(), id);
        if (!isLeveling) return Senko.reply(from, mess.featOff(), id);
	if (game.isCkl(from, teg)) return Senko.reply(from, `Masih ada soal yang belum di selesaikan`, id);
	var data = fs.readFileSync('./lib/database/tebakgambar.json');
	var list = JSON.parse(data);
	var random = Math.floor(Math.random() * list.length);
	var p = list[random];
	var gamewaktu = 60;
	await Senko.sendFileFromUrl(from, p.img, 'tebakgambar.jpg', `*Waktu : ${gamewaktu}s\n\n*Note* : Reply pertanyaan ini untuk menjawab.`, id);
	var anh = p.jawaban.toLowerCase();
	game.addckl(from, anh, gamewaktu, teg);
      break
      case prefix + 'caklontong':
        if (!isGroupMsg) return Senko.reply(from, mess.onlyGroup(), id);
        if (!isLeveling) return Senko.reply(from, mess.featOff(), id);
	if (game.isCkl(from, clo)) return Senko.reply(from, `Masih ada soal yang belum di selesaikan`, id);
	data = fs.readFileSync('./lib/caklontong.json');
	list = JSON.parse(data);
	random = Math.floor(Math.random() * list.length);
	p = list[random];
	panunjuk = p.jawaban.replace(/[aiueoAIUEO]/gi, '□')
	await Senko.reply(from, `*Soal :*\n${p.soal}\n*Clue :* ${panunjuk}\n\nWaktu : ${gamewaktu}s\n*Note* : Reply pertanyaan ini untuk menjawab.`, id)
	anh = p.jawaban.toLowerCase()
	desc = p.deskripsi.toLowerCase()
	game.addCklWithDesc(from, anh, gamewaktu, desc, clo)
      break
      case prefix + 'tekateki':
        if (!isGroupMsg) return Senko.reply(from, mess.onlyGroup(), id);
        if (!isLeveling) return Senko.reply(from, mess.featOff(), id);
	if (game.isCkl(from, ttk)) return Senko.reply(from, `Masih ada soal yang belum di selesaikan`, id);
	data = fs.readFileSync('./lib/tekateki.json');
	list = JSON.parse(data);
	random = Math.floor(Math.random() * list.length);
	p = list[random];
	await Senko.reply(from, `*Soal :*\n${p.soal}\n\n*Waktu :* ${gamewaktu}s\n*Note* : Reply pertanyaan ini untuk menjawab.`, id);
	anh = p.jawaban.toLowerCase();
	game.addckl(from, anh, gamewaktu, ttk);
      break
      case prefix + 'tebaklirik':
        if (!isGroupMsg) return Senko.reply(from, mess.onlyGroup(), id);
        if (!isLeveling) return Senko.reply(from, mess.featOff(), id);
	if (game.isCkl(from, tel)) return Senko.reply(from, `Masih ada soal yang belum di selesaikan`, id);
	data = fs.readFileSync('./lib/tebaklirik.json');
	list = JSON.parse(data);
	random = Math.floor(Math.random() * list.length);
	p = list[random];
	await Senko.reply(from, `*Soal :*\n${p.soal}\n\nWaktu : ${gamewaktu}s\n*Note* : Reply pertanyaan ini untuk menjawab.`, id);
	anh = p.jawaban.toLowerCase();
	game.addckl(from, anh, gamewaktu, tel);
      break
      case prefix + 'tebakkata':
        if (!isGroupMsg) return Senko.reply(from, mess.onlyGroup(), id);
        if (!isLeveling) return Senko.reply(from, mess.featOff(), id);
	if (game.isCkl(from, tkk)) return await Senko.reply(from, `Masih ada soal yang belum di selesaikan`, id);
	data = fs.readFileSync('./lib/tebakkata.json');
	list = JSON.parse(data);
	var random = Math.floor(Math.random() * list.length);
	var v = list[random];
	await Senko.reply(from, `*Soal :*\n${v.soal}\n\nWaktu : ${gamewaktu}s\n*Note* : Reply pertanyaan ini untuk menjawab.`, id);
	var anih = v.jawaban.toLowerCase();
	game.addckl(from, anih, gamewaktu, tkk);
      break
      case prefix + 'tebakkalimat':
        if (!isGroupMsg) return Senko.reply(from, mess.onlyGroup(), id);
        if (!isLeveling) return Senko.reply(from, mess.featOff(), id);
	if (game.isCkl(from, tek)) return Senko.reply(from, `Masih ada soal yang belum di selesaikan`, id);
	data = fs.readFileSync('./lib/tebakkalimat.json');
	list = JSON.parse(data);
	random = Math.floor(Math.random() * list.length);
	var v = list[random];
	await Senko.reply(from, `*Soal :*\n${v.soal}\n\nWaktu : ${gamewaktu}s\n*Note* : Reply pertanyaan ini untuk menjawab.`, id);
	var anih = v.jawaban.toLowerCase();
	game.addckl(from, anih, gamewaktu, tek);
      break
      case prefix + 'susunkata':
        if (!isGroupMsg) return Senko.reply(from, mess.onlyGroup(), id);
        if (!isLeveling) return Senko.reply(from, mess.featOff(), id);
	if (game.isCkl(from, suk)) return Senko.reply(from, `Masih ada soal yang belum di selesaikan`, id);
	data = fs.readFileSync('./lib/susunkata.json');
	list = JSON.parse(data);
	random = Math.floor(Math.random() * list.length);
	var v = list[random];
	var petunjuk = v.tipe;
	await Senko.reply(from, `*Soal :*\n${v.soal}\n*Tipe :* ${petunjuk}\n\nWaktu : ${gamewaktu}s\n*Note* : Reply pertanyaan ini untuk menjawab.`, id);
	var anih = v.jawaban.toLowerCase();
	game.addckl(from, anih, gamewaktu, suk);
      break
      case prefix+'bc':
      case prefix + 'broadcast':
	if (!isOwner) return await Senko.reply(from, ind.ownerOnly(), id)
	if (args.length === 0) return await Senko.reply(from, 'Hmm', id)
	const chats = await Senko.getAllChatIds()
	for (let bcs of chats) {
	  let cvk = await Senko.getChatById(bcs)
	  if (!cvk.isReadOnly) await Senko.sendText(bcs, `${q}\n\n_Broadcasted message_`)
	}
	await Senko.reply(from, 'Selesai!', id)
      break
    default:
      if (args[0].startsWith(prefix)) {
        await Senko.reply(from, mess.unknownCmd(pushname, args), id);
        console.log(color('[CLIENT] Command not found', 'red'));
      }
    };
  } catch (err) {
    console.error(color('[ERROR]', 'red'), err);
  }
};
