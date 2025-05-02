import { Button } from "@/shared/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkAuthStatus, register } from "@/shared/services/authService";
import { useSelector } from "react-redux";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isAuthenticated, accessToken } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ password, username, confirmPassword });
      alert("Đăng ký thành công, vui lòng đăng nhập");
      navigate("/login");
    } catch (error) {
      alert(error.response.data.detail);
    }
  };
  useEffect(() => {
    if (isAuthenticated && checkAuthStatus(accessToken)) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, accessToken]);
  return (
    <div className="max-w-[400px] mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white px-8">
      <h2 className="text-3xl font-bold mb-3 py-2 text-center text-red-600">
        Đăng Ký
      </h2>
      <form onSubmit={handlesubmit}>
        <div className="my-3">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Tên tài khoản{" "}
          </label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Tên tài khoản"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className=" mt-4">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Mật khẩu{" "}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className=" mt-4">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Nhập lại mật khẩu{" "}
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Nhập lại mật khẩu"
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <Button className="w-full \ mt-4" type="submit">
          {" "}
          Đăng ký
        </Button>
      </form>

      <div className="mt-4 text-center">
        <Link to="/register">
          <p className="text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <span className="text-red-600 font-semibold">Đăng nhập ngay</span>
          </p>{" "}
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
