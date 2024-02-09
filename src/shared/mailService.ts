import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import EmailTemplate from "src/components/EmailTemplate";
import { google } from "googleapis";

const OAuth = google.auth.OAuth2;

export async function sendMail(
  username: string = "",
  toEmail: string,
  token: string
) {
  const oauth2Client = new OAuth(
    process.env.OAUTH_CLIENTID,
    process.env.OAUTH_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN,
  });

  oauth2Client.getAccessToken(async (err, refresh_token) => {
    if (err || !refresh_token) return console.log(err);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.NODEMAILER_EMAIL,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: refresh_token,
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
  });
}
