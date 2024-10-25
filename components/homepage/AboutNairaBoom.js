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

const AboutNairaBoom = () => {
  const router = useRouter();
  return (
    <Flex
      bgImage="/redesign/homepage/about-background.svg"
      bgPos="top"
      bgSize="cover"
      py={{ xs: "4rem", sm: "8rem", md: "16rem" }}
      px={5}
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      gap={{ base: 5, md: 0 }}
      color="#002047"
    >
      <Stack
        spacing={{ base: 2, md: 5 }}
        alignItems="center"
        display={{ base: "flex", md: "none" }}
        className="aboutRes"
        position="relative"
      >
        {/* <Box position={"absolute"} zIndex="100" className="eighteenPlus">
          <Image src="/redesign/homepage/18.png " width={{base: "60%"}}/>
        </Box> */}
        <Heading fontSize="1.6rem" fontWeight={800}>
          About NairaBoom
        </Heading>
        <Text textAlign="center" fontWeight={700}>
          Nairaboom is a duly licensed proprietary Alert Rollover Lottery that
          allows players to rollover and accumulate valid credit or debit alerts
          they receive for a chance to cashout the accumulated amount once any
          of the cashout modalities are met. Nairaboom has been tailored to be
          your surest path to breakthrough with up to 35,000,000 Naira instant
          cashout!
        </Text>
        <Button
          variant="brand-solid"
          color="nairagreen"
          bg="brand.background"
          w="fit-content"
          py={2}
          px={5}
          onClick={() => router.push("/how-to-play")}
          fontWeight={700}
          fontFamily={"Inter"}
          cursor={"pointer"}
          _hover={{ transform: "scale(1.05)" }}
        >
          Read More
        </Button>
      </Stack>
      <Flex
        justifyContent={{ base: "flex-end", lg: "center" }}
        alignItems="flex-start"
        w="100%"
        maxW="75rem"
        gap={{ base: 0, md: 5 }}
        bgImage={{
          base: "/redesign/homepage/about-nairaboom-mockup.png",
          lg: "none",
        }}
        bgPos={{ base: "left center", md: "left" }}
        bgSize={{ xs: "13rem", sm: "14.5rem", md: "24rem" }}
        bgRepeat="no-repeat"
      >
        <Image
          src="/redesign/homepage/about-nairaboom-mockup.png"
          w={{ base: "20rem", lg: "30rem" }}
          display={{ base: "none", lg: "block" }}
          alt=""
        />
        <Stack w={{ base: "45%", md: "md" }} spacing={5}>
          <Stack spacing={5} display={{ base: "none", md: "flex" }}>
            <Heading>About NairaBoom</Heading>
            <Text fontWeight={700}>
              Nairaboom is a duly licensed proprietary Alert Rollover Lottery
              that allows players to rollover and accumulate valid credit or
              debit alerts they receive for a chance to cashout the accumulated
              amount once any of the cashout modalities are met. Nairaboom has
              been tailored to be your surest path to breakthrough with up to
              35,000,000 Naira instant cashout!
            </Text>
            <Button
              variant="brand-solid"
              color="nairagreen"
              bg="brand.background"
              w="fit-content"
              fontWeight={700}
              fontFamily={"Inter"}
              cursor={"pointer"}
              _hover={{ transform: "scale(1.05)" }}
              onClick={() => router.push("/how-to-play")}
            >
              Read More
            </Button>
          </Stack>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            gap={{ base: 2, md: 5 }}
          >
            <HStack spacing={{ base: 1, md: 4 }} alignItems="flex-start">
              <Icon as={BsPlay} boxSize={{ base: 5, md: 30 }} />
              <Text
                fontSize={{ xs: "0.75rem", sm: "0.9rem", md: "1rem" }}
                w={{ base: "100%", md: "80%" }}
                fontWeight={800}
              >
                Rollover Your Alerts
              </Text>
            </HStack>
            <HStack spacing={{ base: 0, md: 4 }} alignItems="flex-start">
              <Icon as={BsPlay} boxSize={{ base: 5, md: 30 }} />
              <Text
                fontSize={{ xs: "0.75rem", sm: "0.9rem", md: "1rem" }}
                w={{ base: "100%", md: "80%" }}
                fontWeight={800}
              >
                Accumulate Your Cashout
              </Text>
            </HStack>
            <HStack spacing={{ base: 0, md: 4 }} alignItems="flex-start">
              <Icon as={BsPlay} boxSize={{ base: 5, md: 30 }} />
              <Text
                fontSize={{ xs: "0.75rem", sm: "0.9rem", md: "1rem" }}
                w={{ base: "100%", md: "80%" }}
                fontWeight={800}
              >
                Up to ₦ 35,000,000 Payout
              </Text>
            </HStack>
          </Grid>
          <Image
            src="/redesign/homepage/coin01.png"
            w="8rem"
            alignSelf={{ base: "flex-start", md: "center" }}
            alt=""
          />
        </Stack>
      </Flex>
    </Flex>
  );
};

export default AboutNairaBoom;
