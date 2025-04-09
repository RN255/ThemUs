// middleware/checkQuota.js
const User = require('../models/UserSchema');

module.exports = async function checkQuota(req, res, next) {
  try {
    const user = await User.findById(req.user.id); // assuming user ID is on req.user

    const now = new Date();

    // If the quota reset date has passed, reset the counter
    if (!user.renewsAt || now > user.renewsAt) {
      user.usedLetters = 0;
      user.renewsAt = new Date(now.setMonth(now.getMonth() + 1));
    }

    if (user.usedLetters >= user.letterLimit) {
      return res.status(403).json({
        message: 'You’ve reached your monthly cover letter limit. Upgrade your plan to continue.',
      });
    }

    // Attach user to request with fresh data
    req.userData = user;
    next();
  } catch (err) {
    console.error('Quota check failed:', err);
    res.status(500).json({ message: 'Server error checking quota' });
  }
};
