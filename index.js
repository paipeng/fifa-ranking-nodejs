var http = require('http');

var express = require('express');

var app = express();

/*
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({result: 'success'}));
    res.end();
});
*/

function convertRankingToJson(html, server_res) {
    var tabletojson = require('tabletojson');
    var tablesAsJson = tabletojson.convert(html);

    server_res.writeHead(200, {'Content-Type': 'application/json'});
    server_res.write(JSON.stringify(tablesAsJson));
    server_res.end();
}


function getRanking(server_res) {
    var url = "http://www.fifa.com/fifa-world-ranking/ranking-table/men/index.html";
    http.get(url, function(res) {
        console.log("http get fifa result");
        var data = '';
        res.on("data", function(chunk) {
            data += chunk;
        });
        res.on("end", function(chunk) {
            convertRankingToJson(data, server_res);
        })
    }).on('error', function(e) {
        console.log("http get error " + e.message);
        server_res.writeHead(200, {'Content-Type': 'application/json'});
        server_res.write(JSON.stringify({result: 'error ', message: e.message}));
        server_res.end();
    });

}

app.get('/ranking', function (req, res) {
    /*
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({result: 'success'}));
    res.end();
    */
    getRanking(res);
});
app.listen(3004);
