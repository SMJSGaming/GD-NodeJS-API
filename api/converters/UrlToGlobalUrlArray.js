/**
 * @class
 * @public
 * @author SMJS
 * @name UrlToGlobalUrlArray
 * @typedef {Object} UrlToGlobalUrlArray
 */
module.exports = class UrlToGlobalUrlArray {

    /**
     * @private
     * @type {UrlToGlobalUrlArray}
     * @name INSTANCE
     */
    static INSTANCE;

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method constructor
     * @summary The class constructor @see UrlToGlobalUrlArray
     */
    constructor() {
        if (!UrlToGlobalUrlArray.INSTANCE) {
            UrlToGlobalUrlArray.INSTANCE = this;
        }
        return UrlToGlobalUrlArray.INSTANCE;
    }

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method converter
     * @param {String} url
     * @returns {String[]}
     */
    converter(url) {
        return [url, `${url}/*`];
    }
}