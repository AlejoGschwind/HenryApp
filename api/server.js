require('dotenv').config();
const express = require('express');
const engine = require('ejs-mate');
//const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const { DATABASE_URL } = process.env;
const userRoutes = require('./src/routes/users');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require("cors");

//---inicializar
const server = express();
require('./src/passport/local-auth');

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => {
  db.dropDatabase();
  console.log('  🗃  Connected to database!\n  👨‍💻  Have fun! 👩‍💻');
});

//---- configuracion ---
server.engine('ejs', engine);
server.set('view engine', 'ejs');
//---


//--------middlewares
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(cors());
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');
  next();
});
server.use(session({
  secret: 'secretsession',
  resave: false,
  saveUninitialized: false
}));
server.use(flash());
server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next)=>{
  server.locals.registerMessage = req.flash('registerMessage');
  server.locals.loginMessage = req.flash('loginMessage');
  server.locals.user = req.user;
  next();
});




//Rutas
server.use('/users', userRoutes);
app.use('/', require('./src/routes/log-auth'));

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

server.listen(5000, () => {
  console.log('  🚀 Server running on port 5000...');
});
