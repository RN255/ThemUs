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
      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          console.log("✅ User found:", existingUser.email);
          return done(null, existingUser);
        }

        const newUser = await User.create({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails?.[0]?.value || "",
          photo: profile.photos?.[0]?.value || "",
          isPremium: false,
        });

        console.log("✅ New user created:", newUser.email);
        return done(null, newUser);
      } catch (err) {
        console.error("❌ Error saving user:", err);
        return done(err, null);
      }
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
