const { Router } = require("express");
const { userModel } = require("../database");

const userRouter = Router();

userRouter.post("/signup", async function(req, res) {
  const { email, password, firstName, lastName } = req.body;
  // 3 additional steps to be done
  // adding hashing for the password to be safe
  // zod validation
  // put userModel in try-catch block

  await userModel.create ({
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName
  })

  res.json({
    message: "signup succeeded"
  })
})

userRouter.post("/signin", function(req, res) {
  res.json({
    message: "signin endpoint"
  })
})

userRouter.get("/purchases", function(req, res) {
  res.json({
    message: "signin endpoint"
  })
})


module.exports = {
  userRouter: userRouter
}