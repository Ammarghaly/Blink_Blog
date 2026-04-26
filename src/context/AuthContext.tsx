import { createContext, useState, useEffect, type ReactNode } from "react";
import { type User } from "../types/index";
import { loginRequest, registerRequest } from "../api/auth";
import api from "../api/axios";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  registration: (formData: FormData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const userLocal = localStorage.getItem("user");
    if (userLocal) {
      const parsedData = JSON.parse(userLocal);
      return parsedData.user ? parsedData.user : parsedData;
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setIsLoading(false);
          return;
        }

        const res = await api.get("/auth/me");
        const userData = res.data.user ? res.data.user : res.data;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch {
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginRequest(email, password);
    const userData = data.user ? data.user : data;
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const registration = async (formData: FormData) => {
    await registerRequest(formData);
  };

  return (
    <AuthContext
      value={{ user, login, logout, isLoading, registration }}
    >
      {children}
    </AuthContext>
  );
}
