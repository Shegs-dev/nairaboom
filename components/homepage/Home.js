import React from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import TopComponent from "./TopComponent";
import AboutNairaBoom from "./AboutNairaBoom";
import HowToPlay from "./HowToPlay";
import HowToWin from "./HowToWin";
import Footer from "./Footer";
import HomeMobile from "../mobile/pages/homepage/Home"
import { useMediaQuery } from 'react-responsive';

const Home = () => {
  const isLargerThan768 = useMediaQuery({
    query: '(max-width: 768px)'
  });

  return (
    <div>
    {!isLargerThan768 ? (
      <>
      <Box bg="brand.background">
      <Head>
        <title>Nairaboom | Rollover Your Alert & Cashout Up To ₦35,000,000</title>
        {/* Boom up to ₦30,000,000 Instant Jackpot */}
      </Head>
      <TopComponent />
      <AboutNairaBoom />
      <Box pos="relative" pb="45rem">
        <HowToPlay />
      </Box>
      <Box pos="relative">
        <HowToWin />
      </Box>
      <Box pos="relative" bgColor="brand.background">
        <Footer />
      </Box>
    </Box>
      </>
    ) : (
      <>
        <HomeMobile /> 
      </>
    )}
    </div>
  );
};

export default Home;
