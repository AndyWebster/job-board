const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/DB')
const User = require('../models/users');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        
    });

    User.addUser(newUser, (err, user) => {  
        if(err) {
            res.json({success: false, msg:'Failed to register user'});
        } else {
            res.json({success: true, msg:'User registered'});
        }
    })
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data:user}, config.secret, {
                    expiresIn: 604800 // 1 week in seconds
                });

                res.json({
                    success: true,
                    token: 'JWT '+token,
                    users: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    })
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});

router.post('/add/:userId', (req, res) => {
    let jobId = req.body.id;
    let userId = req.params.userId;
    User.addJob(jobId, userId, res, (err) => {  
        if(err) {
            res.json({success: false, msg:'Failed to add job to user'});
        } else {
            res.json({success: true, msg:'Job added to user'});
        }
    });
});

router.post('/remove/:userId', (req, res) => {
    let jobId = req.body.id;
    let userId = req.params.userId;
    User.removeJob(jobId, userId, res, (err) => {  
        if(err) {
            res.json({success: false, msg:'Failed to remove job from user'});
        } else {
            res.json({success: true, msg:'Job removed from user'});
        }
    });
});

module.exports = router;