const chalk = require('chalk');
const errorHandlers = require('../handlers/errorHandlers');
const Agenda = require('agenda');
const mongoose = require('mongoose');

//1. Set Up Agenda
const agenda = new Agenda({db:{address:process.env.DATABASE}});
//3. Start Agenda
agenda.on('ready', function() {
  console.log(chalk.gray('-> agenda connected to mongodb'));

  //Cancel all jobs on server start (testing)
  agenda.cancel({}, (err, jobs) => {
    console.log(chalk.red('xxx agenda jobs wiped xxx'));
  });

  // Queue Agenda Jobs
  //agenda.every('1 minute', channelsArr);

  // Start Agenda
  //agenda.start();
});
agenda.on('error', function(err) { //log any errors connecting to agenda db
  console.log('queue failed to connect to agenda!!');
  console.log(err);
});
agenda.on('fail', function(err, job) { //log failed agenda jobs
  console.log('Agenda job "' + job.attrs.name + '" failed!');
  console.log('Error String: ' + err);
});
// Optional: Clear 1-time jobs after they are finished
// agenda.on('complete', function(job) { //clear completed jobs
//   if(job.attrs.name === 'getChannel')
//   job.remove();
// });
function graceful() {
  agenda.stop(function() { process.exit(0); });
}
process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);

//Do the things here
exports.run = () => { agenda.start(); }