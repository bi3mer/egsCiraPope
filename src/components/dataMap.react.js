var React = require('react');
var AppStore = require('../stores/store');
require('../../node_modules/datamaps/dist/datamaps.world.js');

;module.exports = React.createClass({
	/**
	 * Find highest count
	 * @param {object} mapData
	 */
	getHightestCountry: function(mapData) {
		var largest = null;
		if(mapData.length > 0) {
			// set largest to first element
			largest = mapData[0].count;

			// loop through the rest
			for(var i = 1; i < mapData.length; ++i) {
				if(mapData[i].count > largest) {
					largest = mapData[i].count;
				}
			}
		}
		return largest;
	},

	/**
	 * Add colors to map countries based on tweet counts compared to highest country
	 * @param {object} mapData
	 */
	addMapColors: function(mapData) {
		// Get largest tweet count
		var largest = this.getHightestCountry(mapData);

		// Assign colors based on percentages
		for(var i = 0; i < mapData.length; ++i) {
			mapData[i].color = 'defaultFill';

			// find proper color
			for(var j = 0; j < global.config.webApp.colorPercentages.length; ++j) {
				if(largest * global.config.webApp.colorPercentages[i].percentage < mapData[i].count) {
					mapData[i].color = global.config.webApp.colorPercentages[i].color;
					break;
				}
			}
		}
	},

	/**
	 * Create datamaps obj by grabbing from appstore the data
	 * @return {object} - json containing information for datamaps to populate screen
	 */
	 createDataMapsObj: function() {
	 	// Basic map style
	 	var mapStyle = {
			geographyConfig: {
				popupTemplate: function(geography, data) {
					var tweets = 0;
					if(data && data.tweets) {
						tweets = data.tweets;
					}
				    return '<div class="hoverinfo">' + geography.properties.name + '\nTweets: ' +  tweets + '</div>';
			    },
			},
			element: document.getElementById('map'),
			fills: global.config.webApp.colors, 
			data: {},
			done: function(datamap) {
				datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
					console.error("Must release action to set store variable: ", geography.properties.name)
				});
			}
		};

		// Get Map Data
		var mapData = AppStore.getMapData();
		console.log(mapData);

		// fill in map data with required colors
		this.addMapColors(mapData);

		// Populate map style
		for(var i = 0; i < mapData.length; ++i) {
			console.log(mapData[i].country);
			console.log(mapData[i].count);
			mapStyle.data[mapData[i].country] = {};
			mapStyle.data[mapData[i].country].tweets = mapData[i].count;
			mapStyle.data[mapData[i].country].fillKey = mapData[i].color;
		}

		// clear map data
		AppStore.setMapData(null);

	 	return mapStyle;
	 },

	renderMap: function() {
	 	var self = this;
		setTimeout(function(){
			console.log('doc: ', document.getElementById('map'))
			if(document.getElementById('map') !== undefined && document.getElementById('map') !== null) {
				// Clear HTML text
				document.getElementById('map').innerHTML = '';

				// Create Map
				new Datamap(self.createDataMapsObj());
			} else {
				// If object has not yet been made, wait and then call again recursively to check 
				console.log('rendermap soon!');
				self.renderMap();
			}
		}, global.config.webApp.mapTimeOut); 
	},

	/** 
	 * prep render map to screen
	 */
	render: function() {
		this.renderMap();

		// Create div
		return ( 
			<div id="map" style={global.config.webApp.divStyle}>
				Error: reload page if not populated in the 5 seconds.
			</div>
		);
	}
});
