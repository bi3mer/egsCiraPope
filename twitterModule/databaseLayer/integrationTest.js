(function initDataIntegrationTest() {
	'use strict';

	global.config = require('../config');
	var database = require('./databaseDispatcher');	

	database.addTweet('colan rulez');

	database.disconnect();
}());