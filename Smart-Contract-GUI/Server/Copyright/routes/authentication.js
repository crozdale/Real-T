const router = require("express").Router();
const UserModel = require("../models/users");
const AdminModel = require("../models/admins");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticated = require("../middleware/authorization").authenticated();

// Main login logic
const login = async (req, res) => {
  try {
    // extracting the username and password fields from the body
    const { body: { username, password, role } } = req;
    // Check if user exists with this username
    const user = role === 'admin' ? await AdminModel.findOne({username: escape(username.toLowerCase())}) 
                                  : await UserModel.findOne({ username: escape(username.toLowerCase()), role });
    // if no user is found for this username send 401 error
    if (!user) return res.sendStatus(401).send("Invalid credentials");
    // else, compare the password hash with the hashed password in the database
    if (await bcrypt.compare(password, user.password)) {
      // Generate the access token
      const accessToken = generateAccessToken(user);
      // setting the accesstoken as an httpOnly cookie
      // to prevent modifying it and it's signed with a key
      // will be set to be secured: true in production and deployment
      res.cookie("accessToken", accessToken, {
        secure: false,
        httpOnly: true,
        sameSite: true,
        signed: true,
        expires: new Date(Date.now() + 31536000000),
      });
      // sending role in a protected cookie
      res.cookie("role", role, {
        secure: false,
        httpOnly: true,
        sameSite: true,
        signed: false,
        expires: new Date(Date.now() + 31536000000),
      });
      // Send success response
      res.status(200).send(user._id);
    } else {
      // if the password hash is not matched return error response
      res.status(401).send("Invalid credentials");
    }
  } catch {
    // if any error happend return server-side problem code
    res.status(500).send("Internal server error");
  }
};

const generateAccessToken = (userData) => {
  // getting user unique id before generating the token
  const { _id } = userData._doc;
  // Generating the token with 1 day expiry
  return jwt.sign({ _id }, process.env.COPYRIGHT_ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const logout = async (req, res) => {
  // When user logout clear cookies and send success code
  res.clearCookie("accessToken");
  res.clearCookie("role");
  res.sendStatus(200);
};

// Router routes for login, logout, and check authentication
router.post("/login", login);
router.post("/logout", logout);
router.post("/checkAuth", authenticated, async (req, res, next) => {
  // if user passes the authentication middleware send a success code
  req.user && res.sendStatus(200)
});

module.exports = router;
