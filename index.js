require("dotenv").config()

console.log(process.env.MONGO_URL)

const express = require("express");
const app = express();

const { Schema, default: mongoose, model } = require("mongoose");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("connected to port 3000");
  app.listen(3000);
}

main()