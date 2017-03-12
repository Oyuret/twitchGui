# twitchGui-AngularJS

This project aims to provide GUI for browsing Twitch.tv, as well as starting streams on the Kodi Twitch addon. Built on AngularJS.

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.5.0.

## Getting Started

### Kodi

- Download and install the Kodi [Twitch addon] (https://github.com/StateOfTheArt89/Twitch.tv-on-XBMC) (can be done from within Kodi)
- [Enable](http://kodi.wiki/view/Webserver#Enabling_the_webserver) Kodi JSON-RPC API

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](https://nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](http://bower.io/) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma. (Tests are currently broken)
