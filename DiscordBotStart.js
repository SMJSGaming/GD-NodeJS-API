/**
 * @class
 * @public
 * @author SMJS
 * @name DiscordBotStart
 * @typedef {Object} DiscordBotStart
 */
module.exports = class DiscordBotStart {

    /**
     * @private
     * @type {Object}
     * @name client
     */
    client = new (require('discord.js')).Client;

    CaseInsensitiveKeyFind = new (require("./api/utilities/CaseInsensitiveKeyFind"));

    commands = {
        Analytics: new (require("./api/commands/AnalyticsCommand")),
        Endpoint: new (require("./api/commands/EndpointCommand")),
        ValueName: new (require("./api/commands/ValueNameCommand")),
        AllSongs: new (require("./api/commands/AllSongsCommand")),
        SelectiveSong: new (require("./api/commands/SelectiveSongCommand")),
        Help: new (require("./api/commands/HelpCommand"))
    };

    /**
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method init
     * @summary The discord bot initializer
     * @description The init method where all the main event listeners of the bot are started
     * @param {Object} globalData An object containing all the values and methods the application needs
     */
    init(globalData) {
        this.client.login(globalData.config.values.discord.token)

        this.client.on("ready", () => {
            console.log(`\x1b[36mDiscord bot is running on the user\x1b[0m \x1b[31m${this.client.user.tag}\x1b[0m`);
        });

        this.client.on("message", (message) => {
            if (message.author.bot || !message.content.startsWith(globalData.config.values.discord.prefix)) {
                return;
            } else {
                const args = message.content.substring(globalData.config.values.discord.prefix.length).split(" ");
                const command = this.CaseInsensitiveKeyFind.utility(args.shift(), this.commands)[0];

                if (command) {
                    command.command(message, globalData, args, this.client);
                }
            }
        });
    }
}