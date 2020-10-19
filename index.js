const express = require('express');
const app = express();
const fs = require('fs');
const Twitter = require('twitter');
const keys = require('./config');
const mongoose = require('mongoose');
const mongoDB = require('./mongodb');
const cron = require('cron');
const Quotes = require('./quote.model');
const { request } = require('http');
const PORT = process.env.PORT || 3000;


mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

console.log('Replier bot is starting');

const T = new Twitter(
   keys
);


// get random quote from database
async function getRandomQuote(){
   
   const allQuotes = await Quotes.find({}).then((data)=>{
      return data;
   })

   const count = await Quotes.countDocuments({}).then((data)=>{
      let rand = Math.floor(Math.random() * data);
      return rand
   })

   return allQuotes[count]
}


// tweet out quotes
async function TweetOut(){

   let withinCharLimit = false;
   
   while(withinCharLimit == false){
      let x = await getRandomQuote();
      
      let quote = x.quote;
      let author = x.name;

      let tweetString = quote + "\n\n - " + author;
      try {

         if(tweetString.length < 280){
            withinCharLimit = true;          
            T.post('statuses/update', { status: tweetString }, function(err, data, response) {
               if(err) {
                  console.log(err);
               }
   
               console.log(data);
            });           
         }  
         
      } catch (error) {
         
         console.log("tweetout error");
      }
           
   } 
}

// send a response to avoid 143 Heroku error
function wakeUp(){
   try {
      request("http://finance-tweet-bot.herokuapp.com/", function(){
      console.log("WAKE UP DYNO");
      });
   } catch (error) {
      console.log(error);
   }
   
}

setTimeout(wakeUp, 600000);

try {
   // post a tweet every 6 hours
let cronJob = new cron.CronJob('0 */6 * * *', () => {
   TweetOut();
});
} catch (error) {
   console.log("sent tweet error")
}


cronJob.start();



app.listen(PORT);