const songs = require("../../../utils/default values/songs");

let baseHTML =
    "<div class=\"sideLevelSelect\">" +
    "<h3>_k2_</h3>" +
    "<form action=\"/api/level/_i_\" method=\"post\">" +
    "<button type=\"submit\" name=\"data\" class=\"view right\" value='_all_'>View</button>" +
    "</form>" +
    "<div class=\"progress\">" +
    "<div class=\"wrapper\">" +
    "<div class=\"inner\" style=\"width: calc(_k19_% + 5px); z-index: _indexk19_;\"></div>" +
    "<div class=\"inner practice\" style=\"width: calc(_k20_% + 5px); z-index: _indexk20_;\"></div>" +
    "</div>" +
    "</div>" +
    "<small class=\"data\">Song ID: _k45_</small>" +
    "<small class=\"data2\">Time spent: _k80_</small>" +
    "<small class=\"data2 right\">Objects: _k48_</small>" +
    "</div>";

function main(jsonLevel) {
    let out = "";
    let tempHTML = [];
    let dataCheck;
    for (let i in Object.keys(jsonLevel)) {
        // Splits up all the placeholder values
        tempHTML = baseHTML.split("_");
        for (let j = 1; j < tempHTML.length; j += 2) {
            dataCheck = jsonLevel[i][tempHTML[j]];

            // View Button inserting all needed data
            if (tempHTML[j] == "all") {
                dataCheck = JSON.stringify(jsonLevel[i]);
            } else if (tempHTML[j] == 'i') {
                // Current level
                dataCheck = i;
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
                            dataCheck = songs(jsonLevel[i].k8);
                            break;
                        default:
                            dataCheck = 0;
                            break;
                    }
                }
            }

            // Time format
            if (tempHTML[j] == "k80") {
                let temptime = "Seconds";
                if (dataCheck >= 60) {
                    temptime = "Minutes";
                    dataCheck /= 60;
                    if (dataCheck >= 60) {
                        temptime = "Hours";
                        dataCheck /= 60;
                    }
                }

                // Because floor refused to work
                dataCheck = dataCheck.toString().split(".");
                if (dataCheck[1]) {
                    dataCheck = dataCheck[0] + '.' + dataCheck[1].substring(0, 2);
                } else {
                    dataCheck = dataCheck[0];
                }
                dataCheck += ' ' + temptime;
            }

            // Set progress bar index and length
            if (tempHTML[j] == "k19" || tempHTML[j] == "k20") {
                if (dataCheck == "100") {
                    dataCheck = "5px + 100";
                }
                tempHTML[j] = dataCheck;
                j += 2;
                if (jsonLevel[i]["k19"] < jsonLevel[i]["k20"]) {
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

module.exports = main;
