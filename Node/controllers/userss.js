//init code
const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const user = require('../Models/userss');

// Middleware Setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//Routes goes here

//Deafault Route
router.all('/', (req, res) => {
    res.json({
        status: true,
        message: 'User Controller Working',
    })
});


// Create new user Route
router.post('/createNew',
    [
        //check not Empty fileds
        check('username').not().isEmpty().trim().escape(),
        check('name').not().isEmpty().trim().escape(),
        check('email').isEmail().normalizeEmail(),
        check('password').not().isEmpty().trim().escape(),
        check('rePassword').not().isEmpty().trim().escape()
    ],
    (req, res) => {

        //Check validation error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                Status: false,
                message: "Form Validation Error",
                errors: errors.array()
            })
        }

        //Hash the password
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const reHashedPassword = bcrypt.hashSync(req.body.rePassword, 10);

        user.create({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            rePassword: reHashedPassword
        }, (error, result) => {

            //check error
            if (error) {
                return res.json({
                    status: false,
                    message: 'Database Insert Fail',
                    error: error
                })
            }

            //everything Ok
            return res.json({
                status: true,
                message: 'Data insert success'
            })
        })

    })



//Find User
router.get('/find', (req, res) => {
    user.find((error, result) => {
        //check error
        if (error) {
            return res.json({
                status: false,
                message: 'can not find data',
                error: error
            })
        }
        //if find
        return res.json({
            status: true,
            message: 'Data Find Success',
            result: result
        })
    });
})


//UPDATE
router.put('/update/:email', (req, res) => {
    user.update(
        { email: req.params.email },
        { username: 'Check Update' },
        (error, result) => {
            if (error) {
                return res.json({
                    status: false,
                    message: 'Update Fail',
                    error: error
                })
            }
            return res.json({
                status: true,
                message: 'Update Success...',
                result
            })
        }
    );

})

//DELETE
router.delete('/delete/:email', (req, res) => {
    //check if email is empty
    if (req.params.email) {
        user.findOneAndRemove(
            { email: req.params.email },
            (error, result) => {
                if (error) {
                    return res.json({
                        status: false,
                        message: 'Delete Fail',
                        error
                    })
                }
                return res.json({
                    status: true,
                    message: 'Delete Success...',
                    result
                })
            }
        )
    }
    else {
        return res.json({
            status: false,
            message: 'Email not provided'
        })
    }

})


//LOGIN ROUTE for user
router.post('/login',
    [
        //check not Empty fileds
        check('email').isEmail().normalizeEmail(),
        check('password').not().isEmpty().trim().escape()
    ],
    (req, res) => {
        //Check validation error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                Status: false,
                message: "Form Validation Error",
                errors: errors.array()
            })
        }
        //check email or username is exist or not
        user.findOne(
            {email : req.body.email},
            (error,result)=>{
                //check error 
                if(error){
                    return res.json({
                        status : false,
                        message : 'Check Your Email...',
                        error
                    })
                }
                //Result is empty or not
                if(result){
                    //match password
                    const isMatch =bcrypt.compareSync(req.body.password, result.password)

                    //if password is match
                    if (isMatch){
                        return res.json({
                            status : true,
                            message : 'Login Success...',
                            result
                        })
                        
                    }
                    else{
                        return res.json({
                            status : false,
                            message : 'Password Not Matched'
                        })
                    }
                }
                else {
                    //user document is not exist
                    return res.json({
                        status : false,
                        message : 'user not found'
                    })
                }
            }
        );
    });



//Module Export
module.exports = router;