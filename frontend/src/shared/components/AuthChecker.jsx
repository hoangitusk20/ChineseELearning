// src/shared/components/AuthChecker.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { logout } from "../services/authService";

const AuthChecker = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        if (Date.now() >= decoded.exp * 1000) {
          logout(dispatch);
        }
      } catch {
        logout(dispatch);
      }
    };

    checkTokenValidity();

    const interval = setInterval(checkTokenValidity, 60 * 1000); // Mỗi 1 phút

    return () => clearInterval(interval);
  }, [dispatch]);

  return null; // ✅ Vì không render gì cả
};

export default AuthChecker;
