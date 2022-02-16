const MainRouter = require('express').Router();
const UserRouter = require("./routes/users");

MainRouter.use("/users", UserRouter);

module.exports = MainRouter;