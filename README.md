# GD NodeJS API

[![](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)‌‌ ‌
[![](https://img.shields.io/badge/Version-0.2.0-brightgreen.svg)](https://github.com/SMJSGaming/GD-NodeJS-API/blob/master/package.json#L3) ‌
![](https://img.shields.io/badge/Progress-20%25-blue.svg) ‌
[![](https://img.shields.io/badge/NPM_Version-6.13.6-e21515.svg?logo=NPM)](https://www.npmjs.com/)‌‌ ‌
[![](https://img.shields.io/badge/Node_Version-13.7.0-026E00.svg?logo=Node.js)](https://nodejs.org/en/)‌‌ ‌
[![](https://img.shields.io/badge/Donations-Paypal-1546A0.svg?logo=PayPal)](https://www.paypal.me/smjsgaming)‌‌ ‌
[![](https://img.shields.io/badge/Discord-Support-7289DA.svg?logo=Discord)](https://discord.gg/RRgWMyt)‌‌ ‌

An API for all kinds of Geometry Dash features as continuation on the [GDDocs](https://github.com/SMJSGaming/GDDocs) by [Cos8o](https://github.com/Cos8o) and [SMJS](https://github.com/SMJSGaming).


## Features

* Full endpoint request API
* CCLocalLevels.dat save file to level selection
* CCLocalLevels.dat save file to json data for a specific level index
* A raw CCLocalLevels.dat json translation API
* Names for value documentation


## URLS

* `/api/` The API index
* `/api/level/` The main level API page
* `/api/levelraw/` The page where you get the raw json of the levels save file
* `/api/level/jon/` The full json format of the levels save including level data parsing
* `/api/level/:levelIndex/` The selective levels save API page
* `/api/endpoint/` The main endpoint API page
* `/api/endpoint/:type/:values?/` The selective endpoint API
* `/api/valueNames/:root?/` The list for every GD format value name with route being separated by `-`


## How to install

1. Install the project as a zip
2. Unzip it on the location you want the project to be hosted from
3. Install NodeJS
4. Open a Powershell console in the folder where the project is located
5. Run the command `npm i; npm run start`
6. Test if it runs the server address


## Credits

* Cos8o
* Miko
* 101arrowz


## Upcoming updates

* Better documentations
* More value translations
* Translation support for all save files
* Documentations for all encryptions
* Hack documentations
* Process analytics
* GD method documentations (Might be removed)