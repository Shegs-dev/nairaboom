import {
  Box,
  Text,
  Avatar,
  Link,
  Input,
  Button,
  useToast,
  Spinner,
  Fade,
} from "@chakra-ui/react";
import Head from "next/head";
import avatar from "../../public/dashboard/avatar.svg";
import Wrapper from "../../components/Wrapper";
import NextLink from "next/link";
import { useState } from "react";
import axios from "axios";
import useUser from "../../lib/hooks/useUser";
import { AUTH_API_ROUTES } from "../../utils/routes";
import { useRouter } from "next/router";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

const ChangePassword = () => {
  const { user } = useUser();

  const bearerToken = user?.token;
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const initialUpdateFormData = Object.freeze({
    current_password: "",
    password: "",
    confirm_password: "",
  });
  const [UpdateformData, setUpdateFormData] = useState(initialUpdateFormData);

  const handleChange = (e) => {
    setUpdateFormData({
      ...UpdateformData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const config = {
    method: "post",
    url: `${BASE_URL}/api/update_password`,
    headers: {
      "X-APP-KEY": NAIRABOOM_KEY,
      Authorization: `Bearer ${bearerToken}`,
    },
    data: UpdateformData,
  };

  const handleUpdateSubmit = async (e) => {
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
      router.push("/agent_dashboard");
    } catch (err) {
      toast({
        isClosable: true,
        duration: 5000,
        status: "error",
        title: err?.response?.data?.message ? err?.response?.data?.message : "Some error occurred! check your connection.",
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Head>
        <title>NairaBoom Agent Change Password</title>
        <meta name="user dashboard" content="nairaboom.ng agent dashboard" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-904C1779CP"
          strategy="afterInteractive"
        />
        <script strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-904C1779CP');
          `}
        </script>
      </Head>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        pb={{ base: "5rem", md: "8rem" }}
      >
        <Text
          fontWeight={700}
          fontSize={{ base: "1rem", md: "1.5rem" }}
          color="nairablue"
        >
          Change Password
        </Text>
        <Box display={"flex"} alignItems="center" gap="1.6rem">
          <Box as={NextLink} href="/customer_dashboard/editprofile">
            <Avatar
              name={user?.details?.fullname}
              src={user?.details?.customer_path}
              bg="rgba(30, 215, 96, 0.19)"
              cursor={"pointer"}
            />
          </Box>
        </Box>
      </Box>
      <form action="" onSubmit={handleUpdateSubmit}>
        <Box
          margin={"auto"}
          w={{ base: "85%", md: "50%" }}
          gap={{ base: "2rem", md: "3.25rem" }}
          display={"flex"}
          flexDir="column"
        >
          <Box w="100%">
            <label htmlFor="name">
              <Text color="nairagrey" fontWeight={500} fontSize="xl">
                Current Password
              </Text>{" "}
            </label>
            <Input
              _placeholder={{
                fontSize: "15px",
                fontWeight: 400,
                color: "niaragrey",
              }}
              h={{ base: "3.5rem", md: "5rem" }}
              border={"none"}
              bgColor={"white"}
              type="text"
              placeholder="Enter old password"
              focusBorderColor="nairagreen"
              mt=".7rem"
              name="current_password"
              onChange={handleChange}
              isRequired
            />
          </Box>
          <Box w="100%">
            <label htmlFor="name">
              <Text color="nairagrey" fontWeight={500} fontSize="xl">
                New Password
              </Text>{" "}
            </label>
            <Input
              _placeholder={{
                fontSize: "15px",
                fontWeight: 400,
                color: "niaragrey",
              }}
              h={{ base: "3.5rem", md: "5rem" }}
              border={"none"}
              bgColor={"white"}
              type="text"
              placeholder="Enter your new password"
              focusBorderColor="nairagreen"
              mt=".7rem"
              name="password"
              onChange={handleChange}
              isRequired
            />
          </Box>
          <Box w="100%">
            <label htmlFor="name">
              <Text color="nairagrey" fontWeight={500} fontSize="xl">
                Confirm Password
              </Text>{" "}
            </label>
            <Input
              _placeholder={{
                fontSize: "15px",
                fontWeight: 400,
                color: "niaragrey",
              }}
              h={{ base: "3.5rem", md: "5rem" }}
              border={"none"}
              bgColor={"white"}
              type="text"
              placeholder="Confirm new password"
              focusBorderColor="nairagreen"
              mt=".7rem"
              name="confirm_password"
              onChange={handleChange}
              isRequired
            />
          </Box>
          <Button
            type="submit"
            color="white"
            bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
            py=".5rem"
            mt={{ base: "3rem", md: "5rem" }}
            _hover={{}}
          >
            {isLoading ? <Spinner /> : "Update"}
          </Button>
        </Box>
      </form>
    </Wrapper>
  );
};

export default ChangePassword;
