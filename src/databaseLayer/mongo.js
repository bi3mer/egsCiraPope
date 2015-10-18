module.exports = (function initMongoDB() {
	'use strict';

	var mongoose  = require('mongoose');
	var countries = require('i18n-iso-countries');

	mongoose.connect(global.config.mongo.url, global.config.mongo.options);

	// Template for all objects inside of daatabase
	var tweetSchema = new mongoose.Schema({
		tweet: String,
		user: String,
		country: String
	});

	// Access Point to Database
	var Tweet = mongoose.model(global.config.mongo.modelTweet, tweetSchema);

	// Private functions
	/**
	 * Check if the country is valid
	 * @param {String} country
	 * @return {Boolean}
	 */
	function checkValidCountry(country) {
		var countryValid = false
		if(countries.getName(country, "en") !== undefined) {
			countryValid = true
		}
		return countryValid;
	};

	/**
	 * TODO: document this
	 */
	function constructReturnStats(stats) {
		var countryArr = [];

		for(var key in stats) {
			countryArr.push({
				country: key,
				count: stats[key]
			});
		}

		return countryArr;
	};

	return {
		/**
		 * Store tweet in database
		 * @param {string} tweet - string to be stored in database
		 */
		addTweet: function(tweet, user, country) {
			console.log('user received: ', user);

			if(checkValidCountry(country)) {
				// Create tweet to store to database
				var newTweet = Tweet({
					tweet: tweet,
					user: user,
					country: country
				});

				// Console out basic info
				console.log(newTweet);

				// Save to database
				newTweet.save(function createNewCustomer(err, response){
					if(err) {
						console.error(err);
					} else {
						console.log('success');
					}
				});
			}
		},

		/**
		 * Get stats and return in the callback
		 * @param {function} callback
		 */
		getStats: function(callback) {
			// empty query to find all
			Tweet.find({}, function mongoGetStats(err, tweets) {
				if(err) {
					callback(undefined);
				} else {
					// Empty object to hold data
					var returnData = {};

					// Loop through data to get stats
					for(var index in tweets) {
						if(returnData[tweets[index].country]) {
							returnData[tweets[index].country]++;
						} else {
							returnData[tweets[index].country] = 1
						}
					}

					// Construct for front end format and callback
					callback(constructReturnStats(returnData));
				}
			});
		},

		/** 
		 * Disconnect from mongodb
		 */
		disconnect: function() {
			mongoose.disconnect();
		}
	}
}());