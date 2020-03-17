/**
 * @class
 * @public
 * @author SMJS
 * @name EncodedSaveToXml
 * @typedef {Object} EncodedSaveToXml
 */
module.exports = class EncodedSaveToXml {

    /**
     * @public
     * @type {EncodedSaveToXml}
     * @name INSTANCE
     */
    static INSTANCE;

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method constructor
     * @summary The class constructor @see EncodedSaveToXml
     */
    constructor() {
        if (!EncodedSaveToXml.INSTANCE) {
            EncodedSaveToXml.INSTANCE = this;
        }
        return EncodedSaveToXml.INSTANCE;
    }

    /**
     * @private
     * @type {Object}
     * @name MainCrypto
     */
    MainCrypto = new (require("../../crypto/MainCrypto"));

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method converter
     * @param {String} save
     * @returns {String} 
     */
    converter(save) {
        const crypto = EncodedSaveToXml.INSTANCE.MainCrypto;
        return crypto.gzUnzip(
            crypto.base64(
                crypto.xor(
                    crypto.base64(save).toString("utf8"), crypto.keys.saveFileXOR))).toString();
    }
}