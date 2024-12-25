const { Router } = require("express");
const adminRouter = Router(); 
const { adminModel } = require("../database");
// bcrypt zod jsonwebtoken

// here we are making all the endpoints for the admin router
adminRouter.post("/signup", function(req, res) {
  res.json({
    message: "signup endpoint"
  })
})

adminRouter.post("/signin", function(req, res) {
  res.json({
    message: "signin endpoint"
  })
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