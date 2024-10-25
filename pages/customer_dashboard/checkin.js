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
  import { useState, useEffect } from "react";
  import axios from "axios";
  import { AUTH_API_ROUTES } from "../../utils/routes";
  import { useRef } from "react";
  import { useRouter } from "next/router";
  import { consumers } from "form-data";
  import { NumericFormat } from "react-number-format";
  import numeral from "numeral";
  
  import CurrencyInput from "react-currency-input-field";
  import { useMediaQuery } from "@chakra-ui/react";
  import PlayGameUser from "../../components/dashboard/PlayGameUser";
  
  const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
  const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;
  
  const Checkin = () => {
    const { user } = useUser();
    const router = useRouter();
    const toast = useToast();
  
    const [isLoading, setIsLoading] = useState(false);
    const [bankData, setBankData] = useState([]);
    const [isChecked, setIschecked] = useState(false);
    const [coordinate, setCoordinates] = useState([]);
    const [asyncGenerated, setAsyncGenerated] = useState();
  
    const [boomNumbers, setBoomNumbers] = useState([]);
    const [amount, setamount] = useState(null);
    const [balance, setbalance] = useState(null);
    const [gameRef, setgameRef] = useState(null);
    const [amountFormat, setamountFormat] = useState(0);
    const [isLargerThan768] = useMediaQuery("(max-width: 768px)");
  
    let lat = useRef(0);
    let long = useRef(0);
  
    const generateBoomConfig = {
      method: "get",
      url: `${BASE_URL}/api/auto_generated_numbers`,
      headers: {
        "X-APP-KEY": NAIRABOOM_KEY,
        Authorization: `Bearer ${user?.token}`,
      },
    };
  
    const generate = async () => {
      try {
        const res = await axios(generateBoomConfig);
        setAsyncGenerated(res?.data.payload);
      } catch (e) {
      }
    };
  
    let genBoom = [];
    const generateNumbers = () => {
      genBoom = [];
      const min = 0;
      const max = 69;
      let generated;
      for (let i = 0; i < 3; i++) {
        generated = Math.floor(Math.random() * (max - min)) + min;
        genBoom.push(generated);
      }
      setBoomNumbers(genBoom);
    };
  
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
        }
      };
      fetchBankData();
      const winningConfig = {
        method: "get",
        url: `${BASE_URL}/api/profile`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
        redirect: "follow",
      };
  
      const winnings = async () => {
        try {
          const res = await axios(winningConfig);
        } catch (e) {
        }
      };
      winnings();
    }, [bearerToken, toast, user?.token]);
  
    const initialCashback = {
      amount: "",
      alert_type: "",
      date_received_alert: "",
      bank_lists_id: "",
      stake_amount: "",
      latitude: "",
      longitude: "",
    };
  
    const [cashBack, setCashback] = useState(initialCashback);
  
    const [valued, setValued] = useState("");
  
    const addComma = (val) => {
      const separateByComma = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
      const removeNonNumber = (num) => num.toString().replace(/[^0-9]/g, "");
      return separateByComma(removeNonNumber(val));
    };
  
    const handleChange = (e) => {
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
      });
  
      const rawValue = e.target.value;
      const formattedValue = numeral(rawValue).format("0,0");
    };
  
    const cashconfig = {
      method: "post",
      url: `${BASE_URL}/api/play_stake`,
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
        // if (cashBack.amount > Number(balance?.payload?.content[0].amount)) {
        if (cashBack.stake_amount > Number(balance?.payload?.content[0].amount)) {
          toast({
            isClosable: true,
            duration: 3000,
            status: "error",
            // title: response.data.message,
            title: "Insufficient Balance",
            position: "top",
          });
          router.push("/customer_dashboard/wallet");
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
          router.push("/customer_dashboard/wallet");
          return;
        }
  
        toast({
          isClosable: true,
          duration: 3000,
          status: "success",
          title: response.data.message,
          position: "top",
        });
        setgameRef(response.data.payload.game_ref);
        // router.push("/customer_dashboard/request_history");
        router.push({
          pathname: "/customer_dashboard/boomwheel",
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
  
    useEffect(() => {
      if (!bearerToken) return;
      const fetchBalance = async () => {
        const config = {
          method: "get",
          url: `${BASE_URL}/api/wallet_balance`,
          headers: {
            "X-APP-KEY": NAIRABOOM_KEY,
            Authorization: `Bearer ${bearerToken}`,
          },
        };
  
        try {
          setIsLoading(true);
          const response = await axios(config);
  
          setbalance(response?.data);
  
          if (response?.data.payload.content[0].amount) {
            // if (response?.data.payload.content[0].amount < 200) {
            //   toast({
            //     isClosable: true,
            //     duration: 3000,
            //     status: "error",
            //     title: `Insufficent balance, Please fund account with ₦${
            //       200 - response?.data.payload.content[0].amount
            //     }`,
            //     position: "top",
            //   });
            //   router.push("/customer_dashboard/fund_account");
            // }
          }
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
      fetchBalance();
    }, [bearerToken, toast]);
  
    return <PlayGameUser />;
  };
  
  export default Checkin;
  