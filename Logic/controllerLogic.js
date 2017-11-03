var controllerLogic = [];

controllerLogic.addNavigationBar = function(view){
	let navibar = fs.readFileSync(__dirname + '/../Views/navibar.html');
	
	let $ = cheerio.load(view);
	$("#navibar-placeholder").replaceWith(navibar.toString());
	return $.html();
}

module.exports = controllerLogic;