const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const isAuth = require('../middlewares/is-auth');

const experienceController = require('../controller/experience');

router.get('/experience', isAuth, experienceController.experiencelist);

router.get('/singleinterview/:jobid', isAuth, experienceController.singleinterview);

router.post('/createexperience', isAuth, experienceController.createexperience);

module.exports = router;
