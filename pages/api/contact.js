import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address' });
  }

  // Sanitize and validate input lengths
  const sanitizedName = name.trim().substring(0, 100);
  const sanitizedSubject = subject.trim().substring(0, 200);
  const sanitizedMessage = message.trim().substring(0, 2000);

  if (!sanitizedName || !sanitizedSubject || !sanitizedMessage) {
    return res.status(400).json({ success: false, error: 'Invalid input data' });
  }

  // Prepare email content
  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f8f8f8; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #555; }
          .value { background: #f9f9f9; padding: 10px; border-radius: 4px; border-left: 4px solid #0066cc; }
          .message-content { white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
            <p>You have received a new message from your website contact form.</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${sanitizedName}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Subject:</div>
              <div class="value">${sanitizedSubject}</div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div class="value message-content">${sanitizedMessage}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const msg = {
    to: 'georgehadow@gmail.com',
    from: {
      email: 'noreply@sendgrid.net', // Using SendGrid's verified sender
      name: 'George Hadow Website'
    },
    replyTo: {
      email: email,
      name: sanitizedName
    },
    subject: `Contact Form: ${sanitizedSubject}`,
    html: emailHtml,
    text: `
New Contact Form Submission

Name: ${sanitizedName}
Email: ${email}
Subject: ${sanitizedSubject}

Message:
${sanitizedMessage}

---
This message was sent from the contact form on georgehadow.com
    `.trim()
  };

  try {
    console.log('Sending contact form email:', {
      to: msg.to,
      subject: msg.subject,
      from: msg.from.email,
      replyTo: msg.replyTo.email
    });

    await sgMail.send(msg);

    console.log('Contact form email sent successfully');
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully'
    });

  } catch (error) {
    console.error('SendGrid email sending failed:', error);

    // Return user-friendly error message
    return res.status(500).json({
      success: false,
      error: 'Sorry, there was an error sending your message. Please try again later or contact directly at georgehadow@gmail.com'
    });
  }
}