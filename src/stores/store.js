'use strict';

var AppDispatcher = require('../dispatcher/webAppDispatcher');
var ActionTypes	 = require('../constants/constants').ActionTypes;
var $ = require('jquery');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

// Map data
var mapData = null;

// State
var state = ActionTypes.REQUEST_MAP;

// TODO: add to config file
var CHANGE_EVENT = 'change';

var Store = assign({}, EventEmitter.prototype, {
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	/**s
	 * @param {function} callback
	 */
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	getMapData: function(id) {
		return mapData;
	},

	requestMap: function() {
		console.log('here!');
		$.ajax({
			type: 'POST',
			url: global.config.server.paths.getMap,
			data: {},
			success: function(data){
				console.log(data);
				mapData = data;
				AppStore.emitChange();
			},
			error: function(xhr, textStatus, error){
				console.log(xhr.statusText);
				console.log(textStatus);
				console.log(error);
				errorText = xhr.responseText;
				AppStore.emitChange();
			}
		});
	},

	getState: function() {
		return state;
	},

	setState: function(_state) {
		state = _state;
	}
});

Store.dispatchToken = AppDispatcher.register(function(action) {
	switch(action.type) {

		case ActionTypes.REQUEST_MAP:
			this.requestMap();
			Store.emitChange();
			break;

		case ActionTypes.BUILD_MAP:
			Store.emitChange();
			break;

		default:
			// do nothing
	}

});

module.exports = Store;