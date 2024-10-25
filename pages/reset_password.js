import {
  Box,
  Input,
  Heading,
  Button,
  Spinner,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
// import nairaboomlogo from "../public/navassets/nairaboom-logo.svg";
import nairaboomlogo from "../public/navassets/N1.png";
import newnairaboomlogo from "../public/redesign/logo.png";
import signupbg from "../public/signup/bg.svg";
import NextLink from "next/link";
import Image from "next/legacy/image";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { AUTH_API_ROUTES } from "../utils/routes";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const initialResetData = Object.freeze({
    email: "",
    otp: "",
    password: "",
  });

  const [ResetFormData, updateResetFormData] = useState(initialResetData);

  const handleResetChange = (e) => {
    updateResetFormData({
      ...ResetFormData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const config = {
    method: "post",
    url: `${BASE_URL}/api/change_password`,
    headers: {
      "X-APP-KEY": "FEIX9997eQFKBCjk9FaP95YOOk013XkKgGLVz",
    },
    data: ResetFormData,
  };

  const handleReset = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await axios(config);
      if (response?.data?.status === false) {
        toast({
          isClosable: true,
          duration: 3000,
          status: "error",
          title: response.data.message,
          position: "top",
        });
        return;
      }
      toast({
        isClosable: true,
        duration: 3000,
        status: "success",
        title: response?.data?.message || "Your password has been successfully reset.",
        position: "top",
      });
      // router.push("/auth?p=signin");
      router.push("/auth/login");
    } catch (err) {
      toast({
        isClosable: true,
        duration: 5000,
        status: "error",
        title: err?.response?.data?.message
          ? err?.response?.data?.message
          : "Some error occurred! check your connection.",
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      h="max-content"
      bgColor={"#F7F7F7"}
      backgroundImage={{ lg: `url(${signupbg.src})` }}
      backgroundPosition="right"
      backgroundRepeat="no-repeat"
      pl={{ base: "2rem", md: "8rem" }}
      pt="4.8rem"
    >
      {/* <NextLink passHref href="/">
        <Link>
          <Image src={nairaboomlogo} alt="nairaboom logo" />
        </Link>
      </NextLink> */}
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
          Password Reset
        </Heading>
        <Text
          pt="1.25rem"
          pb="3.5rem"
          color="#A7A7A7"
          fontWeight={400}
          fontSize="xl"
        >
          A verification code has been sent to your registered phone number
        </Text>

        <form action="" onSubmit={handleReset}>
          <Box display={"flex"} flexDir="column">
            <Input
              // type={"email"}
              type={"number"}
              name="email"
              placeholder="Enter Phone Number"
              bgColor={"white"}
              w={{ base: "85%", md: "30rem" }}
              focusBorderColor="nairagreen"
              onChange={handleResetChange}
              required
              h="4.5rem"
              _placeholder={{ color: "#A7A7A7", fontSize: "21px" }}
              mb={{ base: "1.5rem", lg: "2.5rem" }}
            />
            <Input
              // type={"number"}
              type={"text"}
              name="otp"
              placeholder="Enter OTP"
              bgColor={"white"}
              w={{ base: "85%", md: "30rem" }}
              focusBorderColor="nairagreen"
              onChange={handleResetChange}
              required
              h="4.5rem"
              _placeholder={{ color: "#A7A7A7", fontSize: "21px" }}
              mb={{ base: "1.5rem", lg: "2.5rem" }}
            />
            <Input
              type={"text"}
              name="password"
              placeholder="Enter new Password"
              bgColor={"white"}
              w={{ base: "85%", md: "30rem" }}
              focusBorderColor="nairagreen"
              onChange={handleResetChange}
              required
              h="4.5rem"
              _placeholder={{ color: "#A7A7A7", fontSize: "21px" }}
              mb={{ base: "1.5rem", lg: "2.5rem" }}
            />

            <Button
              type={"submit"}
              color="white"
              fontSize={"23px"}
              w={{ base: "85%", md: "30rem" }}
              mt="2rem"
              mb="2rem"
              h="3.5rem"
              fontWeight="600"
              bg={"linear-gradient(180deg, #02D95A 0%, #02B54C 100%)"}
              cursor="pointer"
              _hover={{ transform: "scale(1.05)" }}
            >
              {isLoading ? <Spinner /> : "Reset Password"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ResetPassword;
