const { MongoClient } = require('mongodb');
const assert = require('assert'); //library that includes functions to throw an error if an expression passed into it is false.
const mySchema = require('./schema/main');
const graphQLHTTP = require('express-graphql');
const express = require('express'); //server

const app = express(); //instance of express server.
app.use(express.static('public'));
//above line adds 'static middleware', or software between the server and the client-facing index.html.  The public directory is where the index.html file is stored.

const fs = require('fs');
const path = require('path');
//allows cache of data to be written.

const {introspectionQuery} = require('graphql/utilities');
//performs a full introspection query -- looking at all of the data -- on the schema.
console.log(introspectionQuery);

const { graphql } = require('graphql');

const MONGO_URL = 'mongodb://localhost:27017/test';

MongoClient.connect(MONGO_URL, (err, db) => {
    assert.equal(null, err); //throws error.
    console.log("Connected to MongoDB server, Young Thug clone: IT'S LIT!.");
    app.use('/graphql', graphQLHTTP({
        schema: mySchema,
        context: { db },
        graphiql: true
    })); //defines route at /graphql, express-graphql middleware to handle routing.  Also defines database, schema and use of graphIql.
    
    graphql(mySchema, introspectionQuery).then(result => {
        fs.writeFileSync(path.join(__dirname, 'cache/schema.json'), JSON.stringify(result, null, 2));
        console.log('Generated Thuggish, cached schema.json file.');
    }).catch(console.error); //writes the full contents of the schema to schema.json and throws an error if nah.
    
    app.listen(3000, () => 
        console.log("Running *SKRRRRR* Express.js on port 3000, thug.")
    );
});