const endpoints = require('./../api/endpoints/endpointsMain');
const level = require('./../api/levels/levelMain');
const dataLoadPage = require('./../api/levels/dragAndDropLoad');
const values = require('./../api/valueNames/valuesMain');
const index = require('./../api/indexHandle');

module.exports = function(app) {
    endpoints(app);
    level(app);
    dataLoadPage(app);
    values(app);
    index(app);
}