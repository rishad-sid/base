const jwt = require("jsonwebtoken");
const config = require("../config/config");

// Auth middleware
const authMiddleware = (req, res, next) => {
  // Get the token from the request header
  const token = req.header("Authorization");

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: "Authorization token not found" });
  }

  try {
    // Verify the token using the secret key from the config file
    const decoded = jwt.verify(token, config.authentication);

    // Attach the user to the request object
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
