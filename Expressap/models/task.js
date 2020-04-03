
var mongoose = require('mongoose')
var moment = require('moment')
var Schema = mongoose.Schema;



var schema = new Schema({
    pName: { type: String },
    pTitle: { type: String },
    pStartTime: { type: String },
    pEndTime: { type: String },
    PSessionTime: { type: String ,
    default: moment(this.pEndTime,'HH:mm:ss').diff(moment(this.pStartTime,'HH:mm:ss'))
    }
});


module.exports = mongoose.model('Task', schema)