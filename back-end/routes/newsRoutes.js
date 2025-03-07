const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Route to get all news articles
router.get('/news', newsController.getAllNews);

// Route to add a new news article
router.post('/news', newsController.addNews);

// Route to delete a news article by ID
router.delete('/news/:id', newsController.deleteNews);

module.exports = router;
