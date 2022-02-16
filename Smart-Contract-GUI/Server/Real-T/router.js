const RealTRouter = require('express').Router();
const UserRouter = require("./routes/users");
const AdminRouter = require("./routes/admin");
const AuthRouter = require("./routes/authentication");
const SubscRouter = require("./routes/subscriptions");
const ListRouter = require("./routes/listings");

RealTRouter.use("/users", UserRouter);
RealTRouter.use("/admins", AdminRouter);
RealTRouter.use("/auth", AuthRouter);
RealTRouter.use("/subscribe", SubscRouter);
RealTRouter.use("/listing", ListRouter);

module.exports = RealTRouter;