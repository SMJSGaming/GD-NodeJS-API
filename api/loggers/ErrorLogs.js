/**
 * @class
 * @public
 * @author SMJS
 * @name ErrorLogs
 * @typedef {Object} ErrorLogs
 */
module.exports = class ErrorLogs {

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method init
     * @summary The main method which will report an error
     * @description The init method where all the main web app config is located and where the web app is started
     * @param {String} error The error message
     * @param {String} section The API section where the error occurred 
     * @param {Object} globalData An object containing all the values and methods the application needs
     */
    init(error, section, globalData) {
        if (globalData.config.settings.logging.errorLogging) {
            console.error(
                "\n\nError case #%s\nTime of error: %s\nSection: %s\n\x1b[31m%s\x1b[0m",
                globalData.errorCase++,
                Date.now(),
                section,
                error
            );
        }
    }
}