var express = require('express');
var router = express.Router();
var {user} = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.post('/add-cart', async function(req, res){
  let newItem = {color: req.body.colors, size: req.body.sizes, quantity:1};
  await user.findById(req.user._id, (err, user) =>{
    var found1 =0;
    for(i=0;i<user.cart.length;i++){
      if(user.cart[i].product_id == req.body.product_id){
        found1 = 1;
        var found =0;
        for(j =0; j<user.cart[i].items.length; j++){
          if((user.cart[i].items[j].color == req.body.colors)&&(user.cart[i].items[j].size == req.body.sizes)){
            user.cart[i].items[j].quantity = user.cart[i].items[j].quantity + 1;
            found =1;
          }
        }
        if(found == 1){
          user.cart[i].items.push(newItem);
        }
      }
    }
    if(found1 == 1){
      user.cart.push({product_id: req.body.product_id, item : [newItem]});
    }
    
  });
  
});

module.exports = router;
