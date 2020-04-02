/**
 * @class
 * @public
 * @author SMJS
 * @name CaseInsensitiveKeyFind
 * @typedef {Object} CaseInsensitiveKeyFind
 */
module.exports = class CaseInsensitiveKeyFind {

    /**
     * @private
     * @type {CaseInsensitiveKeyFind}
     * @name INSTANCE
     */
    static INSTANCE;

    /**
     * @public
     * @since 0.4.0
     * @version 0.1.0
     * @method constructor
     * @summary The class constructor @see CaseInsensitiveKeyFind
     */
    constructor() {
        if (!CaseInsensitiveKeyFind.INSTANCE) {
            CaseInsensitiveKeyFind.INSTANCE = this;
        }
        return CaseInsensitiveKeyFind.INSTANCE;
    }

    /**
     * @public
     * @since 0.4.0
     * @version 0.2.0
     * @method utility
     * @param {String} key
     * @param {Object} object
     * @returns {[Object, String]}
     */
    utility(key, object) {
        const foundKey = Object.keys(object)
                            .find(keySearch => keySearch.toLowerCase() == key.toLowerCase());
        return [object[foundKey], foundKey];
    }
}
