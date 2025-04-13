import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ Load user immediately from localStorage
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // ✅ Only show loading if no local user
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    // ✅ Only fetch if no local user
    if (!user) {
      const checkSession = async () => {
        try {
          const res = await axios.get("http://localhost:5000/auth/me", {
            withCredentials: true,
          });

          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        } catch (err) {
          console.warn("Not logged in or session expired:", err.message);
          setUser(null);
          localStorage.removeItem("user");
        } finally {
          setLoading(false);
        }
      };

      checkSession();
    } else {
      setLoading(false); // ✅ Already have user — skip loading
    }
  }, []);

  const logout = async () => {
    try {
      await axios.get("http://localhost:5000/auth/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.warn("Logout failed, but proceeding:", err.message);
    } finally {
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
