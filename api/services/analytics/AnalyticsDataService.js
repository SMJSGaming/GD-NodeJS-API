/**
 * @class
 * @public
 * @author SMJS
 * @name AnalyticsDataService
 * @typedef {Object} AnalyticsDataService
 */
module.exports = class AnalyticsDataService {

    /**
     * @private
     * @type {Object}
     * @name v8
     */
    v8 = require("v8");
    
    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @type {Number}
     * @name totalMemory
     * @summary The total heap memory limit
     */
    totalMemory = this.v8.getHeapStatistics().heap_size_limit;

    /**
     * @async
     * @private
     * @type {Function}
     * @name timeTest
     */
    timeTest = require("../../background/OpenLoop").INSTANCE.timeTest;

    /**
     * @async
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method service
     * @summary The base analytics data service
     * @description The constructing method converting the navigation HTML blocks to the full navigation
     * @param {Object} globalData An object containing all the values and methods the application needs
     * @returns {Promise<[Number, Object]>} The analytics data and response status
     */
    service(globalData) {
        return new Promise(async (resolve) => {
            const memoryUsage = process.memoryUsage().heapUsed;
            let errorProgress = this.calculateHealth(globalData);
            let keys = Object.keys(globalData.graphEntries);
            let outData = Array(2);
            let eColor = "#418E51";
            let tempI = 0;
    
            if (errorProgress < 0) {
                eColor = "#8E4141";
                if (errorProgress <= -100) {
                    errorProgress = 100;
                } else {
                    errorProgress = Math.abs(errorProgress);
                }
            }

            for (let i in keys) {
                if (globalData.config.settings.endpoints
                    [`enable${globalData.graphEntries[keys[i]].settingsName}Endpoint`]) {
                    try {
                        outData[tempI] = await this.timeTest(globalData.graphEntries[keys[i]], keys[i]);
                    } catch(error) {
                        outData[tempI] = 0;
                        globalData.errorFunc(error, "analytics-base", globalData);
                    }
                    tempI++;
                }
            }

            resolve([200, {
                memoryText: `<p>Memory usage: ${Math.round(memoryUsage / 1024 / 1024 * 100) / 100}Mb</p>`,
                memoryProgress: `<div class="progress">
                        <span style="width: ${Math.round(memoryUsage / (this.totalMemory / 100) * 10) / 10}%"></span>
                        <p>${Math.round(memoryUsage / (this.totalMemory / 100) * 100) / 100}%</p>
                    </div>`,
                errorProgress: `<div class="progress">
                        <span style="width: ${errorProgress}%; background-color: ${eColor}"></span>
                        <p>${this.calculateHealth(globalData)}%</p>
                    </div>`,
                extra: `<p>Visits: ${globalData.visits}</p>
                    <p>Uptime: ${Math.round((Date.now() - globalData.startDate) / 86400000 * 100) / 100} days</p>
                    <p>Total errors: ${globalData.errorCase - 1}</p>`,
                browser: this.generateBrowserInfo(globalData),
                chartData: this.generateChartData(globalData, outData, keys)
            }]);
        });
    }

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method calculateHealth
     * @summary The API health calculation method
     * @description A method calculating the health based on the max errors per 100 visits @see config
     * @param {Object} globalData An object containing all the values and methods the application needs
     * @returns {Number} The current health
     */
    calculateHealth(globalData) {
        const maxErrors = globalData.visits || 1 / 100 * globalData.config.values.analytics.maxErrorsPer100Visits;

        return Math.round(((maxErrors - (globalData.errorCase - 1)) / (maxErrors / 100)) * 10) / 10;
    }

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method generateBrowserInfo
     * @summary The user browser navigation constructor
     * @description This method generates the navigation for all the browsers and browser versions used to visit this API
     * @param {Object} globalData An object containing all the values and methods the application needs
     * @returns {String} The navigation HTML block
     */
    generateBrowserInfo(globalData) {
        let out = "";
        if (globalData.config.settings.analytics.showBrowserVisits) {
            const data = globalData.browser;
            const keys = Object.keys(data);
            let innerKeys;

            for (let i in keys) {
                out += `<span class="tr" onclick="version('${keys[i]}')">
                        <b>${keys[i]}:</b>
                        <p> ${data[keys[i]].visits} visits</p>
                    </span>
                    <span class="browserVersions" id="${keys[i]}">`;
                innerKeys = Object.keys(data[keys[i]].versions);
                for (let j in innerKeys) {
                    out += `<span class="ntr"><b>v${innerKeys[j]}</b><p> ${data[keys[i]].versions[innerKeys[j]]} visits</p></span>`;
                }
                out += "</span>";
            }
        } else {
            out = "denied";
        }
        
        return out;
    }

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method generateChartData
     * @summary The chartData generator
     * @description This method generates the service response time data in the chart format which can be used by the frontend
     * @param {Object} globalData An object containing all the values and methods the application needs
     * @param {Number[]} now The current response times
     * @param {String[]} keys the graph entry keys which need to be given
     * @returns {Object} The chart data object
     */
    generateChartData(globalData, now, keys) {
        let output = [];
        let tempI = 0;

        for (let i in keys) {
            if (globalData.config.settings.endpoints
                [`enable${globalData.graphEntries[keys[i]].settingsName}Endpoint`]) {
                output[tempI] = {
                    label: keys[i],
                    data: [],
                    borderColor: globalData.graphEntries[keys[i]].color
                };
                for (let j in globalData.graphEntries[keys[i]].data) {
                    output[tempI].data[j] = globalData.graphEntries[keys[i]].data[j];
                }
                output[tempI].data.push(now[tempI]);
                tempI++;
            }
        }

        return output;
    }
}