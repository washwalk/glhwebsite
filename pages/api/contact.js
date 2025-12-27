export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    // Here you would integrate with an email service like:
    // - Nodemailer with SMTP
    // - SendGrid, Mailgun, or other email APIs
    // - Vercel Edge Functions with email capabilities

    // For now, we'll just log the email data
    console.log('Contact form submission:', {
      to: 'georgehadow@gmail.com',
      from: email,
      subject: `Contact Form: ${subject}`,
      name,
      message
    });

    // Simulate email sending (replace with actual email service)
    // Example with Nodemailer:
    /*
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to: 'georgehadow@gmail.com',
      subject: `Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email
    });
    */

    // Placeholder response - in production this would actually send the email
    return res.status(200).json({
      message: 'Message sent successfully',
      // In production, remove this debug info
      debug: {
        recipient: 'georgehadow@gmail.com',
        sender: email,
        subject: `Contact Form: ${subject}`
      }
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send message' });
  }
}