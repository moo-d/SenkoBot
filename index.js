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
  })
  Senko.onGlobalParticipantsChanged(async (event) => {
    const _welcome = JSON.parse(fs.readFileSync('./lib/database/welcome.json'));
    const isWelcome = _welcome.includes(event.chat);
    const gcChat = await Senko.getChatById(event.chat);
    const pcChat = await Senko.getContact(event.who);
    const { pushname, verifiedName, formattedName } = pcChat;
    const { name, groupMetadata } = gcChat;
    const botNumber = await Senko.getHostNumber() + '@c.us';
  });
};

create(options(true, startSenko))
.then(Senko => startSenko(Senko))
.catch((error) => console.log(error));
