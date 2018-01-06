//+ DB Setup
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });
mongoose.connect(process.env.DATABASE, {useMongoClient:true});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(err.message);
});

//+ Import models
require('./models/User');
require('./models/Event');

//+ App Setup
const path = require('path');
const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const compression = require('compression');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const errorHandlers = require('./handlers/errorHandlers');
const socketHandlers = require('./handlers/socketHandlers');
const helpers = require('./helpers');

//+ Socket Listener
socketHandlers.startListener(io);

//+ Middlewares
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//+ Webpack
if (app.get('env') === 'development') {
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackDevConfig = require('./client/webpack.dev.config');
  var compiler = webpack(webpackDevConfig);
  app.use(webpackDevMiddleware(compiler, {
      publicPath: webpackDevConfig.output.publicPath,
      stats: {colors: true}
  }));
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.use(compression());
}

//+ Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  key: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

//+ Default Middleware
app.use(flash());
const moment = require('moment');
app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  res.locals.h = helpers;
  next();
});

//+ Routes
var routes = require('./routes/index');
app.use('/', routes);

//+ 404 Errors
app.use(errorHandlers.notFound);

// Serious Errors
if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}
app.use(errorHandlers.productionErrors);

// Start Server
const serverPort = 3420;
http.listen(serverPort, function(){
  console.log(chalk.cyan(`qqbot started @ http://localhost:${serverPort}`));
});

// Start Jobs
const agenda = require('./jobs/agenda');
const irc = require('./jobs/irc');
agenda.run();
irc.run();

// Testing