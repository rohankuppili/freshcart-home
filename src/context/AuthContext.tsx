import React, { createContext, useContext, useState, useCallback } from "react";
import { User } from "@/types";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("grocery_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Mock login - in production, this would call an API
    if (email && password.length >= 6) {
      const mockUser: User = {
        id: crypto.randomUUID(),
        email,
        name: email.split("@")[0],
      };
      setUser(mockUser);
      localStorage.setItem("grocery_user", JSON.stringify(mockUser));
      toast.success("Welcome back!");
      return true;
    }
    toast.error("Invalid credentials");
    return false;
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock signup - in production, this would call an API
    if (name && email && password.length >= 6) {
      const mockUser: User = {
        id: crypto.randomUUID(),
        email,
        name,
      };
      setUser(mockUser);
      localStorage.setItem("grocery_user", JSON.stringify(mockUser));
      toast.success("Account created successfully!");
      return true;
    }
    toast.error("Please fill all fields correctly");
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("grocery_user");
    toast.info("You've been logged out");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
