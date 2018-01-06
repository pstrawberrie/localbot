const h = require('../helpers');
const tmi = require('tmi.js');
const addEvent = require('../actions/addEvent');
const commandEntry = require('../commands/commandEntry');

const botOwner = process.env.TWITCH_BOT_OWNER;
let twitchChannelArr = []; twitchChannelArr.push(process.env.TWITCH_CHANNEL)
const tmiOptions = {
  options: {
    debug:true
  },
  connection: {
    cluster:"aws",
    reconnect:true,
    timeout: 5000
  },
  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_KEY
  },
  channels: twitchChannelArr
};
const irc = new tmi.client(tmiOptions);

//+ IRC Connect
exports.run = () => {
  irc.connect()
  .catch((error) => {
    console.log('Error connecting to IRC:');
    console.log(error);
  });
}

//+ IRC Connected Listener
irc.on('connected', function() {
  console.log('bbbot just connected');
  //irc.whisper(botOwner, 'bbbot just connected');
});

//+ IRC Disconnected Listener
irc.on('disconnected', function() {
  console.log('bbbot just disconnected');
  //irc.whisper(botOwner, 'bbbot just disconnected!');
});

//+ IRC Whisper Listener 
irc.on('chat', function (channel, userstate, message, self) {
  
  // Make sure this is a "!" command, and that the bot didn't send it
  if (self) return;
  if (!h.validMessage(message)) return;

  const userJSON = {
    name: userstate.username,
    id: userstate['user-id'],
    message,
    subscriber: userstate.subscriber,
    mod: userstate.mod,
    time: Date.now()
  }

  commandEntry(h.getCommand(message), h.getArguments(message), userJSON);

});

// Exports
exports.say = (message) => { irc.say(process.env.TWITCH_CHANNEL, message); }
exports.whisper = (user, message) => { irc.whisper(user, message); }