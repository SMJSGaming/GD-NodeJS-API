const properties = require('./../../utils/default values/typeProperties');
const utils = require('./endpointsUtils');
const home = require('./endpointsIndex');
const request = require('../../utils/request/postreq');

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
    app.get('/api/endpoint', function(req, res) {
        home(req, res);
    });
    app.get('/api/endpoint/:type/:value1?/:value2?/:value3?', function(req, res) {
        const params = req.params;
        let jsonoutput = {};
        let error = "";
        let status = 200;
        for (let i = 1; i <= 3; i++) {
            if (!params["value"+i]) {
                params["value"+i] = 0;
            }
        }
        params.type = params.type.toLowerCase();
        if (!properties[params.type]) {
            error = "Invalid Request type";
        } else if (params.type == 'leaderboard') {
            if (parseInt(params.value1) > 10000) {
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
            request(utils.setvalue(properties[params.type].post, params), properties[params.type].url).then((data) => {
                if (data.charAt(0) != "-" && data != "") {
                    if (properties[params.type].type.indexOf(0) != -1 || properties[params.type].type.indexOf(5) != -1 || properties[params.type].type.indexOf(6) != -1) {
                        // type 0, 5, 6
                        jsonoutput = utils.dataprocess(properties[params.type].type, data, properties[params.type].splitchar, properties[params.type].jsondata);
                    } else if (properties[params.type].type.indexOf(1) != -1 || properties[params.type].type.indexOf(2) != -1 || properties[params.type].type.indexOf(3) != -1 || properties[params.type].type.indexOf(4) != -1) {
                        // type 1-4
                        jsonoutput = utils.dataconstructbig(data, {}, utils.setvalue(properties[params.type].page, params), properties[params.type].type, properties[params.type].splitchar, properties[params.type].jsondata);
                    } else {
                        jsonoutput["ERROR"] = "Invalid type";
                        status = 404;
                    }
                } else {
                    jsonoutput["ERROR"] = "Invalid request";
                    status = 404;
                }
                res.status(status).type('json').send(JSON.stringify(jsonoutput, null, 2));
            });
        } else {
            res.status(404).type('json').send(JSON.stringify({"ERROR":error}, null, 2))
        }
    });
}