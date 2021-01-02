var express = require('express');
var router = express.Router();
var Product = require('../models/products');
var csrf = require('csurf');
var passport = require ('passport');

var csrfProtection =csrf();
router.use(csrfProtection);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/', function(req, res, next) {
  var products = Product.find(function(err, obj){
    res.render('index', { title: 'Express' , products: obj});
  });
  
});
router.get('/signup', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), messages : messages});
});
router.post('/signup', passport.anthenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.get('/profile', function(req, res, next) {
  res.render('user/profile');
});

router.get('/signin', function(req,res, next) {
  var messages = req.flash('error');
  res.render('/signin', {csrfToken: req.csrfToken(), messages : messages});
});

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  failureFlash: true
}));


module.exports = router;

function isLoggedIN(req, res , next) {
  if (req.isAuthenticated()) {
    return next ();
  }
  res.redirect('/');
}