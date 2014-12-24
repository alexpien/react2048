var TwentyFortyEightApp = React.createClass({
	getInitialState() {
		console.log("here");
		return {
			gameState: [
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 2],
				[2, 0, 0, 0]
			],
		}
	},

	render() {
		return (
			<div>{this.state.gameState[0]}</div>
	
		);
	}
});
console.log("hello");
React.render(
	<TwentyFortyEightApp />,
	document.getElementById('container')
);