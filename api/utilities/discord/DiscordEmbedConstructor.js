/**
 * @class
 * @public
 * @author SMJS
 * @name DiscordEmbedConstructor
 * @typedef {Object} DiscordEmbedConstructor
 */
module.exports = class DiscordEmbedConstructor {

    /**
     * @private
     * @type {DiscordEmbedConstructor}
     * @name INSTANCE
     */
    static INSTANCE;

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method constructor
     * @summary The class constructor @see DiscordEmbedConstructor
     */
    constructor() {
        if (!DiscordEmbedConstructor.INSTANCE) {
            DiscordEmbedConstructor.INSTANCE = this;
        }
        return DiscordEmbedConstructor.INSTANCE;
    }

    fs = require("fs");

    TitleWordGenerator = new (require("../TitleWordGenerator"));

    utility(response, message, sentMessage, globalData, name) {
        name = name.replace(/[^a-zA-Z0-9\s]/gi, "");
        if (name.length < 256) {
            let fileName;
            let responseString = JSON.stringify(response[1], null, 2);
            let out = {
                embed: {
                    title: this.TitleWordGenerator.utility(name),
                    description: `The response status was ${response[0]}`,
                    color: globalData.config.values.discord.color,
                    fields: [
                        {
                            name: "Response time",
                            value: `**Time**: \`${Math.round(sentMessage.createdAt - message.createdAt)} ms\``
                        }
                    ],
                    timestamp: Date.now()
                }
            };

            if (responseString.length > 1012) {
                fileName = `${message.member.id}-${sentMessage.id}.json`;
                out.embed.fields[1] = {
                    name: "Too much data",
                    value: "There are too many characters in the result. Download the file to see the output."
                }
                this.fs.writeFileSync(fileName, responseString);
            } else {
                out.embed.fields[1] = {
                    name: "Output",
                    value: [
                        "```json",
                        responseString,
                        "```"
                    ].join("\n")
                }
            }

            sentMessage.edit(out);
            if (fileName) {
                message.channel.send({
                    files: [`./${fileName}`]
                }).then(() => this.fs.unlinkSync(fileName));
            }
        } else {
            sentMessage.edit({
                embed: {
                    title: "Nice try",
                    description: 
                        "Nice attempt on breaking my bot. And you would've succeeded if you did this in the beta of 0.4.0",
                    color: globalData.config.values.discord.color,
                    timestamp: Date.now()
                }
            });
        }
    }
}