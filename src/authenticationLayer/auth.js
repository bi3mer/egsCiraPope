;module.exports = (function initAuth() {
	'use strict';
	var fs        = require('fs');
	var countries = require('i18n-iso-countries');

	var badWords  = [];
	
	return {
		// TODO: comment this!	
		populateBadWordsFile: function(index, self, callback, oldCallback) {
			fs.readFile('/' + __dirname + '/dirtyWords/' + global.config.auth.lists[index], 'utf8', function (err,data) {
				if (err) {
					console.error('Error found in populateBadWordsFile: ', err);
					console.error('working directory: ', __dirname);
					console.error('dirtyWords/' + global.config.auth.lists[index]);

					return;
				}

				var data = data.split('\n');
				for(var i = 0; i <data.length; ++i) {
					if(data[i] !== '') {
						badWords.push(data[i]);
					}
				}

				callback(index + 1, self, oldCallback);
			});
		},

		// TODO: comment this!
		populateBadWords: function(index, self, callback) {
			if(index < global.config.auth.lists.length) {
				self.populateBadWordsFile(index, self, self.populateBadWords, callback);
			} else {
				callback();
			}
		},

		// TODO: comment this!
		init: function(callback) {
			this.populateBadWords(0, this, callback);
		},

		// TODO: comment this and modularize this!
		isValid: function(string) {
			var returnObj = {
				isValid: false,
				country: undefined
			}

			// Check dirty words
			var isValidString = true;
			for(var i = 0; i < badWords.length; ++i) {
				if(string.indexOf(badWords[i]) >= 0){
					isValidString = false;
					break;
				}
			}

			// check country codes
			if(isValidString) {
				// Reset is valid for logic
				isValidString = false;

				// Split array by spaces
				var stringArr = string.split(' ');

				// Loop through array to check each set of words
				for(var i = 0; i < stringArr.length; ++i) {
					// Check length of string and if it contains a # as the first character
					if(stringArr[i].length === 4 && stringArr[i][0] === '#') {
						// CHeck if string is a valid country by removing hashtag and converting to upper case
						var country = stringArr[i].slice(1).toUpperCase();
						if(countries.getName(country, "en") !== undefined) {
							returnObj.isValid = true;
							returnObj.country = country;
							break;
						}
					}
				}
			}

			return returnObj;
		}
	}
}());