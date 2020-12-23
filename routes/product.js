var express = require('express');
var router = express.Router();
var {product} = require('../models/products');


/* GET users listing. */
router.get('/', function(req, res) {
  res.render('comment');
});

router.get('/:id', async function(re,res){
  var item = await product.findById(req.params.id);
  res.render('productpage',{item:item});
});

router.post('/add-comment', async function(req, res){

  let comment = {id:req.body.idt, text:req.body.comment, rate: req.body.rate};
  await comments.updateOne(
    { name: req.body.name }, 
    { $push: { comment: comment } });
});

module.exports = router;
