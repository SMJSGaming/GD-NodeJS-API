/**
 * @class
 * @public
 * @author SMJS
 * @name EncodedLevelSaveParametersToJson
 * @typedef {Object} EncodedLevelSaveParametersToJson
 */
module.exports = class EncodedLevelSaveParametersToJson {

    /**
     * @public
     * @type {EncodedLevelSaveParametersToJson}
     * @name INSTANCE
     */
    static INSTANCE;

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method constructor
     * @summary The class constructor @see EncodedLevelSaveParametersToJson
     */
    constructor() {
        if (!EncodedLevelSaveParametersToJson.INSTANCE) {
            EncodedLevelSaveParametersToJson.INSTANCE = this;
        }
        return EncodedLevelSaveParametersToJson.INSTANCE;
    }

    /**
     * @private
     * @type {Object}
     * @name MainCrypto
     */
    MainCrypto = new (require("../../crypto/MainCrypto"));

    /**
     * @private
     * @type {Object}
     * @name LevelDataToJson
     */
    LevelDataToJson = new (require("../level/LevelDataToJson"));

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method converter
     * @param {Object} level 
     */
    converter(level) {
        EncodedLevelSaveParametersToJson.INSTANCE.k4(level);
        EncodedLevelSaveParametersToJson.INSTANCE.k34(level);
        EncodedLevelSaveParametersToJson.INSTANCE.k67(level);
    }

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method k4
     * @param {Object} level 
     */
    k4(level) {
        if (level.k4.startsWith("H4sIAAAAAAAA")) {
            try {
                EncodedLevelSaveParametersToJson.INSTANCE.LevelDataToJson.converter(
                    level, EncodedLevelSaveParametersToJson.INSTANCE.MainCrypto.gzUnzip(
                        EncodedLevelSaveParametersToJson.INSTANCE.MainCrypto.base64(level.k4)).toString());
            } catch(error) {
                level.k4 = "Invalid level string";
                throw error;
            }
        } else {
            EncodedLevelSaveParametersToJson.INSTANCE.LevelDataToJson.converter(level, level.k4);
        }
    }
    
    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method k34
     * @param {Object} level 
     */
    k34(level) {
        let tempArray = [];
        if (level.k34) {
            level.k34 = EncodedLevelSaveParametersToJson.INSTANCE.MainCrypto.gzUnzip(
                EncodedLevelSaveParametersToJson.INSTANCE.MainCrypto.base64(level.k34)).toString();
            if (level.k34) {
                tempArray = level.k34.substring(0, level.k34.length - 1).split(";");
                level.k34 = {};
                for (let i in tempArray) {
                    level.k34[i] = tempArray[i];
                }
            }
        }
    }

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method k67
     * @param {Object} level 
     */
    k67(level) {
        if (level.k67) {
            level.k67 = level.k67.split("_");
        }
    }
}