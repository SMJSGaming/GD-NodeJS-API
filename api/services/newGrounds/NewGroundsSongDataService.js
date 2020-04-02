/**
 * @class
 * @public
 * @author SMJS
 * @name NewGroundsSongDataService
 * @typedef {Object} NewGroundsSongDataService
 */
module.exports = class NewGroundsSongDataService {

    RequestApi = new (require("../../utilities/newGrounds/RequestApi"));

    service(songId) {
        return new Promise((resolve) => {
            this.RequestApi.utility(null, songId, "load", true).then((response) => {
                if (response && !response.error) {
                    if (typeof response == "object") {
                        resolve([200, {
                            id: response.id,
                            title: response.html.split(`title">`)[1].split("<")[0],
                            artist: response.html.split(`artist">`)[1].split("<")[0],
                            type: response.type_id,
                            duration: `${response.duration}s`,
                            audioType: response.sources[0].type,
                            fileLink: response.sources[0].src
                        }]);
                    } else {
                        resolve([500, {
                            "ERROR": "The NewGrounds Servers are down"
                        }]);
                    }
                } else {
                    resolve([404, {
                        "ERROR": "Not found"
                    }]);
                }
            });
        });
    }
}