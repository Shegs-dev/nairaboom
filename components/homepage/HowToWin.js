import React from "react";

import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsChevronUp, BsPlay } from "react-icons/bs";
import { RiMenu3Fill } from "react-icons/ri";
import useUser from "../../lib/hooks/useUser";

const HowToWin = () => {
  const router = useRouter();
  const { user, authenticated } = useUser();
  const user_type = user?.details?.user_type;
  return (
    <Flex
      justifyContent="center"
      fontFamily="Inter"
      bgImage="/redesign/homepage/about-background.svg"
      bgPos="top"
      bgSize="cover"
      pb={20}
      mt={{ base: "15rem", md: 0 }}
      pos="relative"
    >
      <Image
        pos="absolute"
        src="/redesign/homepage/coin02.png"
        // h={{ base: "6rem", md: "7rem" }}
        h={{ base: "8rem", md: "12rem" }}
        m="auto"
        left={{ base: "2.5rem", md: 0 }}
        top="-5rem"
        right="35rem"
        alt={"coin3"}
        zIndex={1}
      />

<Image
        pos="absolute"
        display={{base: "flex", lg: "flex"}}
        src="/redesign/homepage/mobilepattern.png"
        // h={{ base: "6rem", md: "7rem" }}
        h={{ base: "13rem", md: "12rem", lg: "23rem" }}
        marginTop={{base: "auto", lg: "3rem"}}
        // bg={"red"}
        m="auto"
        
        left={{ base: "0rem", md: 0 }}
        bottom={{base: "8rem", lg: "2rem"}}
        right="35rem"
        alt={"coin3"}
        zIndex={0}
        className="howtowinpattern"
      />
      <Flex
        pt={0}
        pb={52}
        px={5}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        maxW="65rem"
        h={{ base: "fit-content", md: "28rem" }}
        boxSizing="content-box"
        color="#012548"
      >
        <Stack
          w="100%"
          maxW="lg"
          spacing={2}
          p={5}
          alignItems={{ base: "center", md: "flex-start" }}
        >
          <Heading
            fontSize={{ base: "18px", md: "1.8rem" }}
            fontWeight={{ base: 800, md: 800 }}
            mt={10}
          >
            How To Win
          </Heading>
          <Text
            textAlign={{ base: "center", md: "left" }}
            fontFamily={"Inter"}
            fontWeight={{ base: 800, md: 600 }}
          >
            It’s so easy to Win on Nairaboom. Just Rollover Your Alerts, Build Your Rollover Wallet and Cashout.
          </Text>
          <Text
            fontFamily={"Inter"}
            fontSize={{base: "1.1rem", md: "1.3rem"}}
            fontWeight={600}
            color="white"
          >
            Rollover Accumulate Cashout
          </Text>
          <Button
            variant="brand-solid"
            bg="#002047"
            h={{ base: "40px" }}
            color="nairagreen"
            w="fit-content"
            fontWeight={900}
            fontFamily={"Inter"}
            onClick={() => {
              user_type === "customer"
                ? router.push("/customer_dashboard")
                : user_type === "agent"
                ? router.push("/agent_dashboard")
                : router.push("/auth?p=signupcustomer");
            }}
            cursor={"pointer"}
            _hover={{ transform: "scale(1.05)" }}
          >
            PLAY NOW
          </Button>
        </Stack>
        <Flex w="100%" maxW="md" display={{ base: "none", md: "block" }}>
          <Image src="/redesign/homepage/how-to-win-mockup.png" alt="" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HowToWin;
