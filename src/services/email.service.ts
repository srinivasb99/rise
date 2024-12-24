import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from '../config/email.config';

interface EmailParams {
  name: string;
  email: string;
  message: string;
}

export async function sendEmail(params: EmailParams) {
  try {
    const response = await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATE_ID,
      {
        to_email: EMAIL_CONFIG.TO_EMAIL,
        from_name: params.name,
        from_email: params.email,
        message: params.message,
      },
      EMAIL_CONFIG.PUBLIC_KEY
    );

    if (response.status !== 200) {
      throw new Error('Failed to send email');
    }

    return response;
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
}
