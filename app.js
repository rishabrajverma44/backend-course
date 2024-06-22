const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "config/config.env" });
const userController = require("./controller/user");
const paymentController = require("./controller/paymentController");

const PORT = process.env.PORT || 3000;
const app = express();

// CORS setup
app.use(
  cors({
    origin: [
      "https://backend-course-he0i8mjzh-rishabrajverma44s-projects.vercel.app",
    ],
    methods: ["POST", "GET"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Body parsing setup
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error in connecting to MongoDB:", err));

// Routes
app.get("/", (req, res) => {
  res.json("hello from SERVER");
});

app.post("/signup", userController.signup);
app.post("/signin", userController.signin);
app.get("/signupverify", userController.verifyMail);
app.post("/submit-otp", userController.submitotp);
app.post("/send-otp", userController.sendotp);
app.post("/profileupdate", userController.profileupdate);

app.post("/orders", paymentController.orders);
app.post("/verify", paymentController.verify);
app.get("/getkey", (req, res) =>
  res.status(200).json({ key: process.env.KEY })
);

// Start server
app.listen(PORT, () => {
  console.log(`Backend Running At Port ${PORT}`);
});
