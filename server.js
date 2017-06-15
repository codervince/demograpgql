// const graphQLHTTP = require('express-graphql');
import graphQLHTTP from 'express-graphql';
// var Schema = require('./data/schema');
import Schema from "./data/schema";

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
