const { Router } = require("express");
const { userMiddleware } = require("../middlewares/user");
const { purchaseModel, courseModel } = require("../database");
const courseRouter = Router();

courseRouter.post('/purchase', userMiddleware, async function(req, res) {
  const userId = req.userId;
  const courseId = req.body.courseId;

  await purchaseModel.create ({
    userId,
    courseId
  })
  res.json({
    message: "You have succesfully bought the course"
  })
})
courseRouter.get('/preview', async function(req, res) {

  const courses = await courseModel.find({});

  res.json({
    courses
  })
})

module.exports = {
  courseRouter: courseRouter
}