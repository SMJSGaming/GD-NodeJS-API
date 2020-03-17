/**
 * @class
 * @public
 * @author SMJS
 * @name DocumentationController
 * @typedef {Object} DocumentationController
 */
module.exports = class DocumentationController {

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
     * @name ParamsToRoute
     */
    ParamsToRoute = new (require("../converters/documentation/ParamsToRoute"));

    /**
     * @private
     * @type {Object}
     * @name DocumentationIndexService
     */
    DocumentationIndexService = new (require("../services/documentation/DocumentationIndexService"));

    /**
     * @private
     * @type {Object}
     * @name DocumentationDataService
     */
    DocumentationDataService = new (require("../services/documentation/DocumentationDataService"))

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method controller
     * @summary endpoint listener initializer
     * @description endpoints:
     * /api/docs,
     * /api/docs/{navigation},
     * /api/docs/res/{navigation}
     * @param {Object} app The express app with all the necessary methods to use the controllers
     * @param {Object} globalData An object containing all the values and methods the application needs
     */
    controller(app, globalData) {
        const classObject = this;

        app.all(this.UrlToGlobalUrlArray.converter("/api/docs"), (req, res) => {
            const params = classObject.UrlToParams.converter(req.params);
            let route = classObject.ParamsToRoute.converter(params);

            if (params[0] == "res") {
                params.shift();
                route = route.replace("/res", "");
                if (params[0]) {
                    classObject.DocumentationDataService.service(route).then((response) => {
                        res.status(response[0]).type("html").send(response[1]);
                    });
                }
            } else {
                classObject.DocumentationIndexService.service(params).then((response) => {
                    res.status(response[0]).type("html").send(response[1]);
                }).catch((error) => {
                    globalData.errorFunc(error, "docs", globalData);
                    res.status(500).type("html").send("<center><h1>INTERNAL SERVER ERROR 500</h1></center>");
                });
            }
        });
    }
}