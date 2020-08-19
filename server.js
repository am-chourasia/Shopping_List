const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const items = require('./routes/api/items')

app.use(bodyParser.json());
morgan(':method :url :status :res[content-length] - :response-time ms')

const db = require('./config/key').mongoURI;

mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true})
    .then( ()=> console.log("Connected to MongoDB"))
    .catch( (err) => console.log("Error : "+ err));

const port = process.env.PORT || 5000;

app.use('/api/items', items);

app.listen( port, ()=> console.log("Server started at port "+`${port}`));
