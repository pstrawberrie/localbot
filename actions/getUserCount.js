const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = () => {
  return new Promise((resolve, reject) => {

    // just counting the cities for now, in the future we'll want to do some advanced aggregation!!
    User.count({})
    .then(result => {
      resolve(result);
    })
    .catch(err => {console.log(``)});

  })
}