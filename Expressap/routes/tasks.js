var express = require('express');
var router = express.Router();
var Task = require('../models/task')

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//-----------------------------------Post Request For Add Task To database----------------------------------//

router.post('/newTask', function (req, res, next) {

    addTaskToDB(req, res);

})
// Async Function for NewTask-----------
async function addTaskToDB(req, res) {
    var task = new Task({
        
        pName: req.body.pName,
        pTitle: req.body.pTitle,
        pEmail: req.body.pEmail,
        pStartTime: req.body.pStartTime,
        pEndTime: req.body.pEndTime,
        PSessionTime: req.body.PSessionTime
    })

    try {
        tsk = await task.save();
        return res.status(201).json(tsk);

    }
    catch (err) {
        return res.status(501).json(err)
    }
}
// Async Function for NewTask----Ends-----------


//-----------------------------------Post Request For Add Task To database---Ends--------------------------//

//-----------------------------------Get Request For Task--------------------------------------------------//

router.get('/show', (req, res, next) => {
    Task.find({})
        .exec(function (err, task) {
            if (err) {
                res.json({
                    status: false,
                    Message: "Error in Getting Task",
                    Error: err
                })
            }
            res.json(task)
        })
})



module.exports = router;
