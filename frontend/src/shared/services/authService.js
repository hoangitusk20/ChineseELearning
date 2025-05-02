// src/shared/services/authService.js
import axios from "axios";
import { loginSuccess, logoutSuccess } from "@/shared/slices/authSlice";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (credentials, dispatch) => {
  try {
    const response = await axios.post(`${API_URL}Auth/login`, credentials);
    const { token, user } = response.data;
    // Lưu token vào localStorage
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Dispatch action cập nhật state của Redux
    dispatch(loginSuccess({ token, user }));

    return response;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};
export const checkAuthStatus = (token) => {
  if (!token) return false;
  try {
    const decodedToken = jwtDecode(token);
    const exipirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();
    return currentTime <= exipirationTime;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const logout = (dispatch) => {
  // Xóa token trong localStorage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  // Dispatch action đăng xuất
  dispatch(logoutSuccess());
};

export const doubleCheckPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const register = async ({ username, password, confirmPassword }) => {
  if (!doubleCheckPassword(password, confirmPassword)) {
    throw new Error("Mật khẩu không khớp");
  }
  try {
    const response = await axios.post(`${API_URL}Auth/register`, {
      username,
      password,
    });

    return response;
  } catch (error) {
    console.error("Registration failed", error);
    throw error;
  }
};
