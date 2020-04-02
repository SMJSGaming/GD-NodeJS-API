/**
 * @class
 * @public
 * @author SMJS
 * @name SelectiveSongCommand
 * @typedef {Object} SelectiveSongCommand
 */
module.exports = class SelectiveSongCommand {

    NewGroundsSongDataService = new (require("../services/newGrounds/NewGroundsSongDataService"));

    DiscordEmbedConstructor = new(require("../utilities/discord/DiscordEmbedConstructor"));

    /**
     * @async
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method command
     * @summary A command to get info from a song
     * @description A command giving info about a NewGrounds song
     * @param {Object} message 
     * @param {Object} globalData 
     * @param {String[]} args {SongID}
     */
    command(message, globalData, args) {
        args[0] = parseInt(args[0]).toString();
        message.channel.send({
            embed: {
                description: "Processing the data..."
            }
        }).then((sentMessage) => {
            this.NewGroundsSongDataService.service(args[0]).then((response) => {
                this.DiscordEmbedConstructor.utility(response,
                                                    message,
                                                    sentMessage,
                                                    globalData,
                                                    `Info from the song ID ${args[0]}`);
                });
        });
    }
}