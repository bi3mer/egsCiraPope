;module.exports = (function initWebApp() {
	'use strict';

	// Requirements
	var App   = require('./components/app.react');
	var React = require('react');
	global.config = require('../config');

	window.React = React;

	// Begin react rendering
	React.render(
		<App />,
		document.getElementById('main')
	);
}());