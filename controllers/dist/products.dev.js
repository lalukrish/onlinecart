"use strict";

var Product = require('../models/product');

exports.getAddProduct = function (req, res, next) {
  res.render("admin/add-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddproduct: true
  });
};

exports.postAddProduct = function (req, res, next) {
  var product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = function (req, res, next) {
  products = Product.fetchAll(function (products) {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};