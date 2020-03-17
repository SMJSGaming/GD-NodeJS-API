/**
 * @class
 * @public
 * @author SMJS
 * @name AnalyticsIndexService
 * @typedef {Object} AnalyticsIndexService
 */
module.exports = class AnalyticsIndexService {

    /**
     * @private
     * @type {Object}
     * @name fs
     */
    fs = require("fs");

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @type {[Number, String]}
     * @name output
     * @summary The saved output after the first use
     */
    output;

    /**
     * @async
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method service
     * @summary The base analytics constructor service
     * @description The constructing method converting the navigation HTML blocks to the full navigation
     * @param {Object} globalData An object containing all the values and methods the application needs
     * @returns {Promise<[Number, String]>} The analytics page and response status
     */
    service(globalData) {
        return new Promise((resolve) => {
            if (!this.output) {
                this.fs.readFile("resources/pages/analytics/base.html", "utf8", (error, content) => {
                    if (error) {
                        globalData.errorFunc(error, "analytics", globalData);
                        resolve([500, "<center><h1>INTERNAL SERVER ERROR 500</h1></center>"]);
                    }
                    this.output = [200,
                            	   content.replace(`"%REFRESH%"`, globalData.config.values.analytics.refreshRateMs || 2000)
                                          .replace(`"%ROUND%"`, globalData.config.values.analytics.chartRoundOn)
                                          .replace(`"%CLICK%"`, (
                                                (globalData.config.settings.analytics.allowChartInteraction) ? 
                                                    "" : ",onClick: (e) => e.stopPropagation()"))];
                    resolve(this.output);
                });
            } else {
                resolve(this.output);
            }
        });
    }
}