/**
 * @class
 * @public
 * @author SMJS
 * @name LevelsSaveController
 * @typedef {Object} LevelsSaveController
 */
module.exports = class LevelsSaveController {

    /**
     * @private
     * @type {Object}
     * @name path
     */
    path = require("path");

    /**
     * @private
     * @type {Object}
     * @name UrlToParams
     */
    UrlToParams = new (require("../converters/UrlToParams"));

    /**
     * @private
     * @type {Object}
     * @name UrlToGlobalUrlArray
     */
    UrlToGlobalUrlArray = new (require("../converters/UrlToGlobalUrlArray"));

    /**
     * @private
     * @type {Object}
     * @name LevelsIndexService
     */
    LevelsIndexService = new (require("../services/save/LevelSaveIndexService"));

    /**
     * @private
     * @type {Object}
     * @name SelectiveLevelSaveService
     */
    SelectiveLevelSaveService = new (require("../services/save/SelectiveLevelSaveService"));

    /**
     * @private
     * @type {Object}
     * @name EncodedSaveToAcceptedJson
     */
    EncodedSaveToAcceptedJson = new (require("../converters/save/EncodedSaveToAcceptedJson"));

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method controller
     * @summary endpoint listener initializer
     * @description endpoints:
     * /api/save/level,
     * /api/save/level/*,
     * /api/save/level/{levelArrayIndex},
     * /api/save/level/json,
     * /api/save/level/raw
     * @param {Object} app The express app with all the necessary methods to use the controllers
     * @param {Object} globalData An object containing all the values and methods the application needs
     */
    controller(app, globalData) {
        const classObject = this;
        const url = this.UrlToGlobalUrlArray.converter("/api/save/level");

        app.post(url, (req, res) => {
            const params = classObject.UrlToParams.converter(req.params);
            let data;
            let tempResponse;

            if (req.body.data) {
                if (Number.isInteger(parseInt(params[0]))) {
                    tempResponse = this.SelectiveLevelSaveService.service(globalData, req.body.data, params[0]);
                    res.status(tempResponse[0]).type("json").send(JSON.stringify(tempResponse[1], null, 2));
                } else {
                    try {
                        data = this.EncodedSaveToAcceptedJson.converter(req.body.data);
                    } catch(error) {
                        globalData.errorFunc(error, "level-save", globalData);
                        return res.status(400).type("json").send(JSON.stringify({
                            "ERROR": "There was an error while decrypting your data."
                        }, null, 2));
                    }
                    if (params[0] == "raw") {
                        try {
                            res.status(200).type("json").send(JSON.stringify(data, null, 2));
                        } catch(error) {
                            globalData.errorFunc(error, "level-save-raw", globalData);
                            res.status(400).type("json").send(JSON.stringify({
                                "ERROR": "There was an error while parsing your data."
                            }, null, 2));
                        }
                    } else if (params[0] == "json") {
                        data.forEach((level, index) => {
                            tempResponse = this.SelectiveLevelSaveService.service(globalData, JSON.stringify(level));
                            data[index] = tempResponse[1];
                        });
                        res.status(200).type("json").send(JSON.stringify(data, null, 2));
                    } else {
                        this.LevelsIndexService.service(globalData, data).then((response) => {
                            res.status(response[0]).type("html").send(response[1]);
                        });
                    }
                }
            } else {
                res.redirect(req.url);
            }
        });

        app.get(url, (req, res) => {
            res.status(200).sendFile(
                classObject.path.join(__dirname, "../../resources/pages/levelSave/dragBase.html"));
        });
    }
}