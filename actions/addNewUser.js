const defaultJSON = require('../data/newUser.json');
const mongoose = require('mongoose');

module.exports = (userJSON) => {
  const User = mongoose.model('User');
  const newUserJSON = userJSON;

  return new Promise((resolve, reject) => {
    //Check that the user doesn't already exist
    User.findOne({name:userJSON.name})
    .then(result => {
      if(result != null) {return resolve(false);}
      newUserJSON.name = userJSON.name;
      newUserJSON.userID = userJSON.id;
      const newUser = new User(newUserJSON);
      newUser.save();
      return resolve(true);
    })
    .catch(err => {reject(err)});

  });
}