var React = require('react');
var AppStore = require('../stores/store');
var states = {
	BUILD_MAP: require('./dataMap.react'),
	REQUEST_MAP: require('./requestMap.react')
};

;module.exports = React.createClass({
	/**
	 * Create updateds when change  is found
	 */
	_onChange: function(){
		this.forceUpdate();
	},

	/**
	 * Add change listener to app store
	 */
	componentWillMount: function(){
		AppStore.addChangeListener(this._onChange);
	},

	/** 
	 * Render datamap to the screen
	 */
	render: function() {
		var renderState = states[AppStore.getState()];
		console.log('Render: ', AppStore.getState());
		return(
			<renderState />
		);
	}
});
