// entryRoutes.js
const express = require("express");
const router = express.Router();
const entryController = require("../controllers/entryController");

// Route for creating a new entry
router.post("/entries", entryController.createEntry);

// Route for fetching all entries
router.get("/entries", entryController.getAllEntries);

module.exports = router;
