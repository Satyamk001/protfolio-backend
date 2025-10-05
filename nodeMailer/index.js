// // sendMail.js
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async ({ from, subject, text }) => {
  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.EMAIL,
      subject: `New message from ${subject}`,
      text: `Email: ${from}\n\nMessage:\n${text}`,
    });

    return { success: true };
  } catch (error) {
    console.error("Mail error:", error);
    return { success: false, error };
  }
};

module.exports = sendMail;
