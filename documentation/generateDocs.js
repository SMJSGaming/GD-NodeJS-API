const fs = require('fs');
const showdown = require('showdown');
const converter = new showdown.Converter();
const arrayUtils = require.main.require('./utils/functions/arrayUtils');
const onclick = "onclick=\"openPage('%URL%', this)\"";
const title = `<h3 ${onclick} class="section title %HIGH%">%CONTENT%</h3>`;
const topic = `<span ${onclick} class="section topic %HIGH%"><p>%CONTENT%</p></span>`;


function error(type) {
    switch (type) {
        case 404:
            return "<center><h1>ERROR 404 NOT FOUND</h1><p>This file wasn't found</p></center>";
        default:
            return "<center><h1>UNKNOWN ERROR 500</h1></center>";
    }
}

function contentMaker(names, fileToRead) {
    let out = "";
    if (names[1] == "index.md") {
        out = title.replace("%CONTENT%", names[0].replace(/^\w/, c => c.toUpperCase()));
    } else {
        out = topic.replace("%CONTENT%", names[1].replace(/^\w/, c => c.toUpperCase()));
    }
    if (JSON.stringify(names) == JSON.stringify(fileToRead)) {
        out = out.replace("%HIGH%", "highlight");
    } else {
        out = out.replace("%HIGH%", "");
    }
    return out.replace("%URL%", `${names[0]}/${names[1]}`).replace(/.md/g, "");
}

function getNavData(fileToRead) {
    let out = "";
    let files = [];
    const dir = "documentation/markdownPages/";
    const folders = arrayUtils.filesSorter(fs.readdirSync(dir), dir);
    for (let i = 0; i < folders.length; i++) {
        out += contentMaker([folders[i], "index.md"], fileToRead);
        files = arrayUtils.filesSorter(fs.readdirSync(dir + folders[i]), dir + folders[i]);
        for (let j = 0; j < files.length; j++) {
            if (files[j] != "index.md") {
                out += contentMaker([folders[i], files[j]], fileToRead);
            }
        }
    }
    return out;
}

function generateNav(contents, fileToRead) {
    if (fileToRead) {
        fileToRead = fileToRead.split("documentation/markdownPages/")[1].split("/");
    }
    return contents.replace("%NAV%", getNavData(fileToRead));
}

function findFile(params) {
    let fileToRead = "documentation/markdownPages/";
    if (params.section) {
        fileToRead += params.section.replace("%20", " ");
        if (params.topic) {
            fileToRead += `/${params.topic.replace("%20", " ")}.md`;
        } else {
            fileToRead += "/index.md";
        }
    } else {
        fileToRead += "general/welcome.md";
    }
    return fileToRead;
}

function generateBody(params) {
    return new Promise((resolve, reject) => {
        let fileToRead = findFile(params);
        fs.readFile("frontend/docs/base.html", "utf8", (cerror, contents) => {
            if (cerror)
                reject(error(500));
            fs.readFile(fileToRead, "utf8", (berror, bodydata) => {
                if (berror) {
                    bodydata = error(404);
                    fileToRead = null;
                }
                contents = contents.replace("%BODY%", converter.makeHtml(bodydata));
                resolve(generateNav(contents, fileToRead));
            });
        });
    });
}

function getMarkdownHTML(params) {
    return new Promise((resolve, reject) => {
        fs.readFile(findFile(params), "utf8", (derror, data) => {
            if (derror) {
                resolve(error(404));
            } else {
                resolve(converter.makeHtml(data));
            }
        });
    });
}


function init(app) {
    // Pages
    app.get('/api/docs/res/:section/:topic?', (req, res) => {
        getMarkdownHTML(req.params).then((data) => {
            res.send(data);
        });
    });

    // Main interface
    app.get('/api/docs/:section?/:topic?', (req, res) => {
        generateBody(req.params).then((data) => {
            res.send(data);
        }).catch((error) => {
            res.send(error);
        });
    });
}

module.exports = init;