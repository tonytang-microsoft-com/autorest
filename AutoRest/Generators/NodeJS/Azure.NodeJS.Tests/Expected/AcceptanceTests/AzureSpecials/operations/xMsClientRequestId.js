// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for
// license information.
// 
// Code generated by Microsoft (R) AutoRest Code Generator 0.11.0.0
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.


'use strict';

var util = require('util');
var msRest = require('ms-rest');
var msRestAzure = require('ms-rest-azure');
var ServiceClient = msRest.ServiceClient;
var WebResource = msRest.WebResource;

var models = require('../models');

/**
 * @class
 * XMsClientRequestId
 * __NOTE__: An instance of this class is automatically created for an
 * instance of the AutoRestAzureSpecialParametersTestClient.
 * Initializes a new instance of the XMsClientRequestId class.
 * @constructor
 *
 * @param {AutoRestAzureSpecialParametersTestClient} client Reference to the service client.
 */
function XMsClientRequestId(client) {
  this.client = client;
}

/**
 * Get method that overwrites x-ms-client-request header with value
 * 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
 * @param {object} [options]
 *
 * @param {object} [options.customHeaders] headers that will be added to
 * request
 *
 * @param {function} callback
 *
 * @returns {Stream} The Response stream
 */
XMsClientRequestId.prototype.get = function (options, callback) {
  var client = this.client;
  if(!callback && typeof options === 'function') {
    callback = options;
    options = null;
  }
  if (!callback) {
    throw new Error('callback cannot be null.');
  }
  // Validate
  try {
    if (this.client.acceptLanguage !== null && this.client.acceptLanguage !== undefined && typeof this.client.acceptLanguage.valueOf() !== 'string') {
      throw new Error('this.client.acceptLanguage must be of type string.');
    }
  } catch (error) {
    return callback(error);
  }

  // Construct URL
  var requestUrl = this.client.baseUri + 
                   '//azurespecials/overwrite/x-ms-client-request-id/method/';
  var queryParameters = [];
  if (queryParameters.length > 0) {
    requestUrl += '?' + queryParameters.join('&');
  }
  // trim all duplicate forward slashes in the url
  var regex = /([^:]\/)\/+/gi;
  requestUrl = requestUrl.replace(regex, '$1');

  // Create HTTP transport objects
  var httpRequest = new WebResource();
  httpRequest.method = 'GET';
  httpRequest.headers = {};
  httpRequest.url = requestUrl;
  // Set Headers
  httpRequest.headers['x-ms-client-request-id'] = msRestAzure.generateUuid();
  if (this.client.acceptLanguage !== null) {
    httpRequest.headers['accept-language'] = this.client.acceptLanguage;
  }
  if(options) {
    for(var headerName in options['customHeaders']) {
      if (options['customHeaders'].hasOwnProperty(headerName)) {
        httpRequest.headers[headerName] = options['customHeaders'][headerName];
      }
    }
  }
  httpRequest.headers['Content-Type'] = 'application/json; charset=utf-8';
  httpRequest.body = null;
  httpRequest.headers['Content-Length'] = 0;
  // Send Request
  return client.pipeline(httpRequest, function (err, response, responseBody) {
    if (err) {
      return callback(err);
    }
    var statusCode = response.statusCode;
    if (statusCode !== 200) {
      var error = new Error(responseBody);
      error.statusCode = response.statusCode;
      error.request = httpRequest;
      error.response = response;
      if (responseBody === '') responseBody = null;
      var parsedErrorResponse;
      try {
        parsedErrorResponse = JSON.parse(responseBody);
        error.body = parsedErrorResponse;
        if (error.body !== null && error.body !== undefined) {
          error.body = client._models['ErrorModel'].deserialize(error.body);
        }
      } catch (defaultError) {
        error.message = util.format('Error "%s" occurred in deserializing the responseBody - "%s" for the default response.', defaultError, responseBody);
        return callback(error);
      }
      return callback(error);
    }
    // Create Result
    var result = new msRest.HttpOperationResponse();
    result.request = httpRequest;
    result.response = response;
    if (responseBody === '') responseBody = null;
    result.requestId = response.headers['x-ms-request-id'];

    return callback(null, result);
  });
};

/**
 * Get method that overwrites x-ms-client-request header with value
 * 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
 * @param {String} xMsClientRequestId This should appear as a method parameter, use value '9C4D50EE-2D56-4CD3-8152-34347DC9F2B0'
 *
 * @param {object} [options]
 *
 * @param {object} [options.customHeaders] headers that will be added to
 * request
 *
 * @param {function} callback
 *
 * @returns {Stream} The Response stream
 */
XMsClientRequestId.prototype.paramGet = function (xMsClientRequestId, options, callback) {
  var client = this.client;
  if(!callback && typeof options === 'function') {
    callback = options;
    options = null;
  }
  if (!callback) {
    throw new Error('callback cannot be null.');
  }
  // Validate
  try {
    if (xMsClientRequestId === null || xMsClientRequestId === undefined || typeof xMsClientRequestId.valueOf() !== 'string') {
      throw new Error('xMsClientRequestId cannot be null or undefined and it must be of type string.');
    }
    if (this.client.acceptLanguage !== null && this.client.acceptLanguage !== undefined && typeof this.client.acceptLanguage.valueOf() !== 'string') {
      throw new Error('this.client.acceptLanguage must be of type string.');
    }
  } catch (error) {
    return callback(error);
  }

  // Construct URL
  var requestUrl = this.client.baseUri + 
                   '//azurespecials/overwrite/x-ms-client-request-id/via-param/method/';
  var queryParameters = [];
  if (queryParameters.length > 0) {
    requestUrl += '?' + queryParameters.join('&');
  }
  // trim all duplicate forward slashes in the url
  var regex = /([^:]\/)\/+/gi;
  requestUrl = requestUrl.replace(regex, '$1');

  // Create HTTP transport objects
  var httpRequest = new WebResource();
  httpRequest.method = 'GET';
  httpRequest.headers = {};
  httpRequest.url = requestUrl;
  // Set Headers
  httpRequest.headers['x-ms-client-request-id'] = msRestAzure.generateUuid();
  if (xMsClientRequestId !== null) {
    httpRequest.headers['x-ms-client-request-id'] = xMsClientRequestId;
  }
  if (this.client.acceptLanguage !== null) {
    httpRequest.headers['accept-language'] = this.client.acceptLanguage;
  }
  if(options) {
    for(var headerName in options['customHeaders']) {
      if (options['customHeaders'].hasOwnProperty(headerName)) {
        httpRequest.headers[headerName] = options['customHeaders'][headerName];
      }
    }
  }
  httpRequest.headers['Content-Type'] = 'application/json; charset=utf-8';
  httpRequest.body = null;
  httpRequest.headers['Content-Length'] = 0;
  // Send Request
  return client.pipeline(httpRequest, function (err, response, responseBody) {
    if (err) {
      return callback(err);
    }
    var statusCode = response.statusCode;
    if (statusCode !== 200) {
      var error = new Error(responseBody);
      error.statusCode = response.statusCode;
      error.request = httpRequest;
      error.response = response;
      if (responseBody === '') responseBody = null;
      var parsedErrorResponse;
      try {
        parsedErrorResponse = JSON.parse(responseBody);
        error.body = parsedErrorResponse;
        if (error.body !== null && error.body !== undefined) {
          error.body = client._models['ErrorModel'].deserialize(error.body);
        }
      } catch (defaultError) {
        error.message = util.format('Error "%s" occurred in deserializing the responseBody - "%s" for the default response.', defaultError, responseBody);
        return callback(error);
      }
      return callback(error);
    }
    // Create Result
    var result = new msRest.HttpOperationResponse();
    result.request = httpRequest;
    result.response = response;
    if (responseBody === '') responseBody = null;
    result.requestId = response.headers['x-ms-request-id'];

    return callback(null, result);
  });
};


module.exports = XMsClientRequestId;
