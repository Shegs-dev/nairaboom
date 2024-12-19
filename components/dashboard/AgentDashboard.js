import {
  Avatar,
  Box,
  Button,
  Center,
  Circle,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Spacer,
  Stack,
  Text,
  VStack,
  useDisclosure,
  Spinner,
  useToast,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
} from "@chakra-ui/react";
import { RiMenu2Fill, RiMenu3Fill, RiProfileFill } from "react-icons/ri";
import { BsBell, BsPerson, BsShareFill, BsWallet } from "react-icons/bs";
import { BiShare, BiTransfer } from "react-icons/bi";
import React, { useEffect, useRef, useState } from "react";
import PlayResponsibly from "../general/PlayResponsibly";
import { HiHome, HiOutlineCash } from "react-icons/hi";
import { MdContentPaste, MdFileCopy, MdHelpCenter } from "react-icons/md";
import { AUTH_API_ROUTES } from "../../utils/routes";
import {
  getAuthenticatedUser,
  removeTokenFromLocalStorage,
  removeTokenFromLocalStorage2,
} from "../../lib/hooks/getAuthUser";
import axios from "axios";
import useUser from "../../lib/hooks/useUser";
import { useRouter } from "next/router";
import { formatAmount } from "../../src/utils";
import { TbUsers } from "react-icons/tb";
import { SettingsIcon } from "@chakra-ui/icons";
import InfoButtonModal from "./btnMode";
import { Audio, Bars } from "react-loader-spinner";


const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

const AgentDashboard = () => {
  const toast = useToast();
  const [data, setData] = useState("");
  const [boom_code, setboom_code] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [wheelsettings, setwheelsettings] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [walletBal_avaialable, setwalletBal_avaialable] = useState(false);
  const router = useRouter();
  const { user, error } = useUser();
  const bearerToken = user?.token;
  const [boomTimes, setBoomTimes] = useState();
  const [playModal, setplayModal] = useState(false);
  const [insufficientModal, setinsufficientModal] = useState(false);
  const [gameSettings, setgameSettings] = useState();
  function parseJwt(token) {
    if (!bearerToken) return;
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
  //logout
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      removeTokenFromLocalStorage("token");
      removeTokenFromLocalStorage2("token2");
      toast({
        isClosable: true,
        duration: 5000,
        status: "success",
        title: "successfully logged out",
        position: "top",
      });
      router.replace("/");
      return;
    } catch (err) {
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const someFunc = () => {
    setiisOpen(false);
  };
  const [iisOpen, setiisOpen] = useState(false);
  const boomConfig = {
    method: "get",
    url: `${BASE_URL}/api/lastest_cashback_time`,
    headers: {
      "X-APP-KEY": NAIRABOOM_KEY,
      Authorization: `Bearer ${user?.token}`,
    },
  };
  const bonusConfig = {
    method: "get",
    url: `${BASE_URL}/api/bonus_wallet`,
    headers: {
      "X-APP-KEY": NAIRABOOM_KEY,
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  const walletConfig = {
    method: "get",
    url: `${BASE_URL}/api/wallet_balance`,
    headers: {
      "X-APP-KEY": NAIRABOOM_KEY,
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  const [bonusBalance, setBonusBalance] = useState();
  const [walletBalance, setWalletBalance] = useState();

  const boom = async () => {
    try {
      const res = await axios(boomConfig);
      setBoomTimes(res?.data.payload);
    } catch (e) {
    }
  };

  const fetchBalance = async () => {
    try {
      const bonusRes = await axios(bonusConfig);
      const walletRes = await axios(walletConfig);
    } catch (e) {
    }
  };

  const fetchBalance2 = async () => {
    const config = {
      method: "get",
      url: `${BASE_URL}/api/wallet_balance`,
      headers: {
        "X-APP-KEY": NAIRABOOM_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const bonusConfig = {
      method: "get",
      url: `${BASE_URL}/api/bonus_wallet`,
      headers: {
        "X-APP-KEY": NAIRABOOM_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    try {
      setIsLoading(true);
      const response = await axios(config);
      const response2 = await axios(bonusConfig);

      setWalletBalance(response?.data);
      setBonusBalance(response2?.data);
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
      setwalletBal_avaialable(true);
    }
  };

  const modalRedirect = () => {
    setiisOpen(true);
  };

  useEffect(() => {
    if (!bearerToken) return;

    const redirectIfnotAuthenticated = async () => {
      const isUserAuthenticated = await getAuthenticatedUser();
      if (
        isUserAuthenticated?.authenticated === false ||
        isUserAuthenticated?.user?.details?.user_type === "customer"
      ) {
        router.push("/auth?p=login");
      }
    };
    const destru = parseJwt(bearerToken);
    redirectIfnotAuthenticated();
    boom();
    fetchBalance2();
  }, [bearerToken, toast, router]);
  function convertStringToArray(inputString) {
    // Split the input string by "::" and convert substrings to integers
    const array = inputString?.split("::").map(Number);
    return array;
  }

  useEffect(() => {
    if (!bearerToken) return;

    async function fetchData() {
      const config = {
        method: "get",
        url: `${BASE_URL}/api/request_history`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
      };

      try {
        setIsLoading(true);
        const response = await axios(config);
        setData(response?.data);
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

    async function wheelsettings() {
      const config = {
        method: "get",
        url: `${BASE_URL}/api/request_history`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
      };

      try {
        setIsLoading(true);
        const response = await axios(config);
        setData(response?.data);
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

    const getter2 = async () => {
      const wheelconfig = {
        method: "get",
        url: `${BASE_URL}/api/wheel_tracker`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
      };

      try {
        setIsLoading(true);
        // const response = await axios(config);
        const response = await axios(wheelconfig);
        setwheelsettings(response?.data);
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
    };
    async function fetchTransaction() {
      const config = {
        method: "get",
        url: `${BASE_URL}/api/agent/transaction_history`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
      };
      try {
        setIsLoading(true);
        const response = await axios(config);
        setTransactions(response?.data);
        // const modified_data = splitArray(response?.data.payload.content);
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
    async function fetchWishClock() {
      const fetchWishConfig = {
        method: "get",
        url: `${BASE_URL}/api/boom_code`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${user?.token}`,
        },
      };
      try {
        const res = await axios(fetchWishConfig);
        const codes = convertStringToArray(res.data?.payload?.code);
        setboom_code(codes);
      } catch (e) {
        // toast({
        //   status: "error",
        //   isClosable: true,
        //   duration: "5000",
        //   title: "Please check your connection and try again",
        //   position: "top",
        // });
      }
    }
    async function getAppSettings() {
      const config = {
        method: "get",
        url: `${BASE_URL}/api/app_settings`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
      };

      try {
        setIsLoading(true);
        const response = await axios(config);
        setgameSettings(response?.data.payload);
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
    getter2();
    fetchTransaction();
    fetchWishClock();
    getAppSettings();
  }, [bearerToken, toast]);
  function formatNumberWithCommas(number) {
    const formattedNumber = number
      ?.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedNumber?.replace(/\.00$/, ""); // Remove .00 if present at the end
  }
  const [openLogout, setopenLogout] = useState(false);

  const TopComponent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const menuRef = useRef();

    return (
      <Stack
        w="100%"
        maxW="60rem"
        p={{ base: 5, md: 10 }}
        alignItems="center"
        spacing={8}
      >
        <Heading fontSize="1.5rem" fontWeight={600}>
          Agent Dashboard
        </Heading>
        <HStack w="100%" spacing={5}>
          <Button
            variant="unstyled"
            color="nairagreen"
            alignSelf="flex-start"
            pt={1}
            onClick={onOpen}
          >
            <RiMenu2Fill color="inherit" size={20} />
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={menuRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody pt={14}>
                <Stack spacing={5} h="100%">
                  <HStack>
                    <Avatar name="Chioma Guyton" size="md" />
                    <Heading fontSize="1.5rem" fontWeight={500}>
                      Welcome {user?.details?.fullname?.split(" ")[0]}
                    </Heading>
                  </HStack>
                  <Divider />
                  {[
                    {
                      title: "Dashboard",
                      link: "agent_dashboard",
                      icon: <HiHome />,
                    },
                    {
                      title: "Play Game",
                      link: "agent_dashboard/cashback",
                      icon: <HiOutlineCash />,
                    },
                    {
                      title: "My Wallet",
                      link: "agent_dashboard/wallet",
                      icon: <BsWallet />,
                    },
                    {
                      title: "Game history",
                      link: "agent_dashboard/request_history",
                      icon: <MdContentPaste />,
                    },
                    {
                      title: "Agent Code",
                      link: "agent_dashboard/agentcode",
                      icon: <TbUsers />,
                    },
                    {
                      title: "Redeem Winnings",
                      link: "agent_dashboard/redeem_winnings",
                      icon: <BiShare />,
                    },
                    // { title: "My Bonus", link: "agent_dashboard/request_history", icon: <BsWallet /> },

                    // { title: "Refer Your Trybe", link: "agent_dashboard", icon: <MdFileCopy /> },
                    // {
                    //   title: "Share & Earn",
                    //   link: "agent_dashboard/share_ads",
                    //   icon: <BsShareFill />,
                    // },
                  ].map((item, index) => {
                    return (
                      <Button
                        px={5}
                        key={index}
                        colorScheme={
                          item.title === "Dashboard" ? "gray" : "none"
                        }
                        onClick={() => router.push(item.link)}
                        color={item.title === "Dashboard" ? "#002047" : "gray"}
                        leftIcon={item.icon}
                      >
                        <Text as="span" flex="1" textAlign="left">
                          {item.title}
                        </Text>
                      </Button>
                    );
                  })}
                  <Spacer />
                  {[
                    {
                      title: "Need Help?",
                      link: "agent_dashboard/disputes",
                      icon: <MdHelpCenter />,
                    },
                    {
                      title: "Edit Profile",
                      link: "agent_dashboard/editprofile",
                      icon: <RiProfileFill />,
                    },
                    {
                      title: "Change Password",
                      link: "agent_dashboard/change-password",
                      icon: <SettingsIcon />,
                    },
                  ].map((item, index) => {
                    return (
                      <Button
                        px={5}
                        key={index}
                        colorScheme={
                          item.title === "Dashboard" ? "gray" : "none"
                        }
                        onClick={() => router.push(item.link)}
                        color={item.title === "Dashboard" ? "#002047" : "gray"}
                        leftIcon={item.icon}
                      >
                        <Text as="span" flex="1" textAlign="left">
                          {item.title}
                        </Text>
                      </Button>
                    );
                  })}

                  {user?.details?.kyc_approved === false && (
                    <Button
                      onClick={() =>
                        isCustomer
                          ? router.push(`/customer_dashboard/editprofile`)
                          : router.push(`/agent_dashboard/editprofile`)
                      }
                      color={"white"}
                      mt="0.3rem"
                      bg="nairagreen"
                      py={"1rem"}
                    >
                      Verify your Account
                    </Button>
                  )}

                  <Box
                    _hover={{ textDecoration: "none" }}
                    gap="1.18rem"
                    mt="0.5rem"
                    pl="2rem"
                    // as={Link}
                    display="flex"
                    alignItems="center"
                    onClick={() => {
                      setopenLogout(true);
                    }}
                  >
                    {/* <Image src={logout} width={"20px"} height={"20px"} alt="logout icon" /> */}
                    <Text color="#FF4B4B" fontWeight={500} fontSize="xl">
                      Log Out
                    </Text>
                  </Box>
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
          <Stack spacing={0} display={{ base: "none", md: "flex" }}>
            <Text fontWeight={600}>
              Hi, {user?.details?.fullname?.split(" ")[0]} &#128075;
            </Text>
            <Text>Got an alert, you want to rollover?</Text>
          </Stack>
          <Stack
            w="100%"
            justifyContent="flex-start"
            display={{ base: "flex", md: "none" }}
            spacing={0}
          >
            <Text fontWeight={600}>
              Hi, {user?.details?.fullname?.split(" ")[0]} &#128075;
            </Text>
            <Text>Got an alert, you want to rollover?</Text>
          </Stack>
          <Spacer />
          {/* <Box pos="relative">
            <Circle
              h="0.65rem"
              w="0.65rem"
              bg="red"
              pos="absolute"
              top={0}
              right={0.2}
            />
            <BsBell size={20} />
          </Box> */}
          <Center
            onClick={() => {
              router.push("/agent_dashboard/editprofile");
            }}
            p={2}
            bg="white"
            borderRadius="100%"
          >
            <BsPerson color="gray" size={20} />
          </Center>
        </HStack>

        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}
          gap={10}
          w="100%"
          alignItems="center"
        >
          <GridItem colSpan={2} bg="white" borderRadius={32}>
            <HStack
              color="#012647"
              py={2}
              justifyContent="center"
              spacing={5}
              px={4}
            >
              <Box p={2} bg="gray.300" borderRadius="100%">
                <BsWallet size={20} />
              </Box>
              <VStack alignItems={{ base: "flex-start", md: "center" }}>
                <Text
                  color={"#002047"}
                  fontWeight={{ base: "900" }}
                  fontSize={{ base: 12, md: 14 }}
                >
                  Wallet Balance
                </Text>
                {isLoading ? (
                  <Bars
                  height="20"
                  width="40"
                  color="#1ED760"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
                
                ) : (
                  <Text fontWeight={{ base: "900" }} color={"#002047"}>
                    &#8358;{" "}
                    {walletBalance
                      ? !walletBalance ||
                        walletBalance?.payload?.totalLength === 0 ||
                        walletBalance === null ||
                        walletBalance === undefined
                        ? 0
                        : `${formatAmount(
                            walletBalance?.payload?.content?.[0]?.amount
                          )}`
                      : 0}
                  </Text>
                )}
                {/* <Text fontWeight={{ base: "900" }} color={"#002047"}>
                  {isLoading || !bonusBalance ? (
                    <Spinner />
                  ) : (
                    <>
                      &#8358;
                      {bonusBalance
                        ? !bonusBalance ||
                          bonusBalance?.payload?.totalLength === 0 ||
                          bonusBalance === null ||
                          bonusBalance === undefined
                          ? `0`
                          : `${bonusBalance?.payload?.content?.[0]?.amount}`
                        : `0`}
                    </>
                  )}
                </Text> */}
              </VStack>
              <Spacer display={{ md: "none" }} />
              <Box
                w="8rem"
                display={{ base: "block", md: "none" }}
                bg="nairagreen"
                color="white"
                textAlign="center"
                py={2}
                borderRadius={32}
                cursor="pointer"
                transition={"all ease-in-out .4s"}
                fontWeight={{ base: "900" }}
                fontFamily={"Inter"}
                fontSize={"1.1rem"}
                onClick={() => {
                  router.push("/agent_dashboard/fund_account");
                }}
              >
                Fund
              </Box>
            </HStack>
          </GridItem>
          <GridItem colSpan={1} display={{ base: "none", md: "block" }}>
            <Box
              bg="nairagreen"
              color="white"
              textAlign="center"
              py={2}
              borderRadius={32}
              cursor="pointer"
              onClick={() => {
                router.push("/agent_dashboard/fund_account");
              }}
              fontWeight={{ base: "900" }}
              fontFamily={"Inter"}
              fontSize={"1.5rem"}
            >
              Fund
            </Box>
          </GridItem>
          <GridItem colSpan={2}>
            <HStack
              w={{ base: "70%", md: "100%" }}
              mx="auto"
              bg="white"
              color="#012647"
              py={2}
              borderRadius={32}
              justifyContent="center"
              spacing={5}
            >
              <Box p={2} bg="gray.300" borderRadius="100%">
                <BiTransfer size={20} />
              </Box>
              <VStack>
                <Text fontWeight={{ base: "900" }} color={"#002047"}>
                  Total Transactions
                </Text>
                <Text fontWeight={{ base: "900" }} color={"#002047"}>
                  {transactions?.payload?.totalLength}
                </Text>
              </VStack>
            </HStack>
          </GridItem>
        </Grid>
      </Stack>
    );
  };

  const CentralComponent = () => {
    return (
      <Stack
        w="100%"
        bgImage="/redesign/dashboard/dashboard-bg-02.png"
        bgPos="top"
        bgSize="cover"
        alignItems="center"
        pos="relative"
        pt={5}
        spacing={8}
        pb={40}
      >
        {/* <Box
          bg="nairagreen"
          color="white"
          px={{ base: 20, md: "5vw" }}
          py={{ base: 4, md: 4 }}
          borderRadius={32}
          pos="absolute"
          // height={{base: "3rem", md: "4rem"}}
          top={{ base: -10, md: -5 }}
          fontSize={{ base: "2rem", md: "1.5rem" }}
          fontFamily={"Inter"}
          onClick={() => {
            router.push("/agent_dashboard/cashback");
          }}
          fontWeight={{ base: "bold" }}
          style={{
            boxShadow:
              "0px 29.27407px 38.54074px 0px rgba(0, 0, 0, 0.07), 0px 49.25926px 70.86343px 0px rgba(0, 0, 0, 0.08)",
          }}
        >
          Play Game
        </Box> */}

        <Box
          bg="nairagreen"
          color="white"
          px={{ base: 15, md: 12 }}
          py={{ base: 4, md: 4 }}
          borderRadius={32}
          pos="absolute"
          top={{ base: -10, md: -5 }}
          fontFamily={"Inter"}
          fontSize={{ base: "2rem", md: "2rem" }}
          fontWeight={{ base: "bold" }}
          w={{ base: "80vw", md: "40vw", lg: "30vw" }}
          textAlign={"center"}
          onClick={() => {
            if (isLoading) {
              return;
            }
            const content = walletBalance?.payload?.content;
            if (content && content.length > 0) {
              const amount = content[0]?.amount;
              if (Number(amount) < 10) {
                setinsufficientModal(true);
              } else {
                router.push("/agent_dashboard/cashback");
              }
            } else {
              setinsufficientModal(true);
            }
          }}
          // onClick={() => {
          //   const content = walletBalance?.payload?.content;
          //   if (content && content.length > 0) {
          //     const amount = content[0]?.amount;
          //     if (Number(amount) < 10) {
          //       setinsufficientModal(true);
          //     } else {
          //       router.push("/agent_dashboard/cashback");
          //     }
          //   } else {
          //     setinsufficientModal(true);
          //   }
          // }}
          style={{
            boxShadow:
              "0px 29.27407px 38.54074px 0px rgba(0, 0, 0, 0.07), 0px 49.25926px 70.86343px 0px rgba(0, 0, 0, 0.08)",
          }}
          cursor={"pointer"}
          _hover={{ transform: "scale(1.05)" }}
        >
          PLAY GAME
        </Box>

        <Box
          mt={{
            base: "16!important",
            md: "3rem!important",
            lg: "4.5rem!important",
          }}
        >
          <PlayResponsibly />
        </Box>

        {/* <Box mt={10}>
          <PlayResponsibly />
        </Box> */}
        <HStack
          spacing={8}
          color="#012647"
          px={{ base: 5, md: 0 }}
          w={{ base: "100%", md: "26rem" }}
        >
          <Button
            w="50%"
            py={2}
            px={5}
            borderRadius={32}
            colorScheme="none"
            bg="#002047"
            color="white"
            onClick={() => {
              router.push("/agent_dashboard/request_history");
            }}
          >
            Game History
          </Button>
          <Button
            w="50%"
            py={2}
            px={5}
            borderRadius={32}
            colorScheme="none"
            bg="#002047"
            color="white"
            onClick={() => {
              router.push("/agent_dashboard/wallet");
            }}
          >
            My Wallet
          </Button>
        </HStack>

        {/* <Box
          color={"white"}
          mx={"auto"}
          bg="#002047"
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={"2rem"}
          py={"1.5rem"}
          fontWeight={"bold"}
          borderRadius={"100%"}
        >
          Check-In
          <Box bg="#F00">Only</Box>
        </Box> */}
        <HStack
          spacing={8}
          color="#012647"
          px={{ base: 5, md: 0 }}
          w={{ base: "100%", md: "26rem" }}
        >
          <Box mx={"auto"} w="50%">
            <Button
              w="100%"
              py={2}
              px={5}
              borderRadius={32}
              colorScheme="none"
              bg="#F00"
              color="white"
              // onClick={() => {
              //   router.push("/agent_dashboard/request_history");
              // }}
            >
              {/* Boom Code */}
              Cashout Keys
            </Button>
          </Box>
        </HStack>
        <HStack
          spacing={8}
          color="#012647"
          px={{ base: 5, md: 0 }}
          w={{ base: "100%", md: "26rem" }}
        >
          <Box
            mx={"auto"}
            display={"flex"}
            flexDir={"row"}
            w={{ base: "65%", md: "50%" }}
          >
            <Box
              color={"white"}
              mx={"auto"}
              bg="#002047"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={"3"}
              w={"48px"}
              h={"48px"}
              fontWeight={"bold"}
              borderRadius={"100%"}
            >
              {boom_code?.[0]}
            </Box>
            <Box
              color={"white"}
              mx={"auto"}
              bg="#002047"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={"3"}
              w={"48px"}
              h={"48px"}
              fontWeight={"bold"}
              borderRadius={"100%"}
            >
              {boom_code?.[1]}
            </Box>
            <Box
              color={"white"}
              mx={"auto"}
              bg="#002047"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={"3"}
              w={"48px"}
              h={"48px"}
              fontWeight={"bold"}
              borderRadius={"100%"}
            >
              {boom_code?.[2]}
            </Box>
            <Box
              color={"white"}
              mx={"auto"}
              bg="#002047"
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={"3"}
              w={"48px"}
              h={"48px"}
              fontWeight={"bold"}
              borderRadius={"100%"}
            >
              {boom_code?.[3]}
            </Box>
          </Box>
        </HStack>
        <Box pos="relative">
          <Image
            src="/redesign/dashboard/jackpot-mockup.png"
            h="15rem"
            alt=""
          />
          <Box
            pos="absolute"
            bottom="-6rem"
            m="auto"
            left={0}
            right={0}
            // w="55%"
            w={{ base: "70%", md: "55%" }}
          >
            <Image src="/redesign/dashboard/jackpot-mockup-02.png" alt="" />
            <VStack
              pos="absolute"
              color="#012647"
              top={8}
              m="auto"
              left={0}
              right={0}
              spacing={0}
            >
              <Heading color={"nairablue"} fontSize="1.7rem" fontWeight={900}>
                {"Today's"}
              </Heading>
              <Heading
                color={"nairablue"}
                fontSize="2rem"
                fontFamily={"Inter"}
                fontWeight={900}
              >
                JACKPOT
              </Heading>
            </VStack>
            <Box
              pos="absolute"
              bottom={{ base: -5, md: -25, lg: 0 }}
              w={"100%"}
            >
              <Text
                textAlign="center"
                bg="nairagreen"
                color="white"
                px={8}
                py={3}
                borderRadius={32}
                fontSize={{ base: 27, lg: 27.5 }}
                fontWeight={"bold"}
                fontFamily={"inter"}
                className="jackpotamount"
                style={{
                  boxShadow:
                    "0px 29.27407px 38.54074px 0px rgba(0, 0, 0, 0.07), 0px 49.25926px 70.86343px 0px rgba(0, 0, 0, 0.08)",
                }}
              >
                ₦{formatNumberWithCommas(gameSettings?.jackpot)}
              </Text>
            </Box>
          </Box>
          {/* <Box
            pos="absolute"
            bottom="-6rem"
            m="auto"
            left={0}
            right={0}
            w={{ base: "70%", md: "55%" }}
          >
            <Image src="/redesign/dashboard/jackpot-mockup-02.png" alt="" />
            <VStack
              pos="absolute"
              color="#012647"
              top={8}
              m="auto"
              left={0}
              right={0}
              spacing={0}
            >
              <Heading fontSize="1.5rem" fontWeight={600}>
                {"Today's"}
              </Heading>
              <Heading fontSize="1.5rem" fontWeight={700}>
                JACKPOT
              </Heading>
            </VStack>
            <Box pos="absolute" bottom={0} w="100%">
              <Text
                textAlign="center"
                bg="nairagreen"
                color="white"
                px={12}
                py={3}
                borderRadius={32}
                fontSize={22}
                fontWeight={"bold"}
              >
                ₦30,000,000
              </Text>
            </Box>
          </Box> */}
        </Box>
      </Stack>
    );
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Stack
      bgImage="/redesign/dashboard/dashboard-bg-01.png"
      bgPos="center"
      bgSize="cover"
      color="white"
      minH="100vh"
      alignItems="center"
      fontFamily="Inter"
      spacing={20}
    >
      <TopComponent />
      <CentralComponent />
      <InfoButtonModal />
      <Modal
        isOpen={insufficientModal}
        onClose={() => {
          setinsufficientModal(false);
        }}
      >
        <ModalOverlay />
        <ModalContent py={"1rem"}>
          <ModalHeader>Oops!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Sorry you have insufficient funds to rollover or check-in your
            Alert. Kindly fund your wallet and try again.
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isCentered
        isOpen={openLogout}
        onClose={() => {
          setopenLogout(false);
        }}
      >
        <ModalOverlay />
        <ModalContent py="1rem">
          <ModalCloseButton />
          <ModalBody
            textAlign={"center"}
            fontSize={"1.5rem"}
            fontFamily="poppins"
          >
            Are you sure <br /> you want to log out?
          </ModalBody>
          <ModalFooter display={"flex"} justifyContent="center">
            <Button w="5rem" colorScheme="red" mr={3} onClick={onClose}>
              No
            </Button>
            <Button
              onClick={() => {
                handleLogout();
              }}
              w="5rem"
              colorScheme="green"
              mr={3}
            >
              {isLoading ? <Spinner /> : "Yes"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default AgentDashboard;
