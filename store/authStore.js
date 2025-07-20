
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { userOperations } from '@/lib/firestore';

export const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        // State
        user: null,
        loading: true,
        error: null,
        isInitialized: false,

        // Actions
        setUser: (user) => {
          set({ user, loading: false, error: null }, false, 'setUser');
        },

        setLoading: (loading) => {
          set({ loading }, false, 'setLoading');
        },

        setError: (error) => {
          set({ error, loading: false }, false, 'setError');
        },

        clearError: () => {
          set({ error: null }, false, 'clearError');
        },

        setInitialized: (isInitialized) => {
          set({ isInitialized }, false, 'setInitialized');
        },

        initializeAuth: () => {
          if (get().isInitialized) {
            return () => {}; // Return empty unsubscribe function if already initialized
          }

          set({ loading: true, isInitialized: true }, false, 'initializeAuth');

          const unsubscribe = onAuthStateChanged(
            auth,
            async (user) => {
              try {
                if (user) {
                  // Create or update user profile in Firestore
                  try {
                    await userOperations.createOrUpdate(user.uid, {
                      email: user.email,
                      displayName: user.displayName || user.email?.split('@')[0] || 'User',
                      photoURL: user.photoURL,
                      lastLoginAt: new Date(),
                    });
                  } catch (firestoreError) {
                    console.warn('Could not update user profile in Firestore:', firestoreError);
                    // Don't fail auth if Firestore update fails
                  }

                  set({ 
                    user: {
                      uid: user.uid,
                      email: user.email,
                      displayName: user.displayName,
                      photoURL: user.photoURL,
                      emailVerified: user.emailVerified,
                    }, 
                    loading: false, 
                    error: null 
                  }, false, 'userSignedIn');
                } else {
                  set({ user: null, loading: false, error: null }, false, 'userSignedOut');
                }
              } catch (error) {
                console.error('Auth state change error:', error);
                set({ 
                  user: null, 
                  loading: false, 
                  error: 'Authentication error occurred' 
                }, false, 'authError');
              }
            },
            (error) => {
              console.error('Auth state change listener error:', error);
              set({ 
                user: null, 
                loading: false, 
                error: error?.message || 'Authentication error occurred' 
              }, false, 'authListenerError');
            }
          );

          return unsubscribe;
        },

        signOut: async () => {
          const { clearError } = get();
          
          set({ loading: true }, false, 'signOutStart');
          clearError();

          try {
            await firebaseSignOut(auth);
            set({ user: null, loading: false, error: null }, false, 'signOutSuccess');
            return { success: true };
          } catch (error) {
            console.error('Sign out error:', error);
            const errorMessage = error?.message || 'Failed to sign out';
            set({ error: errorMessage, loading: false }, false, 'signOutError');
            return { success: false, error: errorMessage };
          }
        },

        // Helper getters
        isAuthenticated: () => {
          const { user } = get();
          return !!user;
        },

        getUserInitials: () => {
          const { user } = get();
          if (!user || !user.email) return 'U';

          if (user.displayName) {
            const names = user.displayName.split(' ');
            if (names.length >= 2) {
              return (names[0][0] + names[1][0]).toUpperCase();
            }
            return names[0][0].toUpperCase();
          }

          const email = user.email;
          const nameParts = email.split('@')[0].split('.');

          if (nameParts.length >= 2) {
            return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
          }

          return email[0].toUpperCase();
        },

        getCurrentUser: () => {
          return get().user;
        },
      }),
      {
        name: 'auth-store',
        partialize: (state) => ({
          // Only persist user data, not loading states
          user: state.user,
        }),
      }
    ),
    {
      name: 'auth-store',
      serialize: true,
    }
  )
);
