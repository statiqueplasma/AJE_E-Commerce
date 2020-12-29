var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: { type: String, required: true },
    thumbnail: { type: String, required: true },
    pictures: { type: [String], required: true },
    snippet: { type: String, required: true },
    description: { type: String, required: true },
    gender: { type: String, required: true },
    category: { type: String, required: true },
    colors: [],
    sizes: [String],
    rate: { type: Number, default: 0 },
    inStock: { type: Number, default: 0, required: true },
    normalPrice: { type: Number, required: true },
    promo: { type: Number, default: 0 },
    sold_price: { type: Number},
    date: { type: Date, default: Date.now() },
    comments: [{ user_id: String, text: String, rate: Number }]
});



var Categories = new Schema({
    name: { type: String, required: true, unique: true }
});

var Sizes = new Schema({
    name: { type: String, required: true, unique: true },
    size: { type: String, required: true }
});

var Colors = new Schema({
    name: { type: String, unique: true },
    picture: { type: String, required: true, unique: true }
});

ProductSchema.pre('validate', async function () {
    if (this.normalPrice && this.promo) {
        this.sold_price = this.normalPrice * (1 - this.promo / 100);
    }
    else(this.sold_price = this.normalPrice);
});

const product = mongoose.model('product', ProductSchema)
const categories = mongoose.model('categories', Categories);
const colors = mongoose.model('colors', Colors);
const sizes = mongoose.model('sizes', Sizes);
module.exports = { product: product, categories: categories, colors: colors, sizes: sizes};


