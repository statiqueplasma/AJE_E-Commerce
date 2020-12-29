var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Orders = new Schema({
    user: {type:String, required: true},
    adress: {type:String, required: true},
    payement_id: {type:String, required: true},
    item_id: {type:String, required: true},
    date: {type: Date, default: Date.now().toLocaleString()},
    status: {type:String, required: true},
});



const orders = mongoose.model('product', Orders);
module.exports = {orders:orders};