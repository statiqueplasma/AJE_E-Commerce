var express = require('express');
var router = express.Router();
var Product = require('../models/products');
var csrf = require('csurf');
var passport = require ('passport');

var csrfProtection =csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  var products = Product.find(function(err, obj){
    res.render('index', { title: 'Express' , products: obj});
  });
  
});
router.get('/user/signup', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), messages : messages});
});
router.post('/user/signup', passport.anthenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.get('/profile', function(req, res, next) {
  res.render('user/profile');
});

router.get('/user/signin', function(req,res, next) {
  var messages = req.flash('error');
  res.render('user/signin', {csrfToken: req.csrfToken(), messages : messages});
});

router.post('/user/signin', passport.authenticate('local.signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  failureFlash: true
}));

module.exports = router;
