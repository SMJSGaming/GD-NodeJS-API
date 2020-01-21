const xor = require('xor-crypt');
const pako = require('pako');
const textEncoding = require('text-encoding');

module.exports = {
    keys: {
        saveFileXOR: "11"
    },
    XOR: function(xordata, key) {
        let tempString = xor(xordata, key);
        return tempString.substring(0, tempString.length - 1);
    },
    base64: function(base64String) {
        return new Buffer.from(base64String.replace(/-/g, "+").replace(/_/g, "/"), 'base64');
    },
    gzUnzip: function(gzipString) {
        return new Promise((resolve, reject) => {
            try {
                resolve(new textEncoding.TextDecoder("utf-8").decode(pako.inflate(gzipString)));
            } catch(error) {
                throw error;
            }
        });
    }
}