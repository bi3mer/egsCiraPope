module.exports = (function initMongoDB() {
	'use strict';

	var mongoose = require('mongoose');

	// Connect to mongo
	var options = {
		db: { 
			native_parser: true 
		}, server: { 
			poolSize: 5,
			keepAlive: 1 
		}
	};

	mongoose.connect(global.config.mongo.url, options);

	// Template for all objects inside of daatabase
	var tweetSchema = new mongoose.Schema({
		tweet: String,
		viewed: Boolean
	});

	// Access Point to Database
	var Tweet = mongoose.model(global.config.mongo.model, tweetSchema);

	return {
		/**
		 * Store tweet in database
		 * @param {string} tweet - string to be stored in database
		 */
		addTweet: function(tweet) {
			var newTweet = Tweet({
				tweet: tweet,
				viewed: false
			});

			console.log(tweet);
			console.log(newTweet);

			newTweet.save(function createNewCustomer(err, response){
				// TODO: add error logging
				console.log('success');
			});
		},

		disconnect: function() {
			mongoose.disconnect();
		}
	}
}());