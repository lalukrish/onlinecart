"use strict";

// const { render } = require("pug");
var Product = require("../models/product");

exports.getAddProduct = function (req, res, next) {
  res.render("admin/edit-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.postAddProduct = function (req, res, next) {
  var title = req.body.title;
  var imageUrl = req.body.imageUrl;
  var price = req.body.price;
  var description = req.body.description;
  var product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user
  }); //rightil ullath kittuna value add ()nil, leftil ullath dbil yulla schemayude prpt.names..

  product.save().then(function (result) {
    //  console.log(result);
    console.log("created product");
    res.redirect("/admin/products-view");
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getEditProduct = function (req, res, next) {
  var editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  var prodId = req.params.productId;
  Product.findById(prodId) //Product.findByPk(prodId)
  .then(function (product) {
    if (!product) {
      return res.redirect("/");
    }

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product
    });
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.postEditProduct = function (req, res, next) {
  var prodId = req.body.productId;
  var updatedTitle = req.body.title;
  var updatedPrice = req.body.price;
  var updatedImageUrl = req.body.imageUrl;
  var updatedDesc = req.body.description;
  Product.findById(prodId).then(function (product) {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDesc;
    product.imageUrl = updatedImageUrl;
    return product.save();
  }).then(function (result) {
    console.log("UPDATED PRODUCT!");
    res.redirect("/admin/products-view");
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.getProducts = function (req, res, next) {
  Product.find() // .select('title price')
  // .populate('userId')
  .then(function (products) {
    console.log(products);
    res.render("admin/products-view", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products-view" // (1).true anel productsilek add akkan varollu.

    });
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.postDeleteProduct = function (req, res, next) {
  var prodId = req.body.productId; // prodId is NULL; why??

  Product.findByIdAndRemove(prodId).then(function () {
    console.log("DELETED PRODUCT");
    res.redirect("/admin/products-view");
  })["catch"](function (err) {
    return console.log(err);
  });
};