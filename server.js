;(function initServer() {
    'use strict';

    // Create config file
    global.config = require('./config'); // define config as global

    // Web app requriements
    var ServerApp = require('./src/serverApp');

    // NPM requires
    var express    = require('express');
    var bodyParser = require('body-parser');
    var ejs        = require('ejs');
    var path       = require('path');
    var app        = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // render for terms request
    app.engine('.html', ejs.renderFile);
    app.set('view engine', 'ejs');
    app.set('bin', path.join(__dirname, 'bin'));
    app.use(express.static(path.join(__dirname, 'bin')));

    // Paths
    app.post(global.config.server.paths.getMap, function requestMapData(req, res) {
    	ServerApp.sendMapData(res);
    });

    // Open server up to calls
    app.listen(global.config.server.port, function serverListen() {
        console.log('Listening on port', global.config.server.port);
   });
}());