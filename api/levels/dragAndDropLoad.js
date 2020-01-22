const path = require('path');

function init(app) {
    app.get(['/api/level', '/api/level/:num', '/api/levelraw'], function (req, res) {
        res.status(200).sendFile(path.join(__dirname, "../../frontend/level/dragBase.html"));
    });
}

module.exports = init;