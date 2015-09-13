;module.exports = (function initApp() {
	'use strict';

	// Requirements
	global.config      = require('../config');
	var Twitter        = require('twitter');
	var Database       = require('./databaseLayer/databaseDispatcher');
	var Authentication = require('./authenticationLayer/auth');

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
				var obj = Authentication.isValid(tweet.text)
				if(obj.isValid) {
					Database.addTweet(tweet.text);
					Database.addStats(obj.country);
					console.log('tweet and stats added');
				}
			});

			stream.on('error', function(error) {
				console.log('error found', error.stack);
			});
		});
	});
}());