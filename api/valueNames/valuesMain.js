const values = require('./../../utils/default values/valueForName');
const arrayUtils = require('./../../utils/functions/arrayUtils');

function init(app) {
    app.get('/api/valueNames/:root?', function(req, res) {
        let out = values;
        let checkData = {};
        if (req.params.root) {
            let root = req.params.root.split("-");
            for (let i in root) {
                checkData = arrayUtils.getObject(out, root[i]);
                if (checkData) {
                    out = checkData;
                } else {
                    break;
                }
            }
        }
        res.status(200).type('json').send(JSON.stringify(out, null, 2));
    });
}

module.exports = init;