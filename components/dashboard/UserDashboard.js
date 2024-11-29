import React from "react";
import ErrorPage from "../auth/errorPage";
import Dashboard from "../mobile/pages/dashboard/Dashboard";
import Navigation from "../mobile/pages/Navigation";
import { BrowserView, MobileView } from 'react-device-detect';

const UserDashboard = () => {
  return (
    <>
      <BrowserView>
        <Dashboard />
      </BrowserView>
      <MobileView>
        <Dashboard />
      </MobileView>
    </>
  );
};

export default UserDashboard;
