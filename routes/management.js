var express = require('express');
var router = express.Router();
const multer = require('multer');
var { product } = require('../models/products');
var { categories } = require('../models/products');
var { colors } = require('../models/products');
var { sizes } = require('../models/products');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/gi, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter: fileFilter
});

router.get('/', async function (req, res) {
    var products = await product.find().lean();
    var color = await colors.find().lean();
    var categorie = await categories.find().lean();
    var size = await sizes.find().lean();
    try{res.render('management/management', { colors: color, product: products, categories: categorie, sizes: size });}
    catch(err){
        console.log(err);
    }

});

router.get('/add-item', async function (req, res) {
    var color = await colors.find().lean();
    var categorie = await categories.find().lean();
    var size = await sizes.find().lean();
    res.render('management/add_item', { colors: color, item: new product(), categories: categorie, sizes: size });
});


router.post('/item', upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'pictures' }, { name: 'description' }]), async function (req, res) {
    var pictures = [];
    req.files.pictures.forEach(function (element) {
        arr.push(element.path);
    });
    let item = new product({
        name: req.body.name,
        snippet: req.body.snippet,
        thumbnail: req.file.thumbnail[0].path,
        pictures: pictures,
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
    try {
        item = await item.save();
        //res.redirect(`/items/${item.id}`)
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.render('mangement/add-item', { item: item });
    }


});

router.post('/uploads', function (req, res) {

});

router.delete('/del-item/:id', async function (req, res) {
    await product.findByIdAndDelete(req.params.id);
    res.redirect('/management')
});

router.get('/add-category', function (req, res) {
    res.render('management/add_category');
});

router.post('/category', async function (req, res) {
    let category = new categories({
        name: req.body.name
    });
    await category.save();
    res.redirect('/management');
});

router.delete('/del-cat/:id', async function (req, res) {
    await categories.findByIdAndDelete(req.params.id);
    res.redirect('/management')
});

router.get('/add-size', function (req, res) {
    res.render('management/add_size');
});

router.post('/size', async function (req, res) {
    let size = new sizes({
        name: req.body.name,
        size: req.body.size
    });
    await size.save();
    res.redirect('/management');
});

router.delete('/del-size/:id', async function (req, res) {
    await sizes.findByIdAndDelete(req.params.id);
    res.redirect('/management')
});

router.get('/add-color', function (req, res) {
    res.render('management/add_color', { colors: req.color });
});

router.post('/color', upload.single('picture'), async function (req, res) {
    let color = new colors({
        name: req.body.name,
        picture: req.file.path
    });
    await color.save();
    res.redirect('/management');
});

router.delete('/del-color/:id', async function (req, res) {
    await colors.findByIdAndDelete(req.params.id);
    res.redirect('/management')
});
module.exports = router;