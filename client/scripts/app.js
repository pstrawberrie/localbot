import $ from 'jquery';
import moment from 'moment';
const socket = io();

// Event Sockets
socket.on('event', function(json) {
  console.log(`Event:\n${JSON.stringify(json)}`);
});

//+ Document Ready Functions
$(document).ready(function() {

  console.log('doc ready');
  
});

