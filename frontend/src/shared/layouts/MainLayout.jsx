// src/shared/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => (
  <>
    <Navbar />
    <main className="flex-grow container mx-auto px-4 py-25">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default MainLayout;
