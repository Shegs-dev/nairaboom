import {
  Box,
  Text,
  Avatar,
  Spinner,
  useToast,
  Button,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";
import Head from "next/head";
import transaction from "../../public/dashboard/transactions.svg";
import amount from "../../public/dashboard/amount.svg";
import Wrapper from "../../components/Wrapper";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import empty_records from "../../public/dashboard/empty_record.png";
import useUser from "../../lib/hooks/useUser";
import { getAuthenticatedUser } from "../../lib/hooks/getAuthUser";
import { useState } from "react";
import axios from "axios";
import Clock from "../../components/Clock";
import { AUTH_API_ROUTES } from "../../utils/routes";
import Link from "next/link";
import redirectIfAuthenticated from "../../lib/helpers/redirect";
import UserDashboard from "../../components/dashboard/UserDashboard";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

export default function Home() {
  const toast = useToast();
  const [data, setData] = useState("");
  const [wheelsettings, setwheelsettings] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [walletBal_avaialable, setwalletBal_avaialable] = useState(false);
  const router = useRouter();

  const { user, error } = useUser();
  const bearerToken = user?.token;
  const [boomTimes, setBoomTimes] = useState();
  const [playModal, setplayModal] = useState(false);

  // useEffect(() => {
  //   const auth= getAuthenticatedUser()
  //   if (!auth.authenticated) {
  //     router.push("/auth?p=login");
  //   }
  //   // RedirectIfnotAuthenticated();
  // }, [router])

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

  //modal
  const [isOpen, setIsOpen] = useState(false);

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
        isUserAuthenticated?.user?.details?.user_type === "agent"
      ) {
        router.push("/auth?p=login");
      }
    };

    const destru = parseJwt(bearerToken);

    // async function fetchData() {
    //   const config = {
    //     method: "get",
    //     url: `${BASE_URL}/api/dashboard_metrics`,
    //     headers: {
    //       "X-APP-KEY": NAIRABOOM_KEY,
    //       Authorization: `Bearer ${bearerToken}`,
    //     },
    //   };

    //   try {
    //     setIsLoading(true);
    //     const response = await axios(config);
    //     setData(response?.data);
    //   } catch (error) {
    //     toast({
    //       isClosable: true,
    //       duration: 5000,
    //       status: "error",
    //       title: "Something went wrong, please check connection and try again",
    //       position: "top",
    //     });
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }

    redirectIfnotAuthenticated();
    // fetchData();
    boom();
    fetchBalance2();
  }, [bearerToken, toast, router]);

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

    fetchData();
    getter2();
  }, [bearerToken, toast]);

  return (
    <Box>
      <Head>
        <title>NairaBoom Customer Dashboard</title>
        <meta name="user dashboard" content="nairaboom.ng customer dashboard" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-904C1779CP"
          strategy="afterInteractive"
        />
        <script strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-904C1779CP');
          `}
        </script>
      </Head>
      <UserDashboard />
    </Box>
  );
}
