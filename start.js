/**
 * @private
 * @type {Object}
 * @name fs
 */
const fs = require("fs");

/**
 * @private
 * @type {Object}
 * @name configData
 */
const configData = require("./config.json");

/**
 * @private
 * @type {Object}
 * @name StartupLogs
 */
const StartupLogs = new (require("./api/loggers/StartupLogs"));

/**
 * @private
 * @type {Object}
 * @name WebAppStart
 */
const WebAppStart = require("./WebAppStart");

/**
 * @public
 * @type {Object}
 * @name globalData
 */
const globalData = {
    startDate: Date.now(),
    visits: 0,
    browser: {},
    errorCase: 1,
    errorFunc: new (require("./api/loggers/ErrorLogs"))().init,
    config: configData,
    graphEntries: {
        endpoints: {
            baseClass: "gdEndpoint/GdEndpointDataService",
            settingsName: "GdEndpoints",
            async: true,
            testData: [
                ["daily"],
                {
                    errorCase: 0,
                    errorFunc: new (require("./api/loggers/ErrorLogs"))().init,
                    config: configData
                }
            ],
            data: Array(10).fill(0),
            color: "#A51D38"
        },
        saves: {
            baseClass: "save/SelectiveLevelSaveService",
            settingsName: "Saves",
            async: false,
            testData: [
                {
                    errorCase: 0,
                    errorFunc: new (require("./api/loggers/ErrorLogs"))().init,
                    config: configData
                },
                "",
                0
            ],
            data: Array(10).fill(0),
            color: "#1D3FA5"
        },
        docs: {
            baseClass: "documentation/DocumentationIndexService",
            settingsName: "Documentations",
            async: true,
            testData: [[]],
            data: Array(10).fill(0),
            color: "#27A51D"
        },
        valueNames: {
            baseClass: "valueName/ValueNameDataService",
            settingsName: "ValueNames",
            async: false,
            testData: [""],
            data: Array(10).fill(0),
            color: "#951DA5"
        }
    }
}

/**
 * @private
 * @type {Object}
 * @name OpenLoop
 */
const OpenLoop = new (require("./api/background/OpenLoop"))(globalData);

/**
 * @public
 * @type {String[]}
 * @name args
 */
const args = process.argv

/**
 * @public
 * @since 0.3.0
 * @version 0.1.0
 * @function init
 * @summary The main runner function
 * @description The run function which will start the API and all its dependencies
 */
function run() {
    // Setting test data
    globalData.graphEntries.saves.testData[1] = 
        Buffer.from(fs.readFileSync("testData/CCLocalLevels.dat", "utf8")).toString("base64");
        // Thx for the light save Alten ;)

    // Get all the startup logs
    StartupLogs.init(globalData);

    // Starting loop
    OpenLoop.init(globalData);

    // Giving the launch data and start listening
    if (configData.settings.expressWebServer) {
        (new WebAppStart).init(globalData);
    }
}

/**
 * @public
 * @since 0.3.0
 * @version 0.1.0
 * @function test
 * @summary !in development!
 * @description !in development!
 */
function test() {

}

if (!args[2] || args[2] == "run") {
    run();
} else if (args[2] == "test") {
    test();
}