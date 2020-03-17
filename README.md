# GD NodeJS API

[![](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)‌‌ ‌
[![](https://img.shields.io/badge/Version-0.3.0-brightgreen.svg)](https://github.com/SMJSGaming/GD-NodeJS-API/blob/master/package.json#L3) ‌
![](https://img.shields.io/badge/Progress-60%25-blue.svg) ‌
[![](https://img.shields.io/badge/Node_Version-13.7.0-026E00.svg?logo=Node.js)](https://nodejs.org/en/)‌‌ ‌
[![](https://img.shields.io/badge/Donations-Paypal-1546A0.svg?logo=PayPal)](https://www.paypal.me/smjsgaming)‌‌ ‌
[![](https://img.shields.io/badge/Discord-Support-7289DA.svg?logo=Discord)](https://discord.gg/RRgWMyt)‌‌ ‌

A NodeJS Geometry Dash API meant to purpose as one of the easiest to extend, update and use APIs in the game.

## Features

* Full endpoint request API.
* CCLocalLevels.dat save file to level selection.
* CCLocalLevels.dat save file to json data for a specific level index.
* A raw CCLocalLevels.dat json translation API.
* A value translation API.
* Express web server support.

## Express URLs

* `/api/docs/` The API documentation (unfinished).
* `/api/save/level/` The level selection page from a level save.
* `/api/save/level/raw/` The raw translation of a level save.
* `/api/save/level/json/` The full translation of a level save.
* `/api/save/level/{index}/` The selective full translation of a level in the level save.
* `/api/endpoint/` The endpoint API index page.
* `/api/endpoint/{type}/{values}/` The endpoint request API.
* `/api/valueNames/{navigation}/` The list for every GD format value name navigated by the URL.
* `/api/docs/` The base of the new documentations.

## How to install the API

1. Install the project as a zip.
2. Unzip it on the location you want the project to be hosted from.
3. Install [NodeJS](https://nodejs.org/en/).
4. Open a Powershell terminal in the folder where the project is located.
5. Run the command `npm i; npm run start`.
6. Check if it sends startup info back. If so it works.

## How to configure the API
The values refer to the values in [The config file](https://github.com/SMJSGaming/GD-NodeJS-API/blob/master/config.json),  
The word `all` refers to everything in that object.

* settings
    * logging
        * errorLogging: If the application should log errors or not.
    * analytics
        * allowChartInteraction: If the user is allowed to disable chart lines.
        * showBrowserVisits: If the user is allowed to see the browser info from visitors.
    * endpoints
        * all: If the specific endpoint should be enabled and tested.
    * expressWebServer: If the express server should be initialized.
* values
    * webServer
        * port: On what port the server should run.
    * analytics
        * refreshRateMs: What the analytics endpoint refresh rate should be.
        * chartRoundOn: On what number the chart should round.
        * maxErrorsPer100Visits: How many errors 100 visits on average is allowed to have.
    * endpoints
        * targetServer: What server should be targeted for the endpoint request API.

## How to contribute to the API

Follow all the steps in [The contribution information](https://github.com/SMJSGaming/GD-NodeJS-API/blob/master/CONTRIBUTING.md).

## Credits
<details>

* Miko
    * Decoding gzip.
    * Helping with general NodeJS features.
* 101arrowz 
    * Cleaning up some parts of the code.
* cos8o
    * General geometry dash info.
</details>

## Upcoming updates
<details>

* CI/CD.
* Gherkin tests.
* Style check.
* Auto generated API docs.
* Discord support.
* More value translations.
* Translation support for all save files.
* Documentations for all encryptions/encodings Geometry Dash uses.
* GD method documentations (cut candidate).
</details>