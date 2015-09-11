module.exports = (function initMongoDB() {
	'use strict';

	var mongoose  = require('mongoose');
	var countries = require('country-list')();

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
	});

	var statSchema = new mongoose.Schema({
		country: String,
		count:   Number
	});

	// Access Point to Database
	var Tweet = mongoose.model(global.config.mongo.modelTweet, tweetSchema);
	var Stats = mongoose.model(global.config.mongo.modelStats, statSchema);

	// Private functions
	function saveNewValidCountry(country) {
		var newStat = Stats({
			country: country,
			count: 1
		});

		newStat.save(function createNewCustomer(err, response){
			if(err) {
				console.error('Error saving new stat: ', err);
			} else {
				console.log('New country added to stats!');
			}
		});
	};

	function checkValidCountry(country) {
		if(countries.getName(country) !== undefined) {
			saveNewValidCountry(country);
		}
	};

	return {
		/**
		 * Store tweet in database
		 * @param {string} tweet - string to be stored in database
		 */
		addTweet: function(tweet) {
			var newTweet = Tweet({
				tweet: tweet
			});

			console.log(tweet);
			console.log(newTweet);

			newTweet.save(function createNewCustomer(err, response){
				if(err) {
					console.error(err);
				} else {
					console.log('success');
				}
			});
		},

		/**
		 * Add one to the country
		 */
		addStats: function(country) {
			console.log('here: ', country);
			Stats.findOne({country: country}, function mongoAddStats(err, result) {
				if(!result) {
					checkValidCountry(country);
				} else {
					// Update result variable and prep to save
					++result.count;
					var updateData = result.toObject();
					var id = result._id;
            		delete updateData._id

            		// Update mongo with new data
            		Stats.update({_id: id}, updateData, {upsert: true}, function(err) {
            			if(err) {
            				console.error('Error adding stats: ', err);
            			}
            		});
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