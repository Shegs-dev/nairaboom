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
  Spinner,
  Stack,
  StackDivider,
  Text,
  VStack,
  useDisclosure,
  useToast,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  FormControl,
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
import { RiMenu2Fill, RiProfileFill } from "react-icons/ri";
import {
  BsBell,
  BsCash,
  BsHouse,
  BsHouseFill,
  BsPerson,
  BsFillInfoCircleFill,
  BsShareFill,
  BsWallet,
} from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { HiHome, HiOutlineCash } from "react-icons/hi";
import { MdContentPaste, MdFileCopy, MdHelpCenter } from "react-icons/md";
import { BiShare, BiSolidCopy } from "react-icons/bi";
import { AiOutlineGift } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
import PlayResponsibly from "../general/PlayResponsibly";
import { useRouter } from "next/router";
import useUser from "../../lib/hooks/useUser";
import { AUTH_API_ROUTES } from "../../utils/routes";
import {
  getAuthenticatedUser,
  removeTokenFromLocalStorage,
  removeTokenFromLocalStorage2,
} from "../../lib/hooks/getAuthUser";
import axios from "axios";
import { formatAmount } from "../../src/utils";
import { TbUsers } from "react-icons/tb";
import { SettingsIcon } from "@chakra-ui/icons";
import AudioFrequencyIndicator from "../general/loader";
import { Audio, Bars } from "react-loader-spinner";

import LoadingIcons, { SpinningCircles, ThreeDots } from "react-loading-icons";
import Loader2 from "../general/loader2";
import InfoButtonModal from "./btnMode";
import { ImInfo } from "react-icons/im";
import Link from "next/link";

import {
  sellEligibility,
  sellAcceptance,
  getLatestCashbackTime,
  getBonusWallet,
  getWalletBalance,
  getRequestHistory,
  getWheelTracker,
  getBoomCode,
  getAppSettings,
  monetizationAgreement,
  getMonetizationEligibility,
  playFastestFinger,
  getThreeSureCashOutStatus
} from "../../src/apis/func";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;
const UserDashboard = () => {
  const toast = useToast();
  const [data, setData] = useState("");
  const [wheelsettings, setwheelsettings] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [walletBal_avaialable, setwalletBal_avaialable] = useState(false);
  const router = useRouter();
  const [insufficientModal, setinsufficientModal] = useState(false);
  const [monetizeModal, setMonetizeModal] = useState(false);
  const [agreeMonetizeModal, setAgreeMonetizeModal] = useState(false);
  const [agreedMonetizeModal, setAgreedMonetizeModal] = useState(false);
  const [allowMonetize, setAllowMonetize] = useState(false);
  const [agreeMonetize, setAgreeMonetize] = useState(false);
  const { user, error } = useUser();
  const bearerToken = user?.token;
  const [boomTimes, setBoomTimes] = useState();
  const [playModal, setplayModal] = useState(false);
  const [boom_code, setboom_code] = useState(null);

  const [noSell, setNoSell] = useState(false);
  const [sell, setSell] = useState(false);
  const [sellPayload, setSellPayload] = useState(null);
  const [cashOut1, setCashOut1] = useState(0);
  const [cashOut2, setCashOut2] = useState(1);
  const [cashOut3, setCashOut3] = useState(2);

  function parseJwt(token) {
    if (!bearerToken) return;
    var base64Url = token?.split(".")[1];
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

  //modal
  const someFunc = () => {
    setiisOpen(false);
  };

  const [iisOpen, setiisOpen] = useState(false);
  const [bonusBalance, setBonusBalance] = useState();
  const [walletBalance, setWalletBalance] = useState();
  const [gameSettings, setgameSettings] = useState();

  const boom = async () => {
    const res = await getLatestCashbackTime(bearerToken);
    if (res.status && (res.status === 200 || res.status === 201)) {
      setBoomTimes(res?.data.payload);
    } 
  };

  const fetchBalance2 = async () => {
    setIsLoading(true);
    const response = await getWalletBalance(bearerToken);
    const response2 = await getBonusWallet(bearerToken);
    if (response.status && (response.status === 200 || response.status === 201)) {
      setWalletBalance(response?.data);
    } 
    if (response2.status && (response2.status === 200 || response2.status === 201)) {
      setBonusBalance(response2?.data);
    }
    
    setIsLoading(false);
    setwalletBal_avaialable(true);
  };

  //check if wallet has been funded
  useEffect(() => {
    if (user?.details?.first_wallet_pay === 0) {
      toast({
        isClosable: true,
        duration: 10000,
        status: "info",
        title:
          "Make Your First Deposit and Get ₦35.000 Boom Coins to Start Cashing Out!",
        position: "top",
      });
    }
  }, [user]);
  useEffect(() => {
    if (!bearerToken) return;

    const redirectIfnotAuthenticated = async () => {
      const isUserAuthenticated = await getAuthenticatedUser();
      if (
        isUserAuthenticated?.authenticated === false ||
        isUserAuthenticated?.user?.details?.user_type === "agent"
      ) {
        router.push("/auth?p=login");
      }
    };
    const destru = parseJwt(bearerToken);
    redirectIfnotAuthenticated();
    boom();
    fetchBalance2();
  }, [bearerToken, router]);

  function convertStringToArray(inputString) {
    // Split the input string by "::" and convert substrings to integers
    const array = inputString?.split("::").map(Number);
    return array;
  }

  useEffect(() => {
    if (!bearerToken) return;

    fetchRequestHistory();
    fetchWheelTracker();
    fetchWishClock();
    fetchAppSettings();
    checkThreeSureCashOutStatus();
  }, [bearerToken, toast, user?.token]);


  const fetchRequestHistory = async () => {
    const res = await getRequestHistory(bearerToken);
    if (res.status && (res.status === 200 || res.status === 201)) {
      setData(res?.data);
    } 
  };

  const fetchWheelTracker = async () => {
    const res = await getWheelTracker(bearerToken);
    if (res.status && (res.status === 200 || res.status === 201)) {
      setwheelsettings(res?.data);
    } 
  };

  const fetchWishClock = async () => {
    const res = await getBoomCode(bearerToken);
    if (res.status && (res.status === 200 || res.status === 201)) {
      const codes = convertStringToArray(res.data?.payload?.code);
      setboom_code(codes);
      localStorage.setItem("boomCode", res.data?.payload?.code);
    } 
  };

  const fetchAppSettings = async () => {
    const res = await getAppSettings(bearerToken);
    if (res.status && (res.status === 200 || res.status === 201)) {
      setgameSettings(res?.data.payload);
    } 
  };

  function formatNumberWithCommas(number) {
    const formattedNumber = number
      ?.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedNumber?.replace(/\.00$/, ""); // Remove .00 if present at the end
  }

  const isCustomer = router.pathname.includes("customer_dashboard");
  const modalRedirect = () => {
    setiisOpen(true);
  };

  const sendIAgreeForMonetization = async () => {
    const res = await monetizationAgreement(bearerToken);
    if (res?.data?.status) {
      toast({
        status: "success",
        isClosable: true,
        duration: "5000",
        //title: res.data.message,
        title: "Congratulations! Your Monetization has commenced.",
        position: "top",
      });
      setAgreeMonetize(true);
    } else {
      toast({
        status: "success",
        isClosable: true,
        duration: "5000",
        title: res.data.message,
        position: "top",
      });
      setAgreeMonetize(false);
    }
    
    setAgreeMonetizeModal(false);
  }

  //check if monetize is active
  useEffect(() => {
    localStorage.setItem("referral_code", user?.details?.referral_code);
    if (user?.details?.monetization_status === 0 || user?.details?.monetization_status === 2) {
      setAllowMonetize(false);
    } else if (user?.details?.monetization_status === 1) {
      setAllowMonetize(true);
      setAgreeMonetize(true);
    } else if (user?.details?.monetization_status === 3) {
      setAllowMonetize(true);
      setAgreeMonetize(false);
    } 

    if(bearerToken) {
      checkMonetizationEligibility();
    }
  }, []);

  const allowedModalRedirect = () => {
    if (agreeMonetize) {
      setAgreedMonetizeModal(true);
    } else if (!agreeMonetize) {
      setAgreeMonetizeModal(true);
    }
  };

  const checkMonetizationEligibility = async () => {
    const res = await getMonetizationEligibility(bearerToken);
    if (res?.data?.payload?.monetization_status === "0" || res?.data?.payload?.monetization_status === "2") {
      setAllowMonetize(false);
    } else if (res?.data?.payload?.monetization_status === "1") {
      setAllowMonetize(true);
      setAgreeMonetize(true);
    } else if (res?.data?.payload?.monetization_status === "3") {
      setAllowMonetize(true);
      setAgreeMonetize(false);
    }
  };

  const checkThreeSureCashOutStatus = async () => {
    const res = await getThreeSureCashOutStatus(bearerToken);

    if (res?.data?.payload?.games) {
      let x = 1;
      while (x <= res?.data?.payload?.games.length) {
        let val = 2;
        if (res?.data?.payload?.games[x-1].green_balls > 0) {
          val = 1;
        }

        if (x === 1) {
          setCashOut1(val);
        } else if (x === 2) {
          setCashOut2(val);
        } else if (x === 3) {
          setCashOut3(val);
        }

        x++;
      }
    }
  };

  const fetchSellEligibility = async () => {
    setIsLoading(true);
    const res = await sellEligibility(bearerToken);
    setIsLoading(false);
    if (res.status && (res.status === 200 || res.status === 201)) {
      if (res?.data?.payload?.status === "ineligible") {
        setSell(false);
        setNoSell(true);
      } else {
        setSellPayload(res?.data?.payload);
        setNoSell(false);
        setSell(true);
      }
    } 
  };

  const completeSellAcceptance = async () => {
    setIsLoading(true);
    const res = await sellAcceptance(bearerToken);
    setIsLoading(false);
    if (res?.data?.status) {
      toast({
        status: "success",
        isClosable: true,
        duration: "5000",
        title: res?.data?.message,
        position: "top",
      });
    } else {
      toast({
        status: "success",
        isClosable: true,
        duration: "5000",
        title: res.data.message,
        position: "top",
      });
    }
  };

  const TopComponent = () => {
    const menuRef = useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();

    //

    return (
      <Stack
        w="100%"
        maxW="60rem"
        p={{ base: 5, md: 10 }}
        alignItems="center"
        spacing={8}
      >
        <Heading fontSize="1.5rem" fontWeight={600}>
          User Dashboard
        </Heading>
        <HStack w="100%" spacing={5}>
          <Button
            variant="unstyled"
            ref={menuRef}
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
                      link: "customer_dashboard",
                      icon: <HiHome />,
                    },
                    {
                      title: "Play Game",
                      link: "customer_dashboard/cashback",
                      icon: <HiOutlineCash />,
                    },
                    {
                      title: "My Wallet",
                      link: "customer_dashboard/wallet",
                      icon: <BsWallet />,
                    },
                    {
                      title: "Game history",
                      link: "customer_dashboard/request_history",
                      icon: <MdContentPaste />,
                    },
                    {
                      title: "Refer & Monetize",
                      link: "customer_dashboard/referral_link",
                      icon: <MdFileCopy />,
                    },
                    {
                      title: "Share & Earn",
                      link: "customer_dashboard/share_ads",
                      icon: <BsShareFill />,
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
                  <Spacer />
                  {[
                    {
                      title: "Need Help?",
                      link: "customer_dashboard/disputes",
                      icon: <MdHelpCenter />,
                    },
                    {
                      title: "Edit Profile",
                      link: "customer_dashboard/editprofile",
                      icon: <RiProfileFill />,
                    },
                    {
                      title: "Change Password",
                      link: "customer_dashboard/change-password",
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
                    display="flex"
                    alignItems="center"
                    onClick={() => {
                      setopenLogout(true);
                    }}
                  >
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
          <Spacer />
          <Button
            py={2}
            h={"2rem"}
            px={8}
            borderRadius={32}
            colorScheme="none"
            bg="#FFBF00"
            color="white"
            flexDir={"column"}
            isDisabled={!allowMonetize}
            _hover={{ transform: "scale(1.05)" }}
            onClick={allowedModalRedirect}
          >
            Monetize
          </Button>
          <Modal
            isOpen={monetizeModal}
            onClose={() => {
              setMonetizeModal(false);
            }}
            size="lg"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader><Center><font size="14" color="brown">MONETIZE</font></Center></ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* Your modal content goes here */}
                Hey Boomster, you can monetize your Nairaboom account and earn
                regular passive income when you meet the following criteria:
                <br />
                <br />
                1. Use your referral{" "}
                <Link href="/customer_dashboard/editprofile">link </Link>
                to invite 35 people to <b>Sign Up</b> and <b>Play Games</b> on Nairaboom
                <br />
                2. Have a minimum of 200,000 in your Boom Coins Wallet
                <br />
                <br />
                Benefits of monetizing your Nairaboom account:
                <br />
                <br />
                1. Create your POD and earn revenue daily from rollover gameplays and winnings of people in your POD.
                <br />
                2. Start your journey to becoming a Nairaboom partner.
                <br />
                <br />
                <Center>
                  <Button
                    w="100%"
                    h="3.25rem"
                    colorScheme="none"
                    bg="brown"
                    color="white"
                    borderRadius={50}
                    pos="relative"
                    border={"none"}
                    type={"button"}
                    fontWeight={700}
                    fontSize={"2xl"}
                    cursor={"pointer"}
                    isDisabled={false}
                    _hover={{ transform: "scale(1.05)" }}
                    onClick={() => {
                      router.push("/customer_dashboard/referral_link");
                    }}
                  >
                    OK
                  </Button>
                </Center>
                <br /><br />
              </ModalBody>
            </ModalContent>
          </Modal>
          <Modal
            isOpen={agreeMonetizeModal}
            onClose={() => {
              setAgreeMonetizeModal(false);
            }}
            size="lg"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader><Center><font size="14" color="brown">MONETIZE</font></Center></ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Congratulations you have qualified for the Nairaboom Monetization Program.
                <br />
                <br />
                To continue, confirm that you agree to the T&Cs of the program 
                <br />
                <Center>
                  <Button
                    w="100%"
                    h="3.25rem"
                    colorScheme="none"
                    bg="brown"
                    color="white"
                    borderRadius={50}
                    pos="relative"
                    border={"none"}
                    type={"button"}
                    fontWeight={700}
                    fontSize={"2xl"}
                    cursor={"pointer"}
                    isDisabled={false}
                    _hover={{ transform: "scale(1.05)" }}
                    onClick={sendIAgreeForMonetization}
                  >
                    I Agree
                  </Button>
                </Center>
                <br /><br />
              </ModalBody>
            </ModalContent>
          </Modal>
          <Modal
            isOpen={agreedMonetizeModal}
            onClose={() => {
              setAgreedMonetizeModal(false);
            }}
            size="lg"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader><Center><font size="14" color="brown">MONETIZE</font></Center></ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Center>Your monetization status is active!</Center>
                <br />
                <br />
                <Center>Did you know you can refer over 35 people? Keep referring more friends to expand your POD 
                and boost your earnings!</Center>
                <br />
                <Center>
                  <Button
                    w="40%"
                    h="3.25rem"
                    colorScheme="none"
                    bg="brown"
                    color="white"
                    borderRadius={50}
                    pos="relative"
                    border={"none"}
                    type={"button"}
                    fontWeight={700}
                    fontSize={"2xl"}
                    cursor={"pointer"}
                    isDisabled={false}
                    _hover={{ transform: "scale(1.05)" }}
                    onClick={() => {
                      router.push("/customer_dashboard/referral_link");
                    }}
                  >
                    OK
                  </Button>
                </Center>
                <br /><br />
              </ModalBody>
            </ModalContent>
          </Modal>
          <Center
            onClick={() => {
              setMonetizeModal(true);
            }}
            p={2}
            bg="white"
            borderRadius="100%"
          >
            <BsFillInfoCircleFill color="gray" size={20} />
          </Center>
          <Center
            onClick={() => {
              router.push("/customer_dashboard/editprofile");
            }}
            p={2}
            bg="white"
            borderRadius="100%"
          >
            <BsPerson color="gray" size={20} />
          </Center>
        </HStack>
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
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
          gap={10}
          w="100%"
          alignItems="center"
        >
          <GridItem w="100%" colSpan={2} bg="white" borderRadius={32}>
            <HStack
              color="#012647"
              py={2}
              spacing={{ base: 2, md: 5 }}
              px={4}
              flexDir={"row"}
            >
              <Box p={2} bg="gray.300" mr={4} borderRadius="100%">
                <BsWallet size={20} />
              </Box>

              <VStack alignItems={{ base: "flex-start", md: "center" }} ml={3}>
                <Text
                  color={"#002047"}
                  fontWeight={{ base: "bold" }}
                  noWrap
                  className="no-wrap"
                >
                  Main Wallet
                </Text>

                <Text fontWeight={{ base: "bold" }} color={"#002047"}>
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
                    <>
                      &#8358;{" "}
                      {walletBalance
                        ? !walletBalance ||
                          walletBalance?.payload?.totalLength === 0 ||
                          walletBalance === null ||
                          walletBalance === undefined
                          ? 0
                          : `${formatAmount(
                              walletBalance.payload.content[0].amount
                            )}`
                        : 0}
                    </>
                  )}
                </Text>
              </VStack>
              <Spacer display={{ md: "none" }} />
              <Button
                style={{ marginLeft: "auto" }}
                py={2}
                h={"2rem"}
                px={8}
                borderRadius={32}
                colorScheme="none"
                bg="nairagreen"
                color="white"
                flexDir={"column"}
                onClick={() => {
                  router.push("/customer_dashboard/fund_account");
                }}
                cursor={"pointer"}
                _hover={{ transform: "scale(1.05)" }}
              >
                Fund
              </Button>
            </HStack>
          </GridItem>
          <GridItem w="100%" colSpan={2} bg="white" borderRadius={32}>
            <HStack
              w={{ base: "100%", lg: "100%" }}
              mx="auto"
              bg="white"
              color="#012647"
              py={2}
              px="6"
              borderRadius={32}
              flexDir={"row"}
              display={"flex"}
              spacing={5}
              onClick={() => modalRedirect()}
            >
              <Box p={2} bg="gray.300" borderRadius="100%">
                <AiOutlineGift size={24} />
              </Box>
              <VStack alignItems={"flex-start"}>
                <Text
                  color={"#002047"}
                  textAlign={"left"}
                  fontWeight={{ base: "bold" }}
                >
                  Boom Coins Wallet
                </Text>
                <Text fontWeight={{ base: "bold" }} color={"#002047"}>
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
                    <>
                      {bonusBalance
                        ? !bonusBalance ||
                          bonusBalance?.payload?.totalLength === 0 ||
                          bonusBalance === null ||
                          bonusBalance === undefined
                          ? `0`
                          : `${formatAmount(
                              bonusBalance.payload.content[0].amount
                            )}`
                        : `0`}
                    </>
                  )}
                </Text>
              </VStack>
              <Button
                style={{ marginLeft: "auto" }}
                py={2}
                h={"2rem"}
                px={8}
                borderRadius={32}
                colorScheme="none"
                bg="#FFBF00"
                color="white"
                flexDir={"column"}
                onClick={fetchSellEligibility}
                cursor={"pointer"}
                _hover={{ transform: "scale(1.05)" }}
              >
                Sell
              </Button>
              <Modal
                isOpen={noSell}
                onClose={() => {
                  setNoSell(false);
                }}
                size="lg"
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader><Center><font size="5" color="brown">Boom Coins Wallet Sell Offer</font></Center></ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Center>
                      <b>No Sell Offer Available!</b>
                    </Center>
                    <br />
                    <br />
                    To be eligible to sell, maintain a minimum balance of 500,000 Boom Coins in your wallet and stay active. 
                    Keep playing Rollover Games to accumulate your alerts and grow your coins!
                    <br /><br />
                  </ModalBody>
                </ModalContent>
              </Modal>
              <Modal
                isOpen={sell}
                onClose={() => {
                  setSell(false);
                }}
                size="lg"
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader><Center><font size="5" color="brown">Boom Coins Wallet Sell Offer</font></Center></ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    You've Received an Offer to Sell Your Boom Coins!
                    <br />
                    <br />
                    Sell Percentage: {sellPayload?.sell_percentage}
                    <br />
                    Amount: ₦{sellPayload?.sell_amount_display}
                    <p>
                      If you accept this offer, you agree to sell your Boom Coins at the specified rate and will receive 
                      the cash equivalent in your Main Wallet. Note: 5% Agency Fee applies.
                    </p>
                  </ModalBody>
                  <Box
                    display={"flex"}
                    justifyContent="space-between"
                    alignItems={"center"}
                  >
                    <Button
                      w="40%"
                      h="3.25rem"
                      colorScheme="none"
                      bg="green"
                      color="white"
                      borderRadius={50}
                      pos="relative"
                      border={"none"}
                      type={"button"}
                      fontWeight={700}
                      fontSize={"2xl"}
                      cursor={"pointer"}
                      _hover={{ transform: "scale(1.05)" }}
                      onClick={completeSellAcceptance}
                    >
                      ACCEPT
                    </Button>
                    <Button
                      w="40%"
                      h="3.25rem"
                      colorScheme="none"
                      bg="red"
                      color="white"
                      borderRadius={50}
                      pos="relative"
                      border={"none"}
                      type={"button"}
                      fontWeight={700}
                      fontSize={"2xl"}
                      cursor={"pointer"}
                      _hover={{ transform: "scale(1.05)" }}
                      onClick={() => {
                        setSell(false);
                      }}
                    >
                      DECLINE
                    </Button>
                  </Box>
                </ModalContent>
              </Modal>
              <Button
                py={2}
                h={"2rem"}
                ml={"auto"}
                colorScheme="none"
                color="white"
                flexDir={"column"}
                onClick={() => {
                  // router.push("/agent_dashboard/request_history");
                  // router.push("/customer_dashboard/fund_account");
                }}
                cursor={"pointer"}
                _hover={{ transform: "scale(1.05)" }}
                style={{ marginLeft: "auto" }}
              >
                <Box>
                  <ImInfo size={20} color="#002047" />
                </Box>
              </Button>
            </HStack>
          </GridItem>
        </Grid>
      </Stack>
    );
  };

  const CentralComponent = () => {
    const [fastFinger, setfastFinger] = useState("");
    const handleRegChange = (e) => {
      setfastFinger(e.target.value.trim());
    };

    const handleFastFinger = async () => {
      const Res = await playFastestFinger(bearerToken, fastFinger);
      if (Res?.data?.message) {
        toast({
          status: "success",
          isClosable: true,
          duration: "5000",
          title: Res.data.message,
          position: "top",
        });
      }

      setfastFinger("");
      fetchBalance2();
    };

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
                router.push("/customer_dashboard/cashback");
              }
            } else {
              setinsufficientModal(true);
            }
          }}
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

        <Box
          mt={{
            base: "16!important",
            md: "3rem!important",
            lg: "4.5rem!important",
          }}
          display={"flex"}
        >
          <FormControl display={"flex"} alignItems={"center"}>
            <Box bg="white" borderRadius={50}>
              <Input
                borderRadius={50}
                placeholder="Fastest Fingers"
                h="3.6rem"
                isRequired
                type={"text"}
                _placeholder={{ fontSize: "17.62px" }}
                focusBorderColor="nairagreen"
                name="fastfinger"
                color="nairagreen"
                onChange={(e) => {
                  setfastFinger(e.target.value.trim());
                }}
                value={`${fastFinger}`}
              />
            </Box>
            <Button
              style={{ marginLeft: "1rem" }}
              py={2}
              h={"2rem"}
              px={8}
              borderRadius={32}
              colorScheme="none"
              bg="nairagreen"
              color="white"
              flexDir={"column"}
              onClick={() => {
                handleFastFinger();
              }}
              cursor={"pointer"}
              _hover={{ transform: "scale(1.05)" }}
            >
              Go
            </Button>
          </FormControl>
        </Box>
        <Box
          display={{ base: "block", lg: "flex" }}
          w={{ base: "100%", md: "100%", lg: "70%" }}
          flexDir={{ base: "col", md: "col", lg: "row" }}
        >
          <Box
            display={"flex"}
            mt={{ base: "1rem", lg: "0" }}
            flexDir={"column"}
            marginX={{ base: "auto" }}
          >
            <HStack
              spacing={8}
              color="#012647"
              px={{ base: 5, md: 0 }}
              w={{ base: "100%", md: "30rem" }}
            >
              <Box mx={"auto"} w="fit-content">
                <Button
                  w="100%"
                  py={2}
                  px={5}
                  borderRadius={32}
                  colorScheme="none"
                  bg="#00ff00"
                  color="white"
                  fontWeight={"bold"}
                  fontSize={{ base: "1.75rem", md: "2rem" }}
                >
                  3 Sure Cashout!
                </Button>
              </Box>
            </HStack>
            <HStack
              spacing={8}
              color="#012647"
              mt={"6"}
              px={{ base: 5, md: 0 }}
              w={{ base: "100%", md: "30rem" }}
            >
              <Box
                mx={"auto"}
                display={"flex"}
                flexDir={"row"}
                w={{ base: "65%", lg: "50%" }}
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
                  {cashOut1 === 1 &&
                    <IoMdCheckmark size={25}
                      color="#0F9624" /> 
                  }
                  {cashOut1 === 2 &&
                    <FaXmark size={25}
                      color="#D80000" /> 
                  }
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
                  {cashOut2 === 1 &&
                    <IoMdCheckmark size={25}
                      color="#0F9624" /> 
                  }
                  {cashOut2 === 2 &&
                    <FaXmark size={25}
                      color="#D80000" /> 
                  }
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
                  {cashOut3 === 1 &&
                    <IoMdCheckmark size={25}
                      color="#0F9624" /> 
                  }
                  {cashOut3 === 2 &&
                    <FaXmark size={25}
                      color="#D80000" /> 
                  }
                </Box>
              </Box>
            </HStack>
          </Box>
        </Box>

        <Box
          display={{ base: "block", lg: "flex" }}
          w={{ base: "100%", md: "100%", lg: "70%" }}
          flexDir={{ base: "col", md: "col", lg: "row" }}
        >
          <Box
            display={"flex"}
            mt={{ base: "1rem", lg: "0" }}
            flexDir={"column"}
            marginX={{ base: "auto" }}
          >
            <HStack
              spacing={8}
              color="#012647"
              px={{ base: 5, md: 0 }}
              w={{ base: "100%", md: "30rem" }}
            >
              <Box mx={"auto"} w="fit-content">
                <Button
                  w="100%"
                  py={2}
                  px={5}
                  borderRadius={32}
                  colorScheme="none"
                  bg="#F00"
                  color="white"
                  fontWeight={"bold"}
                  fontSize={{ base: "1.75rem", md: "2rem" }}
                  // onClick={() => {
                  //   router.push("/agent_dashboard/request_history");
                  // }}
                >
                  {/* Boom Code */}
                  Cashout Keys {formatNumberWithCommas(gameSettings?.crossover)}
                  %
                </Button>
              </Box>
            </HStack>
            <HStack
              spacing={8}
              color="#012647"
              mt={"6"}
              px={{ base: 5, md: 0 }}
              w={{ base: "100%", md: "30rem" }}
            >
              <Box
                mx={"auto"}
                display={"flex"}
                flexDir={"row"}
                w={{ base: "65%", lg: "50%" }}
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
          </Box>
        </Box>

        <Box pos="relative" px={{ base: 2, md: 0 }}>
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
        </Box>
      </Stack>
    );
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen2, onOpen2, onClose2 } = useDisclosure();

  const [openLogout, setopenLogout] = useState(false);

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
            <Button onClick={handleLogout} w="5rem" colorScheme="green" mr={3}>
              {isLoading ? <Spinner /> : "Yes"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isCentered isOpen={iisOpen} onClose={someFunc}>
        <ModalOverlay />
        <ModalContent
          fontFamily={"poppins"}
          w={{ base: "90%", md: "45%" }}
          maxW={"95%"}
          p={{ base: "1rem", md: "3rem" }}
        >
          <ModalHeader textAlign={"center"} fontWeight={700} fontSize="1.5rem">
            How To Build Your Boom Coins Wallet
          </ModalHeader>
          <div style={{ marginHorizontal: "auto" }}>
            <Text
              fontWeight={700}
              fontSize={{ base: "1.0em", md: "1.25rem" }}
              color="nairablue"
              textAlign={"center"}
            ></Text>
          </div>
          <ModalCloseButton />
          <ModalBody>
            {" "}
            <Text
              fontWeight={400}
              fontSize={{ base: "0.75em", md: "1.0rem" }}
              color="nairablue"
              textAlign={"center"}
            >
              There are many ways to build your Boom Coins Wallet to Cashout
              Millions on Nairaboom. Click the button below to see how
            </Text>
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
                w={{ md: "8.6rem", base: "full" }}
                boxShadow={"inner"}
                bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
                onClick={() => {
                  router.push("/customer_dashboard/bonus_wallet");
                }}
              >
                Continue
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      <InfoButtonModal />
    </Stack>
  );
};

export default UserDashboard;
