import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, updateDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

interface User {
  id: string;
  employeeId?: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  location: string;
  joinDate: string;
  avatar: string;
  reportingManager: string;
  role: 'employee' | 'admin' | 'super_admin';
  adminDepartments?: string[];
}

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updatedData: Partial<User>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Add timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      if (loading || initializing) {
        console.warn('⚠️ Auth loading timeout - setting loading to false');
        setLoading(false);
        setInitializing(false);
      }
    }, 5000);

    let userDataUnsubscribe: (() => void) | null = null;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('🔐 Auth state changed:', firebaseUser?.email);
      setError(null);
      
      // Don't show loading spinner on subsequent auth checks
      if (initializing) {
        setLoading(true);
      }

      // Cleanup previous user data listener
      if (userDataUnsubscribe) {
        userDataUnsubscribe();
        userDataUnsubscribe = null;
      }

      if (firebaseUser) {
        try {
          console.log('📄 Setting up real-time listener for UID:', firebaseUser.uid);
          
          // Set up real-time listener for user document
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          userDataUnsubscribe = onSnapshot(
            userDocRef,
            (userDoc) => {
              if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log('🔄 Real-time update detected! User data from Firestore:', {
                  name: userData.name,
                  designation: userData.designation,
                  role: userData.role,
                  updatedAt: userData.updatedAt
                });
                const user: User = {
                  id: firebaseUser.uid,
                  employeeId: userData.employeeId || firebaseUser.uid,
                  name: userData.name || firebaseUser.displayName || '',
                  email: firebaseUser.email || '',
                  phone: userData.phone || '',
                  designation: userData.designation || '',
                  department: userData.department || '',
                  location: userData.location || '',
                  joinDate: userData.joinDate || '',
                  avatar: userData.avatar || firebaseUser.photoURL || '',
                  reportingManager: userData.reportingManager || '',
                  role: userData.role || 'employee',
                  adminDepartments: userData.adminDepartments || []
                };
                setUser(user);
                setFirebaseUser(firebaseUser);
                setLoading(false);
                setInitializing(false);
                console.log('✅ User state updated in AuthContext:', {
                  name: user.name,
                  designation: user.designation,
                  role: user.role
                });
              } else {
                console.error('❌ User document does not exist in Firestore');
                setError('User data not found in Firestore. Please contact administrator.');
                signOut(auth);
                setLoading(false);
                setInitializing(false);
              }
            },
            (err) => {
              console.error('❌ Error in real-time listener:', err);
              setError('Failed to sync user data');
              setLoading(false);
              setInitializing(false);
            }
          );
        } catch (err) {
          console.error('❌ Error setting up listener:', err);
          setError('Failed to load user data');
          await signOut(auth);
          setLoading(false);
          setInitializing(false);
        }
      } else {
        console.log('🚪 User logged out');
        setUser(null);
        setFirebaseUser(null);
        setLoading(false);
        setInitializing(false);
      }
      
      clearTimeout(loadingTimeout);
    });

    return () => {
      unsubscribe();
      if (userDataUnsubscribe) {
        userDataUnsubscribe();
      }
      clearTimeout(loadingTimeout);
    };
  }, []);

  const login = async (email: string, password: string) => {
    console.log('🔑 Attempting login for:', email);
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Login successful:', result.user.email);
      // onAuthStateChanged will handle setting user state
    } catch (err: any) {
      console.error('❌ Login error:', err);
      setError(err.message || 'Login failed');
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    setError(null);
    try {
      await signOut(auth);
      setUser(null);
      setFirebaseUser(null);
    } catch (err: any) {
      console.error('Logout error:', err);
      setError(err.message || 'Logout failed');
      throw err;
    }
  };

  const updateUser = async (updatedData: Partial<User>) => {
    if (!user || !firebaseUser) return;
    
    setError(null);
    try {
      console.log('📝 Updating user profile in Firestore...');
      
      // Update Firestore document
      const userRef = doc(db, 'users', firebaseUser.uid);
      await updateDoc(userRef, {
        ...updatedData,
        updatedAt: serverTimestamp()
      });
      
      // Update local state
      setUser({ ...user, ...updatedData });
      console.log('✅ Profile updated successfully');
    } catch (err: any) {
      console.error('❌ Error updating profile:', err);
      setError(err.message || 'Failed to update profile');
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, firebaseUser, login, logout, updateUser, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
