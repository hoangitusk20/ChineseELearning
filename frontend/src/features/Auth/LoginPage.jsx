import { Button } from "@/shared/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useRedirectAuthenticated from "@/shared/hooks/useRedirectAuthenticated";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus, login } from "@/shared/services/authService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isAuthenticated, accessToken } = useSelector((state) => state.auth);
  const { redirectAfterAuth } = useRedirectAuthenticated();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Vui lòng nhập tên tài khoản và mật khẩu");
      return;
    }
    try {
      await login({ username, password }, dispatch);
      redirectAfterAuth();
    } catch (error) {
      alert(
        `Đăng nhập không thành công, vui lòng kiểm tra lại tài khoản và mật khẩu của bạn`
      );
      console.log(error);
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
        Đăng Nhập
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Tên tài khoản{" "}
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <Button className="w-full \ mt-4" type="submit">
          {" "}
          Đăng nhập
        </Button>
      </form>
      <div className="mt-4 text-center">
        <Link to="/register">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <span className="text-red-600 font-semibold">Đăng ký ngay</span>
          </p>{" "}
        </Link>

        <p className="mt-5 text-gray-600 text-sm ">
          Bằng cách đăng nhập, bạn đồng ý với{" "}
          <Link
            to="/terms-of-service"
            className="text-red-600 text-sm font-semibold"
          >
            Điều khoản dịch vụ
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
