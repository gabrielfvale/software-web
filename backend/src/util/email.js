const nodemailer = require("nodemailer");

async function sendEmail(email, token, user_id) {
  try {
    const { CLIENT_URL, MAILER_USER, MAILER_PASSWORD } = process.env;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: MAILER_USER,
        pass: MAILER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: "no-reply@film.it",
      to: email,
      subject: "Reset password for Filmit",
      html: `<p>Here is your link to reset your password on Filmit:</p>
      <a href="${CLIENT_URL}/reset-password?token=${token}&id=${user_id}">Reset password</a>`,
    });
  } catch (e) {
    return e;
  }
}

module.exports = { sendEmail };
