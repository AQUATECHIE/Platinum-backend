import nodemailer from "nodemailer";

const sendEmail = async (email, subject, message) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',  // Change to your email service provider
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,  // Use app-specific password
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text: message,
      };
  
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Email could not be sent');
    }
  };

export default sendEmail;