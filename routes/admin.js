const { Router } = require("express");
const adminRouter = Router(); 
const { adminModel, courseModel } = require("../database");
// bcrypt zod jsonwebtoken
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middlewares/admin");

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

adminRouter.post("/course", adminMiddleware, async function(req, res) {
  const adminId = req.userId;

  const { title, description, price, imageUrl } = req.body;

  const course = await courseModel.create ({
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
    creatorId: adminId
  })

  res.json({
    message: "Course created",
    courseId: course._id
  })
})

adminRouter.put("/course", adminMiddleware, async function(req, res) {
  const adminId = req.userId;

  const { title, description, price, imageUrl, courseId } = req.body;

  const course = await courseModel.updateOne({
    _id: courseId,
    creatorId: adminId
  }, {
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price
  })

  res.json({
    message: "Course updated",
    courseId: course._id
  })
})

adminRouter.get("/course/bulk", adminMiddleware, async function(req, res) {
  const adminId = req.userId;
  
  const courses = await courseModel.find({
    creatorId: adminId
  });

  res.json({
    message: "Course updated",
    courses
  })
})

module.exports = {
  adminRouter: adminRouter
}

