// jobs.js
const express = require('express');
const router = express.Router();
let User = require('../models/users');
// Require JobList model in our routes module
let Job = require('../models/jobList');


// Defined store route
router.route('/add').post( (req, res) => {
  let jobList = new Job(req.body);
  jobList.save( (err, response) => {
    if(err) {
      response = { error: true, message: "Error adding data" };
    } else {
      response = { error: false, message: "Data added", id: response._id };
    }
    res.set('Content-Type', 'application/json');
    res.json({'id': response.id});
  })
});

// Defined delete | remove | destroy route
router.route('/remove/:id').delete(function (req, res) {
  Job.findByIdAndRemove({_id: req.params.id}, (err, response) => {
    if(err) {
      response = { error: true, message: "Error adding data" };
    } else {
      response = { error: false, message: "Data added", id: response._id };
    }
    res.set('Content-Type', 'application/json');
    res.json({'id': response.id});
  })
});

// Defined get data(index or listing) route
router.route('/').get(function (req, res) {
  Job.find(function (err, jobList){
    if(err){
      console.log(err);
    }
    else {
      res.json(jobList);
    }
  });
});

// Find all jobs from array of job ID
router.route('/find/:id').get(function (req, res) {
  // parse id string from url
  let idString = req.params.id;
  


  if (idString.includes("&")) {
    var jobs = idString.split("&");
  } else {
    var jobs = [idString];
  }
  
  Job.find({ "_id": { $in: jobs }}, function (err, JobList){
    if(err){
      console.log(err);
    }
    else {
      res.send(JobList);
    }
  })
});

// post applicant to job
router.post('/apply/:jobId', (req, res) => {
  let application = req.body;
  let jobId = req.params.jobId;
  Job.addApplicant(jobId, application, () => {  
    User.addApplication(jobId, application.userId, (err) => {
      if(err) {
        res.send({ error: true, message: "Error adding data" });
      } else {
        res.send({ error: false, message: "Data added" })
      }
    })
  });
})


// delete applicant from job
router.put('/reject/:jobId', (req, res) => {
  let userId = req.body.userId;
  let jobId = req.params.jobId;

  Job.removeApplicant(jobId, userId, () => {  
    User.removeApplication(jobId, userId, (err) => {
      if(err) {
        res.send({ error: true, message: "Error adding data" });
      } else {
        res.send({ error: false, message: "Data added" })
      }
    })
  });
})
// Defined edit route
router.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Job.findById(id, function (err, jobList){
      res.json(jobList);
  });
});

//  Defined update route
router.route('/update/:id').post(function (req, res) {
  Job.findById(req.params.id, function(err, jobList) {
    if (!jobList)
      return next(new Error('Could not load Document'));
    else {
        jobList.id = req.body.id
        jobList.title = req.body.title
        jobList.company = req.body.company
        jobList.location = req.body.location
        jobList.salary = req.body.salary
        jobList.description = req.body.description
        jobList.status = req.body.status
        jobList.date = req.body.date

        jobList.save().then(jobList => {
          res.json(jobList);
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});



module.exports = router;