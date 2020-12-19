//for routing
const express = require('express');
const filterRouter = express.Router();
require('dotenv/config');

//mongodb
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to db again!");
});

const product = require('../../server/models/Products');

//we use it to read the body of the request
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

//to adjust the query got through the POST request 
//add the min/max and promo conditions (min <= normalPrice - (promo*normalPrice/100) <= max and the ones that have promo)
const adjust = (obj) => {
    const filters = ["gender", "category", "colors"];

    const params = {};

    for (let i = 0; i < 3; i++) {
        if (obj[filters[i]] != undefined) {
            if (typeof (obj[filters[i]]) != "string") {
                var array = obj[filters[i]];
                var tmp = "";
                for (let j = 0; j < array.length - 1; j++) {
                    tmp += array[j] + "|";
                }
                tmp += array[array.length - 1];
                params[filters[i]] = new RegExp(tmp);
            } else {
                params[filters[i]] = obj[filters[i]];
            }
        }

    }

    if (!("promo" in obj)) {
        if (obj.priceRange[0] != "" && obj.priceRange[1] == "") {
            var min = parseInt(obj.priceRange[0]);
            params["normalPrice"] = { $gte: min };
        } else if (obj.priceRange[1] != "" && obj.priceRange[0] == "") {
            var max = parseInt(obj.priceRange[1]);
            params["normalPrice"] = { $lte: max };
        } else if (obj.priceRange[1] != "" && obj.priceRange[0] != "") {
            var min = parseInt(obj.priceRange[0]);
            var max = parseInt(obj.priceRange[1]);
            params["normalPrice"] = {
                $gte: min,
                $lte: max
            };
        }
    }
     else {
        var promo = parseInt(obj.promo);
        if (obj.priceRange[0] != "" && obj.priceRange[1] == "") {
            var min = parseInt(obj.priceRange[0]);
            params["actualPrice"] = { $gte: min };
        } else if (obj.priceRange[1] != "" && obj.priceRange[0] == "") {
            var max = parseInt(obj.priceRange[1]);
            params["actualPrice"] = { $lte: max };
        } else if (obj.priceRange[1] != "" && obj.priceRange[0] != "") {
            var min = parseInt(obj.priceRange[0]);
            var max = parseInt(obj.priceRange[1]);
            params["actualPrice"] = {
                $gte: min,
                $lte: max
            };
        }
    }



    return params;
}


filterRouter.post('/filtered', urlEncodedParser, (req, res) => {

    const params = adjust(req.body);
    console.log(params);
    product.find(params, (err, result) => {
        // console.log(result);
        res.json(result);
    });

});

module.exports = filterRouter;