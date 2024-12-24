import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { app } from './firebase';

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
      status: 'unread', // Optional: Helps track new messages
    });

    console.log('Message successfully saved with ID:', docRef.id);

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
}
