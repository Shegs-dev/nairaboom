import {
  Box,
  Text,
  Avatar,
  Link,
  Input,
  Checkbox,
  Button,
  Select,
  FormLabel,
  Spinner,
  useToast,
  InputGroup,
  InputLeftElement,
  HStack,
} from "@chakra-ui/react";
import Head from "next/head";
import Wrapper from "../../components/Wrapper";
import NextLink from "next/link";
import useUser from "../../lib/hooks/useUser";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import { useRouter } from "next/router";
import { AUTH_API_ROUTES } from "../../utils/routes";
import CurrencyInput from "react-currency-input-field";
import { useMediaQuery } from "@chakra-ui/react";
import PlayGameAgent from "../../components/dashboard/PlayGameAgent";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

const CashBack = () => {
  const { user } = useUser();
  const router = useRouter();
  const toast = useToast();

  const [bank, setBank] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [bankData, setBankData] = useState([]);
  const [isChecked, setIschecked] = useState(false);
  const [balance, setBalance] = useState("");
  const [gameRef, setgameRef] = useState(null);
  const [isLargerThan768] = useMediaQuery("(max-width: 768px)");

  let lat = useRef(0);
  let long = useRef(0);

  const bearerToken = user?.token;

  useEffect(() => {
    if (!bearerToken) return;
    navigator.geolocation.getCurrentPosition(function (position) {
      lat.current = position.coords.latitude;
      long.current = position.coords.longitude;
    });

    const fetchBankData = async () => {
      const bankconfig = {
        method: "get",
        url: `${BASE_URL}/api/bank_lists?start=0&len=209&paging=1`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
      };

      try {
        const response = await axios(bankconfig);
        setBankData(response.data.payload.content);
      } catch (err) {
        toast({
          status: "error",
          duration: 5000,
          title:
            "Something went wrong, please check your connection and try again",
          position: "top",
        });
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

        if (response?.data.payload.content[0].amount) {
          if (response?.data.payload.content[0].amount < 200) {
            toast({
              isClosable: true,
              duration: 3000,
              status: "error",
              title: `Insufficent balance, Please fund account with ₦${
                200 - response?.data.payload.content[0].amount
              }`,
              position: "top",
            });
            router.push("/agent_dashboard/fund_account");
          }
        }
      } catch (err) {
        toast({
          status: "error",
          isClosable: true,
          duration: "3000",
          title: "Please check your connection and try again",
          position: "top",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchBalance();
    fetchBankData();
  }, [bearerToken, toast]);

  const initialCashback = {
    cust_fullname: "",
    cust_phone_number: "",
    cust_email: "",
    amount: "",
    stake_amount: "",
    alert_type: "",
    cashback_time: "",
    date_received_alert: "",
    latitude: "",
    longitude: "",
  };
  const [cashBack, setCashback] = useState(initialCashback);

  const handleChange = (e) => {
    // if (bank === []) return;

    setCashback({
      ...cashBack,
      [e.target.name]: e.target.value.trim(),
      stake_amount:
        cashBack.amount > 1 && cashBack.amount < 20000
          ? 200
          : cashBack.amount >= 20000
          ? 0.02 * cashBack.amount
          : 0.0,
      latitude: `${lat.current}`,
      longitude: `${long.current}`,
      bank_lists_id: bank.length < 1 ? null : bank?.split(",")[0],
      bank_code: bank.length < 1 ? null : bank?.split(",")[1],
    });
  };

  const cashconfig = {
    method: "post",
    url: `${BASE_URL}/api/agent/play_stake`,
    headers: {
      "X-APP-KEY": NAIRABOOM_KEY,
      Authorization: `Bearer ${bearerToken}`,
    },
    data: cashBack,
  };

  const handleCashbackSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      if (cashBack.stake_amount > Number(balance?.payload?.content[0].amount)) {
        toast({
          isClosable: true,
          duration: 3000,
          status: "error",
          title: "Insufficient Balance",
          position: "top",
        });
        router.push("/agent_dashboard/wallet");
        return;
      }
      const response = await axios(cashconfig);
      if (response?.data?.status === false) {
        toast({
          isClosable: true,
          duration: 3000,
          status: "error",
          title: response.data.message,
          position: "top",
        });
        router.push("/agent_dashboard/wallet");
        return;
      }
      setgameRef(response.data.payload.game_ref);
      router.push({
        pathname: "/agent_dashboard/boomwheel",
        query: {
          ref: gameRef === null ? response.data.payload.game_ref : gameRef,
        },
      });
    } catch (err) {
      toast({
        isClosable: true,
        duration: 5000,
        status: "error",
        title: err?.response?.data?.message ? err?.response?.data?.message : "Some error occurred! check your connection.",
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const bankchange = (e) => {
    setBank(e.target.value);
    handleChange(e);
  };

  return <PlayGameAgent />;
};

export default CashBack;
