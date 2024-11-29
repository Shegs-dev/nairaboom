import React from "react";
import HomeMobile from "../mobile/pages/homepage/Home";
import ErrorPage from "../auth/errorPage";
import { BrowserView, MobileView } from 'react-device-detect';

const Home = () => {

  return (
    <>
      <BrowserView>
        <HomeMobile />
      </BrowserView>
      <MobileView>
        <HomeMobile />
      </MobileView>
    </>
  );
};

export default Home;
