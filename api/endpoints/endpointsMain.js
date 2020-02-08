const utils = require('./endpointsUtils');
const home = require('./endpointsIndex');
const request = require.main.require('./utils/request/postreq');
const setvalue = require.main.require('./utils/functions/valueUtils').setvalue;
const properties = require.main.require('./utils/default values/typeProperties');

module.exports = init;

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

function init(app) {
    app.get("/api/endpoint", (req, res) => {
        home(req, res);
    });
    app.get("/api/endpoint/:type/:value1?/:value2?/:value3?", (req, res) => {
        const params = req.params;
        let jsonoutput = {};
        let error = "";
        let status = 200;
        let type = properties[params.type.toLowerCase()];
        for (let i = 1; i <= 3; i++) {
            if (!params[`value${i}`]) {
                params[`value${i}`] = 0;
            }
        }
        if (!type) {
            error = "Invalid Request type";
        } else if (params.type == "leaderboard") {
            if (params.value1 > 10000) {
                error = "Too much to request";
            } else {
                if (params.value2 == '1') {
                    params.value2 = "top";
                } else if (params.value2 == '2') {
                    params.value2 = "creators";
                }
            }
        }
        if (error == "") {
            request(setvalue(type.post, params), type.url).then((data) => {
                if (parseInt(data) >= 0 && data != "") {
                    if (type.type.indexOf(0) != -1 || type.type.indexOf(5) != -1 || type.type.indexOf(6) != -1) {
                        // type 0, 5, 6
                        jsonoutput = utils.dataprocess(data, type);
                    } else if (type.type.indexOf(1) != -1 || type.type.indexOf(2) != -1 || type.type.indexOf(3) != -1 || type.type.indexOf(4) != -1) {
                        // type 1-4
                        jsonoutput = utils.dataconstructbig(data, type);
                    } else {
                        jsonoutput["ERROR"] = "Invalid type";
                        status = 404;
                    }
                } else {
                    jsonoutput["ERROR"] = "Invalid request";
                    status = 404;
                }
                res.status(status).type("json").send(JSON.stringify(jsonoutput, null, 2));
            });
        } else {
            res.status(404).type("json").send(JSON.stringify({"ERROR":error}, null, 2))
        }
    });
}