import { Box, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import rightellipse from "../public/navassets/rightellipse.png";
import leftellipse from "../public/navassets/leftellipse.png";
import { useRouter } from "next/router";

const Getstarted = () => {
  const router = useRouter();
  return (
    <Box
      bgColor={"nairablue"}
      display="flex"
      flexDir={{ base: "column", md: "row" }}
      fontFamily={"poppins"}
      py={{ base: "4rem", md: "6.5rem" }}
      justifyContent={"center"}
      gap={{ base: "3rem", md: "5rem" }}
      alignItems={"center"}
      mb="10.5rem"
      backgroundImage={{
        base: `url(${rightellipse.src}), url(${leftellipse.src})`,
        md: `url(${rightellipse.src}), url(${leftellipse.src})`,
      }}
      backgroundPosition={{
        base: "right top, left center",
        md: "right center, left center",
      }}
      backgroundRepeat="no-repeat"
    >
      <Box
        display={"flex"}
        flexDir="column"
        alignItems="flex-start"
        fontFamily={"poppins"}
        w={{ base: "60%", md: "30%" }}
        gap="1rem"
      >
        <Text color={"nairagreen"} fontSize="20px" textAlign={"center"}>
          {/* Stake and Win Daily With Your Alert */}
          Rollover Your Alert and Cashout
        </Text>
        <Text color={"white"} fontSize="md" textAlign={"center"}>
          {/* Every Alert you get can make you a Millionaire. what are you waiting for? */}
          Every Alert You Rollover Can Change Your Story. What Are You Waiting
          For?
        </Text>
      </Box>
      <NextLink href={"/auth/signup/customer"} passHref legacyBehavior>
        <Link
          bgColor={"nairagreen"}
          color="white"
          fontWeight={600}
          fontSize="md"
          py=".8rem"
          px={{ base: "4rem", md: "6rem" }}
          borderRadius={"md"}
          transitionDuration={".3s"}
          _hover={{ transform: "scale(1.02)" }}
          onClick={() => router.push("/auth/signup/customer")}
        >
          Play Now
        </Link>
      </NextLink>
    </Box>
  );
};

export default Getstarted;
