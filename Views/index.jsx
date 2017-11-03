var React = require('react');
var CreateReactClass = require("create-react-class");

module.exports = CreateReactClass({
	render: function() {
		/*change createElement when react is version 16*/
		var Component = CreateReactClass({
			render: function() {
				return <h1>Hello World</h1>;
			}
		});
	}
});