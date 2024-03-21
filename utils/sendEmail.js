const nodeMailer = require("nodemailer");

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  // Ensure 'from' address is the authenticated user to avoid SendAsDenied error
  const options = {
    from: `"InTrack" <${process.env.EMAIL_USER}>`, // Use the authenticated sender's address
    to: send_to,
    replyTo: reply_to ? reply_to : process.env.EMAIL_USER, // Fallback to sender if replyTo is not provided
    subject: subject,
    html: message,
  };

  // send email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.error("Failed to send email:", err);
    } else {
      console.log("Email sent:", info);
    }
  });
};

module.exports = sendEmail;
