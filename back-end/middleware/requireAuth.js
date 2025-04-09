module.exports = function requireAuth(req, res, next) {
  console.log("🔒 [requireAuth] req.user:", req.user);
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  next();
};
