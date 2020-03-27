const mongoose = require('mongoose')
const assert = require('assert')
const db_url = 'mongodb://127.0.0.1:27017/userss'

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify :false
},(error,link)=>{
    // error Check
    assert.equal(error,null, 'DB connect Fail...')
    //OK
    console.log('DataBase coonected.... :)')
}

)