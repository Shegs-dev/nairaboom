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
  const [gameSettings, setgameSettings] = useState();
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

  //check if wallet has been funded
  useEffect(() => {
    if (user?.details?.first_wallet_pay === 0) {
      toast({
        isClosable: true,
        duration: 10000,
        status: "info",
        title:
          "Get ₦35.000 in your Rollover Wallet after your first wallet funding.",
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
        localStorage.setItem("boomCode", res.data?.payload?.code);
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
    fetchWishClock();
    getAppSettings();
  }, [bearerToken, toast, user?.token]);
  // function formatNumberWithCommas(number) {
  //   return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }
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

  const TopComponent = () => {
    const menuRef = useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();

    //

  const sendIAgreeForMonetization = async () => {
    const monetizationConfig = {
      method: "post",
      url: `${BASE_URL}/api/monetization_agreement`,
      headers: {
        "X-APP-KEY": NAIRABOOM_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    try {
      const res = await axios(monetizationConfig);
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
      
    } catch (e) {
      // toast({
      //   status: "error",
      //   isClosable: true,
      //   duration: "5000",
      //   title: e?.message ?? "Please check your connection and try again",
      //   position: "top",
      // });
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
    const url = BASE_URL + "/api/monetization_eligibility";

    const monetizationConfig = {
      method: "get",
      url: url,
      headers: {
        "X-APP-KEY": NAIRABOOM_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    try {
      const res = await axios(monetizationConfig);
      if (res?.data?.payload?.monetization_status === "0" || res?.data?.payload?.monetization_status === "2") {
        setAllowMonetize(false);
      } else if (res?.data?.payload?.monetization_status === "1") {
        setAllowMonetize(true);
        setAgreeMonetize(true);
      } else if (res?.data?.payload?.monetization_status === "3") {
        setAllowMonetize(true);
        setAgreeMonetize(false);
      } 
    } catch (e) {
      // toast({
      //   status: "error",
      //   isClosable: true,
      //   duration: "5000",
      //   title: e?.message ?? "Please check your connection and try again",
      //   position: "top",
      // });
    }
  };

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
                    // { title: "Agent Code", link: "customer_dashboard/agentcode", icon: <TbUsers/> },
                    {
                      title: "Refer & Monetize",
                      link: "customer_dashboard/referral_link",
                      icon: <MdFileCopy />,
                    },
                    // { title: "Redeem Winnings", link: "customer_dashboard/redeem_winnings", icon: <BiShare/> },
                    // { title: "My Bonus", link: "customer_dashboard/request_history", icon: <BsWallet /> },

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
          {/* <Box
            onClick={() => {
              setMonetizeModal(true);
            }}
            height={"3.25rem"}
            w={{ base: "2.0rem", lg: "2.5rem" }}
            // mt={{ base: "0.85rem", lg: "1px" }}
            className="eightAtplaygame"
            alignSelf={{ base: "flex-start", md: "center" }}
          >
            <ImInfo size={{ base: "1.5rem", lg: "2rem" }} />
          </Box> */}
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
                2. Have a minimum of N 200,000 in your Rollover Wallet
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
                    // mb={{ base: "2rem", md: "1rem" }}
                    cursor={"pointer"}
                    // isDisabled={!isChecked}
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
                {/* Your modal content goes here */}
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
                    // mb={{ base: "2rem", md: "1rem" }}
                    cursor={"pointer"}
                    // isDisabled={!isChecked}
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
                    // mb={{ base: "2rem", md: "1rem" }}
                    cursor={"pointer"}
                    // isDisabled={!isChecked}
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
              // justifyContent="center"
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
                    // <Spinner />
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
                    // <Bars  stroke="#00A85A" />
                    // <AudioFrequencyIndicator/>
                    // <Loader2 />
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
                  // router.push("/agent_dashboard/request_history");
                  router.push("/customer_dashboard/fund_account");
                }}
                cursor={"pointer"}
                _hover={{ transform: "scale(1.05)" }}
              >
                Fund
              </Button>
            </HStack>
          </GridItem>
          {/* <GridItem colSpan={1} display={{ base: "none", md: "block" }}>
            <Box
              bg="nairagreen"
              color="white"
              textAlign="center"
              py={2}
              borderRadius={32}
              cursor="pointer"
              transition={"all ease-in-out .4s"}
              onClick={() => {
                router.push("/customer_dashboard/fund_account");
              }}
            >
              Fund
            </Box>
          </GridItem> */}
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
              // justifyContent="center"
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
                  Rollover Wallet
                </Text>
                <Text fontWeight={{ base: "bold" }} color={"#002047"}>
                  {isLoading ? (
                    // <Spinner />
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
              {/* <Button
                py={2}
                h={"2rem"}
                px={4}
                borderRadius={32}
                colorScheme="none"
                bg="#FF0000"
                color="white"
                flexDir={"column"}
                onClick={() => {
                  // router.push("/agent_dashboard/request_history");
                  router.push("/customer_dashboard/cashout");
                }}
              >
                Cashout
              </Button> */}

              <Button
                py={2}
                h={"2rem"}
                // px={8}
                ml={"auto"}
                // borderRadius={32}
                colorScheme="none"
                // bg="nairagreen"
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
                  {/* <BsWallet size={20} color="#002047" /> */}
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
      // if (RegformData.email === "") {
      //   delete RegformData.email;
      // }
      setfastFinger(e.target.value.trim());
      // updateData({
      //   ...RegformData,
      //   [e.target.name]: e.target.value.trim(),
      // });
    };

    const handleFastFinger = async () => {
      const fatestFingerConfig = {
        method: "post",
        url: `${BASE_URL}/api/fastest_finger_play`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
        data: {
          code_word: fastFinger,
        },
      };

      try {
        const Res = await axios(fatestFingerConfig);
        toast({
          status: "success",
          isClosable: true,
          duration: "5000",
          title: Res.data.message,
          position: "top",
        });
      } catch (e) {
        // toast({
        //   status: "error",
        //   isClosable: true,
        //   duration: "5000",
        //   title: e?.message ?? "Please check your connection and try again",
        //   position: "top",
        // });
      } finally {
        setfastFinger("");
        fetchBalance2();
      }
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

        {/* <HStack
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
              router.push("/customer_dashboard/request_history");
            }}
          >
            My Game History
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
              router.push("/how-to-play");
            }}
          >
            How to Play
          </Button>
        </HStack> */}
        {/* check-in option here */}
        {/* <Box>
          <HStack
            spacing={8}
            color="#012647"
            px={{ base: 5, md: 0 }}
            w={{ base: "80vw", md: "30rem" }}
          >
            <Box mx={"auto"} w={{ base: "70%", lg: "50%" }}>
              <Button
                w="100%"
                py={2}
                h={{ base: "5rem", md: '"4rem"' }}
                px={5}
                borderRadius={32}
                colorScheme="none"
                bg="nairablue"
                color="white"
                flexDir={"column"}
                // onClick={() => {
                //   router.push("/agent_dashboard/request_history");
                // }}
              >
                <Text
                  textAlign="center"
                  color="white"
                  px={12}
                  pt={2}
                  pb={0.5}
                  borderRadius={32}
                  fontSize={22}
                  fontWeight={"bold"}
                >
                  Check In
                </Text>
                <Text
                  bg={"#ff0000"}
                  px={2}
                  py={0.5}
                  color={"white"}
                  borderRadius={10}
                >
                  Only
                </Text>
              </Button>
            </Box>
          </HStack>
        </Box> */}

        <Box
          display={{ base: "block", lg: "flex" }}
          w={{ base: "100%", md: "100%", lg: "70%" }}
          flexDir={{ base: "col", md: "col", lg: "row" }}
        >
          {/* <HStack

            spacing={0}
            color="#012647"
            flexDir={"column"}
            px={{ base: 5, md: 0 }}
            width="fit-content"
            marginX={{ base: "auto" }}
            alignItems="center"
            className="crossovertab"
          >
            <Text
              bg={"#002047"}
              w={"100%"}
              color={"white"}
              fontWeight={"bold"}
              border={"1px"}
              px="2rem"
              borderRadius={"full"}
              py={"3"}
              fontSize={"1.25rem"}
              // my={"6"}
              mb={"6"}
            >
              Crossover {formatNumberWithCommas(gameSettings?.crossover)}%
            </Text>
          </HStack> */}
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
                {/* 30,000,000 */}
              </Text>
            </Box>
          </Box>
          {/* <Box h={10}/> */}
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
      // router.push("/auth?p=login");
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
            How To Build Your Rollover Wallet
          </ModalHeader>
          <div style={{ marginHorizontal: "auto" }}>
            <Text
              fontWeight={700}
              fontSize={{ base: "1.0em", md: "1.25rem" }}
              color="nairablue"
              textAlign={"center"}
            ></Text>
          </div>
          {/* <Box display={"flex"} justifyItems={'center'} alignItems="center" >

          </Box> */}
          <ModalCloseButton />
          <ModalBody>
            {" "}
            <Text
              fontWeight={400}
              fontSize={{ base: "0.75em", md: "1.0rem" }}
              color="nairablue"
              textAlign={"center"}
            >
              There are many ways to build your Rollover Wallet to Cashout
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
