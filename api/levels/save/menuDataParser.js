function main(dataArray) {
    let outData = [];
    let insubdir = -1;
    let tempobjectkey = "";
    for (let i in dataArray) {
        dataArray[i] = dataArray[i].split("><");
        outData[i] = {};
        for (let j = 1; j < dataArray[i].length; j += 2) {
            if (dataArray[i][j] != "/d>" && dataArray[i][j] != "/d") {
                tempobjectkey = dataArray[i][j].split(">")[1].split("</")[0];
                if (insubdir != -1) {
                    outData[i][insubdir][tempobjectkey] = dataArray[i][j + 1].split(">")[1].split("</")[0];
                } else {
                    if (dataArray[i][j + 1] == "t /") {
                        outData[i][tempobjectkey] = "";
                    } else if (dataArray[i][j + 1] == "d") {
                        insubdir = tempobjectkey;
                        outData[i][tempobjectkey] = {};
                    } else if (dataArray[i][j + 1] != "d /") {
                        outData[i][tempobjectkey] = dataArray[i][j + 1].split(">")[1].split("</")[0];
                    }
                }
            } else {
                j--;
                insubdir = -1;
            }
        }
    }
    return outData;
}

module.exports = main;