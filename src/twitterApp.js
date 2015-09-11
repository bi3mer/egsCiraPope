;module.exports = (function initApp() {
	'use strict';

	global.config = require('../config');
	var Twitter   = require('twitter');
	var Database  = require('./databaseLayer/databaseDispatcher');
	var Authentication = require('./authenticationLayer/auth');
	var Stats = require('./logicLayer/stats');

 	// Twitter Access Information
	var client = new Twitter({
		consumer_key: global.config.twitter.clientKey,
		consumer_secret: global.config.twitter.clientSecret,
		access_token_key: global.config.twitter.accessToken,
		access_token_secret: global.config.twitter.accessTokenSecret
	});

	// Initialize Authentication
	Authentication.init(function initAuth() {
		// Access twitter
		client.stream('statuses/filter', {track: global.config.filter}, function(stream) {
			stream.on('data', function(tweet) {
				if(Authentication.isValid(tweet.text)) {
					Database.addTweet(tweet.text);
					Database.addStats(Stats.getCountry(tweet.text));
					console.log('tweet added');
				}
			});
		 
			stream.on('error', function(error) {
				console.log('error found', error.stack);
			});
		});
	});
}());