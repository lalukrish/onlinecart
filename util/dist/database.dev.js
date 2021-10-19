"use strict";

var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var _db;

var mongoConnect = function mongoConnect(callback) {
  MongoClient.connect('mongodb+srv://user_user-_123:user_user-_123@cluster0.aqzbj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(function (client) {
    console.log('connected');
    _db = client.db();
    callback();
  })["catch"](function (err) {
    console.log(err);
    throw err;
  });
};

var getDb = function getDb() {
  if (_db) {
    return _db;
  }

  throw 'No database found!!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;