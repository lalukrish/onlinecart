"use strict";

var path = require("path");

var express = require("express"); //const rootDir = require("../util/path");


var adminController = require("../controllers/admin");

var isAuth = require('../middileware/is-auth');

var router = express.Router();
router.get("/add-product", isAuth, adminController.getAddProduct);
router.get("/products-view", isAuth, adminController.getProducts);
router.post("/add-product", isAuth, adminController.postAddProduct);
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);
router.post("/edit-product", isAuth, adminController.postEditProduct);
router.post("/delete-product", isAuth, adminController.postDeleteProduct);
module.exports = router;