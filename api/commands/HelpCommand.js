/**
 * @class
 * @public
 * @author SMJS
 * @name HelpCommand
 * @typedef {Object} HelpCommand
 */
module.exports = class HelpCommand {

    help = require("../values/help.json");

    CaseInsensitiveKeyFind = new (require("../utilities/CaseInsensitiveKeyFind"));

    command(message, globalData, args) {
        const tempData = this.CaseInsensitiveKeyFind.utility(args[0] || "", this.help)[0];

        message.channel.send({
            embed: {
                description: "Processing the data...",
                color: globalData.config.values.discord.color
            }
        }).then((sentMessage) => {
            if (args[0]) {
                if (tempData) {
                    sentMessage.edit({
                        embed: {
                            title: `${args[0]} help`,
                            description: [
                                tempData.long,
                                "Usage:```css",
                                tempData.args.replace("{prefix}", globalData.config.values.discord.prefix),
                                "```"
                            ].join("\n"),
                            color: globalData.config.values.discord.color,
                            timestamp: Date.now()
                        }
                    });
                } else {
                    sentMessage.edit({
                        embed: {
                            title: "Unknown",
                            description: "This command was not recognized",
                            color: globalData.config.values.discord.color,
                            timestamp: Date.now()
                        }
                    });
                }
            } else {
                const fields = [];

                Object.keys(this.help).forEach((key) => {
                    fields.push({
                        name: `${key} command`,
                        value: [
                            `${this.help[key].short}\n`,
                            "Usage:```css",
                            this.help[key].args.replace("{prefix}", globalData.config.values.discord.prefix),
                            "```"
                        ].join("\n")
                    });
                });

                sentMessage.edit({
                    embed: {
                        title: "Help",
                        description: "Type `gd?help {command}` for more details",
                        color: globalData.config.values.discord.color,
                        fields: fields,
                        timestamp: Date.now()
                    }
                });
            }
        }).catch(() => 
            message.channel
                .send("An unknown error occurred. Make sure the bot has all message perms allowed."));
    }
}