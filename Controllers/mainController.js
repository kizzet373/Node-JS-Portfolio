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
			getGetMethod(req,res);
			break;
		case 'POST':
			getPostMethod(req,res);
			break;
		case 'PUT':
			break;
		case 'DELETE':
			break;
	}
};

var getGetMethod = function(req,res){
	switch(req.url){
		
		//VIEWS
		
		case '/facebookFeed':
		case '/alphaMaskExample':
		case '/mtgPrices':
		case '/mazeGenerator':
		case '/2dTreeGenerator':
		case '/3dTreeGenerator':
		case '/contact':{
			let view = controllerLogic.setupView(req, res, fs.readFileSync(globals.paths.Views + req.url + ".html", 'utf8'));
			res.end(view);
			break;
		}
		case '/':
		case '/home':{
			let template = fs.readFileSync(globals.paths.Views + '/home.mustache', 'utf8');
			let introduction = "Hello, I am Kirk!";
			let view = Mustache.to_html(template.toString(), {introduction});
			view = controllerLogic.setupView(req, res, view);
			res.end(view);
			break;
		}
		case '/mtgPricesMustache':{
			let template = fs.readFileSync(globals.paths.Views + '/mtgPrices.mustache', 'utf8');		
			let cards = dataFunctions.getMtgPriceListMustache(req,res);
			let view = Mustache.to_html(template.toString(), {cards});
			view = controllerLogic.setupView(req, res, view);
			res.end(view);
			break;
		}
		case '/asyncTest':{				
				var html = "";
				let stream = fs.createReadStream(globals.paths.Views + '/home.html')
				stream.on('data',function(data){
					html += data;
				})
				stream.on('end',function(){
					let view = controllerLogic.setupView(req, res, html);
					res.end(view);
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
		
		case '/tablesorterDarkTheme.css':
		case '/tablesorterMetroDarkTheme.css':
		case '/tablesorterDefaultTheme.css':
		case '/tablesorterMaterializeTheme.css':
		case '/facebookFeedStylesheet.css':
		case '/mtgPricesStylesheet.css':
		case '/bootstrap.min.css':
		case '/homeStylesheet.css':
		case '/homeStylesheet.css':
		case '/navibarStylesheet.css':{
			res.writeHead(200, {'Content-Type': 'text/css'});
			fs.createReadStream(globals.paths.Styles + req.url).pipe(res);
			break;
		}
		
		//SCRIPTS
		
		case '/mazeGenerator.js':			
		case '/p5.js':			
		case '/p5.dom.js':			
		case '/2dTreeGenerator.js':	
		case '/3dTreeGenerator.js':	
		case '/navibar.js':			
		case '/mtgPrices.js':			
		case '/mtgPricesMustache.js':			
		case '/alphaMaskExample.js':			
		case '/jquery.tablesorter.js':			
		case '/onHoverHover.js':			
		case '/facebookFeed.js':
		case '/jquery-3.1.1.min.js':{
			res.writeHead(200, {'Content-Type': 'text/javascript'});
			fs.createReadStream(globals.paths.Scripts + req.url).pipe(res);
			break;
		}
			
		//Images
		case '/moonwalk.jpg':
		case '/blueGradient.jpg':{
			fs.readFile(globals.paths.Images + req.url, function(err, image) {
				if (err) throw err;
				res.writeHead(200, {'Content-Type': 'image/jpeg'});
				res.end(image);
			});
			break;
		}
		case '/mask.png':{
			fs.readFile(globals.paths.Images + "/mask.png", function(err, image) {
				if (err) throw err;
				res.writeHead(200, {'Content-Type': 'image/png'});
				res.end(image);
			});
			break;
		}
		//Data
		
		case '/api/ninjas':{
			var ninjas =  [{name: 'ryu', age: 29}, {name: 'yoshi', age: 32}];
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify(ninjas));
			break;
		}
		case '/getAERPriceList':
		case '/getAKHPriceList':
		case '/getKLDPriceList':
		case '/getMS2PriceList':
		case '/getXLNPriceList':{
			dataFunctions.getMtgPriceList(req,res);			
			break;
		}
		case '/api/updatePriceList':{		
			dataFunctions.updateMtgPriceList(req, res);			
			break;
		}
			
		//NOT FOUND	
			
		default:{
			let error = "Couldn't find " + req.url;
			console.log(error);
			let template = fs.readFileSync(globals.paths.Views + '/404.mustache');
			let view = Mustache.to_html(template.toString(), {error});
			
			res.writeHead(404, {'Content-Type': 'text/html'});
			res.end(view);
			break;
		}
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
							fs.createReadStream(globals.paths.Views + '/home.html').pipe(res);
							break;
						default:
							res.writeHead(200, {'Content-Type': 'text/html'});
							res.end("<span>Whooops</span>");
							break;
					}
				}
			}
			break;
	}
	return res;
};

module.exports = mainController;