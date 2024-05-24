import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ViewDashboard from "./pages/viewDashboard";
// import { id as myComponentId } from "./pages/viewDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home";
import DashboardContainer from "./pages/dashboardContainer";
import Demo from "./pages/demo";
import ProjectDataLog from "./pages/projectDataLog";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<DashboardContainer />} />
        <Route path="/projectdataLog" element={<ProjectDataLog />} />
        <Route path="/demo" element={<Demo />} />
        {/* <Route path={`/superset/dashboard/${myComponentId}`} element={<ViewDashboard />} /> */}
        <Route path={`/superset/dashboard/:dbId`} element={<ViewDashboard />} />
      </Routes>
    </>
  );
}

export default App;
