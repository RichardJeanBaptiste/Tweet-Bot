const express = require('express');
const app = express();
const fs = require('fs');
const Twitter = require('twitter');
const Quotes = require('../tweet-bot/Quotes.json');
const keys = require('./config');

console.log('Replier bot is starting');

const T = new Twitter(
   keys
);

function TweetOut(){

   quoteNum = Math.floor(Math.random() * 7);

   T.post('statuses/update', { status: Quotes[quoteNum]['Quote'] }, function(err, data, response) {
      console.log(data)
    });

}

setInterval(TweetOut, 1000 * 60 * 60);


app.listen(3000);