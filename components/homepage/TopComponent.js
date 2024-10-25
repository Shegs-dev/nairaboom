import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { RiMenu3Fill } from "react-icons/ri";
import { BsXLg } from "react-icons/bs";
import Link from "next/link";
import NextLink from "next/link";
import useUser from "../../lib/hooks/useUser";

const TopComponent = () => {
  const router = useRouter();

  const { user, authenticated } = useUser();
  const user_type = user?.details?.user_type;
  
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <Flex
      fontFamily="Inter"
      // bgImage="/redesign/homepage/top-component-background.svg"
      flexDir="row"
      justifyContent="center"
      p={8}
      h={{ base: "35rem", md: "50rem" }}
      className="eight"
    >
      <Stack
        w="100%"
        maxW="75rem"
        color="white"
        alignItems="center"
        spacing={5}
      >
        <HStack w="100%" spacing={{ base: 2, md: 8 }}>
          <Image
            src="/redesign/logo.png"
            h={{ base: "2rem", md: "3rem" }}
            w="fit-content"
            alt=""
            onClick={handleLogoClick}
          />
          <Spacer />
          <Button
            px={{ base: "0.5rem", md: "1rem" }}
            fontSize={{ base: "0.7rem", md: "1rem" }}
            variant="brand-outline"
            color="nairagreen"
            borderColor="nairagreen"
            onClick={() => router.push("/auth/login")}
            cursor={"pointer"}
            _hover={{ transform: "scale(1.05)" }}
          >
            Log in
          </Button>
          <Button
            px={{ base: "0.5rem", md: "1rem" }}
            fontSize={{ base: "0.7rem", md: "1rem" }}
            variant="brand-solid"
            color="#012647"
            bg="nairagreen"
            onClick={() => router.push("/auth/signup/customer")}
            cursor={"pointer"}
            _hover={{ transform: "scale(1.05)" }}
          >
            Sign up
          </Button>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={IconButton}
                  colorScheme="none"
                  isActive={isOpen}
                  color="nairagreen"
                >
                  {isOpen ? <BsXLg size={20} /> : <RiMenu3Fill size={25} />}
                </MenuButton>
                <MenuList>
                  {/* <div
                    style={{
                      background: "rgba(255, 255, 255, 0.95)",
                      boxShadow: "0px 4px 10px 9px rgba(0, 0, 0, 0.25)",
                      color: "red",
                    }}
                  >
                    <Link href="/winning" textColor="red">
                      Winning Modalities
                    </Link>
                  </div> */}
                  {/* color="#012647" */}
                  <VStack
                    color="#012647"
                    // style={{
                    //   background: "rgba(255, 255, 255, 0.95)",
                    //   boxShadow: "0px 4px 10px 9px rgba(0, 0, 0, 0.25)",
                    // }}
                    py={3}
                    spacing={5}
                  >
                    <Link
                      href="/how-to-play"
                      style={{ background: "transparent", fontWeight: "700" }}
                    >
                      How To Play
                    </Link>
                    <Link href="/winning">Winning Modalities</Link>
                    {/* <Link href="/daily-results">Winners</Link> */}
                    {/* <Link href="/about">About Us</Link> */}
                    <Link href="/contact">Contact Us</Link>
                  </VStack>
                </MenuList>
              </>
            )}
          </Menu>
        </HStack>
        <Heading
          fontSize={{ xs: "1.1rem", sm: "1.5rem", md: "2rem", lg: "3rem" }}
          fontWeight={{ base: 800, lg: 800 }}
          pt={{ base: 8, md: 0 }}
          textAlign="center"
          className="hometext1"
        >
          Rollover Your Alert 
        </Heading>
        <Heading
          fontSize={{ xs: "0.95rem", sm: "1.1rem", md: "1.55rem", lg: "2rem" }}
          fontWeight={{ base: 800 }}
          textAlign="center"
          className="hometext2"
        >
          Up to ₦ 35,000,000 Instant Cashout 
        </Heading>
        <HStack
          spacing={8}
          color="nairagreen"
          fontSize={{ xs: "1rem", sm: "1.2rem" }}
        >
          <Text fontWeight={700} fontFamily={"Inter"}>
            Rollover
          </Text>
          <Text fontWeight={700} fontFamily={"Inter"}>
            Accumulate
          </Text>
          <Text fontWeight={700} fontFamily={"Inter"}>
            Cashout
          </Text>
        </HStack>
        <Button
          variant="brand-solid"
          color="#012647"
          bg="nairagreen"
          textColor={"#002047"}
          fontFamily={"Inter"}
          fontSize={{ base: "2rem", md: "1.75rem" }}
          py={{ base: 2, md: 2 }}
          px={{ base: 8, md: 8 }}
          fontWeight={900}
          cursor={"pointer"}
          isDisabled={false}
          _hover={{ transform: "scale(1.05)" }}
        >
          <NextLink
            href={
              user_type === "customer"
                ? "/customer_dashboard"
                : user_type === "agent"
                ? "agent_dashboard"
                : "auth?p=signupcustomer"
            }
            passHref
          >
            PLAY NOW
          </NextLink>
        </Button>
        <Image
          w="100%"
          maxW="45rem"
          h={{ md: "45rem" }}
          src="/redesign/homepage/top-component-mockup5.png"
          alt={'top-component-mockup'}
        />
        {/* <Image
          h={{ md: "0.5rem" }}
          pos="absolute"
          // top={{base: 0}}
          display={{ base: "flex", md: "flex" }}
          zIndex={1}
          src="/redesign/homepage/18.png"
          alt={'18'}
          right={{base: "17.5vw"}}
          className="img18"
        /> */}
      </Stack>
    </Flex>
  );
};

export default TopComponent;
