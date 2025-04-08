import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      // "https://themus.onrender.com/auth/user",
      "http://localhost:5000/auth/user",
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Auth fetch failed", err);
        setUser(null);
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using auth context easily
export const useAuth = () => useContext(AuthContext);
