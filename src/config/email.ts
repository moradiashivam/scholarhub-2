export const emailConfig = {
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  },
  from: process.env.EMAIL_FROM || 'ScholarHub <noreply@scholarhub.com>',
  templates: {
    resetPassword: {
      subject: 'Reset Your ScholarHub Password',
      text: (token: string) => `
        Reset your password by clicking this link:
        ${process.env.APP_URL}/reset-password?token=${token}
      `,
      html: (token: string) => `
        <h1>Reset Your Password</h1>
        <p>Click the button below to reset your password:</p>
        <a href="${process.env.APP_URL}/reset-password?token=${token}" 
           style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Reset Password
        </a>
      `
    },
    contactForm: {
      subject: 'New Contact Form Submission',
      text: (data: any) => `
        New contact form submission:
        Name: ${data.name}
        Email: ${data.email}
        Message: ${data.message}
      `,
      html: (data: any) => `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `
    }
  }
};