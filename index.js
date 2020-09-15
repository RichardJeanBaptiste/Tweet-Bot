const express = require('express');
const app = express();
const fs = require('fs');
const Twitter = require('twitter');
const keys = require('./config');
const axios = require('axios');
const mongoose = require('mongoose');
const mongoDB = require('./mongodb');
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

const Schema = mongoose.Schema;

const QuoteSchema = new Schema({
   name: {
       type: String,
       required: 'Name required'
   },
   quote: {
       type: String,
       required: 'Quote required'
   }
})

const Quotes = mongoose.model('Quote', QuoteSchema);

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


async function TweetOut(){

   let withinCharLimit = false;
   
   while(withinCharLimit == false){
      let x = await getRandomQuote();
      
      let quote = x.quote;
      let author = x.name;

      let tweetString = quote + "\n\n - " + author;
   
      if(tweetString.length < 280){
         withinCharLimit = true;
            
         T.post('statuses/update', { status: tweetString }, function(err, data, response) {
            console.log(data);
         });
         
            
      }       
   } 
}


//setInterval(TweetOut, 1000 * 60 * 60);
setInterval(TweetOut, 1000 * 60);


app.listen(PORT);


