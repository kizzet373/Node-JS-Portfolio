var controllerLogic = [];

//node_modules
let fs = require("fs");
let cheerio = require("cheerio");


controllerLogic.addNavigationBar = function(view){
	let navibar = fs.readFileSync(__dirname + '/../Views/navibar.html');
	let $ = cheerio.load(view.toString());
	console.log($.html());
	console.log(view.toString());
	$("#navibar-placeholder").replaceWith(navibar.toString());
	return $.html();
}

module.exports = controllerLogic;