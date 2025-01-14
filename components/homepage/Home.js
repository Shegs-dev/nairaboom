import React from "react";
import HomeMobile from "../mobile/pages/homepage/Home";
import ErrorPage from "../auth/errorPage";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

const Home = () => {

  const toggleView = () => {
    // if (isBrowser) {
    //   console.log("Are");
    //   return <ErrorPage />;
    // }
    if (isMobile) {
      return <HomeMobile />;
    }
  };

  return toggleView();
};

export default Home;
