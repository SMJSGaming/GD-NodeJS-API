/**
 * @class
 * @public
 * @author SMJS
 * @name ValueNameDataService
 * @typedef {Object} ValueNameDataService
 */
module.exports = class ValueNameDataService {

    /**
     * @private
     * @type {Object}
     * @name valueForName
     */
    valueForName = require("../../values/valueForName.json");

    /**
     * @private
     * @type {Object}
     * @name UrlNavigationToResponseEntity
     */
    UrlNavigationToResponseEntity = new (require("../../converters/UrlNavigationToResponseEntity"));

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method service
     * @summary The navigation service method
     * @description The service layer in between the data layer and the client layer to convert the url to the right value translations directory
     * @param {String[]} params The url params array as object navigation path
     * @returns {[Number, Object]} The navigated value translation object and response status
     */
    service(params) {
        return this.UrlNavigationToResponseEntity.converter(
            params, this.valueForName);
    }
}