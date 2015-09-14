'use strict';

var AppDispatcher = require('../dispatcher/webAppDispatcher');
var ActionTypes	 = require('../constants/constants').ActionTypes;
var assign = require('object-assign');
var $ = require('jquery');
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
});

Store.getMapData = function(id) {
	return mapData;
};

Store.setMapData = function(data) {
	mapData = data;
};

Store.getState = function() {
	return state;
};

Store.setState = function(_state) {
	state = _state;
};

/**
 * request map and then set AppStore data accordingly
 */
Store.requestMap = function() {
	console.log('requesting new map');
	$.ajax({
		type: 'POST',
		url: global.config.server.paths.getMap,
		data: {},
		success: function(data){
			console.log('Data: ', data);
			Store.setMapData(data);
			Store.setState(ActionTypes.BUILD_MAP);
			Store.emitChange();
		},
		error: function(xhr, textStatus, error){
			console.log(xhr.statusText);
			console.log(textStatus);
			console.log(error);
			errorText = xhr.responseText;
			Store.emitChange();
		}
	});
};

Store.dispatchToken = AppDispatcher.register(function(action) {
	state = action.type;
	switch(action.type) {

		case ActionTypes.REQUEST_MAP:
			Store.requestMap();
			break;

		case ActionTypes.BUILD_MAP:
			// just emit change
			break;

		default:
			// do nothing
	}
	Store.emitChange();

});

module.exports = Store;