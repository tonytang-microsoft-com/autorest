/**
 *
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 *
 */

package com.microsoft.rest;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;

import java.io.IOException;

/**
 * Exception thrown for an invalid response with custom error information.
 */
public class ServiceException extends Exception {

    /**
     * Information about the associated HTTP request.
     */
    private HttpRequest request;

    /**
     * Information about the associated HTTP response.
     */
    private HttpResponse response;

    /**
     * The HTTP response object, wrapped in a ServiceExceptionModel.
     */
    private ServiceExceptionModel errorModel;

    /**
     * Initializes a new instance of the ServiceException class.
     */
    public ServiceException() {
        super();
    }

    /**
     * Initializes a new instance of the ServiceException class.
     *
     * @param message The exception message.
     */
    public ServiceException(final String message) {
        super(message);
    }

    /**
     * Initializes a new instance of the ServiceException class.
     *
     * @param message the exception message
     * @param cause   exception that caused this exception to occur
     */
    public ServiceException(final String message, final Throwable cause) {
        super(message, cause);
    }

    /**
     * Initializes a new instance of the ServiceException class.
     *
     * @param cause exception that caused this exception to occur
     */
    public ServiceException(final Throwable cause) {
        super(cause);
    }

    /**
     * Gets information about the associated HTTP request.
     *
     * @return the HTTP request
     */
    public HttpRequest getRequest() {
        return request;
    }

    /**
     * Gets information about the associated HTTP response.
     *
     * @return the HTTP response
     */
    public HttpResponse getResponse() {
        return response;
    }

    /**
     * Gets the HTTP response object, wrapped in a ServiceExceptionModel.
     *
     * @return the response object
     */
    public ServiceExceptionModel getErrorModel() {
        return errorModel;
    }

    /**
     * Sets the HTTP request.
     *
     * @param request the HTTP request
     */
    public void setRequest(HttpRequest request) {
        this.request = request;
    }

    /**
     * Sets the HTTP response.
     *
     * @param response the HTTP response
     */
    public void setResponse(HttpResponse response) {
        this.response = response;
    }

    /**
     * Sets the HTTP response object, wrapped in a ServiceExceptionModel.
     *
     * @param errorModel the response object
     */
    public void setErrorModel(ServiceExceptionModel errorModel) {
        this.errorModel = errorModel;
    }
}
