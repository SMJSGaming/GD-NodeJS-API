const fs = require('fs');

function init(app) {
    app.get('/api', function(req, res) {
        fs.readFile('./frontend/api/base.html', 'utf8', function(err, contents) {
            if (err) {
                res.status(500).send("There was an error while fetching this file.");
            } else {
                res.status(200).send(contents);
            }
        });
    });
}

module.exports = init;