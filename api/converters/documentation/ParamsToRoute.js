/**
 * @class
 * @public
 * @author SMJS
 * @name ParamsToRoute
 * @typedef {Object} ParamsToRoute
 */
module.exports = class ParamsToRoute {

    /**
     * @public
     * @type {ParamsToRoute}
     * @name INSTANCE
     */
    static INSTANCE;

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method constructor
     * @summary The class constructor @see ParamsToRoute
     */
    constructor() {
        if (!ParamsToRoute.INSTANCE) {
            ParamsToRoute.INSTANCE = this;
        }
        return ParamsToRoute.INSTANCE;
    }

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method converter
     * @param {String[]} params
     * @returns {String}
     */
    converter(params) {
        let fileToRead = "resources/docs";
        if (params[0]) {
            for (let i in params) {
                fileToRead += `/${params[i]}`;
            }
        } else {
            fileToRead += "/general/welcome.md";
        }
        return fileToRead;
    }
}