import React from "react";

import {
    Button,
    Flex,
    HStack,
    Heading,
    IconButton,
    Image,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import Link from "next/link";
import { BsChevronUp } from "react-icons/bs";
import PlayResponsibly from "../general/PlayResponsibly";
const Footer3 = () => {
  return (
    <Flex
      bgImage="/redesign/homepage/footer-bg.png"
      bgPos="top"
      bgSize="cover"
      pos="absolute"
      bgRepeat="no-repeat"
      w="100%"
      //   top="-10rem"
      justifyContent="center"
      pt={{ base: "5rem", md: 14 }}
      pb={{ base: 24, md: 40 }}
      fontFamily="Inter"
    >
      {/* <Flex
        pos="absolute"
        top="-10rem"
        justifyContent="center"
        display={{ md: "none" }}
      >
        <Image w="20rem" src="/redesign/homepage/how-to-win-mockup.png" />
      </Flex> */}
      <Flex
        color="white"
        w={{ md: "90%", xl: "100%" }}
        maxW="65rem"
        justifyContent="center"
        pos="relative"
      >
        <Stack
          display={{ base: "none", md: "flex" }}
          pos="absolute"
          left={0}
          top="4rem"
          fontSize="0.9rem"
        >
          <Heading fontSize="1rem" fontWeight={600} pb={5}>
            Quick Links
          </Heading>
          {/* <Link href="/about">About Us</Link> */}
          <Link href="/gamble_responsibly">Responsible Gambling</Link>
          <Link href="/faq">FAQs</Link>
          <Link href="/terms_conditions">Terms & Conditions</Link>
          <Link href="/privacy_policy">Privary Policy</Link>
          {/* <Link href="">Blog</Link> */}
        </Stack>
        <VStack spacing={5}>
          <PlayResponsibly color="white" fontSize="0.7rem" />
          <Heading
            display={{ base: "block", md: "none" }}
            fontSize="1rem"
            fontWeight={600}
          >
            Quick Links
          </Heading>
          <HStack
            spacing={3}
            display={{ base: "flex", md: "none" }}
            fontSize={{ base: "0.7rem", md: "0.9rem" }}
          >
            {/* <Link href="/about">About Us</Link> */}
            <Link href="/gamble_responsibly">Responsible Gambling</Link>
            <Link href="/faq">FAQs</Link>
            <Link href="/terms_conditions">Terms & Conditions</Link>
            <Link href="/privacy_policy">Privacy Policy</Link>
            {/* <Link href="">Blog</Link> */}
          </HStack>
          <HStack pt={{ base: 0, md: 8 }} spacing={{ base: 3, md: 10 }}>
            {[
              {
                image: "footer-instagram.png",
                link: "https://www.instagram.com/nairaboomng/",
              },
              {
                image: "footer-twitter.png",
                link: "https://twitter.com/nairaboomng",
              },
              {
                image: "footer-facebook.png",
                link: "https://www.facebook.com/profile.php?id=61554354321220&mibextid=ZbWKwL",
              },
              {
                image: "footer-tiktok.png",
                link: "https://www.tiktok.com/@nairaboom.ng?_t=8ouwtQ6j16L",
              },
              {
                image: "footer-threads.png",
                link: "https://www.threads.net/@nairaboomng",
              },
            ].map((item, index) => (
              // <IconButton colorScheme="none" key={index}>
              //   <Image
              //     src={"/redesign/homepage/" + item.image}
              //     w={{ base: "1.3rem", md: "1.5rem" }}
              //     alt=""
              //   />
              // </IconButton>
              <Link key={index} href={item.link} passHref legacyBehavior>
                <IconButton as="a" colorScheme="none">
                  <Image
                    src={`/redesign/homepage/${item.image}`}
                    width={{ base: "1.3rem", md: "1.5rem" }}
                    height={{ base: "1.3rem", md: "1.5rem" }}
                    alt=""
                  />
                </IconButton>
              </Link>
            ))}
          </HStack>
          <Image
            src="/redesign/logo.png"
            // h={{ base: "1.8rem", md: "3rem" }}
            h={{ base: "3rem", md: "3rem" }}
            w="fit-content"
            alt=""
          />
          <Text fontSize={{ base: "0.7rem", md: "1rem" }}>
            &copy; {new Date().getFullYear()} Nairaboom. All Rights Reserved.
          </Text>
          <HStack
            pb={{ md: 8 }}
            fontSize={{ base: "0.6rem", md: "1rem" }}
            maxW={{ base: "18rem", md: "fit-content" }}
          >
            <Text
              textAlign="center"
              color="white"
              maxW={{ base: "18rem", md: "23rem" }}
            >
              Nairaboom is licensed and regulated by the National Lottery
              Regulatory Commission (NLRC). {"License number 00000060"}
            </Text>
            <Image w="2rem" src="/redesign/nlrclogo.png" alt="" />
          </HStack>
          <Button
            rightIcon={<BsChevronUp />}
            colorScheme="none"
            fontWeight={500}
            fontSize={{ base: "0.7rem", md: "1rem" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back To Top
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Footer3;