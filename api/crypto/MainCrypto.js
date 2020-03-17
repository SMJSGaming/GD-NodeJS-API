/**
 * @class
 * @public
 * @author SMJS
 * @name MainCrypto
 * @typedef {Object} MainCrypto
 */
module.exports = class MainCrypto {

    /**
     * @private
     * @type {MainCrypto}
     * @name INSTANCE
     */
    static INSTANCE;

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method constructor
     * @summary The class constructor @see MainCrypto
     */
    constructor() {
        if (!MainCrypto.INSTANCE) {
            MainCrypto.INSTANCE = this;
        }
        return MainCrypto.INSTANCE;
    }

    /**
     * @private
     * @type {Object}
     * @name pako
     */
    pako = require("pako");

    /**
     * @public
     * @since 0.1.0
     * @version 0.1.0
     * @type {Object}
     * @name keys 
     * @summary The encoding keys for different encodings
     */
    keys = {
        saveFileXOR: "11"
    }

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method xor
     * @summary A simple xor decoder
     * @description A xor decoder which does a simple xor calculation on all bytes 
     * @param {String} xorData The xor data to decode
     * @param {Number} key The decoding key @see keys
     * @returns {String} The decoded string
     */
    xor(xorData, key) {
        return xorData.split("").map(str => String.fromCharCode(key ^ str.charCodeAt(0))).join("");
    }

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method base64
     * @summary A simple base64 decoder
     * @description A base64 decoder which makes it first url unsafe and then generates a base64 buffer
     * @param {String} base64String The base64 data to decode
     * @returns {Buffer} The decoded buffer
     */
    base64(base64String) {
        return Buffer.from(base64String.replace(/-/g, "+").replace(/_/g, "/"), "base64");
    }

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method gzUnzip
     * @summary A simple gzUnzip decoder
     * @description A gzUnzip decoder which uses @see pako and then decodes the buffer to utf-8
     * @param {String} gzipString The gzip data to decode
     * @returns {String} The decoded string
     */
    gzUnzip(gzipString) {
        return new TextDecoder("utf-8").decode(MainCrypto.INSTANCE.pako.inflate(gzipString));
    }
}