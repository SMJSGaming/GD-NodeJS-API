/**
 * @class
 * @public
 * @author SMJS
 * @name SmallGdResponseToJson
 * @typedef {Object} SmallGdResponseToJson
 */
module.exports = class SmallGdResponseToJson {

    /**
     * @public
     * @type {SmallGdResponseToJson}
     * @name INSTANCE
     */
    static INSTANCE;

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method constructor
     * @summary The class constructor @see SmallGdResponseToJson
     */
    constructor() {
        if (!SmallGdResponseToJson.INSTANCE) {
            SmallGdResponseToJson.INSTANCE = this;
        }
        return SmallGdResponseToJson.INSTANCE;
    }

    /**
     * @private
     * @type {Object}
     * @name valueForName
     */
    valueForName = require("../../values/valueForName.json").endpoints;

    /**
     * @private
     * @type {Object}
     * @name TitleWordGenerator
     */
    TitleWordGenerator = new (require("../../utilities/TitleWordGenerator"));
    
    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method converter
     * @param {String} data
     * @param {Object} type
     * @param {Object} output
     * @returns {Object}
     */
    converter(data, type, output) {
        let dar = [];
        const valueForName = SmallGdResponseToJson.INSTANCE.valueForName;

        if (type.type.indexOf(2) != -1) {
            // type 2
            return SmallGdResponseToJson.INSTANCE.type2(valueForName, data, type, output, dar);
        } else if (type.type.indexOf(6) != -1) {
            // type 6
            dar = SmallGdResponseToJson.INSTANCE.type6(valueForName, data, type, output, dar);
        } else {
            // type 1
            dar = SmallGdResponseToJson.INSTANCE.type1(valueForName, data, type, output, dar);
        }
        if (type.type.indexOf(5) != -1) {
            // type 5
            return SmallGdResponseToJson.INSTANCE.type5(valueForName, output, dar);
        }
    }

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method type1
     * @param {Object} valueForName
     * @param {String} data 
     * @param {Object} type 
     * @param {Object} output
     * @param {String[]} dar
     */
    type1(valueForName, data, type, output, dar) {
        dar = data.split(type.splitChar);
        for (let i = 0; i < dar.length; i++) {
            output[valueForName[type.jsonData[0]][dar[i]] || valueForName["user"][dar[i]]] = dar[++i];
        }
        return dar;
    }

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method type2
     * @param {Object} valueForName
     * @param {String} data 
     * @param {Object} type 
     * @param {Object} output
     * @param {String[]} dar
     */
    type2(valueForName, data, type, output, dar) {
        let temp = [];
        const title = SmallGdResponseToJson.INSTANCE.TitleWordGenerator.utility;

        dar = data.split(":");
        for (let i = 0; i < dar.length; i++) {
            temp[i] = dar[i].split(type.splitChar);
            output[title(type.jsonData[i])] = {};
            for (let j = 0; j < temp[i].length; j++) {
                output[title(type.jsonData[i])][valueForName[type.jsonData[i]][temp[i][j]] || "user"[temp[i][j]]] = temp[i][++j];
            }
        }
    }

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method type5
     * @param {Object} valueForName
     * @param {Object} output
     * @param {String[]} dar
     */
    type5(valueForName, output, dar) {
        dar = dar[dar.length-1].split("#");
        output[Object.keys(output)[Object.keys(output).length-1]] = dar[0];
        dar.splice(0, 1);
        output["Misc"] = {};
        for (let i = 0; i < dar.length; i++) {
            output["Misc"][valueForName["miscEncrypted"][i]] = dar[i];
        }
    }

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method type6
     * @param {Object} valueForName
     * @param {String} data 
     * @param {Object} type 
     * @param {Object} output
     * @param {String[]} dar
     */
    type6(valueForName, data, type, output, dar) {
        dar = data.split(type.splitChar);
        for (let i = 0; i < dar.length; i++) {
            output[valueForName[type.jsonData[0]][i] || valueForName["user"][i]] = dar[i];
        }
        return dar;
    }
}