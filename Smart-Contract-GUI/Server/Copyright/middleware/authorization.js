const jwt = require("jsonwebtoken");
const adminModel = require("../models/admins");

// Check if req user is authenticated
const authenticated = () => {
  return (req, res, next) => {
    // if the user have a signed cookie holding the access token
    if (req.signedCookies.accessToken) {
      // Calling the verification method to check its validity
      verifyToken(req.signedCookies.accessToken, req, res, next);
    } else {
      // No token was provided
      res.sendStatus(443);
    }
  };
};
// Used to verify if the token is valid
const verifyToken = (token, req, res, next) => {
  jwt.verify(token, process.env.COPYRIGHT_ACCESS_TOKEN_SECRET, (err, userData) => {
    // token expired or not valid
    if (err) res.sendStatus(443);
    else {
      // attaching the user instance to the req
      req.user = userData._id;
      next();
    }
  });
};

const isAdmin = () => {
  return async (req, res, next) => {
    const user = await adminModel.findOne({_id: req.user});
    user ? next() : res.sendStatus(443);
  }
}

module.exports = {
  authenticated,
  isAdmin
};
