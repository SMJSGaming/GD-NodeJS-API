const fs = require('fs');

module.exports = {
    getObject: (json, key) => {
        return json[Object.keys(json).find(keySearch => keySearch.toLowerCase() == key.toLowerCase())];
    },
    jsonPush: (json, toBePushed, offset, simple, split = ",") => {
        if (simple) {
            for (let i = offset; i < toBePushed.length; i += 2)
                json[toBePushed[i]] = toBePushed[i+1];
        } else {
            for (let i = offset; i < toBePushed.length; i++) {
                toBePushed[i] = toBePushed[i].split(split);
                json[i] = {};
                for (let j = 0; j < toBePushed[i].length; j += 2)
                    json[i][toBePushed[i][j]] = toBePushed[i][j+1];
            }
        }
        return json;
    },
    filesSorter: (files, dir) => {
        files.sort((a, b) => {
            return fs.statSync(dir + a).mtime.getTime() - fs.statSync(dir + b).mtime.getTime();
        });
        return files;
    }
}