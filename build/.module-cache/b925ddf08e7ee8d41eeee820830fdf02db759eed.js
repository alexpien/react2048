var TwentyFortyEightApp = React.createClass({displayName: "TwentyFortyEightApp",
	getInitialState: function() {
		return {
			gameState: [
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 2],
				[2, 0, 0, 0]
			],
			gg: false,
		}
	},

	componentDidMount: function() {
		console.log("hey");
	  window.addEventListener("keydown", this.keyPress);
	},
	componentWillUnmount: function() {
	  window.removeEventListener("keydown", this.keyPress);
	},

	keyPress: function(e) {
		console.log(e);
		var newGameState = [];
		var spawnRandom = true;
		if (e.keyCode === 39) {
			this.state.gameState.forEach( function(row, index){
				newGameState[index] = row.squash();
			}.bind(this));
		}
		else if (e.keyCode === 37) {
			this.state.gameState.forEach( function(row, index){
				newGameState[index] = row.reverse().squash().reverse();
			}.bind(this));
		}
		else if (e.keyCode === 38 || e.keyCode === 40) {
			var rotatedGameState = [];
			for (var i = 0; i < this.state.gameState[0].length; i++) {
				for (var j = 0; j < this.state.gameState.length; j++) {
					if (!rotatedGameState[i]) {
						rotatedGameState[i] = [];
					}
					rotatedGameState[i][j] = this.state.gameState[j][i];
				}
			}
			var newRotatedGameState = [];
			if (e.keyCode === 40) {
				rotatedGameState.forEach( function(row, index){
					newRotatedGameState[index] = row.squash();
				}.bind(this));
			}
			if (e.keyCode === 38) {
				rotatedGameState.forEach( function(row, index){
					newRotatedGameState[index] = row.reverse().squash().reverse();
				}.bind(this));
			}
			for (var i = 0; i < newRotatedGameState[0].length; i++) {
				for (var j = 0; j < newRotatedGameState.length; j++) {
					if (!newGameState[i]) {
						newGameState[i] = [];
					}
					newGameState[i][j] = newRotatedGameState[j][i];
				}
			}
		} else {
			return;
		}

		var emptySpaces = [];
		console.log(this.state.gameState.toString(), newGameState.toString());
		if (this.state.gameState.toString() !== newGameState.toString()) {
			for (var i = 0; i < newGameState.length; i++) {
				for (var j = 0; j < newGameState[0].length; j++) {
					if (newGameState[i][j] === 0) {
						emptySpaces.push([i, j]);
					}
				}
			}
		}

		var gg=true;

		if (emptySpaces.length > 0 ) {
			var addHere = emptySpaces[Math.floor(Math.random()*emptySpaces.length)];
			newGameState[addHere[0]][addHere[1]] = 2;
		}

		for (var i = 0; i < newGameState.length; i++) {
			for (var j = 0; j < newGameState[0].length; j++) {
				if (newGameState[i][j] === 0) {
					gg = false;
				}
				if ((i > 0) && (newGameState[i][j] === newGameState[i-1][j])) {
					gg = false;
				}
				if ((j > 0) && (newGameState[i][j] === newGameState[i][j-1])) {
					gg = false;
				}
			}
		}

		this.setState({
			gg: gg,
		});
	},

	render: function() {
		var gridRows=[]
		this.state.gameState.forEach(function(row) {
			var gridCells = [];
			row.forEach(function(cell) {
				gridCells.push(
					React.createElement("div", {className: "cell"}, cell)
				);
			});
			gridRows.push(
				React.createElement("li", null, gridCells)
			);
		});
		return (
			React.createElement("div", null, 
				this.state.gg ? 'game over' : null, 
				React.createElement("ul", null, 
					gridRows
				)
			)
		);
	}
});

React.render(
	React.createElement(TwentyFortyEightApp, null),
	document.getElementById('container')
);

Array.prototype.squash = function() {
	for (var i = 1; i < this.length; i++) {
		if (this[i] === 0) {
			this.splice(i, 1);
			this.unshift(0);
		}
	}
	for (var i = this.length-1; i > -1; i--) {
		if (this[i] === this[i-1]) {
			this[i] = this[i] * 2;
			this[i-1] = 0;
		}	
	}
	for (var i = 1; i < this.length; i++) {
		if (this[i] === 0) {
			this[i] = this[i-1];
			this[i-1] = 0;
		}
	}

	return this;	
}