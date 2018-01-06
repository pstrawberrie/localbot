const getUserCount = require('../actions/getUserCount');
const irc = require('../jobs/irc');

module.exports = (type, userJSON) => {

  if(type === 'all') {
    getUserCount()
    .then(result => {
      return irc.say(`${result} users in the system. Join with !join`);
    })
    .catch(err => {return console.log(`err getting all users via command:\n${err}`);});
  }
  if(type === 'general') {
    return irc.say(`argument command trigger here`);
  }

}