require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

const entryRoutes = require("./routes/entryRoutes");
const commentRoutes = require("./routes/commentRoutes");
const newsRoutes = require("./routes/newsRoutes");
require("./config/passport"); // Load Passport config
const coverLetterRoutes = require("./routes/coverLetters");

const app = express();
const port = process.env.PORT || 5000;
const dbURI = process.env.MONGODB_URI;

// ✅ Connect with MongoDB
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ CORS Configuration (Ensures frontend can send credentials)
app.use(
  cors({
    origin: ["https://www.themus.org"],
    credentials: true, // Allow cookies and authentication headers
  })
);

// ✅ Express session (for persistent login)
app.set("trust proxy", 1);

app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      // secure: true,
      // sameSite: "none",
      secure: false, // ✅ allow HTTP during development
      sameSite: "lax", // ✅ allows cross-site redirect for login flow
      httpOnly: true,
    },
  })
);

// ✅ Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Stripe webhook needs raw body, mount this FIRST
app.use("/webhook", require("./routes/webhook"));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ API Routes
app.use("/api/entries", entryRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/news", newsRoutes);
app.use("/auth", require("./routes/auth"));
app.use("/payment", require("./routes/payment"));
app.use("/users", require("./routes/users"));
app.use("/api/coverLetters", coverLetterRoutes);
app.use("/cancel-subscription", require("./routes/cancel-subscription"));

// ✅ Debug Route to Check Authentication
app.get("/auth/user", (req, res) => {
  console.log("Session Data:", req.session);
  console.log("User Data:", req.user);

  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

// ✅ Sample Route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});

// GPT routes
const gptRoutes = require("./routes/gpt");
app.use("/api/gpt", gptRoutes);
