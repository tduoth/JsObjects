/* jshint browser: true */

angular.module('elfGameMod', ['characterMod', 'gameWrapMod'])
.factory('elfGameService', function(gameEventService, people, gameWrap, utility) {
	'use strict';
	return {

		map_grid : null,

		misses: 0,

		bushHits: 0,

		defaultMapGrid : {
			width : 18,
			height : 12,
			tile : {
				width : 32,
				height : 32
			}
		},

		villages : [],

		reportEvent : function(message) {
			return gameEventService.towerBroadcast(message);
		},

		changeDirectionMessage : function(message) {
			return gameEventService.changeDirectionBroadcast(message);
		},

		sendDebugMessage : function(message) {
			return gameEventService.debugBroadcast(message);
		},

		rollD3 : function() {
			return Math.floor(Math.random() * 3) + 1;
		},

		encounterFood : function(food, count) {
			var foodDetails = "Food: {0} (X:{2} Y:{4}) ({1}px - {3}px)";
			var debug = foodDetails.format(count, food.x, food.x / food.w, food.y, food.y / food.h);
			gameEventService.debugBroadcast(debug);
			if (count === 4) {
				gameEventService.encounterBroadcast('Food success');
			} else {
				gameEventService.encounterBroadcast('Food progress');
			}
			return true;
		},

		encounterBush : function(bush, count) {
			var name = 'Tree';
			if (bush.__c.Bush) {
				name = 'Bush'
			}
			var foodDetails = "{5}) {6}: {0} (X:{2} Y:{4}) ({1}px - {3}px)";
			var debug = foodDetails.format(count, bush.x, bush.x / bush.w, bush.y, bush.y / bush.h, this.bushHits++, name);
			gameEventService.debugBroadcast(debug);
			gameEventService.encounterBroadcast('Bush success');
			return true;
		},

		encounter : function(village) {
			village.tower.hitPoints -= this.rollD3(village);
			gameEventService.debugBroadcast(people.heroMain.name);

			gameEventService.debugBroadcast('Tower hit points: ' + village.tower.hitPoints);
			if (village.tower.hitPoints <= 0) {
				gameEventService.encounterBroadcast('success');
				return true;
			} else {
				gameEventService.encounterBroadcast('miss');
				if (this.misses++ > 3) {
					Crafty.trigger('youLose', Crafty);
				}

				return false;
			}
		},

		newVillage : function(village) {
			village.tower = people.tower();
			return this.villages.push(village);
		},

		goLeft : function() {
			Crafty.trigger('goLeft', Crafty);
			return true;
		},

		stopMove : function() {
			Crafty.trigger('stopMove', Crafty);
			return true;
		},

		// Get width of the game screen in pixels
		width : function() {
			return this.map_grid.width * this.map_grid.tile.width;
		},

		// Get height of the game screen in pixels
		height : function() {
			return this.map_grid.height * this.map_grid.tile.height;
		},

		initMapGrid : function(mapGrid) {
			this.map_grid = mapGrid;
		},

		// Initialize and start our game
		start : function(mapGrid) {
			utility.addStringFormat();
			// Start crafty
			var gameDiv = document.getElementById("gameBoard");
			if (mapGrid) {
				this.map_grid = mapGrid;
			} else {
				this.map_grid = this.defaultMapGrid;
			}
			gameWrap.startGame(gameDiv, this);
		}
	};
});

