var http = require('http');
var express = require('express');
var app = express();
var mainController = require(__dirname + '/Controllers/mainController.js');
var querystring = require('querystring');

/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));*/

var server = http.createServer(function(req, res){
	console.log('request was made from: ' + req.url);
    var body = '';

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        req.body = querystring.parse(body);
        console.log(req.body);
		mainController.getActionMethod(req, res);
    });
});

server.listen(3000, '127.0.0.1');
console.log("now listening to port 3000");