import React from "react";
import ErrorPage from "../auth/errorPage";
import Dashboard from "../mobile/pages/dashboard/Dashboard";
import Navigation from "../mobile/pages/Navigation";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

const UserDashboard = () => {
  const toggleView = () => {
    // if (isBrowser) {
    //   console.log("Are");
    //   return <ErrorPage />;
    // }
    if (isMobile) {
      return <Dashboard />;
    }
  };

  return toggleView();
};

export default UserDashboard;
