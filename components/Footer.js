import { Box, Heading, Text, Link, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/legacy/image";
import logo from "../public/footerassets/N2.png";
import nairaboomlogo from "../public/navassets/N1.png";
import facebook from "../public/footerassets/facebook.svg";
import twitter from "../public/footerassets/twitterlogo.svg";
import instagram from "../public/footerassets/instagram.svg";
import useUser from "../lib/hooks/useUser";
import { useRouter } from "next/router";
import { Show, Hide } from "@chakra-ui/react";
import Footer from "./homepage/Footer";

const FooterComponent = () => {
  const { authenticated } = useUser();
  const router = useRouter();

  // return (<Footer/>)

  return (
    // <Footer/>
    <Box
      display={"flex"}
      flexDir={{ base: "column", md: "row" }}
      bgColor="nairablue"
      h={"max-content"}
      pt="5rem"
      pb={{ base: "5rem", md: "8rem" }}
      bottom={0}
      gap={{ base: "5rem", md: "0" }}
      fontFamily="poppins"
      alignItems={"center"}
      justifyContent="space-evenly"
    >
      <Box
        display={"flex"}
        flexDir="column"
        w={{ base: "80%", md: "30%" }}
        marginLeft={{ sm: "0rem", md: "0rem", lg: "-2.15rem" }}
        alignItems={{ base: "center", md: "flex-start" }}
      >
        <Show above="lg">
          <Box marginLeft={{ sm: "0rem", md: "0rem", lg: "-0.80rem" }}>
            <Image src={logo} alt="footer logo" />
          </Box>
        </Show>
        <Show below="md">
          <Box marginLeft={{ sm: "0rem", md: "0rem", lg: "-0.80rem" }}>
            <Image src={nairaboomlogo} alt="footer logo" />
          </Box>
        </Show>
        <Link
          my="2rem"
          href={authenticated ? "/customer_dashboard" : "/auth?p=login"}
          w={{
            base: "65%",
            lg: "50%",
          }}
          fontFamily="poppins"
          bgColor={"nairagreen"}
          color="white"
          p="1rem"
          fontWeight={700}
          borderRadius="8px"
          _hover={{ transform: "scale(1.05)" }}
          textAlign={"center"}
        >
          Play Now
        </Link>
        {/* <Button
          w="80%"
          h="3.5rem"
          mb="1rem"
          fontWeight={700}
          bgColor="nairagreen"
          color="white"
          padding={"1.5rem 1.8rem"}
          borderRadius="md"
          transitionDuration={".3s"}
          _hover={{ transform: "scale(1.02)" }}
          onClick={() => {
            if (authenticated) {
              handleLogout();
            }

            router.push("/auth?p=signupagent");
          }}
        >
          Become an Agent
        </Button> */}

        <Box
          display={"flex"}
          width={{
            base: "60%",
            lg: "45%",
          }}
          alignItems={"center"}
          justifyContent={"space-between"}
          mb="2rem"
        >
          <Box as={Link} href="https://www.facebook.com/profile.php?id=61554354321220&mibextid=ZbWKwL">
            <Image src={facebook} alt="facebook logo" />
          </Box>
          <Box as={Link} href="https://twitter.com/nairaboomng">
            <Image src={twitter} alt="twitter logo" />
          </Box>
          <Link href="https://www.instagram.com/nairaboomng/">
            <Image src={instagram} alt="instagram logo" />
          </Link>
          <Link href="https://www.instagram.com/nairaboomng/">Insta</Link>
        </Box>
        <Text color={"#9E9E9E"} textAlign={{ base: "center", md: "left" }}>
          &copy; 2024 Nairaboom. All Rights Reserved
        </Text>
      </Box>

      <Box
        w={{ base: "85%", md: "max-content" }}
        justifyContent={{ base: "space-between", md: "center" }}
        display={"flex"}
        gap={{ base: "0", md: "7rem", lg: "14rem" }}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Box display={"flex"} flexDir="column" gap="1rem">
          <Text
            fontFamily="poppins"
            color={"white"}
            fontWeight={700}
            fontSize="xl"
          >
            Quicks Links
          </Text>
          <NextLink href={"/"} passHref legacyBehavior>
            <Link color={"#9E9E9E"} pt="1.5rem">
              Home
            </Link>
          </NextLink>
          <NextLink href={"/"} passHref legacyBehavior>
            <Link color={"#9E9E9E"}>Blog</Link>
          </NextLink>
          <NextLink href={"/gamble_responsibly"} passHref legacyBehavior>
            <Link color={"#9E9E9E"} pb={{ base: "2rem", md: "6rem" }}>
              Responsible Gambling
            </Link>
          </NextLink>
          <NextLink href={"/faq"} passHref legacyBehavior>
            <Link color={"#9E9E9E"} pb={{ base: "2rem", md: "6rem" }}>
              FAQs
            </Link>
          </NextLink>
        </Box>
        <Box display={"flex"} flexDir="column" gap="1rem">
          <Text
            fontFamily="poppins"
            color={"white"}
            fontWeight={700}
            fontSize="xl"
          >
            Legal
          </Text>
          <NextLink href={"/terms_conditions"} passHref legacyBehavior>
            <Link color={"#9E9E9E"} pt="1.5rem">
              Terms & conditions
            </Link>
          </NextLink>
          <NextLink href={"/privacy_policy"} passHref legacyBehavior>
            <Link color={"#9E9E9E"}>Privacy policy</Link>
          </NextLink>
        </Box>
      </Box>
    </Box>
  );
};

export default FooterComponent;
