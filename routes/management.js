var express = require('express');
var router = express.Router();
var {product} = require('../models/products');
var {categories} = require('../models/products');
var {colors} = require('../models/products');
var {sizes} = require('../models/products');

router.get('/', async function(req, res){
    var products = await product.find().lean();
    var color = await colors.find().lean();
    var categorie = await categories.find().lean();
    var size = await sizes.find().lean();
    res.render('management', {colors: color, product: products, categories: categorie, sizes:size});

});
router.get('/add-item', async function(req, res){
    var color = await colors.find().lean();
    var categorie = await categories.find().lean();
    var size = await sizes.find().lean();
    res.render('add_item', {colors: color, item: new product(), categories: categorie, sizes:size});
});
router.get('/add-category', function(req, res){
    res.render('add_category');
});
router.get('/add-color', function(req, res){
    res.render('add_color');
});
router.get('/add-size', function(req, res){
    res.render('add_size');
});

router.post('/item', async function(req, res){    
    let item = new product({
        name: req.body.name,
        snippet: req.body.snippet,
        thumbnail: req.body.thumbnail,
        pictures: req.body.pictures,
        snippet: req.body.snippet,
        description: req.body.description,
        gender: req.body.gender,
        category: req.body.category,
        colors: req.body.colors,
        sizes: req.body.sizes,
        inStock: req.body.inStock,
        normalPrice: req.body.price,
        promo: req.body.promo
    });
    try{
        item = await item.save();
        //res.redirect(`/items/${item.id}`)
        res.redirect('/');
    }catch(err){
        console.log(err);
        res.render('/mangement/add-item', {item:item});
    }
});
router.post('/category', async function(req, res){
    let category = new categories({
        name: req.body.name
    });
    await category.save();
    res.redirect('/management');
});
router.post('/size', async function(req, res){
    let size = new sizes({
        name: req.body.name
    });
    await size.save();
    res.redirect('/management');
});
router.post('/color', async function(req, res){
    let color = new colors({
        name: req.body.name,
        picture: req.body.picture
    });
    await color.save();
    res.redirect('/management');
});

module.exports = router;