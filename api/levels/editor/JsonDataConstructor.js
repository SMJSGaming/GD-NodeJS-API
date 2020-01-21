const {base64, gzUnzip} = require('../../../utils/robCrypto/mainCrypto');

function jsonPush(json, toBePushed, offset, simple, split = ",") {
    if (simple) {
        for (let i = offset; i < toBePushed.length; i += 2) {
            json[toBePushed[i]] = toBePushed[i+1];
        }
    } else {
        for (let i = offset; i < toBePushed.length; i++) {
            toBePushed[i] = toBePushed[i].split(split);
            json[i] = {};
            for (let j = 0; j < toBePushed[i].length; j += 2) {
                json[i][toBePushed[i][j]] = toBePushed[i][j+1];
            }
        }
    }
    return json;
}

function init(json) {
    return new Promise(function (resolve, reject) {
        if (json.k34) {
            k34(json.k34).then(function (data) {
                json.k34 = data;
                resolve(k4(json));
            });
        } else {
            resolve(k4(json));
        }
    });
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
    return new Promise(function (resolve, reject) {
        if (!json.k4.startsWith("H4sIAAAAAAAA")) {
            resolve(JSON.stringify(main(json, json.k4), null, 2));
        } else {
            gzUnzip(base64(json.k4)).then(function (data) {
                resolve(JSON.stringify(main(json, data.toString()), null, 2));
            }).catch(function (error) {
                json.k4 = "Invalid level string";
                resolve(JSON.stringify(json, null, 2));
            });
        }
    });
}

function k34(k34) {
    return new Promise(function (resolve, reject) {
        gzUnzip(base64(k34)).then(function (data) {
            resolve(data.toString());
        });
    });
}

module.exports = init;