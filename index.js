const express = require("express");
const app = express();
const { Schema, default: mongoose, model } = require("mongoose");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  await mongoose.connect("mongodb+srv://ishanv002:IShanMongoDB@cluster0.7wq9k.mongodb.net/ishan-course-selling-app")
  console.log("connected to database: ");
  app.listen(3000);
}

main()