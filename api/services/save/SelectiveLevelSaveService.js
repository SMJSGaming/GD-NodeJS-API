/**
 * @class
 * @public
 * @author SMJS
 * @name SelectiveLevelSaveService
 * @typedef {Object} SelectiveLevelSaveService
 */
module.exports = class SelectiveLevelSaveService {

    /**
     * @private
     * @type {Object}
     * @name EncodedSaveToAcceptedJson
     */
    EncodedSaveToAcceptedJson = new (require("../../converters/save/EncodedSaveToAcceptedJson"));

    /**
     * @private
     * @type {Object}
     * @name EncodedLevelSaveParametersToJson
     */
    EncodedLevelSaveParametersToJson = new (
        require("../../converters/save/EncodedLevelSaveParametersToJson"));

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method service
     * @summary The selective level data parser service
     * @description The data service converting encoded levels to an array and then call the right index or parses an already decoded level object 
     * @param {Object} globalData An object containing all the values and methods the application needs
     * @param {String} data The level object or save data
     * @param {Number} index The level index it needs to request
     * @returns {[Number, Object]} The level object and the response status 
     */
    service(globalData, data, index) {
        let outputData;

        try {
            if (data.charAt(0) == "{") {
                outputData = JSON.parse(data);
            } else {
                outputData = this.EncodedSaveToAcceptedJson.converter(data)[index];
            }
            this.EncodedLevelSaveParametersToJson.converter(outputData);
            return [200, outputData];
        } catch(error) {
            globalData.errorFunc(error, "level-save-select", globalData);
            return [400, {"ERROR": "There was an error while decoding your data."}];
        }
    }
}