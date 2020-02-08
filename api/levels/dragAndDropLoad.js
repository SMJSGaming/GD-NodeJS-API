const path = require('path');

function init(app) {
    app.get(["/api/level/:extra?", "/api/levelraw"], (req, res) => {
        res.status(200).sendFile(path.join(__dirname, "../../frontend/level/dragBase.html"));
    });
}

module.exports = init;