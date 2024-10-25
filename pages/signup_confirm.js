import { Box, chakra, Heading, Text } from "@chakra-ui/react";
import Image from "next/legacy/image";
import logo from "../public/logo-png.png";
import email from "../public/email-svgrepo-com.svg";

const SignupConfirm = () => {
  return (
    <Box
      h="100vh"
      flexDir={"column"}
      fontFamily={"poppins"}
      display={"flex"}
      alignItems="center"
      justifyContent={"center"}
      px="2rem"
      bgColor="#F7F7F7"
    >
      <Heading
        fontSize={{ base: "2rem", md: "3rem" }}
        color="nairagreen"
        fontFamily={"poppins"}
        textAlign={"center"}
      >
        Please check your mail to activate your account.
      </Heading>
      {/* <Box>
        <Image src={email} alt="mail icon"/>
      </Box> */}

      <Text fontSize={"xl"} textAlign={"center"}>
        Thank you for signing up to{" "}
        <chakra.span color="nairagreen">Nairaboom</chakra.span>
        <br /> We are happy to have you!
      </Text>
    </Box>
  );
};

export default SignupConfirm;
