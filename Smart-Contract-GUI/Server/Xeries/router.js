const XeriesRouter = require('express').Router();
const UserRouter = require("./routes/users");
const AdminRouter = require("./routes/admin");
const AuthRouter = require("./routes/authentication");
const SubscRouter = require("./routes/subscriptions");
const ListRouter = require("./routes/listings");

XeriesRouter.use("/users", UserRouter);
XeriesRouter.use("/admins", AdminRouter);
XeriesRouter.use("/auth", AuthRouter);
XeriesRouter.use("/subscribe", SubscRouter);
XeriesRouter.use("/listing", ListRouter);

module.exports = XeriesRouter;