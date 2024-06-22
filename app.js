const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "config/config.env" });
const mongoose = require("mongoose");
const cors = require("cors");
const userController = require("./controller/user");
const paymentController = require("./controller/paymentController");
const PORT = process.env.PORT || 3000;

const app = express();

// CORS setup
app.use(
  cors({
    origin: ["https://course-frontend-pi.vercel.app"],
    methods: ["POST", "GET", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Handle preflight requests for all routes
app.options("*", cors());

// Body parsing setup
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// View engine setup
app.set("view engine", "ejs");
app.set("views", "./views");

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

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend Running At Port ${PORT}`);
});
