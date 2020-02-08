const fs = require('fs');
const base = require('./save/baseLevelInfoData');
const parser = require('./save/menuDataParser');
const constructor = require('./menu/menuConstructor');
const JsonDataConst = require('./editor/JsonDataConstructor');
const {keys, XOR, base64, gzUnzip} = require.main.require('./utils/robCrypto/mainCrypto');
const {IsValidJson} = require.main.require('./utils/functions/valueUtils');

function decrypt(encstr) {
    return parser(base(gzUnzip(base64(XOR(base64(encstr).toString("utf8"), keys.saveFileXOR))).toString("utf8")));
}

function init(app) {
    app.post("/api/level", (req, res) => {
        if (req.body.data) {
            fs.readFile("./frontend/level/base.html", "utf8", (err, contents) => {
                if (err)
                    return res.status(500).send("There was an error while fetching this file.");
                try {
                    res.status(200).send(contents.replace("%BODY%", constructor(decrypt(req.body.data))));
                } catch (error) {
                    res.status(500).send("There was an error with parsing your data.");
                }
            });
        } else {
            res.redirect("/api/level");
        }
    });

    app.post("/api/levelraw", (req, res) => {
        if (req.body.data) {
            try {
                res.status(200).type("json").send(JSON.stringify(decrypt(req.body.data), null, 2));
            } catch (error) {
                res.status(500).send("There was an error with parsing your data.");
            }
        } else {
            res.redirect("/api/levelraw");
        }
    });

    app.post("/api/level/:level", (req, res) => {
        if (req.body.data) {
            if (req.params.level.toLowerCase() == "json") {
                try {
                    req.body.data = decrypt(req.body.data);
                } catch (error) {
                    return res.status(500).send("There was an error with parsing your data.");
                }
                for (let i = 0; i < req.body.data.length; i++) {
                    try {
                        JsonDataConst(req.body.data[i]);
                    } catch (error) {
                        req.body.data[i] = "Error";
                    }
                }
            } else {
                if (!IsValidJson(req.body.data)) {
                    try {
                        req.body.data = decrypt(req.body.data)[req.params.level];
                    } catch (error) {
                        return res.status(500).send("There was an error with parsing your data.");
                    }
                } else {
                    req.body.data = IsValidJson(req.body.data);
                }
                try {
                    JsonDataConst(req.body.data);
                } catch (error) {
                    return res.status(500).send("Invalid level.");
                }
            }
            res.status(200).type("json").send(JSON.stringify(req.body.data, null, 2));
        } else {
            res.redirect("/api/level/" + req.params.level);
        }
    });
}

module.exports = init;