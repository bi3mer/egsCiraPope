var React = require('react');
var AppStore = require('../stores/store');
var DataMaps = require('datamaps');

;module.exports = React.createClass({
	/**
	 * Create datamaps obj by grabbing from appstore the data
	 * @return {object} - json containing information for datamaps to populate screen
	 */
	 createDataMapsObj: function() {
	 	return {};
	 },

	/** 
	 * Render datamap to the screen
	 */
	render: function() {
		// TODO: test without creating the var and just using new Datamap
		//var map = new DataMap(this.createDataMapsObj());
		console.log('get map data: ', AppStore.getMapData());
		return (
			<h1>
				TODO: update this bad boy to write map
			</h1>
		);
	}
});
