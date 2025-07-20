import { signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from './firebase';

export function getUserInitials(user) {
  if (!user || !user.email) return 'U';

  const email = user.email;
  const nameParts = email.split('@')[0].split('.');

  if (nameParts.length >= 2) {
    return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
  }

  return email[0].toUpperCase();
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error: error.message };
  }
}