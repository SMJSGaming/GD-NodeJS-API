/**
 * @class
 * @public
 * @author SMJS
 * @name AnalyticsController
 * @typedef {Object} AnalyticsController
 */
module.exports = class AnalyticsController {

    /**
     * @private
     * @type {Object}
     * @name UrlToParams
     */
    UrlToParams = new (require("../converters/UrlToParams"));

    /**
     * @private
     * @type {Object}
     * @name UrlToGlobalUrlArray
     */
    UrlToGlobalUrlArray = new (require("../converters/UrlToGlobalUrlArray"));

    /**
     * @private
     * @type {Object}
     * @name AnalyticsDataService
     */
    AnalyticsDataService = new (require("../services/analytics/AnalyticsDataService"));

    /**
     * @private
     * @type {Object}
     * @name AnalyticsIndexService
     */
    AnalyticsIndexService = new (require("../services/analytics/AnalyticsIndexService"))

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method controller
     * @summary endpoint listener initializer
     * @description endpoints:
     * /analytics,
     * /analytics/*,
     * /analytics/data/*
     * @param {Object} app The express app with all the necessary methods to use the controllers
     * @param {Object} globalData An object containing all the values and methods the application needs
     */
    controller(app, globalData) {
        const classObject = this;

        app.all(this.UrlToGlobalUrlArray.converter("/analytics"), (req, res) => {
            const params = classObject.UrlToParams.converter(req.params);

            if (params[0] == "data") {
                this.AnalyticsDataService.service(globalData).then((response) => {
                    res.status(response[0]).type("json").send(response[1]);
                });
            } else {
                this.AnalyticsIndexService.service(globalData).then((response) => {
                    res.status(response[0]).type("html").send(response[1]);
                });
            }
        });
    }
}