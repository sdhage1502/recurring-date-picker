import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs,
  addDoc,
  deleteDoc,
  Timestamp 
} from "firebase/firestore";
import { db } from "./firebase";
import type { User as FirebaseUser } from "firebase/auth";
import type { RecurrencePattern } from "@shared/schema";

// User document interface for Firestore
export interface UserDocument {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Task document interface for Firestore
export interface TaskDocument {
  id?: string;
  userId: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: Timestamp;
  isRecurring: boolean;
  recurrencePattern?: RecurrencePattern;
  parentTaskId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// User operations
export async function createOrUpdateUser(firebaseUser: FirebaseUser): Promise<UserDocument> {
  const userRef = doc(db, "users", firebaseUser.uid);
  const userDoc = await getDoc(userRef);
  
  const userData: UserDocument = {
    uid: firebaseUser.uid,
    email: firebaseUser.email || "",
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    createdAt: userDoc.exists() ? userDoc.data().createdAt : Timestamp.now(),
    updatedAt: Timestamp.now(),
  };

  await setDoc(userRef, userData, { merge: true });
  return userData;
}

export async function getUser(uid: string): Promise<UserDocument | null> {
  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);
  
  if (userDoc.exists()) {
    return userDoc.data() as UserDocument;
  }
  
  return null;
}

// Task operations
export async function createTask(task: Omit<TaskDocument, "id" | "createdAt" | "updatedAt">): Promise<TaskDocument> {
  const tasksRef = collection(db, "tasks");
  const taskData: Omit<TaskDocument, "id"> = {
    ...task,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };

  const docRef = await addDoc(tasksRef, taskData);
  return { ...taskData, id: docRef.id };
}

export async function getUserTasks(userId: string): Promise<TaskDocument[]> {
  const tasksRef = collection(db, "tasks");
  const q = query(tasksRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as TaskDocument));
}

export async function updateTask(taskId: string, updates: Partial<TaskDocument>): Promise<void> {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteTask(taskId: string): Promise<void> {
  const taskRef = doc(db, "tasks", taskId);
  await deleteDoc(taskRef);
}

// Helper function to convert Firestore timestamp to Date
export function timestampToDate(timestamp: Timestamp): Date {
  return timestamp.toDate();
}

// Helper function to convert Date to Firestore timestamp
export function dateToTimestamp(date: Date): Timestamp {
  return Timestamp.fromDate(date);
}