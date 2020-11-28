const nodemailer = require("nodemailer");
require('dotenv').config();


/*
 * Mail sender function
 *
 * @param : Object sendObj
 * @return Boolean
 *
  * */
async function send(param){
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: (process.env.MAIL_SECURE_FLG == 'true')? true : false,
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  let info = await transporter.sendMail({
    from: param.email,
    to: process.env.MAIL_TO,
    subject: process.env.MAIL_SUBJECT,
    text: process.env.message,
    //html: "<b>Hello world?</b>"
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}


module.exports = { send }
