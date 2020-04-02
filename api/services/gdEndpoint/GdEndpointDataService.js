/**
 * @class
 * @public
 * @author SMJS
 * @name GdEndpointDataService
 * @typedef {Object} GdEndpointDataService
 */
module.exports = class GdEndpointDataService {

    /**
     * @private
     * @type {Object}
     * @name http
     */
    http = require("http");

    /**
     * @private
     * @type {Object}
     * @name endpointProperties
     */
    endpointProperties = require("../../values/endpointProperties.json");

    /**
     * @private
     * @type {Object}
     * @name SmallGdResponseToJson
     */
    SmallGdResponseToJson = new (require("../../converters/gdEndpoint/SmallGdResponseToJson"));

    /**
     * @private
     * @type {Object}
     * @name BigResponseToJson
     */
    BigResponseToJson = new (require("../../converters/gdEndpoint/BigResponseToJson"));

    /**
     * @private
     * @type {Object}
     * @name CaseInsensitiveKeyFind
     */
    CaseInsensitiveKeyFind = new (require("../../utilities/CaseInsensitiveKeyFind"));

    /**
     * @async
     * @public
     * @since 0.3.0
     * @version 0.2.0
     * @method service
     * @summary The endpoint data service
     * @description The main service method processing a GD request and calls the response parsers
     * Type info:
     * 0: Default split
     * 1: Multi split
     * 2: Multi data sections
     * 3: Alt misc
     * 4: Without # data
     * 5: Default split with alt misc data
     * 6: Split based on index
     * @param {String[]} params The params array containing all data which needs to go into the post data
     * @param {Object} globalData An object containing all the values and methods the application needs
     * @returns {Promise<[Number, Object]>} The gd response object and the response status
     */
    service(params, globalData) {
        return new Promise((resolve) => {
            let output = {};
            const type = this.CaseInsensitiveKeyFind.utility(params[0] || "", this.endpointProperties)[0];
            // Setting valid property or gauntlets since daily requires no params
            if (!type) {
                resolve([404, Object.keys(this.endpointProperties)]);
            }

            // Checking if too many leaderboards entries are requested and converting a number param to a valid type
            if (params[0] == "leaderboard") {
                if (parseInt(params[1])) {
                    if (parseInt(params[1]) > 10000) {
                        resolve([400, {"ERROR":"Too much to request"}]);
                    } else {
                        if (parseInt(params[2]) == 2) {
                            params[2] = "creators";
                        } else if (params[2] != "creators") {
                            params[2] = "top";
                        }
                    }
                } else {
                    resolve([400, {"ERROR":"Invalid request"}]);
                }
            }

            this.postRequest(this.setValue(type.post, params), type.url, globalData).then((data) => {
                if (parseInt(data) >= 0 && data != "") {
                    if (type.type.indexOf(0) != -1 || type.type.indexOf(5) != -1 || type.type.indexOf(6) != -1) {
                        // type 0, 5, 6
                        this.SmallGdResponseToJson.converter(data, type, output);
                    } else {
                        // type 1-4
                        output = [];
                        this.BigResponseToJson.converter(data, type, output);
                    }
                    resolve([200, output]);
                } else {
                    resolve([404, {"ERROR":"Not found"}]);
                }
            }).catch((error) => {
                globalData.errorFunc(error, "gdEndpoint-request", globalData);
                resolve([400, {"ERROR":"Bad request"}]);
            });
        });
    }

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method setValue
     * @summary A simple query template formatter
     * @description A query constructor which will replace all value{Number} with the right value
     * @param {String} post The post query template
     * @param {String[]} params The params which should be mixed into the post template
     * @returns {String} The properly formatted post query
     */
    setValue(post, params) {
        let dar = post.split("=value");
        let output = dar.shift();
        dar.forEach((list) => output += `=${params[list.charAt(0)] || 0}${list.substring(1)}`);
        return output;
    }

    /**
     * @async
     * @private
     * @since 0.3.0
     * @version 0.2.0
     * @summary The post request method to extract the GD data
     * @description A request method sending a post request with the data to the GD servers and returning the data
     * @param {String} params The post query
     * @param {String} endpoint The endpoint which should be requested
     * @returns {Promise<String>} The gd endpoint response (or error)
     */
    postRequest(params, endpoint, globalData) {
        return new Promise((resolve, reject) => {
            const options = {
                host: globalData.config.values.endpoints.targetServer,
                port: 80,
                path: `/database/${endpoint}`,
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Content-Length": Buffer.byteLength(params)
                }
            };
            const req = this.http.request(options, (res) => {
                res.setEncoding("utf8");
                res.on("data", (chunk) => {
                    resolve(chunk);
                });
                res.on("error", (error) => {
                    reject(error);
                });
            });

            req.write(params);
            req.end();
        });
    }
}