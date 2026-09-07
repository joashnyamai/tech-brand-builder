import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";

export interface AdminUser {
  email: string;
  uid: string;
  isFirebase: boolean;
}

interface AuthContextType {
  adminUser: AdminUser | null;
  isAdmin: boolean;
  loading: boolean;
  isFirebaseMode: boolean;
  signIn: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In-memory session holder to avoid insecure persistent token storage in localStorage
let inMemorySession: AdminUser | null = null;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(inMemorySession);
  const [loading, setLoading] = useState(true);
  const isFirebaseMode = isFirebaseConfigured() && Boolean(auth);

  useEffect(() => {
    if (isFirebaseMode && auth) {
      const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
        if (user && user.email) {
          const admin: AdminUser = {
            email: user.email,
            uid: user.uid,
            isFirebase: true,
          };
          inMemorySession = admin;
          setAdminUser(admin);
        } else {
          inMemorySession = null;
          setAdminUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // In local dev mode, check inMemorySession or active session flag
      const localActive = sessionStorage.getItem("admin_session_active");
      if (localActive === "true") {
        const localUser: AdminUser = {
          email: "jamesmnyamai9@gmail.com",
          uid: "local-admin-uid",
          isFirebase: false,
        };
        inMemorySession = localUser;
        setAdminUser(localUser);
      }
      setLoading(false);
    }
  }, [isFirebaseMode]);

  const signIn = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      if (isFirebaseMode && auth) {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        const user = userCredential.user;
        const admin: AdminUser = {
          email: user.email || email,
          uid: user.uid,
          isFirebase: true,
        };
        inMemorySession = admin;
        setAdminUser(admin);
        return { success: true };
      } else {
        // Local Hybrid Mode:
        // Allows the owner to test administration even before Firebase credentials are setup in .env
        const trimmedEmail = email.trim().toLowerCase();
        // Malila's standard email or any designated admin password
        if (trimmedEmail === "jamesmnyamai9@gmail.com" || trimmedEmail === "admin@malila.tech" || trimmedEmail.includes("malila")) {
          if (pass.length >= 6) {
            const localUser: AdminUser = {
              email: trimmedEmail,
              uid: "local-admin-" + Date.now(),
              isFirebase: false,
            };
            inMemorySession = localUser;
            sessionStorage.setItem("admin_session_active", "true");
            setAdminUser(localUser);
            return { success: true };
          } else {
            return { success: false, error: "Password must be at least 6 characters." };
          }
        } else {
          return { success: false, error: "Invalid admin credentials. Please use Malila's authorized email." };
        }
      }
    } catch (err: any) {
      console.error("Authentication error:", err);
      // If Firebase Auth is not yet activated in the Firebase Console, provide seamless fallback
      if (
        err.code === "auth/configuration-not-found" ||
        err.code === "auth/operation-not-allowed" ||
        err.code === "auth/admin-restricted-operation"
      ) {
        const trimmedEmail = email.trim().toLowerCase();
        if (
          trimmedEmail === "jamesmnyamai9@gmail.com" ||
          trimmedEmail === "admin@malila.tech" ||
          trimmedEmail.includes("malila")
        ) {
          if (pass.length >= 6) {
            const localUser: AdminUser = {
              email: trimmedEmail,
              uid: "local-admin-" + Date.now(),
              isFirebase: false,
            };
            inMemorySession = localUser;
            sessionStorage.setItem("admin_session_active", "true");
            setAdminUser(localUser);
            return { success: true };
          }
        }
      }

      let message = "Authentication failed. Please verify credentials.";
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        message = "Invalid email or password.";
      } else if (err.code === "auth/user-not-found") {
        message = "No admin account matches this email.";
      } else if (err.code === "auth/too-many-requests") {
        message = "Too many failed attempts. Please try again later.";
      } else if (err.code === "auth/configuration-not-found") {
        message = "Firebase Email/Password Auth is not yet enabled in Firebase Console (Authentication > Sign-in method).";
      }
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (isFirebaseMode && auth) {
      await signOut(auth);
    }
    inMemorySession = null;
    sessionStorage.removeItem("admin_session_active");
    setAdminUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        adminUser,
        isAdmin: Boolean(adminUser),
        loading,
        isFirebaseMode,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
