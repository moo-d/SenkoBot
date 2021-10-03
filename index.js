let { create, Client } = require('@open-wa/wa-automate');
let options = require('./options');
let msgHandler = require('./main');
let { color } = require('./lib/function');

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
};

create(options(true, startSenko))
.then(Senko => startSenko(Senko))
.catch((error) => console.log(error));
