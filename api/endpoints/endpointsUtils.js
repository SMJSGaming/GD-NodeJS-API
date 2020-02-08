const valuenames = require.main.require('./utils/default values/valueForName').endpoints;

/*
  type info:
    0: default split
    1: multi split
    2: multi data sections
    3: alt misc
    4: without # data
    5: default split with alt misc data
    6: split based on index
*/

module.exports = {
    dataprocess,
    dataconstructbig
}

function dataprocess(data, type) {
    let tempjson = {};
    if (type.type.indexOf(2) != -1) {
        // type 2
        data = data.split(":");
        for (let i = 0; i < data.length; i++) {
            data[i] = data[i].split(type.splitchar);
            tempjson[type.jsondata[i]] = {};
            for (let j = 0; j < data[i].length; j++)
                tempjson[type.jsondata[i]][valuenames[type.jsondata[i]][data[i][j]] || "User"[data[i][j]]] = data[i][++j];
        }
    } else if (type.type.indexOf(6) != -1) {
        // type 6
        data = data.split(type.splitchar);
        for (let i = 0; i < data.length; i++)
            tempjson[valuenames[type.jsondata[0]][i] || valuenames["User"][i]] = data[i];
    } else {
        // type 1
        data = data.split(type.splitchar);
        for (let i = 0; i < data.length; i++)
            tempjson[valuenames[type.jsondata[0]][data[i]] || valuenames["User"][data[i]]] = data[++i];
    }
    if (type.type.indexOf(5) != -1) {
        // type 5
        data = data[data.length-1].split("#");
        tempjson[Object.keys(tempjson)[Object.keys(tempjson).length-1]] = data[0];
        data.splice(0, 1);
        tempjson["Misc"] = {};
        for (let i = 0; i < data.length; i++)
            tempjson["Misc"][valuenames["MiscEnc"][i]] = data[i];
    }
    return tempjson;
}

function dataconstructbig(data, type) {
    let tempdata;
    let misc = "Misc";
    let jsonoutput = [];
    if (type.type.indexOf(4) == -1) {
        // type 1-3
        data = data.split("#");
        tempdata = data[0].split("|");
    } else {
        tempdata = data.split("|");
    }
    if (!tempdata[tempdata.length-1])
        tempdata.splice(tempdata.length-1, 1);
    if (type.type.indexOf(3) != -1)
        // type 3
        misc = "MiscEnc";
    for (let i = 0; i < tempdata.length; i++)
        jsonoutput[i] = dataprocess(tempdata[i], type);
    if (type.type.indexOf(4) == -1) {
        // type 1-3
        tempdata = data[1].split(":");
        jsonoutput["Misc"] = {};
        for (let i = 0; i < tempdata.length; i++)
            jsonoutput["Misc"][valuenames[misc][i]] = tempdata[i];
    }
    return jsonoutput;
}