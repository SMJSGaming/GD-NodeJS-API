const fs = require('fs');
const {keys, XOR, base64, gzUnzip} = require('../../utils/robCrypto/mainCrypto');
const base = require('./save/baseLevelInfoData');
const parser = require('./save/menuDataParser');
const constructor = require('./menu/menuConstructor');
const JsonDataConst = require('./editor/JsonDataConstructor');
const dataLoadPage = require('./dragAndDropLoad');

function init(app) {
    dataLoadPage(app);
    app.post('/api/level', function (req, res) {
        if (req.body.data) {
            fs.readFile('./frontend/level/base.html', 'utf8', function (err, contents) {
                if (err) {
                    res.status(500).send("There was an error while fetching this file.");
                } else {
                    gzUnzip(base64(XOR(base64(req.body.data).toString("utf8"), keys.saveFileXOR))).then(function (data) {
                        res.status(200).send(contents.replace("%BODY%", constructor(parser(base(data.toString())))));
                    }).catch(function (error) {
                        res.status(500).send("There was an error with parsing your data.");
                    });
                }
            });
        } else {
            res.redirect('/api/level');
        }
    });

    app.post('/api/levelraw', function (req, res) {
        if (req.body.data) {
            gzUnzip(base64(XOR(base64(req.body.data).toString("utf8"), keys.saveFileXOR))).then(function (data) {
                res.status(200).type('json').send(JSON.stringify(parser(base(data.toString())), null, 2));
            }).catch(function (error) {
                res.status(500).send("There was an error with parsing your data.");
            });
        } else {
            res.redirect('/api/levelraw');
        }
    });

    app.post('/api/level/:level', function (req, res) {
        if (req.body.data) {
            if (req.body.data.toString("utf8").charAt(0) != "{") {
                gzUnzip(base64(XOR(base64(req.body.data).toString("utf8"), keys.saveFileXOR))).then(function (data) {
                    JsonDataConst(parser(base(data.toString()))[req.params.level], res).then(function (data) {
                        res.status(200).type('json').send(data);
                    }).catch(function (error) {
                        res.status(500).send("Invalid level.");
                    });
                }).catch(function (error) {
                    res.status(500).send("There was an error with parsing your data.");
                });
            } else {
                JsonDataConst(JSON.parse(req.body.data), res).then(function (data) {
                    res.status(200).type('json').send(data);
                }).catch(function (error) {
                    console.log(error)
                    res.status(500).send("Invalid level.");
                });
            }
        } else {
            res.redirect('/api/level/' + req.params.level);
        }
    });
}

module.exports = init;