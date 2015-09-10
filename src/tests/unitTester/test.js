module.exports = (function initTest() {
	'use strict';

	var Tester = require('./tester');

	return {
		test: function(object) {
			Tester.init(object);
			return Tester;
		},
		skip: function() {
			console.log('Skipping');
		}
	}
}());	