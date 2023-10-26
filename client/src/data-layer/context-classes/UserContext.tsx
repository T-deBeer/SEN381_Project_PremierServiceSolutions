import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  id: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  signout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    const navi = useNavigate();
    switch (user?.role) {
      case "Client":
        window.location.replace("/client");
        break;
      case "Service":
        window.location.replace("/service");
        break;
      case "Worker":
        window.location.replace("/employee");
        break;
    }
  };

  const signout = () => {
    setUser(null);
    window.location.replace("/");
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, login, signout }}>
      {children}
    </UserContext.Provider>
  );
}
