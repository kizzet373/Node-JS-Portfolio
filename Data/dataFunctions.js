var dataFunctions = {};
var fs = require('fs');
var cheerio = require("cheerio");
var https = require('https');
var request = require("request");
var urls = ["https://www.mtggoldfish.com/index/XLN#paper","https://www.mtggoldfish.com/index/AKH#paper","https://www.mtggoldfish.com/index/AER#paper","https://www.mtggoldfish.com/index/KLD#paper","https://www.mtggoldfish.com/index/MS2#paper"];
var completedRequests = 0;
var contentDir = __dirname + "/Content";


dataFunctions.addUser = function(firstName,lastName){
	var user = lastName + "," + firstName + "\n";
	fs.appendFile(contentDir + "/output.txt", user);
}

dataFunctions.updateMtgPriceList = function(req, res){
	for(let index in urls){
		fs.writeFile(contentDir + "/" + urls[index].substring(34,37) + "WebScrapingData.txt", "");
		
		let html = "";
		let webScrapeRequest = request(urls[index]);
		
		webScrapeRequest.on('data', function(data){
			html += data;
		});
		
		webScrapeRequest.on('end', function(){
			let $ = cheerio.load(html);
			let paperClass = ".tablesorter-bootstrap-popover-paper";
			let onlineClass = ".tablesorter-bootstrap-popover-online";		
			let cards = [];
			let tableRows = $(paperClass + ' tbody tr');
			
			//get card name
			for(i = 0; i < tableRows.length; i++){
				cards[i] = {};
				cards[i].name = $(tableRows[i]).children('td:nth-child(1)').text().trim();
				cards[i].price = $(tableRows[i]).children('td:nth-child(4)').text().trim();
				cards[i].dailyPriceChange = $(tableRows[i]).children('td:nth-child(6)').text().trim();
				cards[i].cardSet = urls[index].substring(34,37);
			};
			
			fs.appendFile(contentDir + "/" + urls[index].substring(34,37) + "WebScrapingData.txt", JSON.stringify(cards));
			
			completedRequests++;
			console.log("on end completed requests: " + completedRequests);
			
			if(completedRequests == urls.length){
				completedRequests = 0;
				res.writeHead(200, {'Content-Type': 'text'});
				res.end("Updated!");
			}
			console.log();
		});
	}
}

dataFunctions.getMtgPriceList = function(req, res){
	let data = "";
	let regex = /((\+|-)?(\d+\.\d+))%$/;
	fs.createReadStream(contentDir + "/" + req.url.substring(4,7) + "WebScrapingData.txt")
	.on('data', function(chunk) {	
		data += chunk;
	})
	.on('end', function(){				
		if(data != ""){
			var cards = JSON.parse(data);
			//filtering
			for(i=cards.length-1; i >= 0; i--){				
				var html = "";
				
				for(i=cards.length-1; i >= 0; i--){
					if(parseFloat(regex.exec(cards[i].dailyPriceChange)[3]) < 7){
						cards.splice(i,1);
					}
					else{
						console.log(cards[i].name + ": " + cards[i].price + " - " + cards[i].dailyPriceChange + " - " + cards[i].cardSet);		
						
						html += 
						"<tr>" +
							"<td>" + cards[i].name + "</td>" +
							"<td>" + cards[i].price + "</td>" +
							"<td>" + cards[i].dailyPriceChange + "</td>" +
							"<td>" + cards[i].cardSet + "</td>" + 
						"</tr>";
					}						
				}
				console.log("pulled " + cards.length + " cards!");
				console.log();
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(html);
			}
		}
	});
}

dataFunctions.getMtgPriceListMustache = function(req , res){
	let regex = /((\+|-)?(\d+\.\d+))%$/;
	let data = fs.readFileSync(contentDir + "/XLNWebScrapingData.txt")				
	if(data != ""){
		var cards = JSON.parse(data);
		//filtering
		for(i=cards.length-1; i >= 0; i--){				
			var html = "";
			
			for(i=cards.length-1; i >= 0; i--){
				if(parseFloat(regex.exec(cards[i].dailyPriceChange)[3]) < 7){
					cards.splice(i,1);
				}
				else{
					console.log(cards[i].name + ": " + cards[i].price + " - " + cards[i].dailyPriceChange + " - " + cards[i].cardSet);		
				}					
			}
			console.log("pulled " + cards.length + " cards!");
			console.log();
			return cards;
		}
	}
}

module.exports = dataFunctions;