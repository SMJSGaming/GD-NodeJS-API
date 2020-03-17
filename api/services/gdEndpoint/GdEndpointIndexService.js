/**
 * @class
 * @public
 * @author SMJS
 * @name GdEndpointIndexService
 * @typedef {Object} GdEndpointIndexService
 */
module.exports = class GdEndpointIndexService {

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
     * @private
     * @type {Object}
     * @name endpointProperties
     */
    endpointProperties = require("../../values/endpointProperties.json");

    /**
     * @async
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method service
     * @summary The base service to generate the main body
     * @description The main service layer which generates and saves the main GD endpoint body
     * @param {Object} globalData An object containing all the values and methods the application needs
     * @returns {Promise<[Number, String]>} The HTML page and the response status
     */
    service(globalData) {
        let linkInfo = "";
        return new Promise((resolve) => {
            if (this.output) {
                resolve(this.output);
            } else {
                this.fs.readFile("resources/pages/endpoints/base.html", "utf8", 
                    (error, contents) => {
                    if (error) {
                        globalData.errorFunc(error, "endpoints", globalData);
                        resolve([500, "There was an error while fetching this file."]);
                    } else {
                        Object.keys(this.endpointProperties).forEach((key) => {
                            linkInfo += `<div class='block'>
                                <h2>${key[0].toUpperCase()+key.slice(1)}</h2>
                                <p>
                                    <b>URL: </b>
                                    <a href="/api/endpoint/${this.endpointProperties[key].link}">
                                        ${this.endpointProperties[key].link}
                                    </a>
                                </p>
                            </div>`;
                        });
                        
                        // Once generated this will be used instead of being fully generated again
                        this.output = [200, contents.replace("%body%", linkInfo)];

                        resolve(this.output);
                    }
                });
            }
        });
    }
}