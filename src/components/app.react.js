var React       = require('react');
var AppStore    = require('../stores/store');
var ActionTypes = require('../constants/constants').ActionTypes;
var DataMap     = require('./dataMap.react.js');
var RequestMap  = require('./requestMap.react.js')

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
		switch(AppStore.getState()) {

			case ActionTypes.REQUEST_MAP:
				return ( <RequestMap />);
				break;

			case ActionTypes.BUILD_MAP:
				return ( 
					<DataMap />	
				);
				break;

			default:
				console.error('Unkexpected error in app rendering');
				break;
		}
	}
});
