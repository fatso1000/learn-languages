import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { Options } from "nodemailer/lib/mailer";
import EmailTemplate from "src/components/EmailTemplate";

export async function sendMail(
  username: string = "",
  toEmail: string,
  token: string,
  locale: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const emailHtml = await render(
    EmailTemplate({ username, uri: `/${locale}/auth/verified?token=${token}` })
  );

  const mailOptions: Options = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: "Email confirmation",
    text: "Hi, from Learn Lenguages Online!",
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
