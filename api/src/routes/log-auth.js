const express = require('express');
const router = express.Router();

const passport = require('passport');


//--------------------------------------------------------------------------------
//----Estas rutas pedia rendrizar un archivo de views -> innecesario y eliminado
// router.get('/', (req, res, next) => {
//   res.render('index'); //<-- este index era de views
// });

// router.get('/register', (req, res, next) => {
//   res.render('register'); //<-- este register era de views
// });

// router.get('/login', (req, res, next) => {
//   res.render('login'); //<-- este login era de views
// });
// igual lo dejo comentado por si sirve de algo
//-------------------------------------------------------------------------------

router.post('/register', passport.authenticate('local-register', {
  successRedirect: '/profile',
  failureRedirect: '/register',
  passReqToCallback: true
}));



router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: 'login',
  passReqToCallback: true
}));


//--- rutas autenticadas---------------
router.use((req, res, next)=>{
  isAuthenticated(req, res, next);
  next();
});

router.get('/logout', (req, res, next) => {
  req.logOut();
  res.redirect('/');
});

//--------Esta ruta estaba puesta aca porque estaba autenticada--------------
// router.get('/profile', (req, res, next) => {
//   res.render('profile');                 //<-- este profile era de views
// });     
//esto era para que solo puedas entrar a la pagina de perfil si estas logeado
//---------------------------------------------------------------------------


//----funcion de autenticacion
function isAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
};

module.exports = router;