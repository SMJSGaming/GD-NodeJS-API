/**
 * @class
 * @public
 * @author SMJS
 * @name ValueNameCommand
 * @typedef {Object} ValueNameCommand
 */
module.exports = class ValueNameCommand {

    ValueNameDataService = new (require("../services/valueName/ValueNameDataService"));

    DiscordEmbedConstructor = new(require("../utilities/discord/DiscordEmbedConstructor"));

    /**
     * @async
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method command
     * @summary A command to get value translations
     * @description A command giving a lot of GD value translations. `?` represents unknown
     * @param {Object} message 
     * @param {Object} globalData 
     * @param {String[]} args {?Navigation[]}
     */
    command(message, globalData, args) {
        message.channel.send({
            embed: {
                description: "Processing the data..."
            }
        }).then((sentMessage) => {
            this.DiscordEmbedConstructor.utility(this.ValueNameDataService.service(args),
                                                message,
                                                sentMessage,
                                                globalData,
                                                "Value names");
        });
    }
}