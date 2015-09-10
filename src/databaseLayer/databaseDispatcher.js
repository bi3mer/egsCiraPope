module.exports = (function initDataDispatcher() {
    'use strict';

    var database = require('./mongo.js');

    return {
    	addTweet: function(tweet) {
    		database.addTweet(tweet);
    	},

        addStats: function(country) {
            database.addStats(country);
        },

    	disconnect: function() {
    		database.disconnect();
    	}
    }
}());