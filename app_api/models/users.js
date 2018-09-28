const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/DB')

// User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: { 
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    jobs: [{ 
        type: String
    }]
    

    // TODO 
    // Add user.applied LIST of job.ID
    // Add user.cv FILE
    // Add user.cover STRING
    // Add user.phone NUMBER

});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatched) => {
        if(err) throw err;
        callback(null, isMatched);
    });
}

module.exports.addJob = function(jobId, userId, res){
    var _id = userId;
    var _jobid = jobId;
    User.findByIdAndUpdate(
        _id,
        {$push: {jobs: _jobid}},
        {safe: true, upsert: true},
        (err) => {
            if(err){
                return res.status(500).send(err);
            } else {
                return res.send('success')
            }
        }
    );
}

module.exports.removeJob = function(jobId, userId, res){
    var _id = userId;
    var _jobid = jobId;
    User.findByIdAndUpdate(
        _id,
        {$pull: {jobs: _jobid}},
        {safe: true, upsert: true},
        (err) => {
            if(err){
                return res.status(500).send(err);
            } else {
                return res.send('success')
            }
        }
    );
}
