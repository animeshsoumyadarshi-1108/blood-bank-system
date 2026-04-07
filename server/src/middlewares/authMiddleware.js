const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    // format: "Bearer TOKEN"
    const actualToken = token.split(' ')[1];

    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    req.user = decoded; // { id, role }

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};