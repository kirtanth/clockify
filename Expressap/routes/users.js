// --------------------------------Declations----------------START-----------------------------------------//
var express = require('express');
var router = express.Router();
var User = require('../models/user')
var passport = require('passport')
var moment = require('moment')
// --------------------------------Declations----------------END-----------------------------------------//


// ---------------------------------------REGISTER USER POST Req-----START--------------------------------//
router.post('/register', function (req, res, next) {
  addToDB(req, res);
});

async function addToDB(req, res) {
  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: moment()
  });


  try {
    doc = await user.save();
    return res.status(201).json(doc);
  }
  catch (err) {
    return res.status(501).json(err);
  }
}
// ---------------------------------------REGISTER USER POST Req-----END--------------------------------//


// ------------------------------------------LOGIN POST Req-----------START----------------------------------//

//code from passportjs->Authonticate -> Custum callback
router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function (err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({ message: 'Login Success' });
    });
  })(req, res, next);
});
// ------------------------------------------LOGIN POST Req-----------END----------------------------------//


// ------------------------------------------USER GET Req-----------START----------------------------------//
router.get('/user', isValidUser, function (req, res, next) {
  return res.status(200).json(req.user)
});
// ------------------------------------------USER GET Req-----------END----------------------------------//


// ------------------------------------LOGOUT GET REQ--------------------START---------------------------//
router.get('/logout', isValidUser, function (req, res, next) {
  req.logout();
  return res.status(200).json({ message: 'Logout Success!!!' })
})
// ------------------------------------LOGOUT GET REQ--------------------END---------------------------//


// ------------------------------IS VALID USER  Check user Auth or Not req-----------START----------------//
function isValidUser(req, res, next) {
  if (req.isAuthenticated()) next();
  else return res.status(401).json({ message: 'Unauthorized Request' }
  )
}
// ------------------------------IS VALID USER  Check user Auth or Not req-----------END---------------------//


// ----------------------------findOneAndUpdate in Array---------------------------------------------------//
router.put('/newTask', async (req, res) => {

  var data = {

    pName: req.body.pName,
    pTitle: req.body.pTitle,
    pStartTime: req.body.pStartTime,
    pEndTime: req.body.pEndTime,
    PSessionTime: req.body.PSessionTime
  };
  try {
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        $push: {
          tasks: data,
        },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).send("User with email not found");
    }
    res.send(user);
  }
  catch (err) {
    return res.status(501).json(err);
  }
});

// ----------------------------findOneAndUpdate in Array--- ENDS-----------------------------------------------


//------------------------------------Show Tasks To User-- STARTS -------------------------------------------//
router.get('/showTasks', (req, res) => {
  User.find({ email: req.user.email }, { tasks: 1, _id: 0 })
    .exec(function (err, task) {
      if (err) {
        res.json({
          status: false,
          Message: "Error in getting Tasks",
          Error: err
        })
      }
      res.json(task)
    })
})
//------------------------------------Show Tasks To User-- ENDS -------------------------------------------//
//TEST

router.get('/aggShowTask',(req,res)=>{
  //aggregate.lookup({ from: 'users', localField: 'userId', foreignField: '_id', as: 'users' });
 var aggTask = aggregate.lookup({ from: 'users', localField: 'email', foreignField:'pEmail', as:'tasksss'})
  res.json(aggTask)
})

module.exports = router;
