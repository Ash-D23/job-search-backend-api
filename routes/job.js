const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const isAuth = require('../middlewares/is-auth');

const jobController = require('../controller/job');

router.get('/job', isAuth, jobController.joblist);

router.get('/singlejob/:jobid', isAuth, jobController.singlejob);

router.post('/createjob', isAuth,  jobController.createjob);

module.exports = router;
