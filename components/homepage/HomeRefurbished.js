import React from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import TopComponent from "./TopComponent";
import AboutNairaBoom from "./AboutNairaBoom";
import HowToPlay from "./HowToPlay";
import HowToWin from "./HowToWin";
import Footer from "./Footer";

const Home = () => {
  return (
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
  );
};

export default Home;
