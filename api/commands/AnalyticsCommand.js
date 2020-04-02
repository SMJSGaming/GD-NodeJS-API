/**
 * @class
 * @public
 * @author SMJS
 * @name AnalyticsCommand
 * @typedef {Object} AnalyticsCommand
 */
module.exports = class AnalyticsCommand {

    /**
     * @private
     * @type {Function}
     * @name calculateHealth
     */
    calculateHealth = (new (require("../services/analytics/AnalyticsDataService"))).calculateHealth;

    /**
     * @async
     * @private
     * @type {Function}
     * @name timeTest
     */
    timeTest = require("../background/OpenLoop").INSTANCE.timeTest;

    /**
     * @async
     * @public
     * @since 0.3.0
     * @version 0.1.0
     * @method command
     * @summary A command giving all the analytics
     * @description A command giving analytics about the API and bot about:
     * response times,
     * uptime
     * and server health
     * @param {Object} message 
     * @param {Object} globalData 
     * @param {String[]} args None
     * @param {Object} client 
     */
    command(message, globalData, args, client) {
        const keys = Object.keys(globalData.graphEntries);
        let currentTime = 0;

        message.channel.send({
            embed: {
                description: "Processing the data..."
            }
        }).then(async (sentMessage) => {
            for (let i in keys) {
                if (globalData.config.settings.endpoints
                    [`enable${globalData.graphEntries[keys[i]].settingsName}Endpoint`]) {
                    try {
                        currentTime += await this.timeTest(globalData.graphEntries[keys[i]], keys[i]);
                    } catch(error) {
                        globalData.errorFunc(error, "analytics-base", globalData);
                    }
                }
            }
            currentTime /= Object.keys(globalData.graphEntries).length;

            sentMessage.edit({
                embed: {
                    title: "Analytics",
                    description: "The bot analytics",
                    color: globalData.config.values.discord.color,
                    fields: [
                        {
                            name: "Response time",
                            value: `**API**: \`${Math.round(currentTime)}ms\`
                                **Bot**: \`${Math.round(sentMessage.createdAt - message.createdAt - currentTime)}ms\``
                        },
                        {
                            name: "Uptime",
                            value: `**API**: \`${this.msToTime(Date.now() - globalData.startDate)}\`
                                **Bot**: \`${this.msToTime(client.uptime)}\``
                        },
                        {
                            name: "Health",
                            value: `${this.calculateHealth(globalData)}%`
                        }
                    ],
                    timestamp: Date.now()
                }
            }).catch(() => 
                sentMessage.edit("An unknown error occurred. Make sure the bot has all message perms"));
        });
    }

    msToTime(ms) {
        const days = Math.floor(ms / 86400000);
        const daysMs = ms % 86400000;
        const hours = Math.floor(daysMs / 3600000);
        const hoursMs = ms % 3600000;
        const minutes = Math.floor(hoursMs / 60000);
        const minutesMs = ms % 60000;
        const sec = Math.floor(minutesMs / 1000);    
        let string = "";

        if (days) string += days + "d";
        if (hours) string += hours + "h";
        if (minutes) string += minutes + "m";
        if (sec) string += sec + "s";
      
        return string;
      }
}