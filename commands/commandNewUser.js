const mongoose = require('mongoose');
const addNewUser = require('../actions/addNewUser');
const addEvent = require('../actions/addEvent');
const irc = require('../jobs/irc');

module.exports = (args, userJSON) => {
  console.log(`new user request from ${userJSON.name}`);
  addNewUser(userJSON)
  .then(result => {
    if(result == false) { return irc.whisper(userJSON.name, `You're already registered! Try typing !user` ) }
    addEvent({name:'newUser', user:userJSON}, true);
    return irc.say(`@${userJSON.name} joined!!`);
  })
  .catch(err => {console.log(`err on newuser command\n${err}`)});
}