const pako = require('pako');

module.exports = {
    keys: {
        saveFileXOR: "11"
    },
    XOR: function(xordata, key) {
        return xordata.split('').map(str => String.fromCharCode(key ^ str.charCodeAt(0))).join('');
    },
    base64: function(base64String) {
        return Buffer.from(base64String.replace(/-/g, "+").replace(/_/g, "/"), 'base64');
    },
    gzUnzip: function(gzipString) {
        try {
            return new TextDecoder("utf-8").decode(pako.inflate(gzipString));
        } catch(error) {
            throw error;
        }
    }
}