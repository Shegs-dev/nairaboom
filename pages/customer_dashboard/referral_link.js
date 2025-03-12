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
  UserReferralStats,
  getProfile
} from "../../src/apis/func";
import { TelegramShareButton, WhatsappShareButton } from "react-share";
import { RWebShare } from "react-web-share";
import { useMediaQuery } from "@chakra-ui/react";
import giftbox3 from "../../public/giftbox3.png";
import { useRouter } from "next/router";

const ReferralLink = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [referralCode, setReferralCode] = useState("");
  const toast = useToast();
  const bearerToken = user?.token;
  const [isLargerThan768] = useMediaQuery("(max-width: 768px)");

  const [hasCoppied, sethasCoppied] = useState(false);
  const [hasCalled, setHasCalled] = useState(false);
  const [referralCount, setReferralCount] = useState();
  const [currentEarnings, setCurrentEarnings] = useState("0");
  const [totalEarnings, setTotalEarnings] = useState("0");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (bearerToken && bearerToken.length > 0) {
      setIsLoading(true);
      fetchReferrals();
      fetchData();
      setIsLoading(false);
    }

    if (user && user.length > 0) {
      setUserData(user);
    }
  }, [bearerToken]);

  async function fetchData() {
    setIsLoading(true);
    const res = await getProfile(bearerToken);
    setIsLoading(false);
    if (res.status && (res.status === 200 || res.status === 201)) {
      setData(res?.data?.payload);
    } else {
      toast({
        status: "error",
        isClosable: true,
        duration: "5000",
        title: "Please check your connection and try again",
        position: "top",
      });
    }
  }

  const fetchReferrals = async () => {
      const res = await UserReferralStats(bearerToken);
      setHasCalled(true);
      if (res.status && (res.status === 200 || res.status === 201)) {
        setReferralCount(res?.data?.payload?.total);
        const cEarn = res?.data?.payload?.current_earning;
        const cValue = Number(cEarn).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
        setCurrentEarnings(cValue);
        const tEarn = res?.data?.payload?.total_earning;
        const tValue = Number(tEarn).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
        setTotalEarnings(tValue);
      } 
  };

  const router = useRouter();
  const { r } = router.query;

  return (
    <Wrapper>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        pb={{ base: "0.5rem", md: "1rem" }}
      >
        <Text
          fontWeight={700}
          fontSize={{ base: "1.25rem", md: "1.5rem" }}
          color="nairablue"
        >
          My Referral Link
        </Text>
        {!hasCalled ? (
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
      <div className="flex justify-between">
        <div></div>
        <div className="flex justify-around px-2">
          <div><b>Earnings:</b></div>
          <div className="px-2 pb-2">
            <b>Current: ₦ {currentEarnings}</b><br/>
            <b>Lifetime: ₦ {totalEarnings}</b>
          </div>
        </div>
      </div>
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
                    Use this link to refer people to join your Trybe and earn up to 
                    ₦100,000 in passive income monthly!
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
                    Use this link to refer people to join your Trybe and earn up to 
                    ₦100,000 in passive income monthly!
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
                text: "I swap my bank alerts into BCT on NairaBoom and earn daily income. Sign up now to receive 35,000 BCT Airdrop (Boom Coin Tokens) and start earning daily too!",
                url: `https://nairaboom.ng/auth/signup/customer?r=${data?.referral_code}&type=normal&t=normal`,
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
