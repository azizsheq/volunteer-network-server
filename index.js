const express = require('express')
const cors = require('cors')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

const app = express()

// adding middle wire
app.use(cors());
app.use(express.json());

const port = process.env.DB_PORT || 5055;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l7yew.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const eventCollection = client.db("volunteerDB").collection("events");
    console.log('connected with mongodb database')

    // data POST testing
    const newEvent = { "name": "Event One" };
    eventCollection.insertOne(newEvent)
        .then(result => { console.log(`Successfully inserted item with _id: ${result.insertedId}`) })
        .catch(err => { console.error(`Failed to insert item: ${err}`) })

});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})