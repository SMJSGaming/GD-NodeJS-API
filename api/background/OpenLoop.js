/**
 * @class
 * @public
 * @author SMJS
 * @name OpenLoop
 * @typedef {Object} OpenLoop 
 */
module.exports = class OpenLoop {

    /**
     * @public
     * @type {OpenLoop}
     * @name INSTANCE
     */
    static INSTANCE;

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method constructor
     * @summary The class constructor @see OpenLoop
     * @param {Object} [globalData={}] An object containing all the values and methods the application needs
     */
    constructor(globalData = {}) {
        if (OpenLoop.INSTANCE) {
            return OpenLoop.INSTANCE;
        } else {
            Object.keys(globalData.graphEntries).forEach((key) => {
                if (globalData.config.settings.endpoints
                    [`enable${globalData.graphEntries[key].settingsName}Endpoint`]) {
                    this[key] = 
                        new (require(`../services/${globalData.graphEntries[key].baseClass}.js`));
                }
            });

            OpenLoop.INSTANCE = this;
        }
    }

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method init
     * @summary The initializer method
     * @description The loop initializer which will activate every 6 minutes and time test all services which are activated 
     * @param {Object} globalData An object containing all the values and methods the application needs
     */
    init(globalData) {
        setInterval(() => {
            Object.keys(globalData.graphEntries).forEach((key) => {
                if (globalData.config.settings.endpoints
                    [`enable${globalData.graphEntries[key].settingsName}Endpoint`]) {
                    OpenLoop.INSTANCE.timeTest(globalData.graphEntries[key], key).then((time) => {
                        globalData.graphEntries[key].data.shift();
                        globalData.graphEntries[key].data[9] = time;
                    });
                }
            });
        }, 360000);
    }

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method timeTest
     * @summary The time test method 
     * @description The test method which will set a start time, request the service, awaits the response and does a delta calculation on the time afterwards and returns the result
     * @param {Object} testPart The test info from the @see globalData
     * @param {String} key The service to test
     * @returns {Promise<Number>} The response time
     */
    timeTest(testPart, key) {
        return new Promise((resolve) => {
            let time = Date.now();

            if (testPart.async) {
                OpenLoop.INSTANCE[key].service(
                    testPart.testData[0],
                    testPart.testData[1],
                    testPart.testData[2]
                ).then(() => {
                    resolve(Date.now() - time);
                });
            } else {
                OpenLoop.INSTANCE[key].service(
                    testPart.testData[0],
                    testPart.testData[1],
                    testPart.testData[2]
                );
                resolve(Date.now() - time);
            }
        });
    }
}