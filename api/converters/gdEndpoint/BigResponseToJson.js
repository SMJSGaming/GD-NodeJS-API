/**
 * @class
 * @public
 * @author SMJS
 * @name BigResponseToJson
 * @typedef {Object} BigResponseToJson
 */
module.exports = class BigResponseToJson {

    /**
     * @public
     * @type {BigResponseToJson}
     * @name INSTANCE
     */
    static INSTANCE;

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method constructor
     * @summary The class constructor @see BigResponseToJson
     */
    constructor() {
        if (!BigResponseToJson.INSTANCE) {
            BigResponseToJson.INSTANCE = this;
        }
        return BigResponseToJson.INSTANCE;
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
     * @name SmallGdResponseToJson
     */
    SmallGdResponseToJson = new (require("./SmallGdResponseToJson"));

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method converter
     * @param {String} data 
     * @param {Object} type 
     * @param {Object[]} output
     */
    converter(data, type, output) {
        let tempData;
        let dar = [];
        let misc = "misc";
        if (type.type.indexOf(4) == -1) {
            // type 1-3
            dar = data.split("#");
            tempData = dar[0].split("|");
        } else {
            tempData = data.split("|");
        }
        if (!tempData[tempData.length-1]) {
            tempData.splice(tempData.length-1, 1);
        }
        if (type.type.indexOf(3) != -1) {
            // type 3
            misc = "miscEncrypted";
        }
        for (let i = 0; i < tempData.length; i++) {
            output[i] = {};
            BigResponseToJson.INSTANCE.SmallGdResponseToJson.converter(tempData[i], type, output[i]);
        }
        if (type.type.indexOf(4) == -1) {
            // type 1-3
            if (misc == "miscEncrypted") {
                output.push({});
                tempData = dar[1].split(":");
                for (let i in tempData) {
                    output[output.length-1][BigResponseToJson.INSTANCE.valueForName[misc][i]] = tempData[i];
                }
            } else {
                for (let i = 1; i < dar.length; i++) {
                    if (dar[i]) {
                        output.push({});
                        tempData = dar[i].split(":");
                        for (let j in tempData) {
                            output[output.length-1][BigResponseToJson.INSTANCE.valueForName[misc][j]] = tempData[j];
                        }
                        misc = "miscEncrypted";
                    }
                }
            }
        }
    }
}