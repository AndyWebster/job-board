// joblist.route.js
const express = require('express');
const jobListRoutes = express.Router();

// Require JobList model in our routes module
let JobList = require('../models/jobList');

// Defined store route
jobListRoutes.route('/add').post(function (req, res) {
  let jobList = new JobList(req.body);
  jobList.save()
    .then(game => {
    res.status(200).json({'jobList': 'JobList added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
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
        jobList.collapsed = req.body.collapsed
        jobList.title = req.body.title
        jobList.company = req.body.company
        jobList.location = req.body.location
        jobList.salary = req.body.salary
        jobList.description = req.body.description

        jobList.save().then(jobList => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
jobListRoutes.route('/delete/:id').get(function (req, res) {
    JobList.findByIdAndRemove({_id: req.params.id}, function(err, jobList){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = jobListRoutes;