const express = require('express');
const app = express();
const { dependencies } = require('./package');
const bodyParser = require('body-parser');
const apihead = require('./headers/API');

const PORT = process.env.PORT || 90;

// Giving the launch data and start listening
app.listen(PORT, function() {
    // I know that this can all go into one log but I prefer to log per line to keep it clean
    console.log("\x1b[34mApp started\x1b[0m");
    console.log(`\x1b[33mModules loaded:\n${JSON.stringify(dependencies, null, 2)}\x1b[0m`)
    console.log(`\x1b[32mserver address: http://localhost:${PORT}\x1b[0m`);
});

// Setting the max data limit (you really don't need more than this)
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));

// Setting the static files address
app.use(express.static('frontendResources'));

// Since this is only an API for now I will just auto redirect to that
app.get('/', function(req, res) {
    res.redirect('/api');
});

// Calling the api header
apihead(app);