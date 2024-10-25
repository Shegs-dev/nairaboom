import { Box, Text, Link, Input, Square } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import FooterComponent from "../components/Footer";
import BackgroundTitle from "../components/BackgroundTitle";
import coil2 from "../public/aboutpage/coil2.png";
import Clock from "../components/Clock";
import NextLink from "next/link";
import Getstarted from "../components/Getstarted";
import searchIcon from "../public/navassets/searchbutton.png";
import dateIcon from "../public/navassets/datebutton.png";
import Image from "next/legacy/image";

const Cashout = () => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  return (
    <Box>
      <NavBar />
      <BackgroundTitle longbit="Cash" shortbit="out" />
      <Box
        bgColor={"white"}
        backgroundImage={`url(${coil2.src})`}
        backgroundPosition="right top"
        backgroundRepeat="no-repeat"
        pt="5rem"
        pb="11.5rem"
        display={"flex"}
        flexDir="column"
        alignItems={"center"}
        fontFamily="poppins"
        gap={{ base: "4rem", md: "5rem", lg: "8.8rem" }}
      >
        <Box
          color="nairablue"
          alignItems="center"
          display={"flex"}
          flexDir="column"
          w="100%"
        >
          <Text
            pb={{ base: "1.5rem", md: "1.85rem" }}
            fontWeight={700}
            fontSize={{ base: "2rem", md: "2.5rem" }}
          >
            Wish Clock
          </Text>
          <Text textAlign={"center"} pb={{ base: "1.5rem", md: "3rem" }}>
            Our wish clock picks daily winners, <br /> be that winner today!
          </Text>
          <Clock />
        </Box>

        <Box
          color="nairablue"
          alignItems="center"
          display={"flex"}
          flexDir="column"
          w="100%"
        >
          <Text
            w={{ base: "80%", md: "max-content" }}
            pb={{ base: "1.2rem", md: "1.85rem" }}
            fontWeight={700}
            fontSize={{ base: "2rem", md: "2.5rem" }}
            textAlign={{ base: "center", md: "left" }}
          >
            Latest Lucky Cashback Time
          </Text>
          <Text
            w={{ base: "80%", md: "max-content" }}
            textAlign={"center"}
            pb={{ base: "1.5rem", md: "3rem" }}
          >
            This is the latest cashback time, <br /> check perhaps you could be
            the winner
          </Text>
          <Clock />
          <Box
            justifyContent={"center"}
            pt={{base:"5rem", md:"7.6rem"}}
            display={"flex"}
            gap={{base:"3rem",md:"4.5rem"}}
            w="90%"
            flexWrap={"wrap"}
          >
            <NextLink href={"/daily-winners"} passHref legacyBehavior>
              <Link
                bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
                color="white"
                fontWeight={600}
                fontSize="lg"
                py=".8rem"
                textAlign={"center"}
                w={{ base: "90%", md: "24rem" }}
                borderRadius={"md"}
                cursor={"pointer"}
                transitionDuration={".3s"}
                _hover={{ transform: "scale(1.02)" }}
              >
                See Daily Winners
              </Link>
            </NextLink>
            <NextLink href={"/learn-about-clock"} passHref legacyBehavior>
              <Link
                bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
                color="white"
                fontWeight={600}
                fontSize="lg"
                py=".8rem"
                w={{ base: "90%", md: "24rem" }}
                borderRadius={"md"}
                textAlign={"center"}
                cursor={"pointer"}
                transitionDuration={".3s"}
                _hover={{ transform: "scale(1.02)" }}
              >
                Learn More About Wish Clock
              </Link>
            </NextLink>
          </Box>
        </Box>
        <Box
          bgColor={"#F6F6F6"}
          borderRadius={{base:"1.5rem",md:"2rem"}}
          px={{ sm: "1rem", md: "6rem", lg: "13.3rem" }}
          pt="4.3rem"
          display={"flex"}
          flexDir="column"
          w={{base:"99%",md:"90%"}}
          alignItems={"center"}
        >
          <Text
            pb={{ base: "3rem", md: "4.25rem" }}
            fontSize={"xl"}
            fontWeight={700}
            color="nairablue"
            textAlign={{base:"center", md:"left"}}
          >
            Lucky Cashback Time Archive
          </Text>
          <Box
            pb="4.6rem"
            w="100%"
            display={"flex"}
            justifyContent="space-between"
            gap="1rem"
            flexDir={{ base: "column", md: "row" }}
            alignItems="center"
          >
            <Box
              h="4.357rem"
              w={{ base: "90%", md: "31rem" }}
              pl={"1.5rem"}
              bgColor="white"
              display={"flex"}
              alignItems={"center"}
              borderRadius="6px"
            >
              <Image src={searchIcon} alt="search icon" />
              <Input
                border={"none"}
                type="search"
                focusBorderColor="transparent"
                placeholder="Search"
                _placeholder={{ fontSize: "1.2rem", ml: "2rem" }}
                h="100%"
              />
            </Box>
            <Box
              h="4.357rem"
              w={{ base: "90%", md: "15.6rem" }}
              pl={"1.5rem"}
              bgColor="white"
              display={"flex"}
              alignItems={"center"}
              borderRadius="6px"
            >
              <Image src={dateIcon} alt="search icon" />
              <Input
                border={"none"}
                type="text"
                focusBorderColor="transparent"
                placeholder="Date"
                _placeholder={{ fontSize: "1.2rem", ml: "2rem" }}
                h="100%"
              />
            </Box>
          </Box>
          <Box w="100%">
            <Box
              bgColor="nairablue"
              borderRadius={"5px"}
              w="100%"
              py="1.4rem"
              display={"flex"}
              fontFamily="poppins"
              justifyContent={"space-evenly"}
              mb="1.8rem"
            >
              <Text
                color="white"
                fontWeight={700}
                fontSize={{ base: ".7rem", md: "xl" }}
              >
                S/N
              </Text>
              <Text
                color="white"
                fontWeight={700}
                fontSize={{ base: ".7rem", md: "xl" }}
              >
                Timestamp
              </Text>
              <Text
                color="white"
                fontWeight={700}
                fontSize={{ base: ".7rem", md: "xl" }}
              >
                Timestamp Date
              </Text>
            </Box>
            <Box
              display={"flex"}
              flexDir="column"
              gap="1.4rem"
              mb={{ base: "4rem", md: "7.6rem" }}
            >
              {numbers.map((number, index) => (
                <Box
                  w="100%"
                  display={"flex"}
                  fontFamily="poppins"
                  justifyContent={"space-evenly"}
                  key={index}
                >
                  <Text
                    fontSize={{ base: "1rem", md: "1.125rem" }}
                    color="nairablue"
                  >
                    {number}
                  </Text>
                  <Text
                    fontSize={{ base: "1rem", md: "1.125rem" }}
                    color="nairablue"
                  >
                    14:20:34
                  </Text>
                  <Text
                    fontSize={{ base: "1rem", md: "1.125rem" }}
                    color="nairablue"
                  >
                    24, Apr 2021
                  </Text>
                </Box>
              ))}
            </Box>
            <Box
              mb={{ base: "3rem", md: "5.375rem" }}
              display={"flex"}
              justifyContent="space-between"
              maxW={"90%"}
              alignItems="center"
              flexDir={{ base: "column", md: "row" }}
              gap={{ base: "1rem", md: "0" }}
            >
              <Text fontSize={"14px"} color="#A7A7A7">
                Showing 1 - 10 of 1,200
              </Text>
              <Box display={"flex"} gap="11px" maxW={"inherit"}>
                <Square
                  color="white"
                  size={"2.1rem"}
                  bgColor={"nairablue"}
                  fontSize={"14px"}
                  borderRadius={"5px"}
                >
                  1
                </Square>
                <Square
                  color="nairablue"
                  border="1px solid"
                  size={"2.1rem"}
                  fontSize={"14px"}
                  borderRadius={"5px"}
                >
                  2
                </Square>
                <Square
                  color="nairablue"
                  border="1px solid"
                  size={"2.1rem"}
                  fontSize={"14px"}
                  borderRadius={"5px"}
                >
                  3
                </Square>
                <Square
                  color="nairablue"
                  border="1px solid"
                  size={"2.1rem"}
                  fontSize={"14px"}
                  borderRadius={"5px"}
                >
                  ...
                </Square>
                <Square
                  color="nairablue"
                  border="1px solid"
                  size={"2.1rem"}
                  fontSize={"14px"}
                  borderRadius={"5px"}
                >
                  22
                </Square>
                <Square
                  color="nairablue"
                  border="1px solid"
                  w={"3rem"}
                  fontSize={"14px"}
                  borderRadius={"5px"}
                >
                  Next
                </Square>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Getstarted />
      <FooterComponent />
    </Box>
  );
};

export default Cashout;
