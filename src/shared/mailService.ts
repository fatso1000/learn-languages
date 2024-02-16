import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import EmailTemplate from "src/components/EmailTemplate";

export async function sendMail(
  username: string = "",
  toEmail: string,
  token: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const emailHtml = render(
    EmailTemplate({ username, uri: `/auth/verified?token=${token}` })
  );

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: "E-Learning",
    text: "Hi from E-Learning",
    html: emailHtml,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}
