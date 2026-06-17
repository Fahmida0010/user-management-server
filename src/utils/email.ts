import nodemailer from "nodemailer";

// IMPORTANT NOTE:
// async email sending (task requirement)

export const sendEmail = async (email: string, link: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yourgmail@gmail.com",
      pass: "your_app_password",
    },
  });

  await transporter.sendMail({
    from: "Task App",
    to: email,
    subject: "Verify your account",
    text: `Click to verify: ${link}`,
  });
};