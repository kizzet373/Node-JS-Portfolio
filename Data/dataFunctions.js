var dataFunctions = [];
var fs = require('fs');
var cheerio = require("cheerio");
var request = require("request");
var urls = ["https://www.mtggoldfish.com/index/XLN#paper","https://www.mtggoldfish.com/index/AKH#paper","https://www.mtggoldfish.com/index/AER#paper","https://www.mtggoldfish.com/index/KLD#paper","https://www.mtggoldfish.com/index/MS2#paper"];
//var urls = ["https://www.mtggoldfish.com/index/XLN#paper"];


dataFunctions.addUser = function(firstName,lastName){
	var user = lastName + "," + firstName + "\n";
	fs.appendFile(__dirname + "/../output.txt", user);
}

dataFunctions.getMtgPriceList = function(req, res){
	//var finishedStreams = 0;
	for(index in urls){
		fs.writeFile(__dirname + "/../Data/" + urls[index].substring(34,37) + "WebScrapingData.txt", "");
		
		let html = "";
		let webScrapeRequest = request(urls[index]);
		
		webScrapeRequest.on('data', function(data){
			html += data;
		});
		
		webScrapeRequest.on('end', function(){
			let $ = cheerio.load(html);
			let paperClass = ".tablesorter-bootstrap-popover-paper";
			let onlineClass = ".tablesorter-bootstrap-popover-online";
			let regex = /((\+|-)?(\d+\.\d+))%$/;
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
			
			//filtering
			for(i=cards.length-1; i >= 0; i--){
				if(parseFloat(regex.exec(cards[i].dailyPriceChange)[3]) < 10){
					cards.splice(i,1);
				}
			}
			
			for (i=0; i < cards.length; i++){
				console.log(cards[i].name + ": " + cards[i].price + " - " + cards[i].dailyPriceChange + " - " + cards[i].cardSet);			
			}
			
			console.log(cards);
			fs.appendFile(__dirname + "/../Data/" + urls[index].substring(34,37) + "WebScrapingData.txt", JSON.stringify(cards));
			//finishedStreams++;
		});
	}
	/*while(finishedStreams != 4){
		debugger;
		setTimeout(function(){}, 500);
	}*/
	//finishedStreams = 0;
	//res.end(data)
}

module.exports = dataFunctions;