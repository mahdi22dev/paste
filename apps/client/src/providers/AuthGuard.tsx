import { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (userToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  // grab token from localstorage with useeffect
  const [_, setToken] = useState<string | null>("");
  const login = (userToken: string) => {
    setToken(userToken);
  };
  const logout = () => {
    setToken(null);
  };

  const isAuthenticated = false;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
