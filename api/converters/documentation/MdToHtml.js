/**
 * @class
 * @public
 * @author SMJS
 * @name MdToHtml
 * @typedef {Object} MdToHtml
 */
module.exports = class MdToHtml {

    /**
     * @public
     * @type {MdToHtml}
     * @name INSTANCE
     */
    static INSTANCE;

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method constructor
     * @summary The class constructor @see MdToHtml
     */
    constructor() {
        if (!MdToHtml.INSTANCE) {
            MdToHtml.INSTANCE = this;
        }
        return MdToHtml.INSTANCE;
    }

    /**
     * @private
     * @type {Object}
     * @name showdown
     */
    showdown = new (require("showdown")).Converter();

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method converter
     * @param {String} md
     * @returns {String}
     */
    converter(md) {
        return MdToHtml.INSTANCE.showdown.makeHtml(md);
    }
}