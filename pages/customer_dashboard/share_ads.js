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
import {
  TelegramShareButton
} from "react-share";
import { RWebShare } from "react-web-share";
import { useMediaQuery } from "@chakra-ui/react";
import frame from "../../public/share.png";
import { 
  getProfile
} from "../../src/apis/func";

const ReferralLink = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const toast = useToast();
  const bearerToken = user?.token;

  const [isLargerThan768] = useMediaQuery("(max-width: 768px)");

  const [hasCoppied, sethasCoppied] = useState(false);

  useEffect(() => {
    if (bearerToken && bearerToken.length > 0) {
      setIsLoading(true);
      fetchData();
      setIsLoading(false);
    }

  }, [bearerToken, toast]);

  async function fetchData() {
    setIsLoading(true);
    const res = await getProfile(bearerToken);
    setIsLoading(false);
    if (res.status && (res.status === 200 || res.status === 201)) {
      setData(res?.data?.payload);
    }
  }

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
          Share & Earn
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
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mx={"auto"}
        flexDir={"column"}
      >
        <>
          {isLargerThan768 ? (
            <>
              <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                bgColor={"white"}
                width={{ base: "90vw", md: "90vw" }}
                py={"2"}
                h={"25vh"}
                px={"4"}
                borderRadius={"1rem"}
              >
                <Image width={"200%"} height={"200%"} src={frame} alt="frame" />
              </Box>
              <Box w={{ base: "80%" }}>
                <Text
                  fontWeight={400}
                  fontSize={{ base: "1.05rem", md: "1.25rem" }}
                  color="nairablue"
                  textAlign={"center"}
                >
                  Earn 100 Boom Coin Tokens (BCT) everytime you share Nairaboom with your friends via any social media platform.
                </Text>
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
                bgColor={"white"}
                width={{ base: "90vw", md: "50vw" }}
                height={{ base: "15vh", md: "30vh" }}
                py={"2"}
                px={"4"}
              >
                <Image width={"200%"} height={"200%"} src={frame} alt="frame" />
                <Text
                  onClick={() => {
                    navigator.clipboard.writeText(data?.referral_code);
                  }}
                  fontWeight={400}
                  fontSize={{ base: "1.25rem", md: "1.5rem" }}
                  color="nairablue"
                  textAlign={"center"}
                  width={{ base: "70vw", md: "50vw" }}
                >
                  ADS TO SHARE
                </Text>
              </Box>
              <Box mt={"2rem"} w={{ base: "80%", md: "60%" }}>
                <Text
                  fontWeight={400}
                  fontSize={{ base: "1.05rem", md: "1.25rem" }}
                  color="nairablue"
                  textAlign={"center"}
                >
                  Earn #500 when you share Nairaboom with your friends via any
                  social media platform
                </Text>
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
                text: "Ready to make money? Join NairaBoom, the ultimate Play2Earn platform where you can use your alerts to play games and cashout. \
                You can also Monetize your account to earn daily from gameplays & winnings on the platform and withdraw instantly! Sign up with my link \
                now and receive 35,000 Boom Coins to start cashing out!",
                url: `https://nairaboom.ng/share?r=${data?.referral_code}`,
                title: "Nairaboom",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button
                fontWeight={600}
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
                Share Now
              </Button>
            </RWebShare>
          </Box>
          <TelegramShareButton />
        </>
      </Box>
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
