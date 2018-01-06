module.exports = {

  startListener(io) {
    this.io = io;
    io.on('connection', function(socket) {

      console.log('Socket Client Connected');
      socket.on('disconnect', function(){
        console.log('Socket Client Disconnected');
      });

      socket.on('test', function(json){
        console.log(`test socket came in from front-end:\n${JSON.stringify(json)}`);
      });

    });
  },

  send(eventName, json) {
    json.date = new Date();
    this.io.emit(eventName, json);
  }

}

// Sending a socket from the back end:
//const socket = require('socketHandlers.js');
//socket.send('test', {test:'message'})