var express = require('express');
var router = express.Router();
var Product = require('../models/products');
var csrf = require('csurf');

var csrfProtection =csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  var products = Product.find(function(err, obj){
    res.render('index', { title: 'Express' , products: obj});
  });
  
});
router.get('/user/signup', function(req, res, next) {
  res.render('user/signup', {csrfToken: req.csrfToken()});
});
router.post('/user/signup', function(req, res,next) {
  res.redirect('/');
})
module.exports = router;
