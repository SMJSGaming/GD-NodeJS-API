module.exports = class GlobalRequestController {

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @type {String[]}
     * @name ignoreLinks
     * @summary The links which should not be logged as a visit
     */
    ignoreLinks = [
        "/analytics/data"
    ];

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method controller
     * @summary The controller method
     * @description The base method which makes sure that the url is valid and will go to the next listener
     * @param {Object} globalData An object containing all the values and methods the application needs
     * @param {Object} req The request holding all info needed to inject into @see globalData
     * @param {Function} next The next function which makes sure it will get to the actual request after it's done
     */
    controller(globalData, req, next) {
        if (this.ignoreLinks.indexOf(req.url) == -1) {
            this.addVisits(globalData, req);
        }
        next();
    }

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method addVisits
     * @summary The visit process method
     * @description The method which will inject all data which should be logged into @see globalData
     * @param {Object} globalData An object containing all the values and methods the application needs
     * @param {Object} req The request holding all info needed to inject into @see globalData
     */
    addVisits(globalData, req) {
        globalData.visits++;
        if (!globalData.browser[req.useragent.browser])
            globalData.browser[req.useragent.browser] = {visits: 0, versions: {}};

        globalData.browser[req.useragent.browser].versions[req.useragent.version] =
            globalData.browser[req.useragent.browser].versions[req.useragent.version] + 1 || 1;
        
        globalData.browser[req.useragent.browser].visits++;
    }
}