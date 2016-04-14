var express = require('express');
var app = express();
var https = require("https");

app.get('/', function(req, res) {
    var url = "https://www.googleapis.com/youtube/v3/videos?id=" +
        "OFvIhHacSG8" +
        "&key=AIzaSyD5r6DidTnUh1vfhNJ8uLA5J1ZB0RfSoGc%20" +
        "&part=snippet,contentDetails,statistics,status,topicDetails,player";

    download(url, function(data) {
        if (data) {
            res.send(data);
        } else console.log("error");
    });
});

app.get('/:id', function(req, res) {

    var url = "https://www.googleapis.com/youtube/v3/videos?id=" +
        req.params.id +
        "&key=AIzaSyD5r6DidTnUh1vfhNJ8uLA5J1ZB0RfSoGc%20" +
        "&part=snippet,contentDetails,statistics,status,topicDetails,player";

    download(url, function(data) {
        var jsonData = JSON.parse(data);
        if (jsonData) {
            res.send(jsonData.items[0].player.embedHtml + "<br>" +
                jsonData.items[0].snippet.title + '<br>' +
                jsonData.items[0].snippet.description);
        } else console.log("error");
    });

});

app.listen(3000);

function download(url, callback) {
    https.get(url, function(res) {
        var data = "";
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on("end", function() {
            callback(data);
        });
    }).on("error", function() {
        callback(null);
    });
}
