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
    html: `
<div style="font-family:Arial;padding:20px">
  <h2>Verify Your Account</h2>

  <p>
    Click the button below to activate your account.
  </p>

  <a
    href="${link}"
    style="
      background:#2563eb;
      color:white;
      padding:12px 20px;
      border-radius:6px;
      text-decoration:none;
      display:inline-block;
    "
  >
    Verify Email
  </a>
</div>
`,
  });
};