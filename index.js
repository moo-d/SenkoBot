let { create, Client } = require('@open-wa/wa-automate');
let options = require('./options');
let msgHandler = require('./main');
let { color } = require('./lib/function');
let fs = require('fs');
let canvas = require('knights-canvas');

function startSenko(Senko = new Client) {
  console.log(color('[SERVER] Server Started!', 'green'));
  Senko.onMessage((async (message) => {
    Senko.getAmountOfLoadedMessages()
    .then((msg) => {
      if (msg >= 3000) {
        Senko.cutMsgCache();
      };
    });
    msgHandler(Senko, message);
  }));
  Senko.onGlobalParticipantsChanged(async (event) => {
    const _welcome = JSON.parse(fs.readFileSync('./lib/database/welcome.json'));
    const isWelcome = _welcome.includes(event.chat);
    const gcChat = await Senko.getChatById(event.chat);
    const pcChat = await Senko.getContact(event.who);
    const { pushname, verifiedName, formattedName } = pcChat;
    const { name, groupMetadata } = gcChat;
    const botNumber = await Senko.getHostNumber() + '@c.us';
    try {
      if (event.action === 'add' && event.who !== botNumbers && isWelcome) {
        const pic = await Senko.getProfilePicFromServer(event.who)
        if (pic === 'ERROR: 401') {
          var picx = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png';
        } else if (pic === 'ERROR: 404') {
          var picx = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg';
        } else {
          picx = pic;
        }
        const welcomer = await new canvas.Welcome2()
        .setAvatar(picx)
        .setUsername(getname)
        .setBg('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2D5YzqhqZrLR4dd9gRH85kYMPdpiycmHdPA&usqp=CAU')
        .setGroupName(name)
        .setMember(groupMetadata.participants.length)
        .toAttachment();
        const base64 = `data:image/png;base64,${bye.toBuffer().toString('base64')}`
        await Senko.sendFile(event.chat, base64, 'welcome.png', `Welcome ${getname}!`);
      } else if (event.action === 'remove' && event.who !== botNumbers && isWelcome) {
        const pic = await Senko.getProfilePicFromServer(event.who)
        if (pic === 'ERROR: 401') {
          var picx = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png';
        } else if (pic === 'ERROR: 404') {
          var picx = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg';
        } else {
          picx = pic;
        }
        const bye = await new canvas.Goodbye2()
        .setAvatar(picx)
        .setUsername(getname)
        .setBg('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2D5YzqhqZrLR4dd9gRH85kYMPdpiycmHdPA&usqp=CAU')
        .setMember(groupMetadata.participants.length)
        .toAttachment();
        const base64 = `data:image/png;base64,${bye.toBuffer().toString('base64')}`
        await Senko.sendFile(event.chat, base64, 'welcome.png', `Goodbye ${getname}, we will miss you~`);
      }
    } catch(err) {
      console.log(err);
    }
  });
};

create(options(true, startSenko))
.then(Senko => startSenko(Senko))
.catch((error) => console.log(error));
