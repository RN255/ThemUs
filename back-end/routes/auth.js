const express = require("express");
const passport = require("passport");

const router = express.Router();

// ✅ Route to start Google authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// ✅ Callback route after Google authentication
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    // ✅ Removed `session: false` to allow session storage
  }),
  (req, res) => {
    console.log("User successfully authenticated:", req.user);
    // res.redirect("https://www.themus.org/"); // Redirect to frontend after login
    res.redirect("http://localhost:3000/"); // Redirect to frontend after login

  }
);

// ✅ Logout Route (Fixed for Passport v0.6+)
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err); // Handle errors properly
    }
    req.session.destroy(() => {
      // res.redirect("https://www.themus.org/"); // Redirect to frontend after logout
      res.redirect("http://localhost:3000/"); // Redirect to frontend after login
    });
  });
});

// ✅ Get User Info Route
router.get("/user", (req, res) => {
  console.log("Session ID:", req.sessionID);
  console.log("Session Data:", req.session);
  console.log("User Data:", req.user);

  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

module.exports = router;
