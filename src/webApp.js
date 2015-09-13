;module.exports = (function initWebApp() {
	'use strict';

	// Requirements
	var App   = require('./components/app');
	var React = require('react');

	// Begin react rendering
	React.render(
		<APP />,
		document.getElementById('main')
	);
}());