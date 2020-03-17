/**
 * @class
 * @public
 * @author SMJS
 * @name LevelSaveToLevelArray
 * @typedef {Object} LevelSaveToLevelArray
 */
module.exports = class LevelSaveToLevelArray {

    /**
     * @public
     * @type {LevelSaveToLevelArray}
     * @name INSTANCE
     */
    static INSTANCE;

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method constructor
     * @summary The class constructor @see LevelSaveToLevelArray
     */
    constructor() {
        if (!LevelSaveToLevelArray.INSTANCE) {
            LevelSaveToLevelArray.INSTANCE = this;
        }
        return LevelSaveToLevelArray.INSTANCE;
    }

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method converter
     * @param {String} plistXml
     * @returns {String[]} 
     */
    converter(plistXml) {
        /**
         * @type {Object[]}
         */
        const dirs = plistXml.split("</d><k>LLM_02</k>")[0]
            .split("<d><k>_isArr</k><t /><k>k_0</k>")[1]
            .split("<k>k_");
        let levels = [dirs[0]];
        
        for (let i = 1; i < dirs.length; i++) {
            dirs[i] = dirs[i].split(i + "</k>");
            dirs[i].shift();
            levels.push(dirs[i].join(i + "</k>"));
        }

        return levels;
    }
}