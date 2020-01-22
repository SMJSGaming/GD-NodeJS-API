const songs = require('../utils/default values/songs');
const properties = require('../utils/default values/typeProperties');
const valuenames = require('../utils/default values/valueForName');

const arrayUtils = require('../utils/functions/arrayUtils');

const postreq = require('../utils/request/postreq');

const mainCrypto = require('../utils/robCrypto/mainCrypto');

module.exports = {
    "values": {
        songs,
        properties,
        valuenames
    },
    "functions": {
        arrayUtils
    },
    "request": {
        postreq
    },
    "robCrypto": {
        mainCrypto
    }
};