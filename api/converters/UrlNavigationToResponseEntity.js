/**
 * @class
 * @public
 * @author SMJS
 * @name UrlNavigationToResponseEntity
 * @typedef {Object} UrlNavigationToResponseEntity
 */
module.exports = class UrlNavigationToResponseEntity {

    /**
     * @private
     * @type {UrlNavigationToResponseEntity}
     * @name INSTANCE
     */
    static INSTANCE;

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method constructor
     * @summary The class constructor @see UrlToResponseEntity
     */
    constructor() {
        if (!UrlNavigationToResponseEntity.INSTANCE) {
            UrlNavigationToResponseEntity.INSTANCE = this;
        }
        return UrlNavigationToResponseEntity.INSTANCE;
    }

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method converter
     * @param {String[]} params
     * @param {Object} output
     * @returns {[Number, Object]}
     */
    converter(params, output) {
        let objectCheck = {};
        if (params) {
            params.forEach((param) => {
                objectCheck = UrlNavigationToResponseEntity.INSTANCE.caseInsensitiveKeyFind(param, output);
                if (objectCheck) {
                    output = objectCheck;
                } else {
                    if (param) {
                        return [404, {ERROR: "Non existing route"}];
                    }
                }
            });
        }
        return [200, output];
    }

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method converter
     * @param {String} key
     * @param {Object} object
     * @returns {Object}
     */
    caseInsensitiveKeyFind(key, object) {
        return object[Object.keys(object).find(keySearch => keySearch.toLowerCase() == key.toLowerCase())];
    }
}