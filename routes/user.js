const { Router } = require("express");
const { userModel, purchaseModel } = require("../database");
const jwt = require("jsonwebtoken");
const userRouter = Router();
const { JWT_USER_PASSWORD } = require("../config");
const { userMiddleware } = require("../middlewares/user");

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

userRouter.post("/signin", async function(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email: email,
    password: password
  });

  if(user) {
    const token = jwt.sign({
      id: user._id,
    }, JWT_USER_PASSWORD);

    res.json({
      token: token
    })

  }else {
    res.status(403).json({
      message: "Incorrect credentials"
    })
  }
})

userRouter.get("/purchases", userMiddleware, async function(req, res) {
  const userId = req.userId

  const purchases = await purchaseModel.find({
    userId,
  })

  res.json({
    purchases
  })
})


module.exports = {
  userRouter: userRouter
}