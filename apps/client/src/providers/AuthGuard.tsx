import { createContext, useContext, useState } from "react";
interface User {
  id: number;
  user: string;
  email: string;
  iat: number;
  exp: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  protectedloading: boolean;
  logout: () => void;
  verfiyToken: () => Promise<User | undefined>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [protectedloading, setprotectedLoading] = useState<boolean>(true);
  const verfiyToken = async () => {
    try {
      setprotectedLoading(true);
      const respnse = await fetch("/api/auth/verify");
      const user = (await respnse.json()) as User;
      if (respnse.status == 202) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      return user;
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setprotectedLoading(false);
    }
  };

  const logout = () => {
    // try to remove cookies
    // setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, protectedloading, logout, verfiyToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
