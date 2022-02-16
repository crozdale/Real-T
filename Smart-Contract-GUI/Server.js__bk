require("dotenv").config();
const express = require("express");
const db = require("./Server/db");
const cors = require("cors");
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const RealTRouter = require("./Server/Real-T/router");
const XeriesRouter = require("./Server/Xeries/router");

const path = require('path');

// Getting the port number from env. variables or setting it to 5000 by default
const port = process.env.PORT || 5000;
// Using express module to create the app
const app = express();

// Attempting to connect to the database
db.connect();

// Applying middlewre of helmet, CORS, JSON parser, and Cookie parser(Signs cookies with a key)
app.use(helmet());
app.use(cors({origin: true,credentials: true}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Attaching routers to the applications
app.use("/real-t/", RealTRouter);
app.use("/xeries/", XeriesRouter);

// Handles any requests that don't match the ones above
app.use('/real-t', express.static(path.join(__dirname, 'Client/Real-T/build'))); 
app.get('/real-t/*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/Client/Real-T/build/index.html'));
});

app.use('/xeries', express.static(path.join(__dirname, 'Client/Xeries/build'))); 
app.get('/xeries/*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/Client/Xeries/build/index.html'));
});

app.use(express.static(path.join(__dirname, 'Main_site')));
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/Main_site/Bitbrowze.html'));
});

// Starting listening
app.listen(port, (err) => {
  if (!err) console.log("started server successfully");
});
