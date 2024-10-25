import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React from "react";
import BackgroundTitle from "../../components/BackgroundTitle";
import NavBar from "../../components/NavBar";
import Head from "next/head";
// import background from "../public/aboutpage/background.png";
// import coil from "../public/how-it-works/coil.png";

const Expect = () => {
  return (
    <Box>
      <Box
        bgColor={"white"}
        fontFamily="poppins"
        pt="4.8rem"
        pb="3rem"
        backgroundPosition="right center"
        backgroundRepeat="no-repeat"
        px={{ base: "1rem", md: "2rem" }}
        display="flex"
        gap={10}
        flexDir={"column"}
        maxWidth={{md: '600px'}}
        margin={'0 auto'}
      >
        <Heading
          pb="2rem"
          fontFamily={"poppins"}
          fontSize={{ base: "1.5rem", md: "2rem" }}
          textAlign={"center"}
        >
          What to Expect
        </Heading>
        <Box  display="flex" flexDir={"column"} gap={10} alignItems="center" justifyContent="center">
          <Text>1. Play a Game = Receive a Giveaway Code!</Text>
          <Text>2. Get 3 Green balls = Win Your Alert! </Text>
          <Text>3. 4 Green balls = Win The Jackpot!!!</Text>
        </Box>

        <Button
                border={"none"}
                w={{ base: "100%", md: "100%" }}
                color="white"
                bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
                type={"submit"}
                fontWeight={700}
                fontSize="lg"
                mb={{ base: "2rem", md: "4rem" }}
                cursor={"pointer"}
                _hover={{ transform: "scale(1.05)" }}
              >
                Proceed to Spin the boomwheel
              </Button>
      </Box>
    </Box>
  );
};

export default Expect;
