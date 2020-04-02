/**
 * @class
 * @public
 * @author SMJS
 * @name NewGroundsAllSongsDataService
 * @typedef {Object} NewGroundsAllSongsDataService
 */
module.exports = class NewGroundsAllSongsDataService {

    RequestApi = new (require("../../utilities/newGrounds/RequestApi"));

    service(artist) {
        return new Promise(async (resolve) => {
            let response = {};
            let pages = "";
            let output = [];

            for (let i = 1; (response && response.more) || i == 1; i++) {
                response = await this.RequestApi.utility(artist, i, "page", true);
                if (response && !response.errors) {
                    if (typeof response == "object") {
                        Object.keys(response.years).forEach((key) => {
                            pages += response.years[key].items.join("");
                        });
                    } else {
                        resolve([500, [
                            {
                                "ERROR": "The NewGrounds Servers are down"
                            }
                        ]]);
                    }
                } else {
                    resolve([404, [
                        {
                            "ERROR": "Not found"
                        }
                    ]]);
                }
            }

            pages.split(/\/\/www.newgrounds.com\/audio\/listen\//g).splice(1).forEach((data) => {
                output.push({
                    id: data.split(`"`)[0],
                    name: data.split(`title="`)[1].split(`">`)[0]
                });
            });

            resolve([200, output]);
        });
    }
}