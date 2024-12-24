import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { app } from './firebase';
import { sendEmail } from '../services/email.service';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  try {
    const db = getFirestore(app);
    // Add to Firestore
    const docRef = await addDoc(collection(db, 'messages'), {
      ...data,
      timestamp: new Date(),
      status: 'unread'
    });

    // Send email
    await sendEmail(data);

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
}
