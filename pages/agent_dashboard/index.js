import {
  Box,
  Text,
  Avatar,
  Spinner,
  useToast,
  Button,
  Link,
} from "@chakra-ui/react";
import Head from "next/head";
import transaction from "../../public/dashboard/transactions.svg";
import amount from "../../public/dashboard/amount.svg";
import Wrapper from "../../components/Wrapper";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/legacy/image";
import empty_records from "../../public/dashboard/empty_record.png";
import useUser from "../../lib/hooks/useUser";
import { getAuthenticatedUser } from "../../lib/hooks/getAuthUser";
import { useState } from "react";
import axios from "axios";
import Clock from "../../components/Clock";
import AgentDashboard from "../../components/dashboard/AgentDashboard";
import { AUTH_API_ROUTES } from "../../utils/routes";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

export default function Home() {
  const toast = useToast();
  const [data, setData] = useState("");
  const [transactions, setTransactions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState("");

  const router = useRouter();

  const { user, error } = useUser();
  const bearerToken = user?.token;

  useEffect(() => {
    if (!bearerToken) return;

    async function fetchData() {
      const config = {
        method: "get",
        url: `${BASE_URL}/api/dashboard_metrics`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
      };

      try {
        setIsLoading(true);
        const response = await axios(config);
        setData(response.data);
      } catch (error) {
        toast({
          isClosable: true,
          duration: 5000,
          status: "error",
          title: "Something went wrong, please check connection and try again",
          position: "top",
        });
      } finally {
        setIsLoading(false);
      }
    }

    const redirectIfnotAuthenticated = async () => {
      const isUserAuthenticated = await getAuthenticatedUser();
      if (
        isUserAuthenticated?.authenticated === false ||
        isUserAuthenticated?.user?.details?.user_type === "customer"
      ) {
        router.push("/auth?p=login");
      }
    };

    async function fetchBalance() {
      const config = {
        method: "get",
        url: `${BASE_URL}/api/agent/wallet_balance`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
      };

      try {
        setIsLoading(true);
        const response = await axios(config);

        setBalance(response?.data);
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

    fetchBalance();
    redirectIfnotAuthenticated();
    fetchData();
  }, [bearerToken, toast, router]);

  return (
    <Box>
      <Head>
        <title>NAIRABOOM - Agent Dashboard</title>
        <meta name="user dashboard" content="nairaboom.ng customer dashboard" />
      </Head>
      <AgentDashboard />
    </Box>
  );
}
