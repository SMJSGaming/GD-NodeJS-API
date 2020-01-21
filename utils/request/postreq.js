const request = require('request');
const queryString = require('query-string');

module.exports = function (params, endpoint) {
    return new Promise(function (resolve, reject) {
        request.post('http://boomlings.com/database/' + endpoint, {
            form: queryString.parse(params)
        }, (error, res, body) => {
            if (error) {
                reject(error);
            }
            resolve(body);
        });
    });
}