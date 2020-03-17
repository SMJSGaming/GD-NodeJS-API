/**
 * @class
 * @public
 * @author SMJS
 * @name DocumentationDataService
 * @typedef {Object} DocumentationDataService
 */
module.exports = class DocumentationDataService {

    /**
     * @private
     * @type {Object}
     * @name fs
     */
    fs = require("fs");

    /**
     * @private
     * @type {Object}
     * @name MdToHtml
     */
    MdToHtml = new (require("../../converters/documentation/MdToHtml"));

    /**
     * @async
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method service
     * @summary The base service to generate the documentation page
     * @description The main service layer which using the navigation requests a markdown page and converts it to HTML
     * @param {String[]} route The url navigation string
     * @returns {Promise<[Number, String]>} The converted markdown page and the response status
     */
    service(route) {
        return new Promise((resolve) => {
            this.fs.readFile(route, "utf8", (error, data) => {
                if (error) {
                    resolve([404, "<center><h1>ERROR 404 NOT FOUND</h1><p>This file wasn't found</p></center>"]);
                } else {
                    resolve([200, this.MdToHtml.converter(data)]);
                }
            });
        });
    }
}