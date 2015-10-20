;module.exports = (function initWebApp() {
	'use strict';

	// Requirements
	var React = require('react');
	var App   = require('./components/app.react');
	var Actions = require('./actions/actions');
	
	global.config = require('../config');

	// Call after a few seconds of loading
	setTimeout(function() {
		Actions.requestMap();
		Actions.requestTweet();
	}, 1000);

	// Cotninuos map calls
	setInterval(function() {
		console.log('here!');
		Actions.requestMap();
	}, global.config.webApp.mapTimeOut);

	// Cotninuos map calls
	setInterval(function() {
		Actions.requestTweet();
	}, global.config.webApp.tweetTimeout);

	window.React = React;

	// Begin react rendering for data map
	React.render(
		<App />,
		document.getElementById('main')
	);
}());