const fs = require('fs');
const base = require('./save/baseLevelInfoData');
const parser = require('./save/menuDataParser');
const constructor = require('./menu/menuConstructor');
const JsonDataConst = require('./editor/JsonDataConstructor');
const {keys, XOR, base64, gzUnzip} = require('../../headers/utils').robCrypto.mainCrypto;

function init(app) {
    app.post('/api/level', function (req, res) {
        if (req.body.data) {
            fs.readFile('./frontend/level/base.html', 'utf8', function (err, contents) {
                if (err) {
                    res.status(500).send("There was an error while fetching this file.");
                } else {
                    try {
                        res.status(200).send(contents.replace("%BODY%", constructor(parser(base(gzUnzip(base64(XOR(base64(req.body.data).toString("utf8"), keys.saveFileXOR))).toString())))));
                    } catch (error) {
                        res.status(500).send("There was an error with parsing your data.");
                    }
                }
            });
        } else {
            res.redirect('/api/level');
        }
    });

    app.post('/api/levelraw', function (req, res) {
        if (req.body.data) {
            try {
                res.status(200).type('json').send(JSON.stringify(parser(base(gzUnzip(base64(XOR(base64(req.body.data).toString("utf8"), keys.saveFileXOR))).toString())), null, 2));
            } catch (error) {
                res.status(500).send("There was an error with parsing your data.");
            }
        } else {
            res.redirect('/api/levelraw');
        }
    });

    app.post('/api/level/:level', function (req, res) {
        if (req.body.data) {
            if (req.body.data.toString("utf8").charAt(0) != "{") {
                try {
                    req.body.data = parser(base(gzUnzip(base64(XOR(base64(req.body.data).toString("utf8"), keys.saveFileXOR))).toString()))[req.params.level];
                } catch (error) {
                    res.status(500).send("There was an error with parsing your data.");
                    return;
                }
            } else {
                req.body.data = JSON.parse(req.body.data);
            }
            try {
                res.status(200).type('json').send(JsonDataConst(req.body.data, res));
            } catch (error) {
                console.log(req.body.data)
                res.status(500).send("Invalid level.");
            }
        } else {
            res.redirect('/api/level/' + req.params.level);
        }
    });
}

module.exports = init;