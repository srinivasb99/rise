npm install express body-parser cors nodemailer
node server.js
npm install dotenv
EMAIL_USER=riseonlinesolutions@gmail.com
EMAIL_PASS=5FiguresAMonth

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Correct environment variable usage
    pass: process.env.EMAIL_PASS, // Correct environment variable usage
  },
});

// API Endpoint for Contact Form
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Email where messages will be sent
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Failed to send message. Please try again later.');
    }
    console.log('Email sent:', info.response);
    res.status(200).send('Message sent successfully!');
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
