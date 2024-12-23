import { ref, push } from 'firebase/database';
import { db } from './firebase';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  const messagesRef = ref(db, 'messages');
  return push(messagesRef, {
    ...data,
    timestamp: new Date().toISOString(),
  });
}
