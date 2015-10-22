module.exports = (function initMongoDB() {
	'use strict';

	var mongoose  = require('mongoose');
	var countries = require('i18n-iso-countries');

	mongoose.connect(global.config.mongo.url, global.config.mongo.options);

	// Template for all objects inside of daatabase
	var tweetSchema = new mongoose.Schema({
		country: String,
		tweets: [{
			tweet: String,
			user: String,
		}]
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

	// TODO: document
	function createNewCountry(newTweet, country) {
		console.log('creating new country!');
		// Country doens't exist, create new array and palce in new array 
		var newCountry = {};
		newCountry.country = country;
		newCountry.tweets  = [newTweet];

		console.log('here2: ', newCountry);
		// Save new country to database
		Tweet(newCountry).save(function mongoSaveNewCustomer(err, response) {
			console.log('here3');
			if(err) {
				console.error('Error: ', err, response);
			} else {
				console.log('Saved new country');
			}
		});
	};

	// TODO: document
	function pushToExistingCountry(newTweet, country) {
		// Country exists, append to array
		Tweet.update({country: country}, {
			$push: {
				tweets: newTweet
			}
		}, {upsert: true}, function(err, model) {
			if(err) {
				console.error(err);
			} else {
				console.log('Pushed new tweet');
			}
		});
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
				var newTweet = {
					tweet: tweet,
					user: user
				};

				// Console out basic info
				console.log('new tweet: ', newTweet);

				// Query database to see if country exists
				var query = {};
				query.country = country

				Tweet.find(query, function mongoTestTweet(err, countryExists){
					console.dir(countryExists);
					if(countryExists && countryExists.length > 0) {
						console.log('pushing to existing country: ', country);
						pushToExistingCountry(newTweet, country);
					} else {
						console.log('creating new country: ', country);
						createNewCountry(newTweet, country);
					}
				});
			} else {
				console.error("invalid country");
			}
		},

		/**
		 * Get stats and return in the callback
		 * @param {function} callback
		 */
		getStats: function(callback) {
			// empty query to find all
			Tweet.find({}, function mongoGetStats(err, countries) {
				if(err) {
					callback(undefined);
				} else {
					// Empty object to hold data
					var countryArr = [];

					for(var country in countries) {
						countryArr.push({
							country: countries[country].country,
							count: countries[country].tweets.length
						});
					}

					// Construct for front end format and callback
					callback(countryArr);
				}
			});
		},

		// TODO: document
		getTweet: function(query, callback) {
			Tweet.find(query, function mongoGetTweet(err, countries) {
				// get random country
				var countryLength = countries.length;
				var countryIndex = 0;
				if(countryLength > 0) {
					countryIndex = Math.floor(Math.random() * countries.length);
				}

				// Get random tweet
				var length = 0;
				if(countries[countryIndex] && countries[countryIndex].tweets) {
					length = countries[countryIndex].tweets.length;
					var index = 0;
					if(length > 1) {
						index = Math.floor(Math.random() * countries[countryIndex].tweets.length);
					}

					// remove _id
					delete countries[countryIndex].tweets[index]._id;

					// Send tweet info back
					callback(countries[countryIndex].tweets[index]);
				}  else {
					callback(global.config.server.tweets.noTweetFoundText);
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