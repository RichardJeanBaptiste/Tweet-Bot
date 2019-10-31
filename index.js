var express = require('express');
var app = express();
var fs = require('fs');
var Twitter = require('twitter');


console.log('Replier bot is starting');


var T = new Twitter({
   consumer_key: 'nFPFl3fBLELG4UBj57KyKLCLE',
   consumer_secret: '6NhXvmlJugPx2opM894XjpEiyXScBrQs40D8ZCWpkexgX61tPg',
   access_token_key: '3983518996-2Csu1UihZfXtKEBn7PoeiMPa636xrKoeMaDNefj',
   access_token_secret: 'MaVG07GRxc4rHJOZ4rx41Tp0cf50w7P7cGBAocldlcHJv',
});

T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
   console.log(data)
 })

app.listen(3000);

