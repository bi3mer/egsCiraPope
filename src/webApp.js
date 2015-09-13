;module.exports = (function initWebApp() {
	'use strict';

	// Get Database
	var Database  = require('./databaseLayer/databaseDispatcher');

	return {
		sendMapData: function(res) {
			Database.getStats(function(response) {
				if(response === undefined) {
					res.status(500);
				} else {
					res.status(200);
					res.send(response);
				}

				res.end();
			});
		}
	}
}());