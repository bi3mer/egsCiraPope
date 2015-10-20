;module.exports = (function initWebApp() {
	'use strict';

	// Requirements
	var React = require('react');
	var App   = require('./components/app.react');
	var Actions = require('./actions/actions');
	var $ = require('jquery');
	
	global.config = require('../config');

	var requestTweet = function() {
		console.log('requesting new tweet');
		$.ajax({
			type: 'POST',
			url: global.config.server.paths.getTweet,
			data: {
				country: ''
			},
			success: function(data) {
				document.getElementById('twitterStream').innerHTML = data.user + ' says: ' +  data.tweet;
			},
			error: function(xhr, textStatus, error) {
				console.error(xhr.statusText);
				console.error(textStatus);
				console.error(error);
			}
		});
	};

	// Call after a few seconds of loading
	setTimeout(function() {
		Actions.requestMap();
		requestTweet();
	}, 1000);

	setInterval(function() {
		Actions.requestMap();
	}, global.config.webApp.mapTimeOut);

	setInterval(function() {
		requestTweet();
	}, global.config.webApp.tweetTimeout);

	window.React = React;

	// Begin react rendering for data map
	React.render(
		<App />,
		document.getElementById('main')
	);
}());