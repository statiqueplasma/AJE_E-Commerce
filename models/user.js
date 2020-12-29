var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = new Schema({
    cart: [{
        product_id: String,
        items: [{
            color: String,
            size: String,
            quantity: Number
        }]
    }]
});



const user = mongoose.model('user', User);
module.exports = { user: user };