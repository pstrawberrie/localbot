const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const eventSchema = new mongoose.Schema({
  data: { type: Object },
  date: { type: Date, default: Date.now }
});

eventSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('Event', eventSchema);
