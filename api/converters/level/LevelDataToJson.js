/**
 * @class
 * @public
 * @author SMJS
 * @name LevelDataToJson
 * @typedef {Object} LevelDataToJson
 */
module.exports = class LevelDataToJson {

    /**
     * @public
     * @type {LevelDataToJson}
     * @name INSTANCE
     */
    static INSTANCE;

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method constructor
     * @summary The class constructor @see LevelDataToJson
     */
    constructor() {
        if (!LevelDataToJson.INSTANCE) {
            LevelDataToJson.INSTANCE = this;
        }
        return LevelDataToJson.INSTANCE;
    }

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method converter
     * @param {Object} json
     * @param {String} data
     */
    converter(json, data) {
        let tempArray = [{}];
        let tempJson = {};

        // Splitting color and object data
        tempArray = data.split("|,");
        // Splitting global variables and values
        tempArray[0] = tempArray[0].split(",");
        // Splitting the colors
        tempArray[0][1] = tempArray[0][1].split("|");
        tempJson[tempArray[0][0]] = {};

        LevelDataToJson.INSTANCE.color(tempJson[tempArray[0][0]], tempArray[0]);
        LevelDataToJson.INSTANCE.data(tempJson, tempArray[1]);

        json.k4 = tempJson;
    }

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method color
     * @param {Object} tempJson
     * @param {Object} tempArray
     */
    color(tempJson, tempArray) {
        let tempValue;
        if (tempArray[1][0]) {
            tempJson.Colors = {};
            for (let i in tempArray[1]) {
                tempValue = tempArray[1][i].split("_");
                tempJson.Colors[`Color${tempValue[15]}`] = {};
                for (let j = 0; j < tempValue.length; j += 2) {
                    tempJson.Colors[`Color${tempValue[15]}`][tempValue[j]] = tempValue[j + 1];
                }
            }
        }
    }

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method data
     * @param {Object} tempJson
     * @param {Object} tempArray
     */
    data(tempJson, tempArray) {
        if (tempArray) {
            tempArray = tempArray.substring(0, tempArray.length - 1).split(";");
            tempArray[0] = tempArray[0].split(",");
            LevelDataToJson.INSTANCE.jsonPush(tempJson, tempArray[0], 0, true);
            LevelDataToJson.INSTANCE.kA14(tempJson);
            LevelDataToJson.INSTANCE.objects(tempJson, tempArray);
        }
    }

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method kA14
     * @param {Object} tempJson
     */
    kA14(tempJson) {
        tempJson.kA14 = tempJson.kA14.substring(0, tempJson.kA14.length - 1).split("~");
    }

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method objects
     * @param {Object} tempJson
     * @param {Object[]} tempArray
     */
    objects(tempJson, tempArray) {
        tempJson.Objects = [];
        tempArray.shift();
        LevelDataToJson.INSTANCE.jsonPush(tempJson.Objects, tempArray, 0, false);
    }

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method jsonPush
     * @param {Object} json
     * @param {Object[]} toBePushed
     * @param {Number} offset
     * @param {Boolean} simple
     * @param {String} [split=","]
     */
    jsonPush(json, toBePushed, offset, simple, split = ",") {
        if (simple) {
            for (let i = offset; i < toBePushed.length; i += 2) {
                json[toBePushed[i]] = toBePushed[i + 1];
            }
        } else {
            for (let i = offset; i < toBePushed.length; i++) {
                toBePushed[i] = toBePushed[i].split(split);
                json[i] = {};
                for (let j = 0; j < toBePushed[i].length; j += 2) {
                    json[i][toBePushed[i][j]] = toBePushed[i][j + 1];
                }
            }
        }
    }
}