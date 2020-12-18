var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: { type: String, required: true },    
    thumbnail: { type: String, required: true },
    pictures: { type: [String], required: true },
    snypet: { type: String, required: true },
    description: { type: String, required: true },
    gender: { type: String, required: true },
    category: { type: String, required: true },
    colors: [String],
    rate: { type: Number, default: 0 },
    inStock: { type: Number, default: 0, required: true },
    sold: { type: Number, default: 0 },
    normalPrice: { type: Number, required: true },
    promo: { type: Number, default: 0},
});

var Categories = new Schema({
    name: { type: String, required: true }
});
var Genders = new Schema({
    name: { type: String, required: true }
});
var colors = new Schema({
    name: { type: String },
    picture: { type: String, required: true }
});

module.exports = mongoose.model('product', ProductSchema);
module.exports = mongoose.model('categories', Categories);
module.exports = mongoose.model('genders', Genders);
module.exports = mongoose.model('colors', colors);