/**
 * @class
 * @public
 * @author SMJS
 * @name TitleWordGenerator
 * @typedef {Object} TitleWordGenerator
 */
module.exports = class TitleWordGenerator {

    /**
     * @private
     * @type {TitleWordGenerator}
     * @name INSTANCE
     */
    static INSTANCE;

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method constructor
     * @summary The class constructor @see TitleWordGenerator
     */
    constructor() {
        if (!TitleWordGenerator.INSTANCE) {
            TitleWordGenerator.INSTANCE = this;
        }
        return TitleWordGenerator.INSTANCE;
    }

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method utility
     * @param {String} word
     * @returns {String}
     */
    utility(word) {
        return word.replace(/^\w/, c => c.toUpperCase()).replace(".md", "");
    }
}