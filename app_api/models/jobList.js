// JobList.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Jobs
let Job = new Schema({
    id: {
        type: Number
    },
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
    }

    // TODO
    // Add job.owner STRING
    // Add job.date DATE
    // Add job.status BOOL
    
},{
    collection: 'joblists'
});


// TODO
// get job by job.owner

module.exports = mongoose.model('Job', Job);