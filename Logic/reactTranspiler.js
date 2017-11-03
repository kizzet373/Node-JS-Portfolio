var reactTranspiler = {};
var React = require('react');
var ReactDOMServer = require('react-dom/server');

reactTranspiler.transpileView = function(req, res, url){
	switch(url){
		case '/reactIndex':
		
			var view = require(__dirname + '/../Views/index.jsx')
			console.log(view);
			break;
	}
}

module.exports = reactTranspiler;