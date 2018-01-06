const mongoose = require('mongoose');
const getUser = require('../actions/getUser');
const irc = require('../jobs/irc');

module.exports = (args, userJSON) => {
  const getName = args == null ? userJSON.name : args[0];
  console.log(`get user request from ${userJSON.name} (${getName})`);
  getUser(getName)
  .then(result => {
    if(result == null) { return irc.say(`@${getName} hasn't joined!`); }
    return irc.say(`@${result.name}'s info: coming soon xD`);
  })
  .catch(err => {`err on getUser command:\n${err}`});
}