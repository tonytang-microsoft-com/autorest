'use strict';

var util = require('util');

var models = require('./index');

/**
 * @class
 * Initializes a new instance of the FlattenedProduct class.
 * @constructor
 */
function FlattenedProduct() { }

/**
 * Validate the payload against the FlattenedProduct schema
 *
 * @param {JSON} payload
 *
 */
FlattenedProduct.prototype.validate = function (payload) {
  if (!payload) {
    throw new Error('FlattenedProduct cannot be null.');
  }
  if (payload['id'] !== null && payload['id'] !== undefined && typeof payload['id'].valueOf() !== 'string') {
    throw new Error('payload[\'id\'] must be of type string.');
  }

  if (payload['type'] !== null && payload['type'] !== undefined && typeof payload['type'].valueOf() !== 'string') {
    throw new Error('payload[\'type\'] must be of type string.');
  }

  if (payload['tags'] && typeof payload['tags'] === 'object') {
    for(var valueElement in payload['tags']) {
      if (payload['tags'][valueElement] !== null && payload['tags'][valueElement] !== undefined && typeof payload['tags'][valueElement].valueOf() !== 'string') {
        throw new Error('payload[\'tags\'][valueElement] must be of type string.');
      }
    }
  }

  if (payload['location'] !== null && payload['location'] !== undefined && typeof payload['location'].valueOf() !== 'string') {
    throw new Error('payload[\'location\'] must be of type string.');
  }

  if (payload['name'] !== null && payload['name'] !== undefined && typeof payload['name'].valueOf() !== 'string') {
    throw new Error('payload[\'name\'] must be of type string.');
  }

  if (payload['properties']) {
    models['FlattenedProductProperties'].validate(payload['properties']);
  }
};

/**
 * Deserialize the instance to FlattenedProduct schema
 *
 * @param {JSON} instance
 *
 */
FlattenedProduct.prototype.deserialize = function (instance) {
  if (instance) {
    if (instance.properties !== null && instance.properties !== undefined) {
      instance.properties = models['FlattenedProductProperties'].deserialize(instance.properties);
    }
  }
  return instance;
};

module.exports = new FlattenedProduct();
