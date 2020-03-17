/**
 * @class
 * @public
 * @author SMJS
 * @name LevelsIndexService
 * @typedef {Object} LevelsIndexService
 */
module.exports = class LevelsIndexService {

    /**
     * @private
     * @type {Object}
     * @name fs
     */
    fs = require("fs");

    /**
     * @private
     * @type {String[]}
     * @name songs
     */
    songs = require("../../values/songs.json");

    /**
     * @private
     * @since 0.1.0
     * @version 0.1.0
     * @type {String}
     * @name baseHTML
     * @summary The base HTML block
     */
    baseHTML = `<div class="sideLevelSelect">
        <h3>_k2_</h3>
        <form action="/api/save/level/_i_" method="post">
            <button type="submit" name="data" class="view right" value='_all_'>View</button>
        </form>
        <div class="progress">
            <div class="wrapper">
                <div class="inner" style="width: calc(_k19_% + 5px); z-index: _indexk19_;"></div>
                <div class="inner practice" style="width: calc(_k20_% + 5px); z-index: _indexk20_;"></div>
            </div>
        </div>
        <small class="data">Song ID: _k45_</small>
        <small class="data2">Time spent: _k80_</small>
        <small class="data2 right">Objects: _k48_</small>
    </div>`;

    /**
     * @async
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method service
     * @summary The base service to generate the main body
     * @description The index service which parses the save data and makes a menu which links through select buttons the selective service  
     * @param {object} globalData An object containing all the values and methods the application needs
     * @param {Object[]} body The levels array to process
     * @returns {Promise<[Number, String]>} The HTML page and the response status
     */
    service(globalData, body) {
        return new Promise((resolve) => {
            this.fs.readFile("resources/pages/levelSave/base.html", "utf8", (error, contents) => {
                if (error) {
                    globalData.errorFunc(error, "level-save-index", globalData);
                    resolve([500, "There was an error while fetching this file."]);
                }
                try {
                    resolve([200, contents.replace("%BODY%", this.pageConstructor(body))]);
                } catch (error) {
                    globalData.errorFunc(error, "level-save-index", globalData);
                    resolve([400, "There was an error with parsing your data."])
                }
            });
        });
    }

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method pageConstructor
     * @summary The body generator
     * @description The main page body generator method which generates the selection boxes
     * @param {Array.<Object>} levels the levels array to process 
     * @returns {String} the body to draw on the base
     */
    pageConstructor(levels) {
        let out = "";
        let tempTime = "Seconds";
        let tempHTML = [];
        let dataCheck;

        for (let i in Object.keys(levels)) {
            // Splits up all the placeholder values
            tempHTML = this.baseHTML.split("_");
            for (let j = 1; j < tempHTML.length; j += 2) {
                dataCheck = levels[i][tempHTML[j]];

                // View Button inserting all needed data
                if (tempHTML[j] == "all") {
                    dataCheck = JSON.stringify(levels[i]);
                } else {
                    // Default values
                    if (!dataCheck) {
                        switch (tempHTML[j]) {
                            case "k48":
                                dataCheck = "Not found";
                                break;
                            case "k2":
                                dataCheck = "Eeeeh, well then";
                                break;
                            case "k45":
                                dataCheck = this.songs[levels[i].k8] || "Stereo Madness";
                                break;
                            default:
                                dataCheck = 0;
                                break;
                        }
                    }
                }

                // Time format
                if (tempHTML[j] == "k80") {
                    if (dataCheck >= 60) {
                        tempTime = "Minutes";
                        dataCheck /= 60;
                        if (dataCheck >= 60) {
                            tempTime = "Hours";
                            dataCheck /= 60;
                        }
                    }

                    // Because floor refused to work
                    dataCheck = dataCheck.toString().split(".");
                    if (dataCheck[1]) {
                        dataCheck = `${dataCheck[0]}.${dataCheck[1].substring(0, 2)}`;
                    } else {
                        dataCheck = dataCheck[0];
                    }
                    dataCheck += ` ${tempTime}`;
                }

                // Orders the progress bars based on which has the least amount of process and formats them
                if (tempHTML[j] == "k19" || tempHTML[j] == "k20") {
                    if (dataCheck == "100")
                        dataCheck = "5px + 100";
                    tempHTML[j] = dataCheck;
                    j += 2;
                    if (levels[i]["k19"] < levels[i]["k20"]) {
                        if (tempHTML[j] == "indexk19") {
                            tempHTML[j] = "1";
                        } else {
                            tempHTML[j] = "2";
                        }
                    } else {
                        if (tempHTML[j] == "indexk19") {
                            tempHTML[j] = "2";
                        } else {
                            tempHTML[j] = "1";
                        }
                    }
                } else {
                    tempHTML[j] = dataCheck;
                }
            }
            out += tempHTML.join("");
        }
        return out;
    }
}