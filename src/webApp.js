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
	}, 1000);

	// Cotninuos calls
	setInterval(function() {
		console.log('here!');
		Actions.requestMap();
	}, global.config.webApp.timeOut);

	window.React = React;

	// Begin react rendering
	React.render(
		<App />,
		document.getElementById('main')
	);
}());