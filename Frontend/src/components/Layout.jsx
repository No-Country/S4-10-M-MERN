import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="backgroundRadial">
        <div className="backgroundGrids">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Layout;
