/**
 * @class
 * @public
 * @author SMJS
 * @name LowerCaseWordToTitleWord
 * @typedef {Object} LowerCaseWordToTitleWord
 */
module.exports = class LowerCaseWordToTitleWord {

    /**
     * @private
     * @type {LowerCaseWordToTitleWord}
     * @name INSTANCE
     */
    static INSTANCE;

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method constructor
     * @summary The class constructor @see LowerCaseWordToTitleWord
     */
    constructor() {
        if (!LowerCaseWordToTitleWord.INSTANCE) {
            LowerCaseWordToTitleWord.INSTANCE = this;
        }
        return LowerCaseWordToTitleWord.INSTANCE;
    }

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method converter
     * @param {String} word
     * @returns {String}
     */
    converter(word) {
        return word.replace(/^\w/, c => c.toUpperCase()).replace(".md", "");
    }
}