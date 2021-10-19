"use strict";

var Sequelize = require('sequelize');

var sequelize = require('../util/database');

var Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});
module.exports = Cart;