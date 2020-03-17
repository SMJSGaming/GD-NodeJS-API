/**
 * @class
 * @public
 * @author SMJS
 * @name UrlToParams
 * @typedef {Object} UrlToParams
 */
module.exports = class UrlToParams {

    /**
     * @private
     * @type {UrlToParams}
     * @name INSTANCE
     */
    static INSTANCE;

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method constructor
     * @summary The class constructor @see UrlToParams
     */
    constructor() {
        if (!UrlToParams.INSTANCE) {
            UrlToParams.INSTANCE = this;
        }
        return UrlToParams.INSTANCE;
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
        return (url[0] || "").split("/");
    }
}