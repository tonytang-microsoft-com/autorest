'use strict';

var util = require('util');

var models = require('./index');

/**
 * @class
 * Initializes a new instance of the Product class.
 * @constructor
 */
function Product() { }

/**
 * Validate the payload against the Product schema
 *
 * @param {JSON} payload
 *
 */
Product.prototype.validate = function (payload) {
  if (!payload) {
    throw new Error('Product cannot be null.');
  }
  if (util.isArray(payload['displayNames'])) {
    for (var i = 0; i < payload['displayNames'].length; i++) {
      if (payload['displayNames'][i] !== null && payload['displayNames'][i] !== undefined && typeof payload['displayNames'][i].valueOf() !== 'string') {
        throw new Error('payload[\'displayNames\'][i] must be of type string.');
      }
    }
  }

  if (payload['capacity'] !== null && payload['capacity'] !== undefined && typeof payload['capacity'] !== 'number') {
    throw new Error('payload[\'capacity\'] must be of type number.');
  }

  if (payload['image'] !== null && payload['image'] !== undefined && typeof payload['image'].valueOf() !== 'string') {
    throw new Error('payload[\'image\'] must be of type string.');
  }
};

/**
 * Deserialize the instance to Product schema
 *
 * @param {JSON} instance
 *
 */
Product.prototype.deserialize = function (instance) {
  return instance;
};

module.exports = new Product();