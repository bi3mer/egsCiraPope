;module.exports = (function initWebApp() {
	'use strict';

	// Requirements
	var React = require('react');
	var App   = require('./components/app.react');
	var Actions = require('./actions/actions');
	
	global.config = require('../config');
	require('./actions/actions').requestMap();

	window.React = React;

	// Begin react rendering
	React.render(
		<App />,
		document.getElementById('main')
	);
}());