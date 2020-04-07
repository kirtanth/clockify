var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')
// ------------------------------MAKE NEW SCHEMA---START--------------------------------------------------//
var schema = new Schema({
    email: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    creation_dt: { type: String, require: true },
    tasks : []
});
// ------------------------------MAKE NEW SCHEMA---END--------------------------------------------------//


//--------------------------------HASH PASSWORD-------START-----------------------------------------------//
schema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}
//--------------------------------HASH PASSWORD-------END-----------------------------------------------//


//---------------------------Compare Password bcrypt---START--------------------------------------------------//
schema.methods.isValid = function(hashedpassword){
    return bcrypt.compareSync(hashedpassword,this.password);
}
//---------------------------Compare Password bcrypt---STOP--------------------------------------------------//

module.exports = mongoose.model('User',schema)