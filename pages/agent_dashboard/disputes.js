import Wrapper from "../../components/Wrapper";
import {
  Box,
  Text,
  Avatar,
  Input,
  FormLabel,
  Button,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import useUser from "../../lib/hooks/useUser";
import NextLink from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { AUTH_API_ROUTES } from "../../utils/routes";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;


const Disputes = () => {
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser();

  const initialDispute = Object.freeze({
    date_created: "",
    description: "",
  });
  const [dispute, setDispute] = useState(initialDispute);
  const handleChange = (e) => {
    setDispute({
      ...dispute,
      [e.target.name]: e.target.value,
    });
  };
  const bearerToken = user?.token;

  const config = {
    method: "post",
    url: `${BASE_URL}/api/disputes`,
    headers: {
      "X-APP-KEY": NAIRABOOM_KEY,
      Authorization: `Bearer ${bearerToken}`,
    },
    data: dispute,
  };

  const handleDispute = async (e) => {
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
        title: "Message sent, we will reach out soon!",
        position: "top",
      });
      router.push("/customer_dashboard");
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
        <title>NairaBoom Agent Disputes</title>
        <meta name="user dashboard" content="nairaboom.ng agent dashboard" />
      </Head>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        pb="2.25rem"
      >
        <Text
          fontWeight={700}
          fontSize={{ base: "1.25rem", md: "1.5rem" }}
          color="nairablue"
        >
          Need Help?
        </Text>
        <Box display={"flex"} alignItems="center" gap="1.6rem">
          <Box as={NextLink} href="/customer_dashboard/editprofile">
            <Avatar
              name={user?.details.fullname}
              src={user?.details.customer_path}
              bg="rgba(30, 215, 96, 0.19)"
              cursor={"pointer"}
            />
          </Box>
        </Box>
      </Box>
      <Box pt="2rem" fontFamily={"poppins"}>
        <Text
          lineHeight={"1.8rem"}
          color="nairablue"
          textAlign={"center"}
          fontWeight={500}
          fontSize={{ base: "1rem", md: "1.2rem" }}
          pb={{ base: "3rem", md: "4.25rem" }}
        >
          Got any complaint? Fill the Form below
        </Text>
        <form onSubmit={handleDispute}>
          <Box
            margin={"auto"}
            w={{ base: "90%", md: "65 %" }}
            display="flex"
            flexDir={"column"}
            alignItems="center"
          >
            <FormLabel fontSize={"xl"} alignSelf={"flex-start"}>
              Date
            </FormLabel>
            <Input
              type="date"
              name="date_created"
              bgColor={"white"}
              onChange={handleChange}
              isRequired
              focusBorderColor="nairagreen"
            />

            <FormLabel fontSize={"xl"} alignSelf={"flex-start"} mt="2rem">
              Description
            </FormLabel>
            <Textarea
              minH={"20rem"}
              type="text"
              name="description"
              bgColor={"white"}
              onChange={handleChange}
              isRequired
              focusBorderColor="nairagreen"
            />

            <Button
              border={"none"}
              w={{ base: "70%", md: "70%" }}
              color="white"
              bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
              type={"submit"}
              fontWeight={600}
              fontSize="lg"
              mt={{ base: "3rem", md: "5rem" }}
              cursor={"pointer"}
              _hover={{ transform: "scale(1.05)" }}
            >
              {isLoading ? <Spinner /> : "Submit"}
            </Button>
          </Box>
        </form>
      </Box>
    </Wrapper>
  );
};

export default Disputes;
