const { Router } = require("express");
const adminRouter = Router(); 
const { adminModel } = require("../database");
// bcrypt zod jsonwebtoken
const JWT_ADMIN_PASSWORD = "ulalalaeeye";
const jwt = require("jsonwebtoken");

// here we are making all the endpoints for the admin router
adminRouter.post("/signup", async function(req, res) {
  const { email, password, firstName, lastName } = req.body;
  // 3 additional steps to be done
  // adding hashing for the password to be safe
  // zod validation
  // put adminModel in try-catch block

  await adminModel.create ({
    email: email,
    password: password,
    firstName: firstName, 
    lastName: lastName
  })

  res.json({
    message: "signup succeeded"
  })
})

adminRouter.post("/signin", async function(req, res) {
  const { email, password } = req.body;
  const admin = await adminModel.findOne({
    email: email,
    password: password
  });

  if(admin) {
    const token = jwt.sign({
      id: admin._id,
    }, JWT_ADMIN_PASSWORD);

    res.json({
      token: token
    })
    
  }else {
    res.status(403).json({
      message: "Incorrect credentials"
    })
  }
})

adminRouter.post("/", function(req, res) {
  res.json({
    message: "signin endpoint"
  })
})

adminRouter.put("/", function(req, res) {
  res.json({
    message: "signin endpoint"
  })
})

adminRouter.get("/bulk", function(req, res) {
  res.json({
    message: "signin endpoint"
  })
})

module.exports = {
  adminRouter: adminRouter
}