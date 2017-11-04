var mainController = [];
var globals = require(__dirname + "/../globals.js");

//node modules
var Mustache = require("mustache");
var fs = require('fs');
var bodyParser = require("body-parser");
var cheerio = require("cheerio");

//my modules
var dataFunctions = require(globals.paths.Data + "/dataFunctions.js");
var reactTranspiler = require(globals.paths.Logic + "/reactTranspiler.js");
var controllerLogic = require(globals.paths.Logic + "/controllerLogic.js");


	
mainController.getActionMethod = function(req, res){
	switch(req.method){
		case 'GET':
			res = getGetMethod(req,res);
			break;
		case 'POST':
			res = getPostMethod(req,res);
			break;
		case 'PUT':
			break;
		case 'DELETE':
			break;
	}
	return res;
};

var getGetMethod = function(req,res){
	switch(req.url){
		
		//VIEWS
		
		case '/':
		case '/home':{
			let view = fs.readFileSync(globals.paths.Views + '/index.html');
			view = controllerLogic.addNavigationBar(view);
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(view);
			break;
		}
		case '/contact':{
			let view = fs.readFileSync(globals.paths.Views + '/contact.html');
			view = controllerLogic.addNavigationBar(view);
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(view);
			break;
		}
		case '/mazeGenerator':{
			let view = fs.readFileSync(globals.paths.Views + '/mazeGenerator.html');
			view = controllerLogic.addNavigationBar(view);
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(view);
			break;
		}
		case '/2dTreeGenerator':{
			let view = fs.readFileSync(globals.paths.Views + '/2dTreeGenerator.html');
			view = controllerLogic.addNavigationBar(view);
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(view);
			break;
		}
		case '/mtgPrices':{
			let view = fs.readFileSync(globals.paths.Views + '/mtgPrices.html');
			view = controllerLogic.addNavigationBar(view);
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(view);
			break;
		}
		case '/alphaMaskExample':{
			let view = fs.readFileSync(globals.paths.Views + '/alphaMaskExample.html');
			view = controllerLogic.addNavigationBar(view);
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(view);
			break;
		}
		case '/reactIndex':{
			reactTranspiler.transpileView(req, res, '/reactIndex');
			break;
		}
		case '/mtgPricesMustache':{
			let template = fs.readFileSync(globals.paths.Views + '/mtgPrices.mustache');		
			var cards = dataFunctions.getMtgPriceListMustache(req,res);
			let view = Mustache.to_html(template.toString(), {cards});
			view = controllerLogic.addNavigationBar(view);
			
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(view);
			break;
		}
		case '/asyncTest':{				
				var html = "";
				fs.createReadStream(globals.paths.Views + '/index.html')
				.on('data',function(data){
					html += data;
				})
				.on('end',function(){
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.end(html);
				});
			break;
		}
			
		//PARTIAL VIEWS	
			
		case '/navibar.html':{
			res.writeHead(200, {'Content-Type': 'text/html'});
			fs.createReadStream(globals.paths.Views + '/navibar.html').pipe(res);
			break;		
		}
		//STYLESHEETS		
			
		case '/navibarStylesheet.css':
			res.writeHead(200, {'Content-Type': 'text/css'});
			fs.createReadStream(globals.paths.Styles + '/navibarStylesheet.css').pipe(res);
			break;
		case '/indexStylesheet.css':
			res.writeHead(200, {'Content-Type': 'text/css'});
			fs.createReadStream(globals.paths.Styles + '/indexStylesheet.css').pipe(res);
			break;
		case '/bootstrap.min.css':
			res.writeHead(200, {'Content-Type': 'text/css'});
			fs.createReadStream(globals.paths.Styles + '/bootstrap.min.css').pipe(res);
			break;
		case '/mtgPrices.css':
			res.writeHead(200, {'Content-Type': 'text/css'});
			fs.createReadStream(globals.paths.Styles + '/mtgPrices.css').pipe(res);
			break;
		case '/tablesorterDarkTheme.css':
			res.writeHead(200, {'Content-Type': 'text/css'});
			fs.createReadStream(globals.paths.Styles + '/tablesorterDarkTheme.css').pipe(res);
			break;
		case '/tablesorterMetroDarkTheme.css':
			res.writeHead(200, {'Content-Type': 'text/css'});
			fs.createReadStream(globals.paths.Styles + '/tablesorterMetroDarkTheme.css').pipe(res);
			break;
		case '/tablesorterDefaultTheme.css':
			res.writeHead(200, {'Content-Type': 'text/css'});
			fs.createReadStream(globals.paths.Styles + '/tablesorterDefaultTheme.css').pipe(res);
			break;
		case '/tablesorterMaterializeTheme.css':
			res.writeHead(200, {'Content-Type': 'text/css'});
			fs.createReadStream(globals.paths.Styles + '/tablesorterMaterializeTheme.css').pipe(res);
			break;
			
		//SCRIPTS
		
		case '/jquery-3.1.1.min.js':
			res.writeHead(200, {'Content-Type': 'text/javascript'});
			fs.createReadStream(globals.paths.Scripts + '/jquery-3.1.1.min.js').pipe(res);
			break;
		case '/mazeGenerator.js':
			res.writeHead(200, {'Content-Type': 'text/javascript'});
			fs.createReadStream(globals.paths.Scripts + '/mazeGenerator.js').pipe(res);
			break;
		case '/p5.js':
			res.writeHead(200, {'Content-Type': 'text/javascript'});
			fs.createReadStream(globals.paths.Scripts + '/p5.js').pipe(res);
			break;
		case '/p5.dom.js':
			res.writeHead(200, {'Content-Type': 'text/javascript'});
			fs.createReadStream(globals.paths.Scripts + '/p5.dom.js').pipe(res);
			break;
		case '/2dTreeGenerator.js':
			res.writeHead(200, {'Content-Type': 'text/javascript'});
			fs.createReadStream(globals.paths.Scripts + '/2dTreeGenerator.js').pipe(res);
			break;
		case '/navibar.js':
			res.writeHead(200, {'Content-Type': 'text/javascript'});
			fs.createReadStream(globals.paths.Scripts + '/navibar.js').pipe(res);
			break;
		case '/mtgPrices.js':
			res.writeHead(200, {'Content-Type': 'text/javascript'});
			fs.createReadStream(globals.paths.Scripts + '/mtgPrices.js').pipe(res);
			break;
		case '/mtgPricesMustache.js':
			res.writeHead(200, {'Content-Type': 'text/javascript'});
			fs.createReadStream(globals.paths.Scripts + '/mtgPricesMustache.js').pipe(res);
			break;
		case '/alphaMaskExample.js':
			res.writeHead(200, {'Content-Type': 'text/javascript'});
			fs.createReadStream(globals.paths.Scripts + '/alphaMaskExample.js').pipe(res);
			break;
		case '/jquery.tablesorter.js':
			res.writeHead(200, {'Content-Type': 'text/javascript'});
			fs.createReadStream(globals.paths.Scripts + '/jquery.tablesorter.js').pipe(res);
			break;
		case '/onHoverHover.js':
			res.writeHead(200, {'Content-Type': 'text/javascript'});
			fs.createReadStream(globals.paths.Scripts + '/onHoverHover.js').pipe(res);
			break;
			
		//Images
		
		case '/blueGradient.jpg':
			fs.readFile(globals.paths.Images + "/blueGradient.jpg", function(err, image) {
				if (err) throw err;
				res.writeHead(200, {'Content-Type': 'image/jpeg'});
				res.end(image);
			});
			break;
		case '/mask.png':
			fs.readFile(globals.paths.Images + "/mask.png", function(err, image) {
				if (err) throw err;
				res.writeHead(200, {'Content-Type': 'image/png'});
				res.end(image);
			});
			break;
		case '/moonwalk.jpg':
			fs.readFile(globals.paths.Images + "/moonwalk.jpg", function(err, image) {
				if (err) throw err;
				res.writeHead(200, {'Content-Type': 'image/jpeg'});
				res.end(image);
			});
			break;
			
		//Data
		
		case '/api/ninjas':
			var ninjas =  [{name: 'ryu', age: 29}, {name: 'yoshi', age: 32}];
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(ninjas));
			break;
		case '/getAERPriceList':
		case '/getAKHPriceList':
		case '/getKLDPriceList':
		case '/getMS2PriceList':
		case '/getXLNPriceList':
			dataFunctions.getMtgPriceList(req,res);			
			break;
		case '/api/updatePriceList':		
			dataFunctions.updateMtgPriceList(req, res);			
			break;
			
		//NOT FOUND	
			
		default:
			let error = "Couldn't find " + req.url;
			console.log(error);
			let template = fs.readFileSync(globals.paths.Views + '/404.mustache');
			let view = Mustache.to_html(template.toString(), {error});
			
			res.writeHead(404, {'Content-Type': 'text/html'});
			res.end(view);
			break;
	}
};

var getPostMethod = function(req,res){
	switch(req.url){
		case '/':
		case '/home':
			for(key in req.body){
				if(req.body[key]==="Submit"){
					switch(key){
						case "nameForm":
							dataFunctions.addUser(req.body.firstName,req.body.lastName);
							fs.createReadStream(globals.paths.Views + '/index.html').pipe(res);
							break;
						default:
							res.writeHead(200, {'Content-Type': 'text/html'});
							res.end("<span>Whooops</span>");			
							break;
					}
					return res;
				}
			}
			break;
	}
	return res;
};

module.exports = mainController;