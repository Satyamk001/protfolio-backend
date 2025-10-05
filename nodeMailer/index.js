const nodemailer = require("nodemailer");
require("dotenv").config();

const myAccount = {
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
};

if (!myAccount.email || !myAccount.password) {
  console.error("EMAIL/PASSWORD env vars are missing. Configure your .env.");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: myAccount.email,
    pass: myAccount.password,
  },
});

const sendMail = async ({ from, subject, text }) => {
  const mailOptions = {
    from: myAccount.email,
    to: myAccount.email,
    replyTo: from,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info; // success info
  } catch (error) {
    throw error; // throw to be caught in your route
  }
};

module.exports = sendMail;
