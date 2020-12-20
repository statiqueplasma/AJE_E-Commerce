var express = require('express');
var router = express.Router();
var Product = require('../models/products');

require('dotenv/config');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("connected to db again!");
});


/* GET home page. */
router.get('/', async function (req, res, next) {
  const products = await Product.find();
  // res.json(products);
  res.render('index', { title: 'Express', products: products });

});

module.exports = router;
