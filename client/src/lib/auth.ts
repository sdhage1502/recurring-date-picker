import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  updateProfile,
  User as FirebaseUser
} from "firebase/auth";
import { auth } from "./firebase";
import { createOrUpdateUser } from "./firestore";

export interface AuthCredentials {
  email: string;
  password: string;
  displayName?: string;
}

export async function signIn(credentials: AuthCredentials) {
  try {
    const result = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    
    // Update user document in Firestore
    if (result.user) {
      await createOrUpdateUser(result.user);
    }
    
    return { user: result.user, error: null };
  } catch (error: any) {
    // Provide user-friendly error messages
    let errorMessage = "Something went wrong. Please try again.";
    
    if (error.code === "auth/user-not-found") {
      errorMessage = "No account found with this email. Please sign up first.";
    } else if (error.code === "auth/wrong-password") {
      errorMessage = "Incorrect password. Please try again.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Please enter a valid email address.";
    } else if (error.code === "auth/user-disabled") {
      errorMessage = "This account has been disabled. Please contact support.";
    } else if (error.code === "auth/too-many-requests") {
      errorMessage = "Too many failed attempts. Please try again later.";
    }
    
    return { user: null, error: errorMessage };
  }
}

export async function signUp(credentials: AuthCredentials) {
  try {
    const result = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
    
    if (credentials.displayName && result.user) {
      await updateProfile(result.user, {
        displayName: credentials.displayName
      });
    }
    
    // Create user document in Firestore
    if (result.user) {
      await createOrUpdateUser(result.user);
    }
    
    return { user: result.user, error: null };
  } catch (error: any) {
    // Provide user-friendly error messages
    let errorMessage = "Something went wrong. Please try again.";
    
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "An account with this email already exists. Please sign in instead.";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "Password should be at least 6 characters long.";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Please enter a valid email address.";
    } else if (error.code === "auth/operation-not-allowed") {
      errorMessage = "Email/password accounts are not enabled. Please contact support.";
    }
    
    return { user: null, error: errorMessage };
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export function getUserInitials(user: FirebaseUser | null): string {
  if (!user) return "";
  
  if (user.displayName) {
    return user.displayName
      .split(" ")
      .map(name => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  
  return user.email?.charAt(0).toUpperCase() || "U";
}
