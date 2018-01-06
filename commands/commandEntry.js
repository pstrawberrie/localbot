const h = require('../helpers');
const commandInfo = require('./commandInfo');
const commandGetUser = require('./commandGetUser');
const commandNewUser = require('./commandNewUser');

module.exports = (command, args, userJSON) => {
  const irc = require('../jobs/irc');

  switch(command) {

    // All Citiez Info
    case 'info':
      if(args == null) {commandInfo('all', userJSON);}
      else {commandInfo('general', userJSON);}
      break;

    // Get User Info
    case 'user':
      commandGetUser(args, userJSON);
      break;

    // New User
    case 'join':
      commandNewUser(args, userJSON);
      break;
    
    // Default
    default:
      console.log(`command entry default: command: ${command}, args: ${args}`);
      break;

  }

}