const utils = require('../../../headers/utils');
const {gzUnzip, base64} = utils.robCrypto.mainCrypto;
const {jsonPush} = utils.functions.arrayUtils;

function init(json) {
    if (json.k34) {
        json.k34 = gzUnzip(base64(json.k34)).toString();;
    }
    return JSON.stringify(k4(json), null, 2);
}

function main(json, data) {
    // k4
    // Splitting color and object data
    let tempk = data.split("|,");
    let tempjson = {};
    let tempvalue;
    // Splitting global variables and values
    tempk[0] = tempk[0].split(",");
    // Splitting the colors
    tempk[0][1] = tempk[0][1].split("|");
    tempjson[tempk[0][0]] = {};
    if (tempk[0][1][0]) {
        for (let i in tempk[0][1]) {
            // Splitting the color data
            tempvalue = tempk[0][1][i].split("_");
            tempjson[tempk[0][0]]["color" + tempvalue[15]] = {};
            for (let j = 0; j < tempvalue.length; j += 2) {
                tempjson[tempk[0][0]]["color" + tempvalue[15]][tempvalue[j]] = tempvalue[j+1];
            }
        }
    }
    if (tempk[1]) {
        // Splitting the global data and the object values
        tempk[1] = tempk[1].substring(0, tempk[1].length - 1).split(";");
        tempk[1][0] = tempk[1][0].split(",");
        tempjson = jsonPush(tempjson, tempk[1][0], 0, true);
        tempjson["Objects"] = jsonPush({}, tempk[1], 1, false, ",");
    }
    json.k4 = tempjson;

    // k34
    if (json.k34) {
        tempk = json.k34.substring(0, json.k34.length - 1).split(";");
        json.k34 = {};
        for (let i in tempk) {
            json.k34[i] = tempk[i];
        }
    }
    return json;
}

function k4(json) {
    if (json.k4.startsWith("H4sIAAAAAAAA")) {
        try {
            json = main(json, gzUnzip(base64(json.k4)).toString());
        } catch(error) {
            json.k4 = "Invalid level string";
        }
    } else {
        json = main(json, json.k4);
    }
    return json;
}

module.exports = init;