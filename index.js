var express = require('express');
var app = express();
var fs = require('fs');
var Twit = require('twit');


var config = require('./config');

console.log('Replier bot is starting');

var T = new Twit(config);

var stream = T.stream('user');

stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg){
	 /*console.log("Follow event!");
     var name = eventMsg.source.name;
     var screenName = eventMsg.source.screen_name;
     tweetIt('.@' + screenName + ' We coding out here bih');
     var fs = require('fs');
     var json = JSON.stringify(eventMsg, null,2);
     fs.writeFile("tweet.json", json);*/
     var replyto = eventMsg.in_reply_to_screen_name;
     var text = eventMsg.text;
     var from = eventMsg.user.screen_name;

     console.log(replyto + ' ' + from);

     if(replyto == "RichBCrusin" ){
     	var newtweet = '@' + from + ' ' + 'thanks for tweeting me #coding' ;
     	tweetIt(newtweet);
     };
};
 
 
//tweetIt();
//setInterval(tweetIt, 1000*20)



function tweetIt(txt){

	//var r = Math.floor(Math.random()*100);

var tweet = {
	status: txt 
}

T.post('statuses/update', tweet, tweeted);

 function tweeted(err, data, response){
	 if(err){
	 	console.log(err);
	 }else{
		console.log("it worked");
	 }
   };
}


/*var params = {
	q: 'Rudy gay',
	count: 2
}

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
   var tweets = data.statuses;
   for(var i = 0; i < tweets.length ; i++){
   	console.log(tweets[i].text);
   }
}*/

/*app.get('/', function(req,res){
    fs.readFile('main.html', function(err, data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
       console.log('Server at port 3000');
       //console.log(config);
    });
    
});*/



app.listen(3000);

