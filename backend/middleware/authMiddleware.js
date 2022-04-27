const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // // Get user from token
      req.user = await User.findById(decoded.id).select("-password");

      if (token) {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send('Not authorized')
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401).send('Not authorized, no token');
    throw new Error("Not authorized, no token");
  }
};

module.exports = { protect };
