const express = require("express");

const app = express();

const userRouter = require("./userRouter.js")

app.use("/user", userRouter);

app.listen(3000, () => {
    console.log(`App is listening on port : ${3000}`);
})