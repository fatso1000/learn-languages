import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import EmailTemplate from "src/components/EmailTemplate";

export async function sendMail(
  username: string = "",
  toEmail: string,
  token: string
) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.NODEMAILER_EMAIL,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  const emailHtml = render(
    EmailTemplate({ username, uri: `/auth/verified?token=${token}` })
  );

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: "E-Learning",
    text: "Hi from E-Learning",
    html: emailHtml,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}
