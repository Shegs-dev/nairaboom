import {
  Box,
  Input,
  Heading,
  Button,
  useToast,
  Spinner,
  Link,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { AUTH_API_ROUTES } from "../utils/routes";
import Image from "next/legacy/image";
import nairaboomlogo from "../public/navassets/nairaboom-logo.svg";
import signupbg from "../public/signup/bg.svg";
import NextLink from "next/link";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;

const OtpConfirm = () => {
  const router = useRouter();
  const toast = useToast();

  //Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [resend, setResend] = useState(false);

  //OTP form
  const [otp, setOTP] = useState(0);

  //Recover payload from local storage
  const recoverFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("user_payload");
    } else {
      return "{}";
    }
  };
  const userPayLoad = JSON.parse(recoverFromLocalStorage());

  const otpConfirmData = {
    user_type: userPayLoad?.user_type,
    ID: userPayLoad?.ID,
    otp,
  };

  const otpConfig = {
    method: "post",
    url: `${BASE_URL}/api/validate_sms`,
    headers: {
      "X-APP-KEY": "FEIX9997eQFKBCjk9FaP95YOOk013XkKgGLVz",
    },
    data: otpConfirmData,
  };

  const handleOTPSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await axios(otpConfig);

      if (response?.data?.status === false) {
        toast({
          isClosable: true,
          duration: 5000,
          status: "error",
          title: response.data.message,
        });
        return;
      }
      toast({
        isClosable: true,
        duration: 3000,
        status: "success",
        title: response.data.message,
      });
      router.push("/auth?p=signin");
    } catch (err) {
      toast({
        isClosable: true,
        duration: 5000,
        status: "error",
        title: err?.response?.data?.message ? err?.response?.data?.message : "Some error occurred! check your connection.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resendData = {
    user_type: userPayLoad?.user_type,
    ID: userPayLoad?.ID,
    phone_number: userPayLoad?.phone_number,
  };

  const resendconfig = {
    method: "post",
    url: AUTH_API_ROUTES.RESEND_OTP,
    headers: {
      "X-APP-KEY": "7ey11nw9z2L6j6V4bZQ4594",
    },
    data: resendData,
  };

  const resendOTP = async () => {
    try {
      setResend(true);
      const response = await axios(resendconfig);

      toast({
        isClosable: true,
        duration: 3000,
        status: "success",
        title: response.data.message,
      });
    } catch (err) {
      toast({
        isClosable: true,
        duration: 3000,
        status: "error",
        title: err?.response?.data?.message ? err?.response?.data?.message : "Some error occurred! check your connection.",
      });
    } finally {
      setResend(false);
    }
  };

  return (
    <Box
      h="100vh"
      bgColor={"#F7F7F7"}
      backgroundImage={{ lg: `url(${signupbg.src})` }}
      backgroundPosition="right"
      backgroundRepeat="no-repeat"
      pl={{ base: "2rem", md: "8rem" }}
      pt="4.8rem"
    >
      <NextLink passHref href="/" legacyBehavior>
        <Link>
          <Image src={nairaboomlogo} alt="nairaboom logo" />
        </Link>
      </NextLink>
      <Box w={{ base: "100%", lg: "35%" }}>
        <Heading
          fontSize={"2.5rem"}
          fontWeight={700}
          pt="5rem"
          fontFamily={"poppins"}
        >
          Verification
        </Heading>
        <Text
          pt="1.25rem"
          pb="3.5rem"
          color="#A7A7A7"
          fontWeight={400}
          fontSize="xl"
        >
          A verification code has been sent to your phone number <br /> ending
          ***5676
        </Text>

        <form action="" onSubmit={handleOTPSubmit}>
          <Box display={"flex"} flexDir="column">
            <Input
              type={"number"}
              name="otp"
              placeholder="Enter OTP"
              bgColor={"white"}
              w={{ base: "85%", md: "30rem" }}
              focusBorderColor="nairagreen"
              onChange={(e) => setOTP(e.target.value)}
              required
              h="4.5rem"
              _placeholder={{ color: "#A7A7A7", fontSize: "21px" }}
              mb={{ base: "3rem", lg: "6rem" }}
            />
            <Button
              onClick={resendOTP}
              bgColor={"transparent"}
              _hover={{}}
              textDecor={"underline"}
              cursor="pointer"
              alignSelf={"center"}
              fontSize="21px"
              color={"#A7A7A7"}
            >
              {resend ? <Spinner /> : "Resend OTP?"}
            </Button>

            <Button
              type={"submit"}
              color="white"
              fontSize={"23px"}
              w={{ base: "85%", md: "30rem" }}
              mt="3rem"
              h="3.5rem"
              fontWeight="600"
              bg={"linear-gradient(180deg, #02D95A 0%, #02B54C 100%)"}
              cursor="pointer"
              _hover={{ transform: "scale(1.05)" }}
            >
              {isLoading ? <Spinner /> : "Verify"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default OtpConfirm;
