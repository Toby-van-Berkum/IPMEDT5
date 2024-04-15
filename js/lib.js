
const apiKey = {
    access: '',
    refresh: '',
}

/**
 * Attaches an event listener to a given button element that triggers a custom function with an API path as argument when clicked.
 * @param {HTMLButtonElement} btn - The button element to attach the event listener to.
 * @param {string} apiPath - The API URL path to be passed as an argument to the custom function.
 * @param {function} func - The custom function to be executed when the button is clicked. It should accept the API path as its argument.
 */
function addApiEvent(btn, apiPath, func) {
    if (btn === null && apiPath === null && func === null) return;
    btn.addEventListener("click", function() {
        func(apiPath);
    });
}

/**
 * Constructs options object for making HTTP requests with specified method, headers, and data.
 * @param {string} method - The HTTP method to be used for the request. Only accepts 'POST', 'GET', 'PUT', or 'DELETE'.
 * @param {Object} headers - The headers to be included in the request.
 * @param {Object} data - The data to be sent with the request, typically used for POST and PUT requests.
 * @returns {Object} - An options object containing method, headers, and optionally body (if data is provided).
 * @throws {Error} - Throws an error if the method provided is not one of 'POST', 'GET', 'PUT', or 'DELETE'.
 */
function makeOptions(method, headers, data) {
    if (!['POST', 'GET', 'PUT', 'DELETE'].includes(method)) 
        throw new Error("Invalid HTTP method. Only 'POST', 'GET', 'PUT', or 'DELETE' are supported.");

    return {
        method: method,
        headers: headers,
        body: JSON.stringify(data)
    };
}

/**
 * Constructs options object for making HTTP requests with specified method, headers, and data.
 * @param {string} method - The HTTP method to be used for the request. Only accepts 'POST', 'GET', 'PUT', or 'DELETE'.
 * @param {Object} headers - The headers to be included in the request.
 * @returns {Object} - An options object containing method, headers, and optionally body (if data is provided).
 * @throws {Error} - Throws an error if the method provided is not one of 'POST', 'GET', 'PUT', or 'DELETE'.
 */
function makeOptionsWithoutBody(method, headers) {
    if (!['POST', 'GET', 'PUT', 'DELETE'].includes(method)) 
        throw new Error("Invalid HTTP method. Only 'POST', 'GET', 'PUT', or 'DELETE' are supported.");

    return {
        method: method,
        headers: headers,
    };
}