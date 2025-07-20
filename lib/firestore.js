
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export function dateToTimestamp(date) {
    if (!date) return null;
    if (date instanceof Date) {
        return Timestamp.fromDate(date);
    }
    if (typeof date === 'string') {
        return Timestamp.fromDate(new Date(date));
    }
    return Timestamp.fromDate(new Date(date));
}

// User operations
export const userOperations = {
  async createOrUpdate(userId, userData) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...userData,
        updatedAt: Timestamp.now(),
      });
      return { success: true };
    } catch (error) {
      if (error.code === 'not-found') {
        await addDoc(collection(db, 'users'), {
          uid: userId,
          ...userData,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
        return { success: true };
      }
      throw error;
    }
  },

  async get(userId) {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDocs(query(collection(db, 'users'), where('uid', '==', userId)));
      if (!userSnap.empty) {
        return { success: true, data: userSnap.docs[0].data() };
      }
      return { success: false, error: 'User not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Task operations
export const taskOperations = {
  async create(userId, taskData) {
    try {
      const tasksRef = collection(db, 'tasks');
      const docRef = await addDoc(tasksRef, {
        ...taskData,
        userId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getAll(userId) {
    try {
      const tasksRef = collection(db, 'tasks');
      const q = query(
        tasksRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const tasks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      return { success: true, data: tasks };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async update(taskId, updateData) {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, {
        ...updateData,
        updatedAt: Timestamp.now(),
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async delete(taskId) {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await deleteDoc(taskRef);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};
