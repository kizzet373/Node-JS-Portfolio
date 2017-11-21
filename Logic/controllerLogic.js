var controllerLogic = [];

//node_modules
let fs = require("fs");
let cheerio = require("cheerio");


controllerLogic.addNavigationBar = function(view){
	let navibar = fs.readFileSync(__dirname + '/../Views/navibar.html');
	console.log(view.toString());
	let $ = cheerio.load(view.toString());
	$("#navibar-placeholder").replaceWith(navibar.toString());
	return $.html();
}

controllerLogic.setupView = function(req, res, view){
	view = controllerLogic.addNavigationBar(view);
	res.writeHead(200, {'Content-Type': 'text/html'});
	return view;
}

module.exports = controllerLogic;