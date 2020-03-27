const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ng = require('./app.module')

app.use(bodyParser.urlencoded({extended:true}));


const timerFn = require('timer-node');
const timer = timerFn('test-timer');

var start = timer.start(); 

app.listen(3000, (req,res) => {
    console.log('server is Running At port 3000');
});