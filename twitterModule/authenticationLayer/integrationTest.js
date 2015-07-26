(function initAuthIntegrationTest() {
	'use strict';

	global.config = require('../config');
	var Authentication = require('./auth');


	Authentication.init(function integrationAuthCallback() {
		console.log(Authentication.isValid('colan rulez'));
		console.log(Authentication.isValid('asdfkajs;dflskf ;aslkdfj a arschloch'));
	});
}());