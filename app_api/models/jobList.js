// JobList.js

const mongoose = require('mongoose');


// Define collection and schema for Jobs
const jobSchema = new mongoose.Schema({
    title: {
        type: String
    },
    company: {
        type: String
    },
    location: {
        type: String
    },
    salary: {
        type: Number
    },
    description: {
        type: String
    },
    status: {
        type: Boolean
    },
    date: {
        type: Date
    },
    applications: {
        type: Array
    }
},{
    collection: 'joblists'
});

const Job = module.exports = mongoose.model('Job', jobSchema);

module.exports.getJobById = function(id, callback){
    Job.findById(id, callback);
};

module.exports.addApplicant = function(jobId, jobApp, callback){
    var application = jobApp;
    var _jobid = jobId;

    Job.findByIdAndUpdate(
        _jobid,
        {$push: {applications: application}},
        {safe: true, upsert: true},
        callback
    );
}

module.exports.removeApplicant = function(jobId, UserId, callback){
    var userId = UserId;
    var _jobid = jobId;
    console.log("Job: "+_jobid+", "+"user: "+JSON.stringify(userId) )
    Job.findByIdAndUpdate(
        
        _jobid,
        {$pull: {applications: { userId: userId}}},
        {safe: true, upsert: true},
        callback
    );
}

