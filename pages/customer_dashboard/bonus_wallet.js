import {
  Box,
  Text,
  Avatar,
  HStack,
  Spinner,
  useToast,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
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
import { useRouter } from "next/router";

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

  // const bonus_data = [
  //   {
  //     id: 1,
  //     text: "SIGN UP",
  //     amount: "5,000",
  //   },
  //   {
  //     id: 2,
  //     text: "FIRST WALLET FUNDING",
  //     amount: "5,000",
  //   },
  //   {
  //     id: 3,
  //     text: "NEW USER SIGN UP WITH YOUR REFERRAL CODE",
  //     amount: "1,000",
  //   },
  //   {
  //     id: 4,
  //     text: "EVERY 5 GAMES YOU PLAY",
  //     amount: "1,000",
  //   },
  //   {
  //     id: 5,
  //     text: "SHARING NAIRABOOM ADS VIA SOCIAL MEDIA",
  //     amount: "1,000",
  //   },
  //   {
  //     id: 6,
  //     text: "TURN ON NOTIFICATIONS",
  //     amount: "1,000",
  //   },
  //   {
  //     id: 7,
  //     text: "RECEIVE BONUS TRANSFERS FROM FRIENDS ON THE PLATFORM",
  //     amount: "Peer to Peer",
  //   },
  // ];

  const bonus_data = [
    {
      id: 1,
      text: "NAIRABOOM SIGN UP",
      amount: "₦15,000",
    },
    {
      id: 2,
      text: "FIRST WALLET FUNDING",
      amount: "₦20,000",
    },
    {
      id: 3,
      text: "NEW USER SIGN UP WITH YOUR REFERRAL CODE & PLAY A GAME",
      amount: "₦500",
    },
    {
      id: 4,
      text: "EVERY 5 GAMES YOU PLAY",
      amount: "₦1,000",
    },
    {
      id: 41,
      text: "SHARING NAIRABOOM ADS VIA SOCIAL MEDIA ",
      amount: "₦100/ SHARE",
    },
    // {
    //   id: 5,
    //   text: "TURN ON NOTIFICATIONS",
    //   amount: "₦5000",
    // },
    {
      id: 5,
      text: "PLAY GAME",
      amount: "100% OF ALERT AMOUNT",
    },
    {
      id: 71,
      text: "CHECK-IN OF ALERT",
      amount: "10% OF ALERT AMOUNT",
    },
    {
      id: 7,
      text: "1 GREEN BALL IN GAME PLAY",
      amount: "₦1,000",
    },
    {
      id: 8,
      text: "2 GREEN BALLS IN GAME PLAY",
      amount: "50% OF ALERT AMOUNT",
    },
    {
      id: 9,
      text: "BIRTHDAY",
      amount: "BIRTHDAY ROLLOVER",
    },
    // {
    //   id: 9,
    //   text: "GET MONTHLY BOOM CODE",
    //   amount: "CROSS OVER  AMOUNT",
    // },
    // {
    //   id: 9,
    //   text: "ADD TO HOME SCREEN",
    //   amount: "₦4,000",
    // },
    // {
    //   id: 42,
    //   text: "GET 2 GREEN BOXES IN A SPIN CYCLE",
    //   amount: "250.00",
    // },
    // {
    //   id: 5,
    //   text: "SHARING NAIRABOOM ADS VIA SOCIAL MEDIA",
    //   amount: "500.00",
    // },
    // {
    //   id: 6,
    //   text: "TURN ON NOTIFICATIONS",
    //   amount: "500",
    // },
    // {
    //   id: 7,
    //   text: "RECEIVE BONUS TRANSFERS FROM FRIENDS ON THE PLATFORM",
    //   amount: "Peer to Peer",
    // },
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
          Rollover Wallet
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
          There are many activities that can steadily help you build your Rollover Wallet on Nairaboom. These activities include;
        </Text>
        {/* <Text
          color="nairablue"
          fontWeight={400}
          fontSize={{ base: "1.05rem", md: "1.25rem" }}
        >
          Your Giveaway wallet accumulates all your bonuses for many actions you
          take on Nairaboom such as;
        </Text> */}
        <Box
          pt={{ base: "2rem", md: "2.75rem" }}
          display={"flex"}
          justifyContent="space-between"
        >
          <Text
            color="nairagrey"
            fontWeight={500}
            fontSize={{ base: ".9rem", md: "1.25rem" }}
          ></Text>
          <Text
            color="nairagrey"
            fontWeight={500}
            fontSize={{ base: ".9rem", md: "1.25rem" }}
          ></Text>
          <Text
            color="nairagrey"
            fontWeight={500}
            fontSize={{ base: ".9rem", md: "1.25rem" }}
          ></Text>
        </Box>
        <Box
          pt={{ base: "1.5rem", md: "2rem" }}
          display={"flex"}
          flexDir="column"
          gap="2rem"
          w={{base: "85vw" , lg: "100%"}}
        >
          {bonus_data.map((item, index) => (
            <Box
              key={index}
              display={"flex"}
              alignItems="center"
              justifyContent="space-between"
              pl={{ base: "0rem", md: "1.5rem" }}
              pr={{ base: "0rem", md: "1.5rem" }}
              maxH={"25rem"}
              pb={"0.5rem"}
              borderBottom={"1px"}
              borderColor={"#0020471A"}
            >
              <Text
                fontSize={{ base: "1rem", md: "lg" }}
                color="nairablue"
                fontWeight={400}
                textAlign="start"
              >
                {index + 1}
              </Text>
              <Text
              
                // fontSize={{ base: "0.75rem", md: "0.75rem" }}
                fontSize={{ base: "0.9rem", md: "lg" }}
                color="nairablue"
                fontWeight={400}
                textAlign="start"
                // backgroundColor={'red'}
                pl={"1rem"}
                w={{ sm: "100vw", md: "50%" }}
              >
                {item.text}
              </Text>
              <Text
                w="7rem"
                fontSize={{ base: "0.9rem", md: "lg" }}
                color="nairablue"
                fontWeight={400}
                textAlign="start"
              >
                {/* {index === 6 ? "" : "₦"} */}
                {item.amount}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={"5"}
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
          mt={"1rem"}
          w={{ md: "8.6rem", base: "full" }}
          boxShadow={"inner"}
          bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
          onClick={() => {
            router.push("/customer_dashboard");
          }}
        >
          Continue
        </Button>
      </Box>

      {/* <Box w="100%" marginX={"0%"}>
        <TableContainer overflowX={"scroll"} w="100%">
          <Table
            variant={"simple"}
            // style={{ borderCollapse: "separate", borderSpacing: "0 1em" }}
          >
            <Thead>
              <Tr
                bgColor="transparent"
                borderRadius={"5px"}
                py="1rem"
                display={"flex"}
                fontFamily="poppins"
                justifyContent={"space-evenly"}
                mb="1.8rem"
              >
                <Th border={"none"}>
                  <Text
                    color="nairagrey"
                    fontWeight={700}
                    fontSize={{ base: ".7rem", md: "xl" }}
                  >
                    Date
                  </Text>
                </Th>

                <Th border={"none"}>
                  <Text
                    color="nairagrey"
                    fontWeight={700}
                    fontSize={{ base: ".7rem", md: "xl" }}
                  >
                    Alert Type
                  </Text>
                </Th>
                <Th border={"none"}>
                  <Text
                    color="nairagrey"
                    fontWeight={700}
                    fontSize={{ base: ".7rem", md: "xl" }}
                  >
                    Stake Amount
                  </Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {bonus_data.map((item, index) => {
                return (
                  <Tr
                    display={"flex"}
                    justifyContent={{
                      base: "space-between",
                      md: "space-evenly",
                    }}
                    fontFamily="poppins"
                    key={index}
                  >
                    <Td
                      fontSize={{ base: "0.8rem", md: "1.125rem" }}
                      color="nairablue"
                    >
                      1
                    </Td>
                    <Td
                      fontSize={{ base: "0.8rem", md: "1.125rem" }}
                      color="nairablue"
                    >
                      {item.text}
                    </Td>
                    <Td
                      fontSize={{ base: "0.8rem", md: "1.125rem" }}
                      color="nairablue"
                    >
                      {`₦ ${item.amount} `}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box> */}

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
