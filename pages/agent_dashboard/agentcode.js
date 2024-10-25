import {
    Box,
    Text,
    Avatar,
    HStack,
    Spinner,
    useToast,
    Button,
  } from "@chakra-ui/react";
  import Head from "next/head";
  import Wrapper from "../../components/Wrapper";
  import NextLink from "next/link";
  import useUser from "../../lib/hooks/useUser";
  import Image from "next/legacy/image";
  import { CopyIcon } from "@chakra-ui/icons";
  import empty_records from "../../public/dashboard/empty_record.png";
  import { useEffect, useRef, useState } from "react";
  import axios from "axios";
  import { AUTH_API_ROUTES } from "../../utils/routes";
  import { TelegramShareButton, WhatsappShareButton } from "react-share";
  import { RWebShare } from "react-web-share";
  
  const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
  const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;
  
  const ReferralLink = () => {
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const toast = useToast();
    const bearerToken = user?.token;
  
    const [hasCoppied, sethasCoppied] = useState(false);
  
    useEffect(() => {
      if (!bearerToken) return;
  
      async function fetchData() {
        const config = {
          method: "get",
          url: `${BASE_URL}/api/profile`,
          headers: {
            "X-APP-KEY": NAIRABOOM_KEY,
            Authorization: `Bearer ${bearerToken}`,
          },
        };
  
        try {
          setIsLoading(true);
          const response = await axios(config);
          setData(response?.data?.payload);
        } catch (err) {
          // toast({
          //   status: "error",
          //   isClosable: true,
          //   duration: "5000",
          //   title: "Please check your connection and try again",
          //   position: "top",
          // });
        } finally {
          setIsLoading(false);
        }
      }
  
      fetchData();
    }, [bearerToken, toast]);
  
    useEffect(() => {
      var requestOptions = {
        method: "get",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "X-APP-KEY": NAIRABOOM_KEY,
        },
      };
      fetch("https://nairaboom.com.ng/api/profile", requestOptions)
        .then((response) => {
          console.warn("response", response);
          response.text();
        })
        .then((result))
        .catch((error));
    }, [bearerToken]);
  
    // console.warn('here',user?.details.fullname, user?.details?.fullname );
  
    // var requestOptions = {
    //     method: 'GET',
    //     headers: {
    //       Authorization:
    //         'Bearer eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJJRCI6IjYwIiwiZnVsbG5hbWUiOiJlYXJsIiwiZW1haWwiOm51bGwsInBob25lX251bWJlciI6IisyMzQ4MTQ1NDA2ODM5IiwiZ2VuZGVyIjpudWxsLCJhZGRyZXNzIjpudWxsLCJyZXNpZGVuY2Vfc3RhdGUiOm51bGwsImNvdW50cnkiOm51bGwsImN1c3RvbWVyX3BhdGgiOiIiLCJzdGF0dXMiOiIxIiwiZGF0ZV9tb2RpZmllZCI6IjIwMjMtMDMtMDQgMTM6MDQ6NTgiLCJkYXRlX2NyZWF0ZWQiOiIyMDIzLTAzLTA0IDEzOjA0OjU4IiwidXNlcm5hbWUiOiIwODE0NTQwNjgzOSIsInVzZXJuYW1lXzIiOm51bGwsInVzZXJfdHlwZSI6ImN1c3RvbWVyIiwidXNlcl90YWJsZV9pZCI6IjE1IiwidG9rZW4iOm51bGwsImhhc19jaGFuZ2VfcGFzc3dvcmQiOiIwIiwibGFzdF9sb2dpbiI6IjIwMjMtMDQtMTQgMTM6MDk6NTgiLCJsYXN0X2xvZ291dCI6bnVsbCwicmVmZXJyYWxfY29kZSI6bnVsbCwibWV0YSI6MTY4MTQ3NjU1N30.3A1UEkxfYDpXfIyYjaEzhQYuXP-hleuBt6mcIROotog',
    //       'X-APP-KEY': 'FEIX9997eQFKBCjk9FaP95YOOk013XkKgGLVz',
    //     },
    //   };
    //   fetch('https://nairaboom.com.ng/api/wallet_balance', requestOptions)
    //     .then(response => response.text())
    //     .then(result)
    //     .catch(error);
  
    return (
      <Wrapper>
        <Head>
        <title>NairaBoom Agent Code</title>
        <meta name="user dashboard" content="nairaboom.ng agent dashboard" />
      </Head>
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
          pb={{ base: "2.5rem", md: "4rem" }}
        >
          <Text
            fontWeight={700}
            fontSize={{ base: "1.25rem", md: "1.5rem" }}
            color="nairablue"
          >
            Agent Code
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
        {isLoading || !data ? (
          <Box
            py="10rem"
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
          >
            <Spinner />
          </Box>
        ) : (
          <>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              bgColor={"white"}
              width={"100%"}
              py={"2"}
              px={"4"}
            >
              <Text
                onClick={() => {
                  navigator.clipboard.writeText(data?.referral_code);
                }}
                fontWeight={400}
                fontSize={{ base: "1.25rem", md: "1.5rem" }}
                color="nairablue"
              >
                {data === null ? "" : data?.referral_code}
              </Text>
              <Box
                onClick={() => {
                  navigator.clipboard.writeText(data?.referral_code);
                  sethasCoppied(true);
                }}
              >
                {hasCoppied ? (
                  <Text pl=".3rem" fontWeight={500}>
                    copied
                  </Text>
                ) : (
                  <CopyIcon w="2rem" h="1.5rem" />
                )}
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              mt={"10"}
            >
              <RWebShare
                data={{
                  text: "Use my code to Signup on Nairaboom and get instant N 35,000 Rollover bonus & Cashout up to N 35,000,000",
                  url: `https://nairaboom.ng/${data?.referral_code}`,
                  title: "Nairaboom",
                }}
                onClick={(e) => console.log("shared successfully!")}
              >
                <Button
                  fontWeight={900}
                  fontSize=".8rem"
                  bgColor="nairagreen"
                  color="white"
                  borderRadius="3px"
                  transition={"all ease-in-out .4s"}
                  _hover={{}}
                  textAlign="center"
                  py={".8rem"}
                  w={{ md: "8.6rem", base: "full" }}
                  boxShadow={"inner"}
                  bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
                  onClick={() => {}}
                >
                  Share My Code
                </Button>
              </RWebShare>
            </Box>
            <TelegramShareButton />
          </>
        )}
        <Box
          h={{ sm: "0rem", lg: "50vh" }}
          width={"100%"}
          py={"2"}
          px={"4"}
        ></Box>
      </Wrapper>
    );
  };
  
  export default ReferralLink;
  