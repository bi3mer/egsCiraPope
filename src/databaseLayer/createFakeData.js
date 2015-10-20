(function initMongoDB() {
	'use strict';
	global.config = require('../../config');
	var Database  = require('./databaseDispatcher');
	
	setTimeout(function(){
		Database.addTweet('colan is awesome #CAN 2', '@Coaln', 'CAN');
		setTimeout(function() {
			Database.addTweet('colan is awesome #CAN 2', '@Coaln', 'CAN');
			Database.addTweet('colan is awesome #CAN 2', '@Coaln', 'CAN');
			Database.addTweet('colan is awesome #CAN 2', '@Coaln', 'CAN');
		}, 2000);

		Database.addTweet('colan is awesome #RUS 2', '@Coaln', 'RUS');
		setTimeout(function() {
			Database.addTweet('colan is awesome #RUS 2', '@Coaln', 'RUS');
			Database.addTweet('colan is awesome #RUS 2', '@Coaln', 'RUS');
			Database.addTweet('colan is awesome #RUS 2', '@Coaln', 'RUS');
			Database.addTweet('colan is awesome #RUS 2', '@Coaln', 'RUS');
			Database.addTweet('colan is awesome #RUS 2', '@Coaln', 'RUS');
			Database.addTweet('colan is awesome #RUS 2', '@Coaln', 'RUS');
		}, 2000);

		Database.addTweet('colan is awesome #BRA 2', '@Coaln', 'BRA');

		Database.addTweet('colan is awesome #USA 2', '@Coaln', 'USA');
		setTimeout(function() {
			Database.addTweet('colan is awesome #USA 2', '@Coaln', 'USA');
			Database.addTweet('colan is awesome #USA 2', '@Coaln', 'USA');
			Database.addTweet('colan is awesome #USA 2', '@Coaln', 'USA');
			Database.addTweet('colan is awesome #USA 2', '@Coaln', 'USA');
			Database.addTweet('colan is awesome #USA 2', '@Coaln', 'USA');
			Database.addTweet('colan is awesome #USA 2', '@Coaln', 'USA');
			Database.addTweet('colan is awesome #USA 2', '@Coaln', 'USA');
			Database.addTweet('colan is awesome #USA 2', '@Coaln', 'USA');
			Database.addTweet('colan is awesome #USA 2', '@Coaln', 'USA');
			Database.addTweet('colan is awesome #USA 2', '@Coaln', 'USA');
		}, 2000);

		setTimeout(function() {
			console.log('Disconnecting db');
			Database.disconnect();
		}, 20000);
	}, 2000);
		
}());