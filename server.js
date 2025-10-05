require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const sendMail = require("./nodeMailer/index");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/health", (req, res) => {
  console.log("Healthy");
  res.send("Healthy");
});

app.post("/sendMail", async (req, res) => {
  try {
    const { email, name, message } = req.body;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({
        success: false,
        message: "Invalid email format",
      });
    }

    if (!name || !message) {
      return res.status(400).send({
        success: false,
        message: "Name and message are required",
      });
    }

    const mail = await sendMail({ from: email, subject: name, text: message });
    console.log(mail);

    res.status(200).send({
      success: true,
      message: "Mail sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error occurred while sending mail",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
