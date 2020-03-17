/**
 * @class
 * @public
 * @author SMJS
 * @name GdEndpointsController
 * @typedef {Object} GdEndpointsController
 */
module.exports= class GdEndpointsController {

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
     * @name GdEndpointIndexService
     */
    GdEndpointIndexService = new (require("../services/gdEndpoint/GdEndpointIndexService"));

    /**
     * @private
     * @type {Object}
     * @name GdEndpointDataService
     */
    GdEndpointDataService = new (require("../services/gdEndpoint/GdEndpointDataService"));

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method controller
     * @summary endpoint listener initializer
     * @description endpoints:
     * /api/endpoint,
     * /api/endpoint/{type}/{values}
     * @param {Object} app The express app with all the necessary methods to use the controllers
     * @param {Object} globalData An object containing all the values and methods the application needs
     */
    controller(app, globalData) {
        const classObject = this;

        app.all(this.UrlToGlobalUrlArray.converter("/api/endpoint"), (req, res) => {
            const params = classObject.UrlToParams.converter(req.params);
            if (params[0]) {
                classObject.GdEndpointDataService.service(params, globalData).then((response) => {
                    res.status(response[0]).type("json").send(JSON.stringify(response[1], null, 2));
                });
            } else {
                classObject.GdEndpointIndexService.service(globalData).then((response) => {
                    res.status(response[0]).type("html").send(response[1]);
                });
            }
        });
    }
}