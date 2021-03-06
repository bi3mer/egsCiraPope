module.exports = (function initDataDispatcher() {
    'use strict';

    var database = require('./mongo.js');

    return {
        /**
         * Call database tweet to database
         * @param {string} tweet
         */
    	addTweet: function(tweet, user, country) {
    		database.addTweet(tweet, user, country);
    	},

        /**
         * call database to add stats to database based on country
         * @param {string} country
         */
        addStats: function(country) {
            database.addStats(country);
        },

        /**
         * Call database to get stats and return in the callback
         * @param {function} callback
         */
        getStats: function(callback) {
            database.getStats(callback);
        },

        getTweet: function(query, callback) {
            database.getTweet(query, callback);
        },

        /**
         * Disconnect from database
         */
    	disconnect: function() {
    		database.disconnect();
    	}
    }
}());