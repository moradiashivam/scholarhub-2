import emailjs from '@emailjs/browser';

class EmailService {
  private readonly serviceId: string;
  private readonly templateId: string;
  private readonly publicKey: string;

  constructor() {
    this.serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    this.templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    this.publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  }

  async sendResetPasswordEmail(email: string, token: string): Promise<void> {
    await emailjs.send(
      this.serviceId,
      this.templateId,
      {
        to_email: email,
        reset_link: `${window.location.origin}/reset-password?token=${token}`,
        type: 'reset_password'
      },
      this.publicKey
    );
  }

  async sendContactFormEmail(data: {
    name: string;
    email: string;
    message: string;
  }): Promise<void> {
    await emailjs.send(
      this.serviceId,
      this.templateId,
      {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        type: 'contact'
      },
      this.publicKey
    );
  }
}

export const emailService = new EmailService();