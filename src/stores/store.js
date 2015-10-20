'use strict';

var AppDispatcher = require('../dispatcher/webAppDispatcher');
var ActionTypes	 = require('../constants/constants').ActionTypes;
var assign = require('object-assign');
var $ = require('jquery');
var EventEmitter = require('events').EventEmitter;

// Map data
var mapData = null;

// State
var mapState   = ActionTypes.REQUEST_MAP;
var tweetState = ActionTypes.REQUEST_TWEET;
var highlightedCountry = '';

// TODO: add to config file
var CHANGE_EVENT = 'change';

var Store = assign({}, EventEmitter.prototype, {
	/**s
	 * Emits change to listener on change
	 * @param {function} callback
	 */
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	/**s
	 * Adds listener to when changes are made to the store
	 * @param {function} callback
	 */
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	/**s
	 * Removess listener to when changes are made to the store
	 * @param {function} callback
	 */
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
	return mapState;
};

Store.setState = function(_state) {
	mapState = _state;
};

Store.getTweetState = function() {
	return tweetState;
};

Store.setTweetState = function(_tweetState) {
	tweetState = _tweetState;
};

Store.setHighlighedCountry = function(country) {
	highlightedCountry = country;
};

Store.getHighlighedCountry = function() {
	return highlightedCountry;
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
			console.error("ERROR on request map!: ");
			console.error(xhr.statusText);
			console.error(textStatus);
			console.error(error);
			errorText = xhr.responseText;
			Store.emitChange();
		}
	});
};

Store.dispatchToken = AppDispatcher.register(function(action) {
	switch(action.type) {

		case ActionTypes.REQUEST_MAP:
			Store.setMapData(null);
			mapState = action.type;
			Store.requestMap();
			break;

		case ActionTypes.BUILD_MAP:
			mapState = action.type;
			break;

		case ActionTypes.REQUEST_TWEET:
			Store.requestTweet();
			break;

		default:
			// do nothing
	}
	Store.emitChange();

});

module.exports = Store;