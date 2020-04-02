module.exports = class GenerateHelpData {

    fs = require("fs");

    generate() {
        this.fs.readdir("./api/commands", (error, files) => {
            if (error) {
                return console.error(`\x1b[31mA fatal error occurred!\nAll files were skipped.\n\n${error}\x1b[0m`);
            }
            let fileData = "";
            let name = "";
            let tempString = "";
            let outData = {};
            console.log("Starting to write Help.json");

            for (let i in files) {
                if (files[i].endsWith(".js") && files[i] != "HelpCommand.js") {
                    console.log(`Writing the help documentation for ${files[i]}`);
                    fileData = this.fs.readFileSync(`./api/commands/${files[i]}`, "utf8");
                    name = files[i].split("Command.js")[0];
                    tempString = fileData.replace(/     */g, "")
                                      .split("command(")[0]
                                      .split("@method command")[1];

                    outData[name] = {
                        short: tempString.split("@summary ")[1].split("\n")[0],
                        long: tempString.split("@description ")[1].split("* @")[0].replace(/\* /g, ""),
                        args: `{prefix}${name} ${tempString.split("@param {String[]} args ")[1]
                                                            .split("\n")[0]
                                                            .split("} {")
                                                            .map((s) => {
                                                                if (s == "None") {
                                                                    return undefined;
                                                                } else {
                                                                    return s.replace(/{|}|\r/g, "");
                                                                }
                                                            })
                                                            .join(" ")}`
                    };
                } else {
                    console.log(`\x1b[31m${files[i]} was skipped.\x1b[0m`);
                }
            }
            this.fs.writeFile("./api/values/help.json", JSON.stringify(outData, null, 4), (error) => {
                if (error) {
                    console.error(`\x1b[31mA fatal error occurred!\nThe help file was not saved.\n\n${error}\x1b[0m`);
                } else {
                    console.log("Help.json was generated.");
                }
            });
        });
    }
}