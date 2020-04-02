/**
 * @class
 * @public
 * @author SMJS
 * @name EndpointCommand
 * @typedef {Object} EndpointCommand
 */
module.exports = class EndpointCommand {

    GdEndpointDataService = new (require("../services/gdEndpoint/GdEndpointDataService"));

    DiscordEmbedConstructor = new(require("../utilities/discord/DiscordEmbedConstructor"));

    /**
     * @async
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method command
     * @summary A command to request a gd endpoint
     * @description A command giving the parsed JSON data from a gd endpoint. These endpoints are:
     * user,
     * userList,
     * comments,
     * accountComments,
     * commentHistory,
     * maps,
     * gauntlets,
     * song,
     * leaderBoard,
     * level,
     * daily,
     * weekly
     * @param {Object} message 
     * @param {Object} globalData 
     * @param {String[]} args {Type} {?Values[]}
     */
    command(message, globalData, args) {
        message.channel.send({
            embed: {
                description: "Processing the data..."
            }
        }).then((sentMessage) => {
            this.GdEndpointDataService.service(args, globalData).then((response) => {
                this.DiscordEmbedConstructor.utility(response, 
                                                    message, 
                                                    sentMessage, 
                                                    globalData, 
                                                    `${args[0] || "all"} endpoint`);
            });
        });
    }
}