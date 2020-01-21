const valuenames = require('./../../utils/default values/valueForName').endpoints;

module.exports = {
    dataprocess,
    dataconstructbig,
    setvalue
}

function dataprocess(type, data, splitchar, jsondata) {
    let tempjson = {};
    if (type.indexOf(2) != -1) {
        // type 2
        let contents = jsondata.split(",");
        data = data.split(":");
        for (let i = 0; i < data.length; i++) {
            data[i] = data[i].split(splitchar);
            tempjson[contents[i]] = {};
            for (let j = 0; j < data[i].length; j++) {
                if (typeof valuenames[contents[i]][data[i][j]] !== 'undefined') {
                    tempjson[contents[i]][valuenames[contents[i]][data[i][j]]] = data[i][++j];
                } else {
                    tempjson[contents[i]]['users'][data[i][j]] = data[i][++j];
                }
            }
        }
    } else if (type.indexOf(6) != -1) {
        // type 6
        data = data.split(splitchar);
        for (let i = 0; i < data.length; i++) {
            if (typeof valuenames[jsondata][i] !== 'undefined') {
                tempjson[valuenames[jsondata][i]] = data[i];
            } else {
                tempjson[valuenames['users'][i]] = data[i];
            }
        }
    } else {
        // type 1
        data = data.split(splitchar);
        for (let i = 0; i < data.length; i++) {
            if (typeof valuenames[jsondata][data[i]] !== 'undefined') {
                tempjson[valuenames[jsondata][data[i]]] = data[++i];
            } else {
                tempjson[valuenames['users'][data[i]]] = data[++i];
            }
        }
    }
    if (type.indexOf(5) != -1) {
        // type 5
        data = data[data.length-1].split("#");
        tempjson[Object.keys(tempjson)[Object.keys(tempjson).length-1]] = data[0];
        data.splice(0, 1);
        tempjson["Misc"] = {};
        for (let i = 0; i < data.length; i++) {
            tempjson["Misc"][valuenames["miscenc"][i]] = data[i];
        }
    }
    return tempjson;
}

function dataconstructbig(data, jsonoutput, page, type, splitchar, jsondata) {
    let tempdata;
    if (type.indexOf(4) == -1) {
        // type 1-3
        data = data.split("#");
        tempdata = data[0].split("|");
    } else {
        tempdata = data.split("|");
    }
    if (tempdata[tempdata.length-1] == "") {
        tempdata.splice(tempdata.length-1, 1);
    }
    let misc = "misc";
    if (type.indexOf(3) != -1) {
        // type 3
        misc = "miscenc";
    }
    for (let i = 0; i < tempdata.length; i++) {
        jsonoutput[i + page * 10] = dataprocess(type, tempdata[i], splitchar, jsondata);
    }
    if (type.indexOf(4) == -1) {
        // type 1-3
        tempdata = data[1].split(":");
        jsonoutput["Misc"] = {};
        for (let i = 0; i < tempdata.length; i++) {
            jsonoutput["Misc"][valuenames[misc][i]] = tempdata[i];
        }
    }
    return jsonoutput;
}

function setvalue(string, params) {
    return string.replace("value1", params.value1).replace("value2", params.value2).replace("value3", params.value3);
}