"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.get404 = function (req, res, next) {
  res.status(404).render("404", _defineProperty({
    path: req.originalUrl,
    pageTitle: "page not found"
  }, "path", "/404"));
};