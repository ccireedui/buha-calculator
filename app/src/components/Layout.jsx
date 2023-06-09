import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex w-full">
      <div className="flex flex-col w-full">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
