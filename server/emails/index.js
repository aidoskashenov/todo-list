import dotenv from 'dotenv';

import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testuser152062236@gmail.com',
    pass: process.env.EMAIL_PASSWD,
  },
});

export default (user, list) => {
  transporter.sendMail(
    {
      from: 'testuser152062236@gmail.com',
      to: user,
      subject: 'Get 💩 done!',
      text: list,
    },
    (error, info) => {
      if (error) {
        throw new Error(error);
      }
      console.info(`Email sent: ${info.response}`);
    },
  );
};
