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
import { useMediaQuery } from "@chakra-ui/react";
import giftbox3 from "../../public/giftbox3.png";
import { useRouter } from "next/router";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

const ReferralLink = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [referralCode, setReferralCode] = useState("");
  const toast = useToast();
  const bearerToken = user?.token;
  const [isLargerThan768] = useMediaQuery("(max-width: 768px)");

  const [hasCoppied, sethasCoppied] = useState(false);
  const [referralCount, setReferralCount] = useState("0");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (bearerToken && bearerToken.length > 0) {
      fetchData();
    }

    if (user && user.length > 0) {
      setUserData(user);
    }
  }, [bearerToken]);

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
      toast({
        status: "error",
        isClosable: true,
        duration: "5000",
        title: "Please check your connection and try again",
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // useEffect(() => {
  //   if (bearerToken && bearerToken.length > 0) {
  //     secondFunction();
  //   }
  // }, [bearerToken]);

  // function secondFunction() {
  //   var requestOptions = {
  //     method: "get",
  //     headers: {
  //       Authorization: `Bearer ${bearerToken}`,
  //       "X-APP-KEY": NAIRABOOM_KEY,
  //     },
  //   };
  //   fetch("https://nairaboom.com.ng/api/profile", requestOptions)
  //     .then((response) => {
  //       console.warn("response", response);
  //       response.text();
  //     })
  //     .then((result))
  //     .catch((error));
  // }

  useEffect(() => {
    if (bearerToken && bearerToken.length > 0) {
      fetchData();
    }

    async function fetchData() {
      const config = {
        method: "get",
        url: `${BASE_URL}/api/user_referral_stats`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
      };

      try {
        setIsLoading(true);
        const response = await axios(config);
        setReferralCount(response?.data?.payload?.total);
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
  }, [bearerToken, toast]);


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

  const router = useRouter();
  const { r } = router.query;

  return (
    <Wrapper>
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
          My Referral Link
        </Text>
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
          <Box display={"flex"} alignItems="center" gap="1.6rem">
            <b>Total Referred: {referralCount}</b>
            <Box as={NextLink} href="/customer_dashboard/editprofile">
              <Avatar
                name={user?.details?.fullname}
                src={"/customer_dashboard/editprofile"}
                bg="rgba(30, 215, 96, 0.19)"
                cursor={"pointer"}
              />
            </Box>
          </Box>
          </>
        )}
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
          {isLargerThan768 ? (
            <>
              <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                justifyItems={"center"}
                mb={"1rem"}
              >
                <Image
                  width={200}
                  height={200}
                  src={giftbox3}
                  alt="frame"
                  style={{ backgroundColor: "transparent" }}
                />
                <Box w={{ base: "80%" }}>
                  <Text
                    fontWeight={400}
                    fontSize={{ base: "1.05rem", md: "1.25rem" }}
                    color="nairablue"
                    textAlign={"center"}
                  >
                    {/* Earn ₦ 100 bonus in your Boom  Wallet everytime you share Niaraboom with your friends */}
                    {/* when your friends sign up with your referral
                    link and play a game */}
                    {/* Earn ₦ 500 in your Rollover Wallet everytime your friends sign
                    up with your referral link and play a game on Nairaboom */}
                    Refer 35 people to create your POD and Monetize your account
                    to start earning daily from your POD Rollovers & Winnings!
                  </Text>
                </Box>
              </Box>
              <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                bgColor={"white"}
                width={{ base: "90vw", md: "90vw" }}
                py={"2"}
                px={"4"}
                borderRadius={"1rem"}
              >
                <Text
                  onClick={() => {
                    navigator.clipboard.writeText(referralCode);
                  }}
                  fontWeight={400}
                  fontSize={{ base: "1.25rem", md: "1.5rem" }}
                  color="nairablue"
                  textAlign={"center"}
                  width={{ base: "70vw", md: "90vw" }}
                >
                  {data === null ? "" : data?.referral_code}
                </Text>
                <Box
                  onClick={() => {
                    navigator.clipboard.writeText(referralCode);
                    sethasCoppied(true);
                  }}
                  mt={"1rem"}
                >
                  {/* <CopyIcon w="2rem" h="1.5rem" /> */}
                  {hasCoppied ? (
                    <Text pl=".3rem" fontWeight={500}>
                      copied
                    </Text>
                  ) : (
                    <CopyIcon w="2rem" h="1.5rem" />
                  )}
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                justifyItems={"center"}
                mb={"1rem"}
              >
                <Image
                  width={"100%"}
                  height={"100%"}
                  src={giftbox3}
                  alt="frame"
                  style={{ backgroundColor: "transparent" }}
                />
                <Box w={{ base: "80%" }}>
                  <Text
                    fontWeight={400}
                    fontSize={{ base: "1.05rem", md: "1.25rem" }}
                    color="nairablue"
                    textAlign={"center"}
                  >
                    Refer 35 people to create your POD and Monetize your account
                    to start earning daily from your POD Rollovers & Winnings!
                  </Text>
                </Box>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                bgColor={"white"}
                width={{ base: "90vw", md: "80vw", lg: "60vw" }}
                py={"2"}
                px={"4"}
              >
                <Text
                  onClick={() => {
                    navigator.clipboard.writeText(referralCode);
                  }}
                  fontWeight={400}
                  fontSize={{ base: "1.25rem", md: "1.5rem" }}
                  color="nairablue"
                  width={"90%"}
                >
                  {data === null ? "" : data?.referral_code}
                </Text>
                <Box
                  onClick={() => {
                    navigator.clipboard.writeText(referralCode);
                    sethasCoppied(true);
                  }}
                >
                  {/* <CopyIcon w="2rem" h="1.5rem" /> */}
                  {hasCoppied ? (
                    <Text pl=".3rem" fontWeight={500}>
                      copied
                    </Text>
                  ) : (
                    <CopyIcon w="2rem" h="1.5rem" />
                  )}
                </Box>
              </Box>
            </>
          )}

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
                url: `https://nairaboom.ng/auth/signup/customer?r=${data?.referral_code}&type=normal&t=normal`,
                // url: `https://nairaboom.ng/share?r=${data?.referral_code}`,
                title: "Nairaboom",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button
                fontSize=".8rem"
                bgColor="nairagreen"
                color="white"
                borderRadius="3px"
                transition={"all ease-in-out .4s"}
                _hover={{}}
                fontWeight={800}
                textAlign="center"
                py={".8rem"}
                w={{ md: "10.6rem", base: "full" }}
                boxShadow={"inner"}
                bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
                onClick={() => {}}
              >
                Share My Link To Refer
              </Button>
            </RWebShare>
          </Box>
          <TelegramShareButton />
          <Box w={{ base: "100%" }}>
            <Text
              fontWeight={400}
              fontSize={{ base: "1.05rem", md: "1.25rem" }}
              color="nairablue"
              textAlign={"center"}
            >
              Please note that you must complete a minimum of 5 Rollover Gameplays each month to maintain your Monetization status and keep earning.
            </Text>
          </Box>
        </>
      )}
      <Box
        h={{ sm: "20vh", lg: "60vh" }}
        width={"100%"}
        py={"2"}
        px={"4"}
      ></Box>
    </Wrapper>
  );
};

export default ReferralLink;
