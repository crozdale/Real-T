require("dotenv").config();
const express = require("express");
const db = require("./Server/db");
const cors = require("cors");
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const userRouter = require("./Server/routes/users");
const adminRouter = require("./Server/routes/admin");
const authRouter = require("./Server/routes/authentication");
const subscRouter = require("./Server/routes/subscriptions");
const path = require('path');

// Getting the port number from env. variables or setting it to 5000 by default
const port = process.env.PORT || 5000;
// Using express module to create the app
const app = express();

// Attempting to connect to the database
db.connect();

// Applying middlewre of helmet, CORS, JSON parser, and Cookie parser(Signs cookies with a key)
app.use(helmet());
app.use(cors({origin: 'http://localhost:3000',credentials: true}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Attaching routers to the application
app.use("/users", userRouter);
app.use("/admins", adminRouter);
app.use("/auth", authRouter);
app.use("/subscribe", subscRouter);

// Handles any requests that don't match the ones above
app.use('/real-t', express.static(path.join(__dirname, 'Client/build'))); 
app.get('/real-t/*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/Client/build/index.html'));
});

app.use(express.static(path.join(__dirname, 'Main_site')));
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/Main_site/Bitbrowze.html'));
});

// Starting listening
app.listen(port, (err) => {
  if (!err) console.log("started server successfully");
});
