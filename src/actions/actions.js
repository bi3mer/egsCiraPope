;module.exports = (function initActions() {
	'use strict';

	var AppDispatcher = require('../dispatcher/webAppDispatcher');
	var ActionTypes   = require('../constants/constants').ActionTypes;

	return {
		/**
		 * Dispatch action to create an actiontype of requesting map info
		 */
		requestMap: function() {			AppDispatcher.dispatch({
				type: ActionTypes.REQUEST_MAP,
			});
		},

		/**
		 * Dispatch action to create an actiontype of building a map
		 */
		makeMap: function() {
			AppDispatcher.dispatch({
				type: ActionTypes.BUILD_MAP,
			});
		}
	};
}());