/**
 * @class
 * @public
 * @author SMJS
 * @name ValueNameController
 * @typedef {Object} ValueNameController
 */
module.exports = class ValueNameController {

    /**
     * @private
     * @type {Object}
     * @name UrlToGlobalUrlArray
     */
    UrlToGlobalUrlArray = new (require("../converters/UrlToGlobalUrlArray"));

    /**
     * @private
     * @type {Object}
     * @name UrlToParams
     */
    UrlToParams = new (require("../converters/UrlToParams"));

    /**
     * @private
     * @type {Object}
     * @name ValueNamesDataService
     */
    ValueNamesDataService = new (require("../services/valueName/ValueNameDataService"));

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method controller
     * @summary endpoint listener initializer
     * @description endpoints:
     * /analytics,
     * /api/valueNames/{jsonNavigation},
     * @param {Object} app The express app with all the necessary methods to use the controllers
     */
    controller(app) {
        const classObject = this;
        
        app.all(this.UrlToGlobalUrlArray.converter("/api/valueNames"), function(req, res) {
            const response = classObject.ValueNamesDataService.service(classObject.UrlToParams.converter(req.params));
            res.status(response[0]).type("json").send(JSON.stringify(response[1], null, 2));
        });
    }
}