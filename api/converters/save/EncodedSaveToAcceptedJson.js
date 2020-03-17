/**
 * @class
 * @public
 * @author SMJS
 * @name EncodedSaveToAcceptedJson
 * @typedef {Object} EncodedSaveToAcceptedJson
 */
module.exports = class EncodedSaveToAcceptedJson {

    /**
     * @public
     * @type {EncodedSaveToAcceptedJson}
     * @name INSTANCE
     */
    static INSTANCE;

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method constructor
     * @summary The class constructor @see EncodedSaveToAcceptedJson
     */
    constructor() {
        if (!EncodedSaveToAcceptedJson.INSTANCE) {
            EncodedSaveToAcceptedJson.INSTANCE = this;
        }
        return EncodedSaveToAcceptedJson.INSTANCE;
    }

    /**
     * @private
     * @type {Object}
     * @name LevelArraysXmlToJson
     */
    LevelArraysXmlToJson = new (require("./LevelArraysXmlToJson"));

    /**
     * @private
     * @type {Object}
     * @name EncodedSaveToXmlString
     */
    EncodedSaveToXmlString = new (require("./EncodedSaveToXmlString"));

    /**
     * @private
     * @type {Object}
     * @name LevelSaveToLevelArray
     */
    LevelSaveToLevelArray = new (require("./LevelSaveToLevelArray"));
    
    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method converter
     * @param {String} data
     * @returns {Object[]}
     */
    converter(data) {
        return EncodedSaveToAcceptedJson.INSTANCE.LevelArraysXmlToJson.converter(
            EncodedSaveToAcceptedJson.INSTANCE.LevelSaveToLevelArray.converter(
                EncodedSaveToAcceptedJson.INSTANCE.EncodedSaveToXmlString.converter(data)));
    }
}