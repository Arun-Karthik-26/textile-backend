const jwt = require("jsonwebtoken");

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  
  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Access token not found",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        status: "error",
        message: "Access token is invalid",
      });
    }
    
    req.user = user;
    next();
  });
};

// Middleware to verify authorization (access to own resource or admin access)
const verifyAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.uid === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to perform this action",
      });
    }
  });
};

// Middleware to verify admin access
const verifyAdminAccess = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        status: "error",
        message: "You are not authorized to perform this action",
      });
    }
  });
};

module.exports = { 
  verifyToken,
  verifyAuthorization,
  verifyAdminAccess,
};
