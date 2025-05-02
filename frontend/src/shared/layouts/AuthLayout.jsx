import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

import Footer from "./Footer";

const AuthLayout = () => {
  return (
    <>
      <main className="flex-grow container mx-auto px-4 py-25">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
