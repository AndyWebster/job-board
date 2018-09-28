// JobList.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Jobs
let Job = new Schema({
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
    owner: {
        type: String
    }


    
},{
    collection: 'joblists'
});

module.exports.getJobById = function(id, callback){
    Job.findById(id, callback);
};

module.exports = mongoose.model('Job', Job);