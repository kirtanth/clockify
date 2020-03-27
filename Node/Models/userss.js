// init code

const mongoose = require('mongoose')
const moment =require('moment')

// user schema
const userSchema = mongoose.Schema({
    username: {
        type : String,
        require : true
    },
    name: {
        type : String,
        require : true
    },
    email:{
        type : String,
        require :true,
        unique : true
    },
    password: {
        type: String,
        require : true
    },
    rePassword: {
        type: String,
        require : true
    },
    createdOn : {
        type : String,
        default : moment().format('MMMM Do YYYY, h:mm:ss a')
    }
});

// User Model
mongoose.model('userss',userSchema);

//Module Export
module.exports = mongoose.model('userss')