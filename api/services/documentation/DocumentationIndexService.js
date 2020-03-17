/**
 * @class
 * @public
 * @author SMJS
 * @name DocumentationIndexService
 * @typedef {Object} DocumentationIndexService
 */
module.exports = class DocumentationIndexService {

    /**
     * @private
     * @type {Object}
     * @name fs
     */
    fs = require("fs");

    /**
     * @private
     * @type {Object}
     * @name LowerCaseWordToTitleWord
     */
    LowerCaseWordToTitleWord = new (require("../../converters/LowerCaseWordToTitleWord"));

    /**
     * @private
     * @type {Object}
     * @name UrlToRoute
     */
    UrlToRoute = new (require("../../converters/documentation/ParamsToRoute"));

    /**
     * @private
     * @type {Object}
     * @name DocumentationDataService
     */
    DocumentationDataService = new (require("./DocumentationDataService"));

    /**
     * @private
     * @since 0.2.0
     * @version 0.1.0
     * @type {String}
     * @name onclick
     * @summary The onclick string
     */
    onclick = "onclick=\"openPage('%URL%', this)\"";

    /**
     * @private
     * @since 0.2.0
     * @version 0.1.0
     * @type {String}
     * @name title
     * @summary The title element string
     */
    title = `<h3 ${this.onclick} class="section title %HIGH%">
        %CONTENT%
    </h3>`;

    /**
     * @private
     * @since 0.2.0
     * @version 0.1.0
     * @type {String}
     * @name topic
     * @summary The topic element string
     */
    topic = `<span ${this.onclick} class="section topic %HIGH%">
        <p>%CONTENT%</p>
    </span>`;

    /**
     * @async
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method service
     * @summary The base service to generate the main body
     * @description The main service layer which generates the docs body and sets the navigation highlight to right place
     * @param {String[]} params The url navigation string
     * @returns {Promise<[Number, String]>} The HTML page and the response status
     */
    service(params) {
        return new Promise((resolve) => {
            let ArrayFile = [];
            let fileToRead = this.UrlToRoute.converter(params);
            
            this.fs.readFile("resources/pages/docs/base.html", "utf8", (error, content) => {
                if (error) {
                    resolve([500, "<center><h1>INTERNAL SERVER ERROR 500</h1></center>"]);
                } else {
                    ArrayFile = fileToRead.split("resources/docs/")[1].split("/");
                    content = content.replace("%URL%", ArrayFile.join("/"));
                    resolve([200, content.replace("%NAV%", this.constructNav(ArrayFile))]);
                }
            });
        });
    }

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method constructNav
     * @summary The navigation constructing
     * @description The constructing method converting the navigation HTML blocks to the full navigation
     * @param {String[]} fileToRead The url navigation array
     * @returns {String} The navigation HTML block
     */
    constructNav(fileToRead) {
        let out = "";
        let files = [];
        const dir = "resources/docs/";
        const folders = this.filesSorter(this.fs.readdirSync(dir), dir);

        for (let i = 0; i < folders.length; i++) {
            out += this.navContentMaker([folders[i], "index.md"], fileToRead);
            files = this.filesSorter(this.fs.readdirSync(dir + folders[i]), dir + folders[i]);

            for (let j = 0; j < files.length; j++) {
                if (files[j] != "index.md") {
                    out += this.navContentMaker([folders[i], files[j]], fileToRead);
                }
            }
        }

        return out;
    }

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method navContentMaker
     * @summary The navigation link generator
     * @description This will generate a navigation link and set the highlight if needed
     * @param {String[]} names The current file to generate a link for
     * @param {String[]} fileToRead The url navigation array
     * @returns {String} The link HTML block
     */
    navContentMaker(names, fileToRead) {
        let out = "";

        if (names[1] == "index.md") {
            out = this.title.replace("%CONTENT%", this.LowerCaseWordToTitleWord.converter(names[0]));
        } else {
            out = this.topic.replace("%CONTENT%", this.LowerCaseWordToTitleWord.converter(names[1]));
        }
        if (JSON.stringify(names) == JSON.stringify(fileToRead)) {
            out = out.replace("%HIGH%", "highlight");
        } else {
            out = out.replace("%HIGH%", "");
        }

        return out.replace("%URL%", `${names[0]}/${names[1]}`);
    }

    /**
     * @private
     * @since 0.3.0
     * @version 0.1.0
     * @method filesSorter
     * @summary A simple file sorter
     * @description The file sorter sorting all files based on the edit date allowing you to easily order it
     * @param {String[]} files The files array to sort
     * @param {String} dir The directory where the files are located in
     * @returns {String[]} The ordered files
     */
    filesSorter(files, dir) {
        files.sort((a, b) => 
            this.fs.statSync(dir + a).mtime.getTime() - this.fs.statSync(dir + b).mtime.getTime());

        return files;
    }
}