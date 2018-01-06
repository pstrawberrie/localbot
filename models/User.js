const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const userSchema = new mongoose.Schema({
  name: { type: String },
  userID: { type: String },
  userMarriedTo: {type: Array, default: []},
  userDating: {type:Array, default:[]},
  userBestFriend: {type: String},
  userFamily: { type: Array, default:[]},
  userCrushes: {type:Array, default:[]},
  userCrushedBy: {type:Array, default:[]},
  userFriends: {type:Array, default:[]},
  userFriendedBy: {type:Array, default:[]},
  created: { type: Date, default: Date.now },
  lastUpdate: { type: Date, default: Date.now }
});

userSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('User', userSchema);
