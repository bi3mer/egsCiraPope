module.exports = (function initDataDispatcher() {
    'use strict';

    var database = require('./mongo.js');

    return {
    	addTweet: function(tweet) {
    		database.addTweet(tweet);
    	},

    	disconnect: function() {
    		database.disconnect();
    	}
    }
}());