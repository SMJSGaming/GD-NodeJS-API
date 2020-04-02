module.exports = class RequestApi {

    https = require("https");

    utility(artist, extraInfo, type, shouldBeJson) {
        return new Promise((resolve) => {
            artist = `${(artist || "www").replace(/[^a-zA-Z0-9\-]+$/, "").replace(/(\r\n|\n|\r)/gm, "")}.`;

            const options = {
                hostname: `${artist}newgrounds.com`,
                port: 443,
                path: `/audio/${type}/${extraInfo}`,
                method: "GET",
                headers: {
                    "x-requested-with": "XMLHttpRequest"
                }
            };

            if (!shouldBeJson) {
                options.path = `/${extraInfo}`
                options.headers["x-requested-with"] = null;
            }

            this.https.get(options, (res) => {
                let data = "";
    
                res.on('data', (chunk) => {
                    data += chunk;
                });
    
                res.on('end', () => {
                    if (shouldBeJson) {
                        try {
                            resolve(JSON.parse(data));
                        } catch (error) {
                            resolve(data);
                        }
                    } else {
                        resolve(data);
                    }
                });
            }).on("error", () => {
                resolve(null);
            });
        });
    }
}