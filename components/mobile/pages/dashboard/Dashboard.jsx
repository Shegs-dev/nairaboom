// import React from 'react'
import { IoMdInformationCircleOutline } from "react-icons/io";
import { HiSpeakerphone } from "react-icons/hi";
import {
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaXTwitter,
  FaYoutube,
  FaThreads
} from "react-icons/fa6";
import { LiaBellSolid } from "react-icons/lia";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useDisclosure,
  useToast,
  Spacer,
  Spinner,
  Stack,
  Text,
  VStack
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
  BsWallet
} from "react-icons/bs";
import { HiHome, HiOutlineCash } from "react-icons/hi";
import { MdContentPaste, MdFileCopy, MdHelpCenter } from "react-icons/md";
import { RiMenu3Fill } from "react-icons/ri";
import { BsXLg } from "react-icons/bs";
import { Bars } from "react-loader-spinner";
import { SettingsIcon } from "@chakra-ui/icons";
import {
  getAuthenticatedUser,
  removeTokenFromLocalStorage,
  removeTokenFromLocalStorage2
} from "../../../../lib/hooks/getAuthUser";
import { formatAmount } from "../../../../src/utils";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  sellEligibility,
  sellVisibility,
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
  getThreeSureCashOutStatus,
  getNotifications,
  getDailyWinners,
  sellDecline
} from "../../../../src/apis/func";
import { useRouter } from "next/router";
import useUser from "../../../../lib/hooks/useUser";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
// absolute inset-0

const Dashboard = () => {
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
  const [notAllowMonetizeModal, setNotAllowMonetizeModal] = useState(false);
  const [allowMonetize, setAllowMonetize] = useState(false);
  const [agreeMonetize, setAgreeMonetize] = useState(false);
  const { user, error } = useUser();
  const bearerToken = user?.token;
  const [boomTimes, setBoomTimes] = useState();
  const [playModal, setplayModal] = useState(false);
  const [boom_code, setboom_code] = useState(null);

  const [noSell, setNoSell] = useState(false);
  const [sell, setSell] = useState(false);
  const [noBuy, setNoBuy] = useState(false);
  const [sellPayload, setSellPayload] = useState(null);
  const [sellButton, setSellButton] = useState(0);
  const [cashOut1, setCashOut1] = useState(0);
  const [cashOut2, setCashOut2] = useState(0);
  const [cashOut3, setCashOut3] = useState(0);

  const [notifications, setNotifications] = useState([]);
  const [notificationModal, setNotificationModal] = useState(false);

  const [seeMain, setSeeMain] = useState(true);
  const [seeBoom, setSeeBoom] = useState(true);
  const [threeSureCashout, setThreeSureCashout] = useState([]);
  const [dailyWinners, setDailyWinners] = useState([]);

  const [showBalance, setShowBalance] = useState(false); // State to toggle balance visibility

  const toggleBalance = () => {
    setShowBalance((prevState) => !prevState); // Toggle the state
  };

  const [showBalance2, setShowBalance2] = useState(false); // State to toggle balance visibility

  const toggleBalance2 = () => {
    setShowBalance2((prevState) => !prevState); // Toggle the state
  };

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

  const toggleMain = () => {
    if (seeMain) {
      setSeeMain(false);
    } else {
      setSeeMain(true);
    }
  };

  const toggleBoom = () => {
    if (seeBoom) {
      setSeeBoom(false);
    } else {
      setSeeBoom(true);
    }
  };

  const [iisOpen, setiisOpen] = useState(false);
  const [bonusBalance, setBonusBalance] = useState();
  const [walletBalance, setWalletBalance] = useState();
  const [gameSettings, setgameSettings] = useState();
  const [jackpotString, setJackpotString] = useState();

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
    if (
      response.status &&
      (response.status === 200 || response.status === 201)
    ) {
      setWalletBalance(response?.data);
    }
    if (
      response2.status &&
      (response2.status === 200 || response2.status === 201)
    ) {
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
          "Make Your First Deposit Now and Get 35,000 Boom Coin Tokens (BCT)!",
        position: "top"
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
    checkSellEligibility();
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
    fetchTodayWinners();
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
      const currJackpot = res?.data.payload?.jackpot;
      const valueBal = Number(currJackpot).toLocaleString();
      setJackpotString(valueBal);
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
        position: "top"
      });
      setAgreeMonetize(true);
    } else {
      toast({
        status: "error",
        isClosable: true,
        duration: "5000",
        title: res.data.message,
        position: "top"
      });
      setAgreeMonetize(false);
    }

    setAgreeMonetizeModal(false);
  };

  //check if monetize is active
  useEffect(() => {
    localStorage.setItem("referral_code", user?.details?.referral_code);
    if (
      user?.details?.monetization_status === 0 ||
      user?.details?.monetization_status === 2
    ) {
      setAllowMonetize(false);
    } else if (user?.details?.monetization_status === 1) {
      setAllowMonetize(true);
      setAgreeMonetize(true);
    } else if (user?.details?.monetization_status === 3) {
      setAllowMonetize(true);
      setAgreeMonetize(false);
    }

    if (bearerToken) {
      checkMonetizationEligibility();
    }
  }, []);

  const allowedModalRedirect = () => {
    if (user?.details?.monetization_status === '1') {
      setAgreedMonetizeModal(true);
    } else if (user?.details?.monetization_status === '3') {
      setAgreeMonetizeModal(true);
    }
  };

  const notAllowedModalRedirect = () => {
    setNotAllowMonetizeModal(true);
  };

  const checkMonetizationEligibility = async () => {
    const res = await getMonetizationEligibility(bearerToken);
    if (
      res?.data?.payload?.monetization_status === "0" ||
      res?.data?.payload?.monetization_status === "2"
    ) {
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
      //let x = 1;
      let checkers = [];
      if (res?.data?.payload?.is_win_state && res?.data?.payload?.games_played === 3) {
        toast({
          status: "success",
          isClosable: true,
          duration: "5000",
          title: "Congrats! 🎉 You've hit 3 Sure Cashout and Your Wallet has been credited!",
          position: "top"
        })
      }
      if (!res?.data?.payload?.is_win_state && res?.data?.payload?.games_played === 3) {
        toast({
          status: "error",
          isClosable: true,
          duration: "5000",
          title: "Oops! You missed 3 Sure Cashout. Restart from Game 1 and try again!",
          position: "top"
        })
      }
      for (let x = 1; x <= 3; x++) {
        if (x <= res?.data?.payload?.games.length) {
          let val = 1;
          if (res?.data?.payload?.games[x - 1].green_balls > 0) {
            val = 2;
          }

          let check = {};
          check.id = x;
          check.price = res?.data?.payload?.games[x - 1].stake_amount;
          check.status = val;
          checkers.push(check);
        } else {
          let val = 0;
          let check = {};
          check.id = x;
          check.price = '0.00';
          check.status = val;
          checkers.push(check);
        }
      }
      // while (x <= res?.data?.payload?.games.length) {
      //   let val = false;
      //   if (res?.data?.payload?.games[x - 1].green_balls > 0) {
      //     val = true;
      //   }

      //   let check = {};
      //   check.id = x;
      //   check.price = res?.data?.payload?.games[x - 1].stake_amount;
      //   check.status = val;
      //   checkers.push(check);

      //   x++;
      // }
      setThreeSureCashout(checkers);
    }
  };

  const fetchSellEligibility = async () => {
    if (sellButton === 0) {
      setSell(false);
      setNoSell(true);
    } else {
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
    }
  };

  const fetchBuyAvailability = async () => {
    setNoBuy(true);
    // if (sellButton === 0) {
    //   setNoBuy(true);
    // } else {
    //   setIsLoading(true);
    //   const res = await sellEligibility(bearerToken);
    //   setIsLoading(false);
    //   if (res.status && (res.status === 200 || res.status === 201)) {
    //     if (res?.data?.payload?.status === "ineligible") {
    //       setNoBuy(true);
    //     } else {
    //       setNoBuy(false);
    //     }
    //   }
    // }
  };

  const checkSellEligibility = async () => {
    setIsLoading(true);
    const res = await sellVisibility(bearerToken);
    if (res.status && (res.status === 200 || res.status === 201)) {
      if (res?.data?.message === "Sell offer is now active") {
        const response = await sellEligibility(bearerToken);
        setIsLoading(false);
        if (response.status && (response.status === 200 || response.status === 201)) {
          if (response?.data?.payload?.status === "ineligible") {
            setSellButton(0);
          } else {
            setSellButton(1);
          }
        }
      } else {
        setIsLoading(false);
        setSellButton(0);
      }
    }
  };

  const fetchTodayWinners = async () => {
    setIsLoading(true);
    const res = await getDailyWinners();
    setIsLoading(false);
    if (res.status && (res.status === 200 || res.status === 201)) {
      setDailyWinners(res?.data?.payload?.content);
    }
  };

  const fetchMyNotifications = async () => {
    setIsLoading(true);
    const res = await getNotifications(bearerToken);
    setIsLoading(false);
    if (res.status && (res.status === 200 || res.status === 201)) {
      setNotifications(res?.data?.payload?.content);
    }
  };

  const openNotification = async () => {
    fetchMyNotifications();
    setNotificationModal(true);
  };

  const completeSellAcceptance = async () => {
    setIsLoading(true);
    const res = await sellAcceptance(bearerToken);
    setIsLoading(false);
    if (res?.data?.status) {
      setSell(false);
      toast({
        status: "success",
        isClosable: true,
        duration: "5000",
        title: res?.data?.message,
        position: "top"
      }).then(() => {
        window.location.reload();
      });
    } else {
      setSell(false);
      toast({
        status: "error",
        isClosable: true,
        duration: "5000",
        title: res.data.message,
        position: "top"
      }).then(() => {
        window.location.reload();
      });
    }
  };

  const completeSellDecline = async () => {
    setIsLoading(true);
    setSell(false);
    const res = await sellDecline();
    setIsLoading(false);
    if (res?.data?.status) {
      toast({
        status: "success",
        isClosable: true,
        duration: "5000",
        title: res?.data?.message,
        position: "top"
      }).then(() => {
        window.location.reload();
      });
    } else {
      toast({
        status: "error",
        isClosable: true,
        duration: "5000",
        title: res.data.message,
        position: "top"
      }).then(() => {
        window.location.reload();
      });
    }
  };

  const menuRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        position: "top"
      });
      router.replace("/");
      return;
    } catch (err) {
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

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
        position: "top"
      });
    }

    setfastFinger("");
    fetchBalance2();
  };

  const TSCItems = ({ item }) => {
    return (
      <div>
        <div className="gold-ring-container bg-cover bg-center bg-no-repeat flex items-center justify-center max-w-[92px] max-h-[88px] min-w-[92px] min-h-[88px]">
          {item.status === 1 &&
            <IoClose size={50} color={"red"} />
          }
          {item.status === 2 &&
            <img
              src="/mobile/assets/3SCCheck.png"
              className="max-w-[43px] max-h-[27px] min-w-[43px] min-h-[27px]"
            />
          }
        </div>
        <div className="gradient-div font-changa font-semibold -mt-2 p-[2px] text-center rounded-full text-secondary ">
          ₦{item.price}
        </div>
      </div>
    );
  };

  const TSCItemsEmpty = () => {
    return (
      <div>
        <div className="gold-ring-container bg-cover bg-center bg-no-repeat flex items-center justify-center max-w-[92px] max-h-[88px] min-w-[92px] min-h-[88px]">
          
        </div>
        <div className="gradient-div font-changa font-semibold -mt-2 p-[2px] text-center rounded-full text-secondary ">
          ₦0.00
        </div>
      </div>
    );
  };

  return (
    <div className="w-full appearance-none bg-secondary text-white flex-1 overflow-y-auto">
      <div className=" px-4 justify-center background-ribbon bg-cover bg-center bg-no-repeat  h-auto">
        <div className="w-full">
          <div className="flex py-10 w-full justify-center">
            <img src="/mobile/assets/NairaBoomLogo.svg" />
          </div>
          <div className="w-full flex justify-between">
            <div className="flex items-center">
              <Button
                variant="unstyled"
                ref={menuRef}
                color="nairagreen"
                alignSelf="flex-start"
                pt={1}
                onClick={onOpen}
              >
                <GiHamburgerMenu size={25} color={"fff"} />
              </Button>
              <span
                className="flex -ml-3 text-[15px] mt-2"
                style={{ fontFamily: "Changa" }}
              >
                Hi, {user?.details?.fullname?.split(" ")[0]}
              </span>
              <div className="flex justify-bottom items-end mt-1 ml-1 cursor-pointer" 
                  onClick={openNotification}>
                <LiaBellSolid size={15} color={"fff"} />
              </div>
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
                          icon: <HiHome />
                        },
                        {
                          title: "Play Game",
                          link: "customer_dashboard/cashback",
                          icon: <HiOutlineCash />
                        },
                        {
                          title: "My Wallet",
                          link: "customer_dashboard/wallet",
                          icon: <BsWallet />
                        },
                        {
                          title: "Game history",
                          link: "customer_dashboard/request_history",
                          icon: <MdContentPaste />
                        },
                        {
                          title: "Refer Your Trybe",
                          link: "customer_dashboard/referral_link",
                          icon: <MdFileCopy />
                        },
                        {
                          title: "Share & Earn",
                          link: "customer_dashboard/share_ads",
                          icon: <BsShareFill />
                        }
                      ].map((item, index) => {
                        return (
                          <Button
                            px={5}
                            key={index}
                            colorScheme={
                              item.title === "Dashboard" ? "gray" : "none"
                            }
                            onClick={() => router.push(item.link)}
                            color={
                              item.title === "Dashboard" ? "#002047" : "gray"
                            }
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
                          icon: <MdHelpCenter />
                        },
                        {
                          title: "Edit Profile",
                          link: "customer_dashboard/editprofile",
                          icon: <RiProfileFill />
                        },
                        {
                          title: "Change Password",
                          link: "customer_dashboard/change-password",
                          icon: <SettingsIcon />
                        }
                      ].map((item, index) => {
                        return (
                          <Button
                            px={5}
                            key={index}
                            colorScheme={
                              item.title === "Dashboard" ? "gray" : "none"
                            }
                            onClick={() => router.push(item.link)}
                            color={
                              item.title === "Dashboard" ? "#002047" : "gray"
                            }
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
            </div>
            <div className="flex space-x-1 items-center">
              {!allowMonetize ? (
                <>
                  <div
                    onClick={allowedModalRedirect}
                    className="cursor-pointer"
                  >
                    <img src="/mobile/assets/Monetize.png" />
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={notAllowedModalRedirect}
                    className="cursor-pointer brightness-50"
                  >
                    <img src="/mobile/assets/Monetize.png" />
                  </div>
                </>
              )}
              <IoMdInformationCircleOutline
                onClick={() => {
                  setMonetizeModal(true);
                }}
                size={30}
              />
            </div>
          </div>
          <p className="mt-4 mb-1 text-[15px]" style={{ fontFamily: "Changa" }}>
            Dashboard
          </p>
          <div className="max-w-full overflow-x-scroll flex space-x-2 scrollbar-hide mdd:justify-between">
            <div className="gradient-div max-w-[48%] min-w-[48%] rounded-lg p-4 text-secondary ">
              {/* first text */}
              <div
                className="text-[20px] mb-4"
                style={{ fontFamily: "Changa One" }}
              >
                <p style={{ fontFamily: "Changa One" }}>MAIN</p>
                <p className="-mt-2" style={{ fontFamily: "Changa One" }}>
                  WALLET
                </p>
              </div>
              {/* balance */}
              <div className="mb-2 mt-5">
                <div className="flex space-x-1 font-changa items-center -mb-1 text-[10px]">
                  <p className="">BALANCE</p>
                  <button
                    onClick={toggleBalance}
                    className="focus:outline-none"
                  >
                    {showBalance ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="flex space-x-1 items-start">
                  <p
                    className="text-[15px]"
                    style={{ fontFamily: "Changa One" }}
                  >
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
                        {showBalance ? (
                          <>
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
                        ) : (
                          <>******</>
                        )}
                      </>
                    )}
                  </p>
                  <p className="text-[6px]" style={{ fontFamily: "Changa" }}>
                    NGN
                  </p>
                </div>
              </div>
              {/* button */}
              <div
                onClick={() => {
                  router.push("/customer_dashboard/fund_account");
                }}
                className="bg-secondary cursor-pointer transition-transform transform active:scale-90 text-primary rounded-full py-2 px-4 w-fit text-[13px]"
                style={{ fontFamily: "Source Code Pro" }}
              >
                <b>FUND</b>
              </div>
            </div>
            <div className="gradient-div max-w-[48%] min-w-[48%] rounded-lg p-4 text-secondary ">
              {/* first text */}
              <div className="flex justify-between">
                <div
                  className="text-[20px] mb-4"
                  style={{ fontFamily: "Changa One" }}
                >
                  <p style={{ fontFamily: "Changa One" }}>BOOM</p>
                  <p className="-mt-2" style={{ fontFamily: "Changa One" }}>
                    WALLET
                  </p>
                </div>
                <div className="-mt-2 -mr-2 cursor-pointer transition-transform transform active:scale-90">
                  <IoMdInformationCircleOutline
                    onClick={() => modalRedirect()}
                    size={20}
                  />
                </div>
              </div>
              {/* balance */}
              <div className="mb-2 mt-1">
                <div className="flex space-x-1 font-changa items-center -mb-1 text-[10px]">
                  <p className="">BALANCE</p>
                  <button
                    onClick={toggleBalance2}
                    className="focus:outline-none"
                  >
                    {showBalance2 ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="flex space-x-1 items-start">
                  <p
                    className="text-[15px]"
                    style={{ fontFamily: "Changa One" }}
                  >
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
                        {showBalance2 ? (
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
                        ) : (
                          <>******</>
                        )}
                      </>
                    )}
                  </p>
                  <p className="text-[6px]" style={{ fontFamily: "Changa" }}>
                    BCT
                  </p>
                </div>
              </div>
              {/* button */}
              <div className="flex space-x-2 items-center">
                <div
                  onClick={fetchSellEligibility}
                  className={`ccursor-pointer transition-transform transform active:scale-90 rounded-full py-2 px-4 w-fit text-[13px] ${
                    sellButton == 0
                      ? "bg-[#DD3215]"
                      : " bg-secondary text-primary"
                  }`}
                  style={{ fontFamily: "Source Code Pro" }}
                >
                  <b>SELL</b>
                </div>
                <div
                  onClick={fetchBuyAvailability}
                  className={`ccursor-pointer transition-transform transform active:scale-90 rounded-full py-2 px-4 w-fit text-[13px] ${
                    sellButton == 0
                      ? "bg-[#FFCF17]"
                      : " bg-secondary text-primary"
                  }`}
                  style={{ fontFamily: "Source Code Pro" }}
                >
                  <b>BUY</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isCentered
          isOpen={notificationModal}
          onClose={() => {
            setNotificationModal(false);
          }}
        >
          <ModalOverlay />
          <ModalContent
            fontFamily={"poppins"}
            w={{ base: "90%", md: "45%" }}
            maxW={"95%"}
            p={{ base: "1rem", md: "3rem" }}
          >
            <ModalHeader>
              <Center>
                <font size="5" color="nairagreen">
                  <b>Latest Updates</b>
                </font>
              </Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <hr/>
              {notifications.map((item, index) => (
                <div>
                <div className="py-3 px-1">
                  <b>{item.title}</b>
                  <br/>
                  {item.desciption}
                </div>
                <hr/>
                </div>
              ))}
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal
          isCentered
          isOpen={noBuy}
          onClose={() => {
            setNoBuy(false);
          }}
        >
          <ModalOverlay />
          <ModalContent
            fontFamily={"poppins"}
            w={{ base: "90%", md: "45%" }}
            maxW={"95%"}
            p={{ base: "1rem", md: "3rem" }}
          >
            <ModalHeader>
              <Center>
                <font size="5" color="nairagreen">
                  <b>Buy Offer</b>
                </font>
              </Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <br />
              Boom Coin Tokens (BCT) are not available to buy at the moment. Please try again later.
              <br />
              <br />
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal
          isCentered
          isOpen={noSell}
          onClose={() => {
            setNoSell(false);
          }}
        >
          <ModalOverlay />
          <ModalContent
            fontFamily={"poppins"}
            w={{ base: "90%", md: "45%" }}
            maxW={"95%"}
            p={{ base: "1rem", md: "3rem" }}
          >
            <ModalHeader>
              <Center>
                <font size="5" color="nairagreen">
                  Sell Offer
                </font>
              </Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Center>
                <b>No Sell Offer Available!</b>
              </Center>
              <br />
              To be eligible to sell, maintain a minimum balance of 500,000 Boom
              Coin Tokens in your wallet and stay active. Keep swapping your alerts 
              to accumulate more BCT!
              <br />
              <br />
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal
          isCentered
          isOpen={sell}
          onClose={() => {
            setSell(false);
          }}
        >
          <ModalOverlay />
          <ModalContent
            fontFamily={"poppins"}
            w={{ base: "90%", md: "45%" }}
            maxW={"95%"}
            p={{ base: "1rem", md: "3rem" }}
          >
            <ModalHeader>
              <Center>
                <font size="5" color="nairagreen">
                  Sell Offer
                </font>
              </Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              You've Received an Offer to Sell Your Boom Coins!
              <br />
              <Box
                display={"flex"}
                justifyContent="space-between"
                alignItems={"center"}
              >
                <div className="w-1/3">
                  <b>Rate</b><br/>
                  <input size="5" value={sellPayload?.sell_percentage} disabled />
                </div>
                <div className="w-2/3">
                  <b>Amount</b><br/>
                  <input size="15" value={"₦" + sellPayload?.sell_amount_display} disabled />
                </div>
              </Box>
              <p>
                If you accept this offer, you agree to sell your Boom Coin Tokens at
                the specified rate and will receive the cash equivalent in your
                Main Wallet. Note: 5% Agency Fee applies.
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
                onClick={completeSellDecline}
              >
                DECLINE
              </Button>
            </Box>
          </ModalContent>
        </Modal>
        <Modal
          isCentered
          isOpen={monetizeModal}
          onClose={() => {
            setMonetizeModal(false);
          }}
        >
          <ModalOverlay />
          <ModalContent
            fontFamily={"poppins"}
            w={{ base: "90%", md: "45%" }}
            maxW={"95%"}
            p={{ base: "1rem", md: "3rem" }}
          >
            <ModalHeader>
              <Center>
                <font size="14" color="nairagreen">
                  MONETIZE
                </font>
              </Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Hey Boomster, you can monetize your NairaBoom account and earn 
              passive income when you meet the following criteria:
              <br />
              <br />
              1. Use your referral{" "}
              <Link href="/customer_dashboard/editprofile">link </Link>
              to invite people to join your Trybe,
              <br />
              2. Have a minimum of 100,000 Boom Coin Tokens (BCT),
              <br />
              <br />
              Benefits of monetizing your Nairaboom account:
              <br />
              <br />
              1. Receive commission on every referral you make.
              <br />
              2. Earn revenue daily from rollover swaps and winnings of members of your Trybe.
              <br />
              3. Become a Nairaboom partner and earn performance bonuses. 
              <br />
              <br />
              <Center>
                <Button
                  w="100%"
                  h="3.25rem"
                  colorScheme="none"
                  bg="nairagreen"
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
              <br />
              <br />
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal
          isCentered
          isOpen={agreeMonetizeModal}
          onClose={() => {
            setAgreeMonetizeModal(false);
          }}
        >
          <ModalOverlay />
          <ModalContent
            fontFamily={"poppins"}
            w={{ base: "90%", md: "45%" }}
            maxW={"95%"}
            p={{ base: "1rem", md: "3rem" }}
          >
            <ModalHeader>
              <Center>
                <font size="14" color="nairagreen">
                  MONETIZE
                </font>
              </Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Congratulations you have qualified for the Nairaboom Monetization
              Program.
              <br />
              <br />
              To continue, confirm that you agree to the T&Cs of the program
              <br />
              <Center>
                <Button
                  w="100%"
                  h="3.25rem"
                  colorScheme="none"
                  bg="nairagreen"
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
              <br />
              <br />
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal
          isCentered
          isOpen={notAllowMonetizeModal}
          onClose={() => {
            setNotAllowMonetizeModal(false);
          }}
        >
          <ModalOverlay />
          <ModalContent
            fontFamily={"poppins"}
            w={{ base: "90%", md: "45%" }}
            maxW={"95%"}
            p={{ base: "1rem", md: "3rem" }}
          >
            <ModalHeader>
              <Center>
                <font size="14" color="nairagreen">
                  MONETIZE
                </font>
              </Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              You are not eligible for monetization. Build your Trybe and increase your Boom 
              Coin Tokens.
              <br /><br />
              <Center>
                <Button
                  w="100%"
                  h="3.25rem"
                  colorScheme="none"
                  bg="nairagreen"
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
                    setNotAllowMonetizeModal(false);
                  }}
                >
                  OK
                </Button>
              </Center>
              <br />
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal
          isCentered
          isOpen={agreedMonetizeModal}
          onClose={() => {
            setAgreedMonetizeModal(false);
          }}
        >
          <ModalOverlay />
          <ModalContent
            fontFamily={"poppins"}
            w={{ base: "90%", md: "45%" }}
            maxW={"95%"}
            p={{ base: "1rem", md: "3rem" }}
          >
            <ModalHeader>
              <Center>
                <font size="14" color="nairagreen">
                  MONETIZE
                </font>
              </Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Center>Your monetization status is active!</Center>
              <br />
              <br />
              <Center>
                Did you know that there's no limit to the number of people you can 
                invite to join your Trybe on NairaBoom? Invite more people and earn 
                more money!
              </Center>
              <br />
              <Center>
                <Button
                  w="40%"
                  h="3.25rem"
                  colorScheme="none"
                  bg="nairagreen"
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
              <br />
              <br />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
      {/* megaphone card */}
      <div className="gradient-div mt-2 w-full flex items-center justify-between text-secondary ">
        <marquee direction="left" loop="">
        <div className="text-xs flex items-center py-[2px] pl-[5px]">
          <img src="/mobile/assets/Group.svg" className="w-[25px] h-[25px]" />
          {dailyWinners.map((item, index) => (
            // eslint-disable-next-line react/jsx-key
            <div className="inline-block">
              <span
                className="ml-1 text-[13px] font-normal"
                style={{ fontFamily: "Source Sans Pro" }}
              >
                &nbsp;{item.fullname} cashed in&nbsp;
              </span>
              <span
                className=" text-[13px] text-white font-bold"
                style={{ fontFamily: "Source Sans Pro" }}
              >
                &nbsp;NGN {item.amount_won}&nbsp;
              </span>
            </div>
          ))}
        </div>
        </marquee>
        <div className="flex items-center rounded-br-md rounded-tr-md justify-center aspect-video small-ribbon bg-cover bg-center bg-no-repeat  h-[32px]">
          <div
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
            className="cursor-pointer"
          >
            <img
              src="/mobile/assets/PlayNow.png"
              className="h-[24px] aspect-video"
            />
          </div>
        </div>
      </div>
      {/* Games */}
      <div>
        <p
          className="mt-4 -mb-2 px-4 font-bold text-[15px]"
          style={{ fontFamily: "Changa" }}
        >
          Games
        </p>
        <div className="lg:-mt-20 grid  grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className=" px-4 justify-center background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
            <div className="gradient-div relative mt-4 flex flex-col p-4 items-center w-full rounded-md text-secondary ">
              <img
                src="/mobile/assets/3SureCashout.png"
                className="max-w-[357px] -ml-3 max-h-[261px] min-w-[357px] min-h-[261px]"
              />
              <img
                src="/mobile/assets/3SureCashoutText.png"
                className="absolute top-5 max-w-[264px] max-h-[92px] min-w-[264px] min-h-[92px]"
              />
              <div className="absolute top-24 flex items-center space-x-2 justify-between">
                {threeSureCashout.length === 0 ? (
                  <>
                  <TSCItemsEmpty />
                  <TSCItemsEmpty />
                  <TSCItemsEmpty />
                  </>
                ) : (
                  <>
                  {threeSureCashout.map((each) => {
                    return <TSCItems item={each} />;
                  })}
                  </>
                )}
              </div>
              <img
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
                src="/mobile/assets/PlayNow1.png"
                className="absolute mt-[190px] cursor-pointer ml-[3px] max-w-[115.08px] max-h-[48.3px] min-w-[115.08px] min-h-[48.3px]"
              />
              <p
                className="-mt-2 text-center text-xl"
                style={{ fontFamily: "Changa One" }}
              >
                GET ONE GREEN BALL IN 3
              </p>
              <p
                className="-mt-2 text-center text-xl"
                style={{ fontFamily: "Changa One" }}
              >
                CONSECUTIVE ROLLOVER GAMES
              </p>
              <p
                className="-mt-2 text-center text-xl"
                style={{ fontFamily: "Changa One" }}
              >
                AND CASHOUT YOUR CUMULATIVE
              </p>
            </div>
          </div>
          <div className=" px-4 justify-center background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
            <div className="gradient-div relative -mt-1 flex flex-col p-4 items-center w-full rounded-md text-secondary h-auto">
              <img
                src="/mobile/assets/Rollover.png"
                className="max-w-[320px] max-h-[228px] min-w-[320px] min-h-[228px]"
              />
              <img
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
                src="/mobile/assets/SwapNow.png"
                className="absolute mt-[180px] cursor-pointer transition-transform transform active:scale-90 ml-[3px] max-w-[115.08px] max-h-[48.3px] min-w-[115.08px] min-h-[48.3px]"
              />
              <p
                className="mt-2 text-center text-xl"
                style={{ fontFamily: "Changa One" }}
              >
                TAP TO ROLLOVER AND SWAP YOUR
              </p>
              <p
                className="-mt-2 text-center text-xl"
                style={{ fontFamily: "Changa One" }}
              >
                BANK ALERT
              </p>
            </div>
          </div>
          <div className=" px-4 justify-center background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
            <div className="gradient-div relative -mt-1 flex flex-col p-4 items-center w-full rounded-md text-secondary ">
              <img
                src="/mobile/assets/FastestFingers.png"
                className="max-w-[320px] max-h-[240px] min-w-[320px] min-h-[240px]"
              />
              <input
                type="text"
                name="fastfinger"
                placeholder="Type here..."
                onChange={(e) => {
                  setfastFinger(e.target.value.trim());
                }}
                value={`${fastFinger}`}
                className="absolute mt-[140px] max-w-[167.87px] max-h-[45px] min-w-[167.87px] min-h-[45px] bg-white text-neutral-500 text-sm text-center border-8 border-secondary rounded-full"
              />
              <img
                onClick={() => {
                  handleFastFinger();
                }}
                src="/mobile/assets/Enter.png"
                className="absolute mt-[190px] cursor-pointer transition-transform transform active:scale-90 ml-[3px] max-w-[115.08px] max-h-[48.3px] min-w-[115.08px] min-h-[48.3px]"
              />
              <p
                className="mt-2 text-center text-xl"
                style={{ fontFamily: "Changa One" }}
              >
                ENTER THE MONEY WORD TO WIN
              </p>
              <p
                className="-mt-2 text-center text-xl"
                style={{ fontFamily: "Changa One" }}
              >
                QUICK CASH
              </p>
            </div>
          </div>
        </div>
        <div className="px-4 justify-center background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
          <div className="mt-2 relative flex flex-col items-center w-full rounded-md text-secondary ">
            <img
              src="/mobile/assets/CashoutKeys.png"
              // className="max-w-[326px] max-h-[344px] min-w-[326px] min-h-[344px]"
            />
            <div className="absolute bottom-20 flex items-center justify-between">
              <div className=" gold-container flex items-center justify-center text-secondary max-w-[76px] max-h-[66px] min-w-[76px] min-h-[66px]">
                <p
                  className="text-center text-[34px]"
                  style={{ fontFamily: "Changa One" }}
                >
                  {boom_code?.[0]}
                </p>
              </div>
              <div className=" gold-container flex items-center justify-center text-secondary max-w-[76px] max-h-[66px] min-w-[76px] min-h-[66px]">
                <p
                  className="text-center text-[34px]"
                  style={{ fontFamily: "Changa One" }}
                >
                  {boom_code?.[1]}
                </p>
              </div>
              <div className=" gold-container flex items-center justify-center text-secondary max-w-[76px] max-h-[66px] min-w-[76px] min-h-[66px]">
                <p
                  className="text-center text-[34px]"
                  style={{ fontFamily: "Changa One" }}
                >
                  {boom_code?.[2]}
                </p>
              </div>
              <div className=" gold-container flex items-center justify-center text-secondary max-w-[76px] max-h-[66px] min-w-[76px] min-h-[66px]">
                <p
                  className="text-center text-[34px]"
                  style={{ fontFamily: "Changa One" }}
                >
                  {boom_code?.[3]}
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 cashout-container flex items-center justify-center text-primary max-w-[189px] max-h-[57px] min-w-[189px] min-h-[57px]">
              <p
                className="text-center text-[24px]"
                style={{ fontFamily: "Changa One" }}
              >
                ₦{jackpotString}
              </p>
            </div>
          </div>
          <div className="mt-2 relative flex flex-col items-center w-full rounded-md text-secondary ">
            <img
              onClick={() => {
                console.log("how-to-play");
              }}
              src="/mobile/assets/Jackpot.png"
              className="cursor-pointer transition-transform transform active:scale-90 "
              // className="max-w-[326px] max-h-[344px] min-w-[326px] min-h-[344px]"
            />
          </div>
        </div>
        <div className="lg:-mt-40 justify-center background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
          {/* <div className="mt-2 relative flex flex-col items-center w-full rounded-md text-secondary ">
            <img
              src="/mobile/assets/BigWin2.png"
              className="max-w-[350px] max-h-[344px] min-w-[344px] min-h-[350px]"
            />
            <img
              onClick={() => {
                router.push("/how-to-play");
              }}
              src="/mobile/assets/HowToPlay.png"
              className="absolute mt-[235px] cursor-pointer transition-transform transform active:scale-90 ml-[3px] max-w-[249.04px] max-h-[78.72px] min-w-[249.04px] min-h-[78.72px]"
            />
          </div> */}
          <div className="gradient-div relative mt-2 max-w-screen overflow-x-hidden flex flex-col items-center max-w-screen mx-4 rounded-md">
            {/* <div className="-mt-3 mx-4 relative text-secondary justify-center background-ribbon1 bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto"> */}
            <img
              src="/mobile/assets/Group_246.png"
              // className="max-w-[350px] max-h-[344px] min-w-[344px] min-h-[350px] rounded-lg"
              className="w-full rounded-lg"
            />
            <img
              onClick={() => {
                router.push("/how-to-play");
              }}
              src="/mobile/assets/HowToPlay2.png"
              className="absolute bottom-8 cursor-pointer transition-transform transform active:scale-90"
              // className="absolute bottom-0 cursor-pointer ml-[3px] max-w-[254.78px] max-h-[80.07px] min-w-[254.78px] min-h-[80.07px]"
            />
            {/* </div> */}
          </div>
        </div>
      </div>

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
            How To Earn Boom Coin Tokens (BCT)
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
              Unlock multiple ways to earn Boom Coin Tokens (BCT) 
              on NairaBoom to boost your earnings. Tap the button 
              below to discover all the opportunities waiting for you!
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

      {/* Footer */}
      <div className="flex flex-col flex-1 px-6 justify-center background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
        <div className="flex flex-col flex-1">
          <div className="mt-4 flex flex-col text-center items-center w-full">
            <div className="mb-1">
              <span
                className="py-[2px] px-[2px] text-[10px] font-semibold border-2 border-red-600 mr-2 rounded-full"
                style={{ fontFamily: "Source Sans Pro" }}
              >
                18+
              </span>
              <span
                className="text-[10px] font-semibold"
                style={{ fontFamily: "Source Sans Pro" }}
              >
                Play Resposibly
              </span>
            </div>
            <div
              className="text-[10px] font-extralight"
              style={{ fontFamily: "Changa" }}
            >
              <p className="mb-1">© 2024 Nairaboom. All Rights Reserved.</p>
              <p className="mb-1">
                Nairaboom is licensed and regulated by the National
              </p>
              <p className="mb-1">Lottery Regulatory</p>
              <p className="mb-1">(NLRC). License Number</p>
              <p className="mb-1">0000006</p>
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-end mt-1 mb-4">
            <div
              className="flex justify-between items-end font-extralight text-[10px]"
              style={{ fontFamily: "Changa" }}
            >
              <div>
                <div>
                  <p className="hover:border-b border-b-white inline-block mb-1">
                    <Link href="/faq">FAQs</Link>
                  </p>
                </div>
                <div>
                  <p className="hover:border-b border-b-white inline-block mb-1">
                    <Link href="/terms_conditions">Terms & Conditions</Link>
                  </p>
                </div>
                <div>
                  <p className="hover:border-b border-b-white inline-block mb-1">
                    <Link href="/privacy_policy">Privacy Policy</Link>
                  </p>
                </div>
                <div>
                  <p className="hover:border-b border-b-white inline-block mb-1">
                    Blog
                  </p>
                </div>
                <div>
                  <p className="hover:border-b border-b-white inline-block mb-1">
                    <Link href="/gamble_responsibly">Responsible Gambling</Link>
                  </p>
                </div>
              </div>
              <div className="text-primary space-x-2">
                <Link href="https://www.instagram.com/nairaboomng/">
                  <FaInstagram size={15} className="inline-block" />
                </Link>
                <Link href="https://www.tiktok.com/@nairaboom.ng?_t=8ouwtQ6j16L&_r=1">
                  <FaTiktok size={15} className="inline-block" />
                </Link>
                <Link href="https://www.facebook.com/profile.php?id=61554354321220&mibextid=ZbWKwL">
                  <FaFacebook size={15} className="inline-block" />
                </Link>
                <Link href="https://twitter.com/nairaboomng">
                  <FaXTwitter size={15} className="inline-block" />
                </Link>
                <Link href="https://youtube.com/@nairaboomng?si=SsQoitRoAbRc1EvK">
                  <FaYoutube size={15} className="inline-block" />
                </Link>
                <Link href="https://www.threads.net/@nairaboomng">
                  <FaThreads size={15} className="inline-block" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
