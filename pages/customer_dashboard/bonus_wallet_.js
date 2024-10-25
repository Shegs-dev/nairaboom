import {
  Box,
  Text,
  Avatar,
  HStack,
  Spinner,
  useToast,
  Button,
  List,
  ListItem,
  UnorderedList,
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
import { useRouter } from "next/router";
import {
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterIcon,
  TwitterShareButton,
  FacebookIcon,
  FacebookShareButton,
  InstapaperIcon,
  InstapaperShareButton,
} from "react-share";
import { RWebShare } from "react-web-share";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

const ReferralLink = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const toast = useToast();
  const bearerToken = user?.token;
  const router = useRouter();

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

  const bonus_data = [
    {
      id: 1,
      text: "SIGN UP",
      amount: "15,000",
    },
    {
      id: 2,
      text: "FIRST WALLET FUNDING",
      amount: "15,000",
    },
    {
      id: 3,
      text: "NEW USER SIGN UP WITH YOUR REFERRAL CODE",
      amount: "500",
    },
    {
      id: 4,
      text: "EVERY 5 GAMES YOU PLAY",
      amount: "1000",
    },
    {
      id: 41,
      text: "GET 1 GREEN BALL IN A SPIN CYCLE",
      amount: "1000",
    },
    {
      id: 42,
      text: "GET 2 GREEN BALLS IN A SPIN CYCLE",
      amount: "250",
    },
    {
      id: 5,
      text: "SHARING NAIRABOOM ADS (EVERY 10 ADS)",
      amount: "500",
    },
    {
      id: 6,
      text: "TURN ON NOTIFICATIONS",
      amount: "500",
    },
    {
      id: 7,
      text: "RECEIVE BONUS TRANSFERS FROM FRIENDS ON THE PLATFORM",
      amount: "Peer to Peer",
    },
  ];

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
          Giveaway Wallet
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

      <Box display={"flex"} w="90%" flexDir="column">
        <Text
          color="nairablue"
          fontWeight={700}
          fontSize={{ base: "1.05rem", md: "1.25rem" }}
        >
          How to activate your Giveaway Wallet bonuses
        </Text>
        <Text
          color="nairablue"
          fontWeight={400}
          fontSize={{ base: "0.8rem", md: "1rem" }}
        >
          You can activate your bonuses when any of the following happens;
        </Text>
      </Box>
      <Box mt={'1rem'}>
        <UnorderedList spacing={3}>
          {/* <ListItem  color="nairablue">Win a game: All accumulated bonuses will be added to your winnings and paid out.</ListItem>
          <ListItem color="nairablue">Play 5 or more games in a month and qualify for the monthly Celebrity Bonus Draw via your Giveaway Codes.</ListItem> */}
          <ListItem  color="nairablue">Get 2 Green Boxes with matching numbers in 1 spin cycle: You win N 2,000.00 from your Giveaway Wallet (Only when you have above 10,000 Naira in your Rollover Wallet).</ListItem>
          <ListItem color="nairablue">Play 5 or more games in a month and qualify for the monthly Giveaway Wallet Draw via your Giveaway Codes.</ListItem>
          <ListItem color="nairablue">Win a game: Accumulated bonuses will be added to your winnings.</ListItem>
        </UnorderedList>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={"10"}
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
          onClick={() => {
            router.push("/customer_dashboard/");
          }}
        >
          Continue
        </Button>
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
