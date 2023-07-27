const nodemailer = require('nodemailer');
const fs = require('fs');

const sendEmail = async (recipient, subject, body,path,isAttachment,from) => {
  // Create a transporter object with your email service provider's SMTP configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'sameertesla@gmail.com',
      pass: 'umcysgekfhrnybih'
    }
  });

  // Prepare the email options
  const mailwithattach = {
    from: 'sameertesla@gmail.com',
    to: recipient,
    subject: subject,
    text: body,
    attachments: [
      {
        filename: 'attachment.pdf',
        path: path,
        contentType: 'application/pdf',
        contentDisposition: 'attachment'
      }
    ]
  };
  const mailwithoutattach = {
    from: 'sameertesla@gmail.com',
    to: recipient,
    subject: subject,
    text: body,
  };

  try {
    // Send the email
    const info = await transporter.sendMail(isAttachment?mailwithattach:mailwithoutattach);
    console.log('Email sent successfully!', info);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports=sendEmail;