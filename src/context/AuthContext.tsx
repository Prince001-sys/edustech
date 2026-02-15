
import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
// Removed Firebase imports
import { getUserProfile, UserProfile, saveUserProfile } from "@/lib/db";

// Mock User Type
interface User {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
}

interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string, pass: string) => Promise<any>;
    createUserWithEmail: (email: string, pass: string) => Promise<any>;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check local storage for persisted "session"
        const storedUser = localStorage.getItem("aero_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        const loadProfile = async () => {
            if (user) {
                try {
                    let userProfile = await getUserProfile(user.uid);
                    if (!userProfile) {
                        console.log("⚠️ No profile found for mock user, creating default...");
                        userProfile = await saveUserProfile(user.uid, {
                            name: user.displayName || "Mock Student",
                            department: "CSE",
                            year: "1st Year",
                            onboardingComplete: false
                        });
                    }
                    setProfile(userProfile);
                } catch (err) {
                    console.error("Error fetching/creating profile:", err);
                }
            } else {
                setProfile(null);
            }
        };
        
        if (mounted) loadProfile();
    }, [user, mounted]);

    const refreshProfile = useCallback(async () => {
        if (user) {
            const userProfile = await getUserProfile(user.uid);
            setProfile(userProfile);
        }
    }, [user]);

    const signInWithGoogle = useCallback(async () => {
        // Mock Login
        const mockUser: User = {
            uid: "mock-user-123",
            displayName: "Test Student",
            email: "student@example.com",
            photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
        };
        localStorage.setItem("aero_user", JSON.stringify(mockUser));
        setUser(mockUser);
    }, []);

    const signInWithEmail = useCallback(async (email: string, pass: string) => {
        // Mock Email Login
         const mockUser: User = {
            uid: "mock-user-email",
            displayName: email.split('@')[0],
            email: email,
            photoURL: null
        };
        localStorage.setItem("aero_user", JSON.stringify(mockUser));
        setUser(mockUser);
    }, []);

    const createUserWithEmail = useCallback(async (email: string, pass: string) => {
         const mockUser: User = {
            uid: "mock-user-new",
            displayName: email.split('@')[0],
            email: email,
            photoURL: null
        };
        localStorage.setItem("aero_user", JSON.stringify(mockUser));
        setUser(mockUser);
    }, []);

    const logout = useCallback(async () => {
        localStorage.removeItem("aero_user");
        setProfile(null);
        setUser(null);
    }, []);

    const value = useMemo(() => ({
        user,
        profile,
        loading,
        signInWithGoogle,
        signInWithEmail,
        createUserWithEmail,
        logout,
        refreshProfile
    }), [user, profile, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
