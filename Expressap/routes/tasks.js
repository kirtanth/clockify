var express = require('express');
var router = express.Router();
var Task = require('../models/task')

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/newTask',function(req,res,next){

    addTaskToDB(req,res);

})

async function addTaskToDB(req,res){
    var task = new Task({
        pName : req.body.pName,
        pTitle: req.body.pTitle,
        pStartTime: req.body.pStartTime,
        pEndTime : req.body.pEndTime,
        PSessionTime:req.body.PSessionTime
    })

    try{
        tsk = await task.save();
        return res.status(201).json(tsk);

    }
    catch(err){
        return res.status(501).json(err)
    }
}

module.exports = router;
