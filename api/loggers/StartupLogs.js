/**
 * @class
 * @public
 * @author SMJS
 * @name StartupLogs
 * @typedef {Object} StartupLogs
 */
module.exports = class StartupLogs {

    /**
     * @private
     * @async
     * @type {Function}
     * @name exec
     */
    exec = require("child_process").exec;

    /**
     * @private
     * @since 0.2.0
     * @version 0.1.0
     * @type {Object}
     * @name dependencies
     * @summary The dependencies used by the program
     */
    dependencies = require("../../package.json").dependencies;

    /**
     * @async
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method init
     * @summary The base analytics constructor service
     * @description The constructing method converting the navigation HTML blocks to the full navigation
     * @param {Object} globalData An object containing all the values and methods the application needs
     */
    async init(globalData) {
        let command = "";
        
        console.log(`\x1b[34mApp started at ${globalData.startDate}\x1b[0m`);
        if (globalData.config.settings.expressWebServer) {
            console.log(`\x1b[32mserver address: http://localhost:${globalData.config.values.webServer.port}\x1b[0m`);
        }
        console.log(`\x1b[33mModules loaded:\n${JSON.stringify(this.dependencies, null, 2)}\x1b[0m`);

        for (let i in Object.keys(this.dependencies)) {
            command += await this.getUpdates(Object.keys(this.dependencies)[i]);
        }
        if (command) {
            console.log(`\x1b[31mRecommended command to run:\n${command}\x1b[0m`);
        }
    }

    /**
     * @async
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method getUpdates
     * @summary The method which checks for updates 
     * @description The command method which checks for all dependencies if there's an update ready
     * @param {String} key The dependency
     */
    getUpdates(key) {
        return new Promise((resolve) => {
            this.exec(`npm outdated ${key}`, (error) => {
                if (error)
                    resolve(`npm update ${key}; `);
                resolve("");
            });
        });
    }
}