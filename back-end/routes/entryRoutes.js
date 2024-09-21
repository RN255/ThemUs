// entryRoutes.js
const express = require("express");
const router = express.Router();
const entryController = require("../controllers/entryController");

// Route for creating a new entry
router.post("/entries", entryController.createEntry);

module.exports = router;
