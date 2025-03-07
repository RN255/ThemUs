require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const entryRoutes = require("./routes/entryRoutes");
const commentRoutes = require("./routes/commentRoutes");
const port = process.env.PORT;
const dbURI = process.env.MONGODB_URI;
const rssRoutes = require("./rssFeeds/rssRoutes");

// Connect to your MongoDB database
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// allow for JSON request body parsing
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Connect entry and user routes to the app
app.use("/api/entries", entryRoutes);

// Connect comments and user routes to the app
app.use("/api/comments", commentRoutes);

// Connect news routes to the app
app.use("/api/news", newsRoutes);

// Define your API routes and middleware here
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Define a sample route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});
