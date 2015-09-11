;module.exports = (function initGetCountry() {
	'use strict';
	var countries = require('country-list')();

	return {
		/**
		 * Get country from a string which has a hashtag in it
		 * @param {string} string - tweet which has already been evaluated and shown to have the required country
		 */
		getCountry: function(string) {
			var word = '';
			var stringArr = string.split(' ');

			// Loop through array to check each set of words
			for(var i = 0; i < stringArr.length; ++i) {
				// Check length of string and if it contains a # as the first character
				if(stringArr[i].length === 3 && stringArr[i][0] === '#') {
					// CHeck if string is a valid country by removing hashtag and converting to upper case
					word = stringArr[i].slice(1).toUpperCase();
					if(countries.getName(stringArr[i].slice(1).toUpperCase()) !== undefined) {
						break; 
					}
				}
			}

			return word;
		}
	};
}());