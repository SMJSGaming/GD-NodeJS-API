/**
 * @class
 * @public
 * @author SMJS
 * @name WebAppStart
 * @typedef {Object} WebAppStart
 */
module.exports = class WebAppStart {

    /**
     * @private
     * @type {Object}
     * @name http
     */
    http = require("http");

    /**
     * @private
     * @type {Object}
     * @name express
     */
    express = require("express");

    /**
     * @private
     * @type {Object}
     * @name bodyParser
     */
    bodyParser = require("body-parser");

    /**
     * @private
     * @type {Object}
     * @name useragent
     */
    useragent = require("express-useragent");

    /**
     * @private
     * @type {Object}
     * @name GlobalRequestController
     */
    GlobalRequestController = new (require("./api/controllers/GlobalRequestController"));

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @type {Object}
     * @name controllers 
     * @summary An array containing all controller class objects
     */
    controllers = {
        GdEndpoints: new (require("./api/controllers/GdEndpointController")),
        ValueNames: new (require("./api/controllers/ValueNameController")),
        Documentations: new (require("./api/controllers/DocumentationController")),
        Analytics: new (require("./api/controllers/AnalyticsController")),
        Saves: new (require("./api/controllers/LevelSaveController"))
    };

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method init
     * @summary The web app initializer
     * @description The init method where all the main web app config is located and where the web app is started
     * @param {Object} globalData An object containing all the values and methods the application needs
     */
    init(globalData) {
        // Making the app
        const app = this.express();

        // Setting the max data limit (you really don't need more than this)
        app.use(this.bodyParser.json({limit: "50mb"}));
        app.use(this.bodyParser.urlencoded({limit: "50mb", extended: true}));
        app.use(this.bodyParser.urlencoded({extended: true}));

        // Useragent logger
        app.use(this.useragent.express());

        // Setting the static files address
        app.use(this.express.static("resources/static"));

        // Doing some default actions on a visit
        app.use((req, res, next) => this.GlobalRequestController.controller(globalData, req, next));

        // Since this is only an API for now I will just auto redirect to the docs
        app.all(["/", "/api"], (req, res) => {
            res.redirect("/api/docs");
        });

        // Calling the endpoint visit event listener initializers
        Object.keys(this.controllers).forEach((key) => {
            if (globalData.config.settings.endpoints[`enable${key}Endpoint`]) {
                this.controllers[key].controller(app, globalData);
            }
        });

        // Starting the listener
        const server = this.http.createServer(app);
        server.listen(globalData.config.values.webServer.port || process.env.port);
    }
}