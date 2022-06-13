const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "420ad6142689cd", // generated ethereal user
    pass: "74466f7d13da94", // generated ethereal password
  },
});
