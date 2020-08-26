const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const items = require('./routes/api/items');
const users = require('./routes/api/users.js');
const auth = require('./routes/api/auth.js');
const path = require('path');
const config = require('config');

const db = config.get("mongoURI");

mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
.then( ()=> console.log("Connected to MongoDB"))
.catch( (err) => console.log("Error : "+ err));

const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);

//Serve static assets if in production
if( process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) =>{
        res.sendFile(path.resolve( __dirname, 'client', 'build', 'index.html' ));
    })
}
app.listen( port, ()=> console.log("Server started at port "+`${port}`));
