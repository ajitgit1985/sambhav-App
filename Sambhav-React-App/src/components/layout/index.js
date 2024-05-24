import React from "react";
import Header from "./header";
import Footer from "./footer";
import Home from "../../pages/home";
// import Dashboard from "../../pages/dashboard";

const Layout = () => {
  return (
    <div className="outer_container">
      <Header />
      {/* <Dashboard/> */}
      <Home />
      <Footer className="overview_pad prayas__ml_250" />
    </div>
  );
};

export default Layout;
