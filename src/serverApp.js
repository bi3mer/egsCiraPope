;module.exports = (function initServerApp() {
	'use strict';

	// Get Database
	var Database  = require('./databaseLayer/databaseDispatcher');

	return {
		/**
		 * get stats from database and return in res if succesful
		 * @param {object} res - object given in post request
		 */
		sendMapData: function(res) {
			Database.getStats(function(response) {
				console.log(response);
				if(response === undefined) {
					res.status(500);
				} else {
					res.status(200);
					res.send(response);
				}

				res.end();
			});
		},

		// TODO: document
		sendTweet: function(body, res) {
			var query = body
			console.log('query: ', query);
			if(body.country === '') {
				query = {}
			}

			Database.getTweet(query, function(tweet) {
				if(tweet === undefined) {
					res.status(500);
				} else {
					res.status(200);
					res.send(tweet);
				}
				res.end();
			})
		},
	}
}());