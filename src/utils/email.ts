import nodemailer from "nodemailer";

// IMPORTANT NOTE:
// async email sending (task requirement)

export const sendEmail = async (email: string, link: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from:process.env.EMAIL_USER,
    to: email,
    subject: "Verify your account",
    text: `Click to verify: ${link}`,
  });
};