/**
 * @class
 * @public
 * @author SMJS
 * @name LevelArraysXmlToJson
 * @typedef {Object} LevelArraysXmlToJson
 */
module.exports = class LevelArraysXmlToJson {

    /**
     * @public
     * @type {LevelArraysXmlToJson}
     * @name INSTANCE
     */
    static INSTANCE;

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method constructor
     * @summary The class constructor @see LevelArraysXmlToJson
     */
    constructor() {
        if (!LevelArraysXmlToJson.INSTANCE) {
            LevelArraysXmlToJson.INSTANCE = this;
        }
        return LevelArraysXmlToJson.INSTANCE;
    }

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method converter
     * @param {Object[]} xmlArray
     * @returns {Object} 
     */
    converter(xmlArray) {
        let outData = [];
        let inSubDir = undefined;
        let tempObjectKey = "";
        for (let i in xmlArray) {
            xmlArray[i] = xmlArray[i].split("><");
            outData[i] = {};
            for (let j = 1; j < xmlArray[i].length; j += 2) {
                if (xmlArray[i][j] != "/d>" && xmlArray[i][j] != "/d") {
                    tempObjectKey = xmlArray[i][j].split(">")[1].split("</")[0];
                    if (inSubDir) {
                        outData[i][inSubDir][tempObjectKey] = xmlArray[i][j + 1].split(">")[1].split("</")[0];
                    } else {
                        if (xmlArray[i][j + 1] == "t /") {
                            outData[i][tempObjectKey] = "";
                        } else if (xmlArray[i][j + 1] == "d") {
                            inSubDir = tempObjectKey;
                            outData[i][tempObjectKey] = {};
                        } else if (xmlArray[i][j + 1] != "d /") {
                            outData[i][tempObjectKey] = xmlArray[i][j + 1].split(">")[1].split("</")[0];
                        }
                    }
                } else {
                    j--;
                    inSubDir = undefined;
                }
            }
        }
        return outData;
    }
}