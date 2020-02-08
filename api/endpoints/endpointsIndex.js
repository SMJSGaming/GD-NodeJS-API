const fs = require('fs');
const properties = require.main.require('./utils/default values/typeProperties');

function init(req, res) {
    let linkinfo = "";
    fs.readFile("./frontend/endpoints/base.html", "utf8", (err, contents) => {
        if (err)
            return res.status(500).send("There was an error while fetching this file.");
        Object.keys(properties).forEach((key) => {
            linkinfo += `<div class='block'>
                <h2>${key[0].toUpperCase()+key.slice(1)}</h2>
                <p>
                    <b>URL: </b>
                    <a href="/api/endpoint/${properties[key].link}">${properties[key].link}</a>
                </p>
            </div>`;
        });
        res.status(200).send(contents.replace("<span class=\"linkfill\"></span>", linkinfo));
    });
}

module.exports = init;