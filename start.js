const express = require('express');
const bodyParser = require('body-parser');
const {dependencies} = require('./package');
const apilink = require('./linkers/API');
const app = express();

// Setting the max data limit (you really don't need more than this)
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

// Setting the static files address
app.use(express.static("frontendResources"));

// Since this is only an API for now I will just auto redirect to that
app.get(["/", "/api"], (req, res) => {
    res.redirect("/api/docs");
});

// Giving the launch data and start listening
app.listen(80, () => {
    console.log("\x1b[34mApp started\x1b[0m");
    console.log(`\x1b[33mModules loaded:\n${JSON.stringify(dependencies, null, 2)}\x1b[0m`);
    console.log("\x1b[32mserver address: http://localhost\x1b[0m");
});

// Calling the api header
apilink(app);