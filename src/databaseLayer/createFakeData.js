(function initMongoDB() {
	'use strict';
	global.config = require('../../config');
	var Database  = require('./databaseDispatcher');
	
	setTimeout(function(){
		Database.addTweet('#OneLovePhilly EGS is awesome #CAN 2', '@colanRulez', 'CAN');
		setTimeout(function() {
			Database.addTweet('#OneLovePhilly EGS is awesome #CAN 2', '@colanRulez', 'CAN');
			Database.addTweet('#OneLovePhilly EGS is awesome #CAN 2', '@colanRulez', 'CAN');
			Database.addTweet('#OneLovePhilly EGS is awesome #CAN 2', '@colanRulez', 'CAN');
		}, 2000);

		Database.addTweet('#OneLovePhilly EGS is awesome #RUS 2', '@colanRulez', 'RUS');
		setTimeout(function() {
			Database.addTweet('#OneLovePhilly EGS is awesome #RUS 2', '@colanRulez', 'RUS');
			Database.addTweet('#OneLovePhilly EGS is awesome #RUS 2', '@colanRulez', 'RUS');
			Database.addTweet('#OneLovePhilly EGS is awesome #RUS 2', '@colanRulez', 'RUS');
			Database.addTweet('#OneLovePhilly EGS is awesome #RUS 2', '@colanRulez', 'RUS');
			Database.addTweet('#OneLovePhilly EGS is awesome #RUS 2', '@colanRulez', 'RUS');
			Database.addTweet('#OneLovePhilly EGS is awesome #RUS 2', '@colanRulez', 'RUS');
		}, 2000);

		Database.addTweet('#OneLovePhilly EGS is awesome #ZAF 2', '@colanRulez', 'ZAF');
		setTimeout(function() {
			Database.addTweet('#OneLovePhilly EGS is awesome #ZAF 2', '@colanRulez', 'ZAF');
			Database.addTweet('#OneLovePhilly EGS is awesome #ZAF 2', '@colanRulez', 'ZAF');
			Database.addTweet('#OneLovePhilly EGS is awesome #ZAF 2', '@colanRulez', 'ZAF');
			Database.addTweet('#OneLovePhilly EGS is awesome #ZAF 2', '@colanRulez', 'ZAF');
		}, 2000);

		Database.addTweet('#OneLovePhilly EGS is awesome #BRA 2', '@colanRulez', 'BRA');

		Database.addTweet('#OneLovePhilly EGS is awesome #USA 2', '@colanRulez', 'USA');
		setTimeout(function() {
			Database.addTweet('#OneLovePhilly EGS is awesome #USA 2', '@colanRulez', 'USA');
			Database.addTweet('#OneLovePhilly EGS is awesome #USA 2', '@colanRulez', 'USA');
			Database.addTweet('#OneLovePhillyEGS is awesome #USA 2', '@colanRulez', 'USA');
			Database.addTweet('#OneLovePhilly EGS is awesome #USA 2', '@colanRulez', 'USA');
			Database.addTweet('#OneLovePhilly EGS is awesome #USA 2', '@colanRulez', 'USA');
			Database.addTweet('#OneLovePhilly EGS is awesome #USA 2', '@colanRulez', 'USA');
			Database.addTweet('#OneLovePhilly EGS is awesome #USA 2', '@colanRulez', 'USA');
			Database.addTweet('#OneLovePhilly EGS is awesome #USA 2', '@colanRulez', 'USA');
			Database.addTweet('#OneLovePhilly EGS is awesome #USA 2', '@colanRulez', 'USA');
			Database.addTweet(' #OneLovePhillyEGS is awesome #USA 2', '@colanRulez', 'USA');
		}, 2000);

		setTimeout(function() {
			console.log('Disconnecting db');
			Database.disconnect();
		}, 20000);
	}, 2000);
		
}());