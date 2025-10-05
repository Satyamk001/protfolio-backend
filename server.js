require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const sendMail = require("./nodeMailer/index");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  console.log("Healthy");
  res.send("Healthy");
});

app.post("/sendMail", async (req, res) => {
  try {
    const { email, name, message } = req.body;
    const mail = await sendMail({ from: email, subject: name, text: message });
    console.log(mail);
    res.status(200).send({ success: true, message: "Mail sent successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error occured while sending mail" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
