const mongoose = require('mongoose');

module.exports = (name) => {
  const User = mongoose.model('User');
  return new Promise((resolve, reject) => {

    User.findOne({name})
    .then(result => {
      if(result == null) return resolve(null);//no user found
      return resolve(result);
    })
    .catch(err => {console.log(`error getting user:\n${err}`)});

  });

}