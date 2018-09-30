// joblist.route.js
const express = require('express');
const jobListRoutes = express.Router();

// Require JobList model in our routes module
let JobList = require('../models/jobList');

// Defined store route
jobListRoutes.route('/add').post( (req, res) => {
  let jobList = new JobList(req.body);
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
jobListRoutes.route('/remove/:id').delete(function (req, res) {
  JobList.findByIdAndRemove({_id: req.params.id}, (err, response) => {
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
jobListRoutes.route('/').get(function (req, res) {
    JobList.find(function (err, jobList){
    if(err){
      console.log(err);
    }
    else {
      res.json(jobList);
    }
  });
});

// Find all jobs from array of job ID
jobListRoutes.route('/find/:id').get(function (req, res) {
  // parse id string from url
  let idString = req.params.id;
  


  if (idString.includes("&")) {
    var jobs = idString.split("&");
  } else {
    var jobs = [idString];
  }
  
  JobList.find({ "_id": { $in: jobs }}, function (err, JobList){
    if(err){
      console.log(err);
    }
    else {
      res.send(JobList);
    }
  })

  // loop through id strings and find jobs by id
  /* var i;
  for (i = 0; i < jobs.length; i++) {
    JobList.find({"_id" : jobs[i]}, function (err, JobList){
      if(err){
        console.log(err);
      }
      else {
        data[Stri]=JobList[0];
        res.send(data);
      }
    }
  )}; */
  
  

});

// Defined edit route
jobListRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  JobList.findById(id, function (err, jobList){
      res.json(jobList);
  });
});

//  Defined update route
jobListRoutes.route('/update/:id').post(function (req, res) {
    JobList.findById(req.params.id, function(err, jobList) {
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



module.exports = jobListRoutes;