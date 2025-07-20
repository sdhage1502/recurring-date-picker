
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Validate required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.warn(`Missing Firebase environment variables: ${missingEnvVars.join(', ')}`);
  console.warn('Using demo configuration. Please set up your Firebase environment variables.');
}

// Firebase configuration with fallbacks
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 
              `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project"}.firebaseapp.com`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
                 `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project"}.firebasestorage.app`,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "demo-app-id",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Development environment setup
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Only connect to emulators in development and on client-side
  const isUsingEmulators = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === 'true';
  
  if (isUsingEmulators) {
    try {
      // Connect to Authentication emulator
      if (!auth._delegate._authCredentials) {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      }
      
      // Connect to Firestore emulator
      if (!db._delegate._terminated) {
        connectFirestoreEmulator(db, 'localhost', 8080);
      }
      
      console.log('Connected to Firebase emulators');
    } catch (error) {
      console.warn('Could not connect to Firebase emulators:', error.message);
    }
  }
}

// Configuration info (useful for debugging)
export const firebaseInfo = {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  isDemo: firebaseConfig.projectId === 'demo-project',
  environment: process.env.NODE_ENV || 'development',
};

// Log configuration status
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('Firebase Configuration:', {
    projectId: firebaseInfo.projectId,
    isDemo: firebaseInfo.isDemo,
    environment: firebaseInfo.environment,
  });
}
