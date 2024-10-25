import Image from "next/legacy/image";
import newnairaboomlogo from "../public/redesign/logo.png";
import NextLink from "next/link";
import {
  Box,
  Input,
  Heading,
  Button,
  FormLabel,
  Spinner,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { AUTH_API_ROUTES } from "../utils/routes";
import Footer3 from "../components/homepage/Footer3";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const Email = Object.freeze({
    email: "",
  });
  const [recover, setRecover] = useState(Email);

  const handleEmailChange = (e) => {
    const inputValue = e.target.value.trim();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phonePattern = /^\d{11}$/; // Modify this regex for your phone number format
  
    if (emailPattern.test(inputValue) || phonePattern.test(inputValue)) {
      setRecover({ ...recover, [e.target.name]: inputValue });
    } else {
      // Handle invalid input, e.g., show an error message
    }
  };

  const config = {
    method: "post",
    url: `${BASE_URL}/api/forget_password`,
    headers: {
      "X-APP-KEY": NAIRABOOM_KEY,
    },
    data: {identity: recover.email},
  };

  const handleRecoverSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await axios(config);

      if (response?.data?.status === false) {
        toast({
          isClosable: true,
          duration: 5000,
          status: "error",
          title: response.data.message,
          position: "top",
        });
        return;
      }
      toast({
        isClosable: true,
        duration: 5000,
        status: "success",
        title: response.data.message,
        position: "top",
      });
      router.push("/reset_password");
    } catch (err) {
      toast({
        isClosable: true,
        duration: 5000,
        status: "error",
        title: err?.response?.data?.message ? err?.response?.data?.message : err?.response?.data?.message ? err?.response?.data?.message : "Some error occurred! check your connection.",
        position: "top",
      });

    } finally {
      setIsLoading(false);
    }
  };

  return <>
  <Box
    h={{base:"100vh", md: "110vh"}}
    bgColor={"#F7F7F7"}
    backgroundPosition="right"
    backgroundRepeat="no-repeat"
    pl={{ base: "2rem", md: "8rem" }}
    pt="4.8rem"
  >
    <NextLink passHref href="/" legacyBehavior>
      <Link>
        <Box
          ml={{ sm: "-3.5rem", md: "0rem", lg: "0rem" }}
          className="forgotpasswordlogo"
        > 
          <Image
            src={newnairaboomlogo}
            alt="nairaboom logo"
          />
        </Box>
      </Link>
    </NextLink>
    <Box w={{ base: "100%", lg: "35%" }}>
      <Heading
        fontSize={"2.5rem"}
        fontWeight={700}
        pt="5rem"
        fontFamily={"poppins"}
      >
        Forgot Password?
      </Heading>
      <Text
        pt="1.25rem"
        pb="3.5rem"
        color="#A7A7A7"
        fontWeight={400}
        fontSize="xl"
      >
        Enter Phone Number to recover password
      </Text>

      <form action="" onSubmit={handleRecoverSubmit}>
        <Box display={"flex"} flexDir="column">
          <Input
            type="text"
            name="email"
            placeholder="Enter Phone Number"
            bgColor="white"
            w={{ base: "85%", md: "30rem" }}
            focusBorderColor="nairagreen"
            required
            h="4.5rem"
            _placeholder={{ color: "#A7A7A7", fontSize: "21px" }}
            mb={{ base: "3rem", lg: "6rem" }}
            onChange={handleEmailChange}
            pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$|^\d{10}$"
          />
          <Button
            type={"submit"}
            color="white"
            fontSize={"23px"}
            w={{ base: "85%", md: "30rem" }}
            mt={{base: "3rem", md: "3rem"}}
            h="3.5rem"
            fontWeight="600"
            bg={"linear-gradient(180deg, #02D95A 0%, #02B54C 100%)"}
            cursor="pointer"
            _hover={{ transform: "scale(1.05)" }}
          >
            {isLoading ? <Spinner /> : "Send OTP"}
          </Button>
        </Box>
      </form>
    </Box>
  </Box>
  <Box
      w={"100vw"}
    h={{base:"7rem", md: "1rem"}}
    bgColor={"#F7F7F7"}
  >
    </Box>
  <Footer3/>
  </>;
};

export default ForgotPassword;
