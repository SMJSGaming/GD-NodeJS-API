/**
 * @class
 * @public
 * @author SMJS
 * @name AllSongsCommand
 * @typedef {Object} AllSongsCommand
 */
module.exports = class AllSongsCommand {

    NewGroundsAllSongsDataService = new (require("../services/newGrounds/NewGroundsAllSongsDataService"))

    DiscordEmbedConstructor = new(require("../utilities/discord/DiscordEmbedConstructor"));

    /**
     * @async
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method command
     * @summary A command to request all songs
     * @description A command giving data about all songs of a newgrounds user
     * @param {Object} message 
     * @param {Object} globalData 
     * @param {String[]} args {Artist}
     */
    command(message, globalData, args) {
        message.channel.send({
            embed: {
                description: "Processing the data..."
            }
        }).then((sentMessage) => {
            this.NewGroundsAllSongsDataService.service(args[0]).then((response) => {
                this.DiscordEmbedConstructor.utility(response, 
                                                    message, 
                                                    sentMessage, 
                                                    globalData, 
                                                    `${args[0] || "No one"}'s songs`);
            });
        });
    }
}