const XeriesRouter = require('express').Router();
const UserRouter = require("./routes/users");
const AdminRouter = require("./routes/admin");
const AuthRouter = require("./routes/authentication");
const SubscRouter = require("./routes/subscriptions");

XeriesRouter.use("/users", UserRouter);
XeriesRouter.use("/admins", AdminRouter);
XeriesRouter.use("/auth", AuthRouter);
XeriesRouter.use("/subscribe", SubscRouter);

module.exports = XeriesRouter;