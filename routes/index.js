var express = require('express');
var router = express.Router();
var {product} = require('../models/products');
/* GET home page. */
router.get('/', async function(req, res) {
  var products = await product.find().lean();
    res.render('index', { title: 'Express' , products: products}); 
});

module.exports = router;
