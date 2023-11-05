const express = require('express');
const app = express();
const ExpressError = require("./expressError")
const itemRoute = require("./itemsRoute")
const morgan = require('morgan');


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/item', itemRoute)


// app.post('/items', function(req,res){

// })


// app.get('/items', function(req,res){

// })


// app.get('/items', function(req,res){

// })



// app.get('/items', function(req,res){

// })


// app.get('/items', function(req,res){

// })


app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {message, status}
    });
  });

module.exports = app