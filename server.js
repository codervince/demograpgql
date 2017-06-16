// const graphQLHTTP = require('express-graphql');
import graphQLHTTP from 'express-graphql';
// var Schema = require('./data/schema');
import Schema from "./data/schema";


var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

  // Use connect method to connect to the server
  MongoClient.connect(process.env.MONGO_URI, function(err, db) {
    console.log(process.env.MONGO_URI);
    assert.equal(null, err);
    console.log("Connected successfully to server");

    var cursor = db.collection('races').find();
    cursor.each(function(err,doc){
      assert.equal(err, null);
      if (doc!= null){
        console.dir(doc)
      }
    })

    // db.close();
  });
  const express = require('express')
  const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

//from express-graphql repo MOUNT onto /graphql
app.use('/graphql', graphQLHTTP({schema: Schema, graphiql: true }))


app.listen(3010, function () {
  console.log('Example app listening on port 3010!')
})
