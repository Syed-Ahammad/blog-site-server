const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();

dotenv.config();

const port = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URL
//     , {
//     useNewUrlParse: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true, }
//     )
//   .then(console.log("connected to mongoDB"))
//   .catch((err) => console.log(err));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("connected to mongoDB")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.listen(port, () => {
  console.log("Backend is running");
});
