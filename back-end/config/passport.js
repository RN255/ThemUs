const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config(); // Load environment variables

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Google Profile:", profile);
      return done(null, profile);
    }
  )
);

// ✅ Fix: Serialize user to store in session
passport.serializeUser((user, done) => {
  console.log("Serializing User:", user.id); // Debugging
  done(null, user); // Store user object in session
});

// ✅ Fix: Deserialize user to retrieve from session
passport.deserializeUser((user, done) => {
  console.log("Deserializing User:", user); // Debugging
  done(null, user);
});
