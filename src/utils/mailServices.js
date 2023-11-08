const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "75f5d05a24e162",
    pass: "94a02ae4cc4c41",
  },
});
const mailServices = {
  sentOTP: async (to, OTP) => {
    let info = await transporter.sendMail({
      from: `"noReply Bus-Ticketing" <${process.env.MAIL}>`, // sender address
      to: to.toString(), // list of receivers
      subject: "OTP", // Subject line
      text: ` Your OTP is ${OTP}`, // plain text body
      html: `Your OTP is <b>${OTP}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return info;
  },
};
module.exports = mailServices;
