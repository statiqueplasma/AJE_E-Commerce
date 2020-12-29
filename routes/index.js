var express = require('express');
var router = express.Router();

var { product } = require('../models/products');

const adjust = (obj) => {
  const params = {};

  if ("gender" in obj) {
    params["gender"] = obj["gender"];
  }

  if ("categories" in obj) {
    if (typeof (obj["categories"]) == "string") {
      params["category"] = obj["categories"]
    } else {
      var l = obj["categories"].length - 1
      var category = "";
      for (let i = 0; i < l; i++) {
        category += obj["categories"][i] + "|";
      }
      category += obj["categories"][l];
      params["category"] = new RegExp(category);;
    }
  }

  //THIS IS COMMENTED CAUSE THE DATABASE DOESN'T HAVE SIZES YET
  // if ("sizes" in obj) {
  //   if (typeof (obj["sizes"]) == "string") {
  //     params["sizes"] = obj["sizes"]
  //   } else {
  //     var l = obj["sizes"].length - 1;
  //     var size = "";
  //     for (let i = 0; i < l; i++) {
  //       size += obj["sizes"][i] + "|";
  //     }
  //     size += obj["sizes"][l];
  //     params["sizes"] =new RegExp(size);
  //   }
  // }


  if ("rating" in obj) {
    minRating = parseInt(obj["rating"])
    params["rate"] = { $gte: minRating };
  }

  // Sold_price ??????
  var min = parseInt(obj.range_1), max = parseInt(obj.range_2);
  params["normalPrice"] = {
    $gte: min,
    $lte: max
  };

  return params;
}


/* GET home page. */
router.get('/', function (req, res) {
  res.redirect('/page/1');
});
router.get('/page/:page', async function (req, res) {
  var products = await product.find().lean();
  try {
    var curpage = req.params.page;
    var numItem = 30;
    var numbPages = Math.trunc(products.length / numItem) + 1;
    var pages = { previous: 0, current: parseInt(curpage, 10), next: 0, numb: numbPages };
    products = products.slice((curpage - 1) * numItem, curpage * numItem)
    if (curpage > 1) {
      pages.previous = parseInt(curpage, 10) - 1;
    }
    if (curpage < numbPages) {
      pages.next = parseInt(curpage, 10) + 1;
    }
    res.render('index', { title: 'Express', products: products, pages: pages });
  }
  catch (err) {
    console.log(err);
  }
});


router.post('/', (req, res) => {
  if ("search" in req.body) {
    var keywords = new RegExp(req.body["search"].replace(/ /g, "|"));
    product.find({
      $or: [
        { gender: keywords },
        { category: keywords },
        { colors: keywords },
        { name: keywords },
        { snippet: keywords },
        { description: keywords }
      ]
    }, "colors category").lean().exec((err, products) => {
      res.render('index', { title: 'Express', products: products });
    })

  } else {
    var queryParams = adjust(req.body);
    console.log(queryParams)
    product.find(queryParams).lean().exec((err, products) => {
      if (err) {
        res.send(err)
      } else {
        //DISPLAY THE ITEMS IN PAGES
        res.render('index', { title: 'Express', products: products });
        // var curpage = req.params.page;
        // var numItem = 30;
        // if (data.length > numItem) {
        //   var numbPages = Math.trunc(data.length / numItem) + 1;
        //   var pages = { previous: 0, current: parseInt(curpage, 10), next: 0, numb: numbPages };
        //   data = data.slice((curpage - 1) * numItem, curpage * numItem)
        //   if (curpage > 1) {
        //     pages.previous = parseInt(curpage, 10) - 1;
        //   }
        //   if (curpage < numbPages) {
        //     pages.next = parseInt(curpage, 10) + 1;
        //   }
        //   res.render('index', { title: 'Express', products: data, pages: pages });
        // } else {
        //   res.render('index', { title: 'Express', products: data, pages: pages });
        // }

      };
    })
  }
});

module.exports = router;
