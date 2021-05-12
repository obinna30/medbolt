const express = require("express");
const jobController = require("../controllers/api/jobController");
const newsUpdateController = require("../controllers/api/newsUpdateController");
const oneNewsController = require("../controllers/api/oneNewsController");
const userController = require("../controllers/api/userController");
const router = express.Router();

// ----users api - - - - -//
// create a new user profile
router.post('/signup', userController.signUp)
// user signIn
router.post('/signin', userController.signIn)
// update user details
router.put('/:username/:UserId', userController.updateUser)

// -----job listing API-----//
// post a job
router.post('/jobs', jobController.postJob)
// get all job openings
router.get('/jobs', jobController.getJobs)

// -----NewsUpdate API-----//
// create a news Article
router.post('/newsupdate/:UserId', newsUpdateController.createArticle)
// get all the scraped news
router.get('/news', newsUpdateController.getNews)
// read more new
router.get('/news/:month/:day/:newsId', newsUpdateController.readMore)

// -----social network api-----



module.exports = router
