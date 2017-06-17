// const graphQLHTTP = require('express-graphql');
import graphQLHTTP from 'express-graphql';
// var Schema = require('./data/schema');
import schemaFunc from "./data/schema";
const express = require('express')

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

  // Use connect method to connect to the server
MongoClient.connect(process.env.MONGO_URI, function(err, db) {

    assert.equal(null, err);

    console.log("Connected successfully to server");

    // var cursor = db.collection('races').find();
    // cursor.each(function(err,doc){
    //   assert.equal(err, null);
    //   if (doc!= null){
    //     console.dir(doc)
    //   }
    // })

    // db.close();
    const app = express();
    app.use('/graphql', graphQLHTTP({schema: schemaFunc(db), graphiql: true }))


    app.get('/', function (req, res) {
      res.send('Hello World!')
    })

    app.listen(3010, function () {
      console.log('Example app listening on port 3010!')
    })

  });
