var express = require('express');
var router = express.Router();
var User = require('../models/user')
var passport = require('passport')
var moment = require('moment')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

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

router.get('/user', isValidUser, function (req, res, next) {
  return res.status(200).json(req.user)
});

router.get('/logout', isValidUser, function (req, res, next) {
  req.logout();
  return res.status(200).json({ message: 'Logout Success!!!' })
})

function isValidUser(req, res, next) {
  if (req.isAuthenticated()) next();
  else return res.status(401).json({ message: 'Unauthorized Request' }
  )
}

// ----------------------------findOneAndUpdate in Array---------------------------------------------------
router.put('/newTask', async (req, res) => {
 
  //addToDataBase(req,res)
  var data = {
    
    pName: req.body.pName,
    pTitle: req.body.pTitle,
    pStartTime: req.body.pStartTime,
    pEndTime: req.body.pEndTime,
    PSessionTime: req.body.PSessionTime
  };
  var sessiontime = moment(data.pEndTime, 'HH:mm:ss').diff(moment(data.pEndTime, 'HH:mm:ss'));
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

// ----------------------------findOneAndUpdate in Array--- Ends-----------------------------------------------

module.exports = router;
