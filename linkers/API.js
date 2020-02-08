const files = [
    require('../api/endpoints/endpointsMain'),
    require('../api/levels/levelMain'),
    require('../api/levels/dragAndDropLoad'),
    require('../api/valueNames/valuesMain'),
    require('../documentation/generateDocs')
];

module.exports = (app) => {
    for (let i in files) {
        files[i](app)
    }
}