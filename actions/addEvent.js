const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const sock = require('../handlers/socketHandlers');

module.exports = (data, socket) => {

    if(!data) return console.log('no data provided for addEvent()');

    console.log(`got addEvent request\n ${JSON.stringify(data)}`);
    const newEvent = new Event({data});
    newEvent.save();
    if(socket && socket === true) sock.send('event', data);

}