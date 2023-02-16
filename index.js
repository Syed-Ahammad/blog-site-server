const express = require("express");
const mongoose = require("mongoose");
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const cors = require('cors')
const multer = require('multer');
const dotenv = require("dotenv");

const app = express();
dotenv.config();
app.use(cors())
app.use(express.json());

const port = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URL
//     , {
//     useNewUrlParse: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true, }
//     )
//   .then(console.log("connected to mongoDB"))
//   .catch((err) => console.log(err));


// <----------------------------->

mongoose.set("strictQuery", false);
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  
  console.log("MongoDB was connected");
}

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, "images");
  },
  filename: (req, file, cb)=>{
    cb(null, "hi.jpg");
  },
});

const upload = multer({storage: storage});
app.post("/upload", upload.single("file"), (req, res)=>{
  res.status(200).json("File has been uploaded");
});

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/categories', categoryRoute);


app.listen(port, () => {
  console.log("Backend is running");
});
