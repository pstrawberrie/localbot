// Moment
exports.moment = require('moment');

// Check if chat message is a valid command
exports.validMessage = (message) => {
  if(message != '' && message.substr(0,1) === '!' && message.split(' ').length <= 3)
  return true;
}

// Get Command from a message
exports.getCommand = (message) => {
  let msg = message.split(' ');
  return msg[0].replace('!','');
}

// Get Arguments from a command message
exports.getArguments = (message) => {
  const msg = message.replace('!','');
  if(msg.split(' ').length === 1) {return null;}
  let newMsg = message.split(' '); newMsg.splice(0, 1);
  return newMsg;
}