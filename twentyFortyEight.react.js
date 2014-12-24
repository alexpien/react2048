var TwentyFortyEightApp = React.createClass({
	getInitialState() {
		return {
			gameState: [
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 2],
				[2, 0, 0, 0]
			],
		}
	},

	componentDidMount: function() {
	  window.addEventListener("keydown", this.keyPress);
	},
	componentWillUnmount: function() {
	  window.removeEventListener("keydown", this.keyPress);
	},

	keyPress(e) {
		var newGameState = [];
		if (e.key === 'Right') {
			this.state.gameState.forEach( function(row, index){
				newGameState[index] = row.squash();
			}.bind(this));
		}
		else if (e.key === 'Left') {
			this.state.gameState.forEach( function(row, index){
				newGameState[index] = row.reverse().squash().reverse();
			}.bind(this));
		}
		else if (e.key === 'Up' || e.key === 'Down') {
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
			if (e.key === 'Down') {
				rotatedGameState.forEach( function(row, index){
					newRotatedGameState[index] = row.squash();
				}.bind(this));
			}
			if (e.key === 'Up') {
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

		var emptySpaces = []
		for (var i = 0; i < newGameState.length; i++) {
			for (var j = 0; j < newGameState[0].length; j++) {
				if (newGameState[i][j] === 0) {
					emptySpaces.push([i, j]);
				}
			}
		}
		if (emptySpaces.length > 0 ) {
			var addHere = emptySpaces[Math.floor(Math.random()*emptySpaces.length)];
			newGameState[addHere[0]][addHere[1]] = 2;
		} else {
			this.setState({
				gg: true,
			});
		}

		this.setState({
			gameState: newGameState,
		});
	},

	render() {
		var gridRows=[]
		this.state.gameState.forEach(function(row) {
			var gridCells = [];
			row.forEach(function(cell) {
				gridCells.push(
					<div className="cell">{cell}</div>
				);
			});
			gridRows.push(
				<li>{gridCells}</li>
			);
		});
		return (
			<div>
				<ul>
					{gridRows}
				</ul>
			</div>
		);
	}
});

React.render(
	<TwentyFortyEightApp />,
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