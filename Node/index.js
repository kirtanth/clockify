//init code
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const database = require('./db')
const userController = require('./controllers/userss');

const app = express();

// middleware setup
app.use(morgan('dev'));
app.use(cors());
app.use('/api/users', userController);

// Deafault Routes
app.all('/',(req,res)=>{
    return res.json({
        status : true,
        message : 'Your Node file is running'
    });
});

const port = 3012

app.listen(port,()=>{
    console.log('Server is Listen on Port : ' + port)
})