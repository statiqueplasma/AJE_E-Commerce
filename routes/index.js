var express = require('express');
var router = express.Router();
var Product = require('../models/products');
/* GET home page. */
router.get('/', function(req, res, next) {
  var products = Product.find(function(err, obj){
    res.render('index', { title: 'Express' , products: obj});
  });
  
});

module.exports = router;
