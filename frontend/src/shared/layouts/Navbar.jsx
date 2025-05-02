import React from "react";
import { Link } from "react-router-dom";
import features from "@/features/features";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import { logout } from "../services/authService";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <header className="flex bg-white border-b shadow-sm fixed w-screen z-50 ">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-red-600">
          Chinese Story
        </Link>

        {/* Features Links */}
        <nav className="hidden md:flex space-x-6">
          {features.map((feature) => (
            <Link
              key={feature.to}
              to={feature.to}
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              {feature.title}
            </Link>
          ))}
        </nav>
        {/* Auth Button */}
        <div>
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="text-gray-600 hover:text-red-600 px-3"
              >
                {user?.username || "Tài khoản"}
              </Link>
              <Button
                variant="outline"
                className="px-3"
                onClick={() => logout(dispatch)}
              >
                Đăng xuất
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-1.5">
                <Button>Đăng nhập</Button>
              </Link>
              <Link to="/register" className="px-1.5">
                <Button variant={"outline"}>Đăng ký</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
