var express = require('express');
var router = express.Router();
var {product} = require('../models/products');
/* GET home page. */
router.get('/',function(req,res){
  res.redirect('/page/1');
});
router.get('/page/:page', async function(req, res) {
  var products = await product.find({name:'test4'}).lean();
  try{var curpage = req.params.page;
  var numItem = 30;
  var numbPages = Math.trunc(products.length/numItem)+1;
  var pages = {previous:0, current:parseInt(curpage, 10), next:0, numb:numbPages };
  products = products.slice((curpage-1)*numItem, curpage*numItem)
  if(curpage > 1){
    pages.previous= parseInt(curpage, 10) -1;
  }
  if(curpage < numbPages){
    pages.next= parseInt(curpage, 10)+1;
  }
  res.render('index', { title: 'Express' , products: products, pages: pages}); }
  catch(err){
    console.log(err);
  }
});

router.get('/get-item/:id', async function(req,res){
  var products = await product.findById(req.params.id);
  res.send({name:products.name, snippet:products.snippet, colors:products.colors, thumbnail:products.thumbnail, sizes:products.sizes})
});

module.exports = router;
