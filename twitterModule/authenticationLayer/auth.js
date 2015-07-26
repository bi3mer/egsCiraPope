module.exports = (function initAuth() {
	'use strict';
	var fs = require('fs');

	var badWords = [];
	
	return {
		populateBadWordsFile: function(index, self, callback, oldCallback) {
			fs.readFile(global.config.auth.directory + global.config.auth.lists[index], 'utf8', function (err,data) {
				if (err) {
					return console.log(err);
				}

				var data = data.split('\n');
				for(var i = 0; i <data.length; ++i) {
					if(data[i] != '') {
						badWords.push(data[i]);
					}
				}

				callback(index + 1, self, oldCallback);
			});
		},

		populateBadWords: function(index, self, callback) {
			if(index < global.config.auth.lists.length) {
				self.populateBadWordsFile(index, self, self.populateBadWords, callback);
			} else {
				callback();
			}
		},

		init: function(callback) {
			this.populateBadWords(0, this, callback);
		},

		isValid: function(string) {
			var isValidString = true;
			for(var i = 0; i < badWords.length; ++i) {
				if(string.indexOf(badWords[i]) >= 0){
					isValidString = false;
					break;
				}
			}

			return isValidString;
		}
	}
}());