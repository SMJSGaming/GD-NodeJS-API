module.exports = {
    getObject: function (json, key) {
        return json[Object.keys(json).find(keySearch => keySearch.toLowerCase() == key.toLowerCase())];
    }
}