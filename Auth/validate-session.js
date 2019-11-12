function validateSession(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(400).json({ message: "you shall not pass" });
  }
}

module.exports = validateSession;
