import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Text,
  useToast,
  useMediaQuery,
  Flex,
  VStack,
  Center,
  HStack,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/legacy/image";
import useSound from "use-sound";
import { useRouter } from "next/router";
import BoomWheelComp from "../pages/customer_dashboard/BoomWheelComp";
import { useWindowSize } from "react-use";
import useUser from "../lib/hooks/useUser";
import { AUTH_API_ROUTES } from "../utils/routes";
import axios from "axios";
const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;
// import jackpot from "../public/jackpot.jpg";
// import alert from "../public/alert.jpg";
import { BsChevronLeft } from "react-icons/bs";
// import bmusic from '../public/Embrace.mp3'

import jackpot from "../public/jackpot_.PNG";
import alert from "../public/alert_.PNG";

const Wheelcomp = () => {
  const router = useRouter();
  const toast = useToast();
  const { user } = useUser();
  const bearerToken = user?.token;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [boom_code, setboom_code] = useState(null);

  const [game_ref, setgame_ref] = useState(
    router.query.ref ? router?.query?.ref : router?.query?.ref
  );
  const winList = ["7", "15", "23", "31"];
  const segments = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
  ];

  const segColors = [
    "blue",
    "red",
    "purple",
    "pink",
    "orange",
    "yellow",
    "green",
    "#FFDB58",
    "blue",
    "red",
    "purple",
    "pink",
    "orange",
    "yellow",
    "green",
    "#FFDB58",
    "blue",
    "red",
    "purple",
    "pink",
    "orange",
    "yellow",
    "green",
    "#FFDB58",
    "blue",
    "red",
    "purple",
    "pink",
    "orange",
    "yellow",
    "green",
    "#FFDB58",
  ];
  var randNum = Math.floor(Math.random() * 10) + 1;
  const [confetti, setconfetti] = useState(false);
  const { width, height } = useWindowSize();
  const [confettiWidth, setconfettiWidth] = useState(0);
  const [settings, setsettings] = useState(null);
  const [isSettingMatched, setisSettingMatched] = useState(false);
  const [isSettingValue, setisSettingValue] = useState("");
  const [_token, set_token] = useState(null);
  const [expireCount, setexpireCount] = useState(0);
  const [finalResults, setFinalResults] = useState([]);
  const [mySpinResults, setMySpinResults] = useState([]);
  const [myBoomCode, setMyBoomCode] = useState([]);
  const [noOfGreens, setNoOfGreens] = useState(0);
  const isCustomer = router.pathname.includes("customer_dashboard");

  //verify gameRef
  useEffect(() => {
    if (!bearerToken) return;
    const verifyGameRef = async () => {
      const config = {
        method: "post",
        url: `${BASE_URL}/api/validate_game`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
        data: {
          game_ref: game_ref,
        },
      };
      const response = await axios(config);
      if (response?.data?.status === false) {
        if (response.data.message === "Please provide a valid game ticket") {
        } else {
          toast({
            isClosable: true,
            duration: 2000,
            status: "error",
            title: response.data.message,
            position: "top",
          });
        }
        isCustomer
          ? router.push("/customer_dashboard/cashback")
          : router.push("/agent_dashboard/cashback");
        return;
      }

      //CHecking for Predetermined result
      if (response?.data?.payload.length === 0){
        setMySpinResults([]);
      } else {
        let ticketNumber = response?.data?.payload?.ticket_number;
        let mSpinResults = [];
        if (ticketNumber === 0) {
          mSpinResults = genNotGreen(2);
          mSpinResults = genAnything(mSpinResults, 2);
        } else if (ticketNumber === 1) {
          mSpinResults = genNotGreen(1);
          mSpinResults.push(15);
          mSpinResults.push(7);
          mSpinResults.push(23);
          setNoOfGreens(3);
        } else if (ticketNumber === 2) {
          mSpinResults.push(15);
          mSpinResults.push(31);
          mSpinResults.push(7);
          mSpinResults.push(23);
          setNoOfGreens(4);
        } else if (ticketNumber === 7) {
          let stringBoomCode = localStorage.getItem("boomCode");
          const boomCodeArray = convertStringToArray(stringBoomCode);
          setMyBoomCode(boomCodeArray);
          mSpinResults.push(boomCodeArray[0]);
          mSpinResults.push(boomCodeArray[1]);
          mSpinResults.push(boomCodeArray[2]);
          mSpinResults.push(boomCodeArray[3]);
          setNoOfGreens(2);
        }
        setMySpinResults(mSpinResults);
      }
      toast({
        isClosable: true,
        duration: 5000,
        status: "success",
        title: "Game Session Valid. Spin Now",
        position: "top",
      });
    };
    verifyGameRef();
  }, [bearerToken, game_ref, router]);

  function convertStringToArray(inputString) {
    // Split the input string by "::" and convert substrings to integers
    const array = inputString?.split("::").map(Number);
    return array;
  }

  //Method to generate random numbers not green
  function genNotGreen(frequency) {
    let spinResults = [];
    let i = 0;
    while (true){
      let genNumber = Math.floor(Math.random() * 31) + 1;
      if (genNumber === 7 || genNumber === 15 || genNumber === 23 || genNumber === 31 || myBoomCode[0]
      ) {
        
      } else {
        spinResults.push(genNumber);
        i += 1;
      }

      if(i === frequency) {
        break;
      }
    }

    return spinResults;
  }

  //Method to generate random numbers that could be anything
  function genAnything(spinResults, frequency) {
    let i = 0;
    while (i < frequency){
      let genNumber = Math.floor(Math.random() * 31) + 1;

      spinResults.push(genNumber);
      i += 1;
    }

    return spinResults;
  }

  function spinWheel() {
    let spinResults = -1;
    let i = 0;
    while (true){
      let size = mySpinResults.length - 1;
      let genNumber = Math.floor(Math.random() * size);
      if (finalResults.length > 0) {
        if(finalResults.includes(mySpinResults[genNumber])){
          i = 1;
        } else {
          i = 0;
        }

        if(i !== 1) {
          spinResults = mySpinResults[genNumber];
          let resultsArr = finalResults;
          resultsArr.push(spinResults);
          setFinalResults(resultsArr);
          getLeftover(spinResults);
          break;
        }

        i = 0;
      } else {
        spinResults = mySpinResults[genNumber];
        let resultsArr = [];
        resultsArr.push(spinResults);
        setFinalResults(resultsArr);
        getLeftover(spinResults);
        break;
      }
    }

    return "" + spinResults;
  }

  //Method to get leftover
  function getLeftover(value) {
    let newArr = [];
    for(let i = 0; i < mySpinResults.length; i++){
      if(mySpinResults[i] !== value){
        newArr.push(mySpinResults[i]);
      }
    }

    setMySpinResults(newArr);
  }

  //Method to get cashback number
  function getCashbackNumber() {
    let numberString = "";
    for (let i = 0; i < mySpinResults.length; i++){
      numberString += ("" + mySpinResults[i]);

      if(i+1 < mySpinResults.length) {
        numberString += ":";
      }
    }

    return numberString;
  }

  //Method to get boom number
  function getBoomNumber() {
    if (noOfGreens === 2) {
      return "7";
    }

    let numberString = 0;
    for (let i = 0; i < mySpinResults.length; i++){
      if (mySpinResults[i] === 7 || mySpinResults[i] === 15 || mySpinResults[i] === 23 || mySpinResults[i] === 31) {
        numberString += 1;
      } 
    }

    if (numberString === 0){
      return "0";
    } else if (numberString === 1){
      return "3";
    } else if (numberString === 2){
      return "4";
    } else if (numberString === 3){
      return "1";
    } else if (numberString === 4){
      return "2";
    } else {
      return "";
    }
  }

  //Method to get colour scheme
  function getColourScheme() {
    let numberString = "";
    for (let i = 0; i < mySpinResults.length; i++){
      numberString += segColors[mySpinResults[i] - 1];

      if(i+1 < mySpinResults.length) {
        numberString += ":";
      }
    }

    return numberString;
  }

  function padZeros(cashNumber) {
    const numbers = cashNumber.split(":");

    // Use map to pad single-digit numbers with zero
    const paddedNumbers = numbers.map((number) => {
      // Convert the number to an integer and pad with zero
      return String(parseInt(number, 10)).padStart(2, "0");
    });

    // Join the padded numbers back with ':'
    const paddedCashNumber = paddedNumbers.join(":");

    return paddedCashNumber;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const UpdatePlaystake = async () => {
    try {
      const config = {
        method: "post",
        url: `${BASE_URL}/api/update_play_stake`,
        //url: "https://nairaboom.com.ng/api/update_play_stake",
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken || user?.token}`,
          "Content-Type": "text/plain;charset=utf-8",
        },
        data: {
          game_ref: game_ref || router?.query?.ref,
          colour_scheme: getColourScheme(),
          boom_box_number: getBoomNumber(),
          cashback_number: padZeros(getCashbackNumber()),
          // colour_scheme: `${
          //   !isSettingMatched
          //     ? segColors[winnerList[0] - 1]
          //     : isSettingValue === ""
          //     ? segColors[winnerList[0] - 1]
          //     : isSettingValue === "Jackpot"
          //     ? "green"
          //     : segColors[winnerList[0] - 1]
          // }:${
          //   !isSettingMatched
          //     ? segColors[winnerList[1] - 1]
          //     : isSettingValue === ""
          //     ? segColors[winnerList[1] - 1]
          //     : isSettingValue === "Alertboom"
          //     ? "green"
          //     : isSettingValue === "Jackpot"
          //     ? "green"
          //     : segColors[winnerList[1] - 1]
          // }:${
          //   !isSettingMatched
          //     ? segColors[winnerList[2] - 1]
          //     : isSettingValue === ""
          //     ? segColors[winnerList[2] - 1]
          //     : isSettingValue === "Alertboom"
          //     ? "green"
          //     : isSettingValue === "Jackpot"
          //     ? "green"
          //     : segColors[winnerList[2] - 1]
          // }:${
          //   !isSettingMatched
          //     ? segColors[winnerList[3] - 1]
          //     : isSettingValue === ""
          //     ? segColors[winnerList[3] - 1]
          //     : isSettingValue === "Alertboom"
          //     ? "green"
          //     : isSettingValue === "Jackpot"
          //     ? "green"
          //     : segColors[winnerList[3] - 1]
          // }`,
          // cashback_number:
          //   isSettingMatched && isSettingValue === "Boomcode"
          //     ? padZeros(
          //         `${boom_code?.[0]}:${boom_code?.[1]}:${boom_code?.[2]}:${boom_code?.[3]}`
          //       )
          //     : padZeros(
          //         `${winnerList[0]}:${winnerList[1]}:${winnerList[2]}:${winnerList[3]}`
          //       ),

          // padZeros(`31:16:5:22`),
          // `${winnerList[0]}:${winnerList[1]}:${winnerList[2]}:${winnerList[3]}`,
          // boom_box_number: !isSettingMatched
          //   ? settingsCheck(
          //       winnerList[0],
          //       winnerList[1],
          //       winnerList[2],
          //       winnerList[3]
          //     )
          //   : isSettingValue === ""
          //   ? settingsCheck(
          //       winnerList[0],
          //       winnerList[1],
          //       winnerList[2],
          //       winnerList[3]
          //     )
          //   : isSettingValue === "Boomcode"
          //   ? "7"
          //   : isSettingValue === "Alertboom"
          //   ? "1"
          //   : "2",
        },
      };
      
      const response = await axios(config);
      if (response?.data?.status === false) {
        if (expireCount < 1 || expireCount % 3 === 0) {
          toast({
            isClosable: true,
            duration: 5000,
            status: "error",
            title: response.data.message,
            position: "top",
          });
          setexpireCount(expireCount + 1);
        } else {
        }
        return;
      }
      if (
        response?.data.message ===
        "Your game session has ended. Restart game to play again"
      ) {
        // router.push("/agent_dashboard/cashback");
      } else {
        // toast({
        //   isClosable: true,
        //   duration: 5000,
        //   status: "success",
        //   title: "Game entry recorded",
        //   position: "top",
        // });
      }
    } catch (error) {
      toast({
        isClosable: true,
        duration: 5000,
        status: "error",
        title: `"Error updating play stake:", ${error.message}`,
        position: "top",
      });
    }
  };
  function convertStringToArray(inputString) {
    // Split the input string by "::" and convert substrings to integers
    const array = inputString?.split("::").map(Number);
    return array;
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
    const response = await axios(wheelconfig);

  };

  useEffect(() => {
    if (!bearerToken) return;
    const getter = async () => {
      const wheelconfig = {
        method: "get",
        url: `${BASE_URL}/api/wheel_tracker`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
      };
      const response = await axios(wheelconfig);

      setsettings(response?.data?.payload);
      if (response?.data) {
        if (
          parseInt(response?.data?.payload.spin_cycle_counter) + 1 ===
          parseInt(
            response?.data?.payload.spin_cycle_settings[0].ticket_cycle
          ) +
            1
        ) {
          //if not set
          if (
            parseInt(
              response?.data?.payload.spin_cycle_settings[0].ticket_cycle
            ) === 0
          ) {
            setisSettingMatched(false);
            return;
          }
          // settings === null ? 0: settings.spin_cycle_counter === settings.spin_cycle_settings[]
          setisSettingMatched(true);
          setisSettingValue("Alertboom");
        } else if (
          parseInt(response?.data?.payload.spin_cycle_counter) + 1 ===
          parseInt(
            response?.data?.payload.spin_cycle_settings[1].ticket_cycle
          ) +
            1
        ) {
          //if not set
          if (
            parseInt(
              response?.data?.payload.spin_cycle_settings[1].ticket_cycle
            ) === 0
          ) {
            setisSettingMatched(false);
            return;
          }
          setisSettingMatched(true);
          setisSettingValue("Jackpot");
        } else if (
          parseInt(response?.data?.payload.spin_cycle_counter) + 1 ===
          parseInt(
            response?.data?.payload.spin_cycle_settings[2].ticket_cycle
          ) +
            1
        ) {
          //if not set
          if (
            parseInt(
              response?.data?.payload.spin_cycle_settings[2].ticket_cycle
            ) === 0
          ) {
            setisSettingMatched(false);
            return;
          }
          setisSettingMatched(true);
          setisSettingValue("Boomcode");
        } else {
          setisSettingMatched(false);
          setisSettingValue("");
        }
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
    getter();
    fetchWishClock();
  }, [bearerToken]);
  // check if win

  // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  const [play, { stop }] =
    // useSound(music)
    useSound(
      "https://www.chosic.com/wp-content/uploads/2021/07/Embrace(chosic.com).mp3"
    );

  const audioRef = useRef();

  const aplay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    } else {
      // Throw error
    }
  };
  const onFinished = async (newWin) => {
    newWin = mySpinResults[winnerList.length];
    setconfetti(width);
    setiisOpen(true);
    setwinner_(newWin);
    winnerList.push(newWin);
    setconfetti(true);

    if (winnerList?.length === 4) {
      if (
        isSettingMatched &&
        (isSettingValue === "Alertboom" ||
          isSettingValue === "Jackpot" ||
          isSettingValue === "Boomcode")
      ) {
        setiisOpen(false);
        setwonModal(true);
        setconfetti(true);
      }
      getBoomNumber();
      await UpdatePlaystake();
    }
    //
    musicPlayers.current?.play();
    // play();
    aplay();

    setTimeout(() => {
      musicPlayers.current?.pause();
      musicPlayers.current?.pause();
      stop();
      stop();
      setconfetti(0);
    }, 2000);
  };

  const someFunc = () => {
    setiisOpen(false);
    onClose();
    musicPlayers.current?.pause();
    musicPlayers.current?.pause();
    stop();
  };

  const [iisOpen, setiisOpen] = useState(false);
  const [wonModal, setwonModal] = useState(false);

  const [winner_, setwinner_] = useState(null);

  const [winnerList, setwinnerList] = useState([]);
  //sound
  const musicPlayers = useRef(
    typeof Audio !== "undefined"
      ? new Audio(
          // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          "https://www.chosic.com/wp-content/uploads/2021/07/Embrace(chosic.com).mp3"
        )
      : undefined
  );
  const [playing, setPlaying] = useState(false);
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  useEffect(() => {
    if (winnerList.length === 4) {
      UpdatePlaystake();
    } else {
    }
  }, [winnerList]);

  function areArraysEqual(arr1, arr2) {
    // Check if both arrays are null or undefined
    if (!arr1 && !arr2) {
      return true;
    }

    // Check if only one of the arrays is null or undefined
    if (!arr1 || !arr2) {
      return false;
    }

    // Check if arrays have different lengths
    if (arr1.length !== arr2.length) {
      return false;
    }

    // Compare elements at each position
    for (let i = 0; i < arr1.length; i++) {
      // Check for null or undefined elements
      if (
        arr1[i] === null ||
        arr2[i] === null ||
        arr1[i] === undefined ||
        arr2[i] === undefined
      ) {
        return false;
      }

      // Compare elements at the current position
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    // If all checks pass, arrays are equal
    return true;
  }

  const settingsCheck = (val1, val2, val3, val4) => {
    let color1 = segColors[val1 - 1];
    let color2 = segColors[val2 - 1];
    let color3 = segColors[val3 - 1];
    let color4 = segColors[val4 - 1];

    function checkColor(array) {
      let count = 0;

      for (let i = 0; i < array.length; i++) {
        if (array[i] === "green") {
          count++;
        }
      }

      return count;
    }
    function checkDuplicateNumbers(array) {
      for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
          if (array[i] === array[j]) {
            return [true, i, j];
          }
        }
      }
      return [false];
    }
    let color_array = [color1, color2, color3, color4];
    let green_count = checkColor(color_array);
    // Check for boom condition first
    // const boom_checker = areArraysEqual([31, 16, 5, 22], boom_code);
    const boom_checker = areArraysEqual(winnerList, boom_code);
    if (boom_checker) {
      return "7";
    }
    if (green_count === 1) {
      return "3";
    }
    if (green_count === 2) {
      const d = checkDuplicateNumbers(winnerList);
      // if (d[0] === true) {
      //   if (d[1] === d[2]) {
      //     if (isCustomer) {
      //       return "6";
      //     } else {
      //       return "5";
      //     }
      //   }
      // }
      return "4";
    }
    // Check for other conditions
    if (!color_array.includes("green")) {
      return "0";
    }
    // const boom_checker = areArraysEqual(winnerList, boom_code);
    // const boom_checker = areArraysEqual([31, 16, 5, 22], boom_code);
    // if (boom_checker) {
    //   return "7";
    // }

    // if (!color_array.includes("green")) {
    //   return "0";
    // }
    // if (green_count === 3) {
    //   return 1;
    // }
    // if (green_count === 4) {
    //   return 2;
    // }
  };

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  return (
    <>
      <Head>
        <title>NairaBoom {isCustomer ? "Customer" : "Agent"} BoomWheel</title>
        <meta name="user dashboard" content="nairaboom.ng agent dashboard" />
      </Head>
      <VStack
        bgImage="/redesign/dashboard/boomwheel.png"
        bgPos="bottom"
        py={10}
        color="white"
        minH="100vh"
        overflow="hidden"
      >
        <VStack
          h={{ base: "80vh", md: "fit-content" }}
          spacing={{ base: 20, md: 8 }}
          alignItems="center"
        >
          <Center pos="relative" w="90%" maxW="60rem">
            <Box
              pos="absolute"
              left={0}
              display={{ base: "none", md: "block" }}
            >
              <BsChevronLeft size={25} onClick={() => router.back()} />
            </Box>
            <Button variant="unstyled">
              <BsChevronLeft size={25} onClick={() => router.back()} />
            </Button>
            <Text fontSize="1.5rem" fontWeight={600}>
              Spin To Cashout!
            </Text>
          </Center>
          <Box pl={{ base: 28, md: 44 }}>
          {mySpinResults.length === 4 ? (
            <BoomWheelComp
              segments={randNum % 2 === 0 ? segments : segments.reverse()}
              segColors={segColors}
              size={290}
              onFinished={onFinished}
              isOnlyOnce={winnerList.length >= 4 ? true : false}
              targetNumber={mySpinResults}
              position={winnerList.length}
            />
          ) : (
            <p>Still loading...</p>
          )}
          </Box>
          <VStack className="wheeldownbox" mt={0} spacing={{ base: 8, lg: 8 }}>
            <HStack>
              <Flex
                h="3rem"
                w="3rem"
                justifyContent="center"
                alignItems="center"
                // bg="#002047"
                backgroundColor={
                  winnerList[0] === null || winnerList[0] === undefined
                    ? "#002047"
                    : isSettingMatched
                    ? isSettingValue === "Jackpot"
                      ? "green"
                      : segColors[winnerList[0] - 1]
                    : segColors[winnerList[0] - 1]
                }
                // backgroundColor={
                //   winnerList[0] === null || winnerList[0] === undefined
                //     ? "#002047"
                //     : isSettingMatched
                //     ? // ? isSettingValue === "Jackpot"
                //       //   ? "green"
                //       //   : segColors[winnerList[0] - 1]
                //       isSettingValue === "Jackpot"
                //       ? "green"
                //       : isSettingValue === "Boomcode"
                //       ? segColors[winnerList[0] - 1]
                //       : "green"
                //     : segColors[winnerList[0] - 1]
                // }
                fontWeight={600}
                borderRadius="100%"
              >
                {isSettingMatched && isSettingValue === "Boomcode" ? (
                  <>
                    {winnerList[0] === null || winnerList[0] === undefined
                      ? null
                      : boom_code?.[0]}
                  </>
                ) : (
                  <>
                    {winnerList[0] === null || winnerList[0] === undefined
                      ? winnerList[0]
                      : winnerList[0]}
                  </>
                )}
              </Flex>
              <Flex
                h="3rem"
                w="3rem"
                justifyContent="center"
                alignItems="center"
                // bg="#002047"
                backgroundColor={
                  winnerList[1] === null || winnerList[1] === undefined
                    ? "#002047"
                    : isSettingMatched
                    ? isSettingValue === "Jackpot"
                      ? "green"
                      : isSettingValue === "Boomcode"
                      ? segColors[winnerList[1] - 1]
                      : "green"
                    : segColors[winnerList[1] - 1]
                }
                fontWeight={600}
                borderRadius="100%"
              >
                {isSettingMatched && isSettingValue === "Boomcode" ? (
                  <>
                    {winnerList[1] === null || winnerList[1] === undefined
                      ? null
                      : boom_code?.[1]}
                  </>
                ) : (
                  <>
                    {winnerList[1] === null || winnerList[1] === undefined
                      ? winnerList[1]
                      : winnerList[1]}
                  </>
                )}
              </Flex>
              <Flex
                h="3rem"
                w="3rem"
                justifyContent="center"
                alignItems="center"
                // bg="#002047"
                backgroundColor={
                  winnerList[2] === null || winnerList[2] === undefined
                    ? "#002047"
                    : isSettingMatched
                    ? // ? isSettingValue === "Jackpot"
                      //   ? "green"
                      //   : "green"
                      isSettingValue === "Jackpot"
                      ? "green"
                      : isSettingValue === "Boomcode"
                      ? segColors[winnerList[2] - 1]
                      : "green"
                    : segColors[winnerList[2] - 1]
                }
                fontWeight={600}
                borderRadius="100%"
              >
                {/* {winnerList[2] === null || winnerList[2] === undefined
                  ? winnerList[2]
                  : winnerList[2]} */}

                {isSettingMatched && isSettingValue === "Boomcode" ? (
                  <>
                    {winnerList[2] === null || winnerList[2] === undefined
                      ? null
                      : boom_code?.[2]}
                  </>
                ) : (
                  <>
                    {winnerList[2] === null || winnerList[2] === undefined
                      ? winnerList[2]
                      : winnerList[2]}
                  </>
                )}
              </Flex>
              <Flex
                h="3rem"
                w="3rem"
                justifyContent="center"
                alignItems="center"
                // bg="#002047"
                backgroundColor={
                  winnerList[3] === null || winnerList[3] === undefined
                    ? "#002047"
                    : isSettingMatched
                    ? // ? isSettingValue === "Jackpot"
                      //   ? "green"
                      //   : "green"
                      isSettingValue === "Jackpot"
                      ? "green"
                      : isSettingValue === "Boomcode"
                      ? segColors[winnerList[3] - 1]
                      : "green"
                    : segColors[winnerList[3] - 1]
                }
                fontWeight={600}
                borderRadius="100%"
              >
                {/* {winnerList[3] === null || winnerList[3] === undefined
                      ? winnerList[3] // If you want to render nothing when winnerList[3] is null or undefined
                      : winnerList[3]} */}

                {isSettingMatched && isSettingValue === "Boomcode" ? (
                  <>
                    {winnerList[3] === null || winnerList[3] === undefined
                      ? null
                      : boom_code?.[3]}
                  </>
                ) : (
                  <>
                    {winnerList[3] === null || winnerList[3] === undefined
                      ? winnerList[3]
                      : winnerList[3]}
                  </>
                )}
              </Flex>
            </HStack>
            <Button
              onClick={() => {
                isCustomer
                  ? router.push("/customer_dashboard")
                  : router.push("/agent_dashboard");
                getter2();
              }}
              variant="brand-solid"
              bg="#002047"
            >
              Restart Game
            </Button>
          </VStack>
        </VStack>
      </VStack>
      {/* <Box
        display={"flex"}
        gap={{ base: "0.8rem", lg: "1.25em" }}
        my={{ base: "2em" }}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Text
          fontWeight={700}
          fontSize="1.5rem"
          color="nairablue"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          p={"1em"}
          // backgroundColor={
          //   winnerList[0] === null || winnerList[0] === undefined
          //     ? "gray.500"
          //     : (isSettingMatched && isSettingValue === 'Jackpot')
          //     // Number(settings?.spin_cycle_counter + 1) ===
          //     //     Number(settings?.spin_cycle_settings[0].ticket_cycle) + 1 ||
          //     //   Number(settings?.spin_cycle_counter + 1) ===
          //     //     Number(settings?.spin_cycle_settings[0].ticket_cycle) + 1
          //     ? "green"
          //     : segColors[winnerList[0] - 1]
          // }
          backgroundColor={
            winnerList[0] === null || winnerList[0] === undefined
              ? "gray.500"
              : isSettingMatched
              ? isSettingValue === "Jackpot"
                ? "green"
                : segColors[winnerList[0] - 1]
              : segColors[winnerList[0] - 1]
          }
          borderRadius={"10px"}
        >
          {winnerList[0] === null || winnerList[0] === undefined
            ? winnerList[0]
            : winnerList[0]}
        </Text>
        <Text
          fontWeight={700}
          fontSize="1.5rem"
          color="nairablue"
          p={"1em"}
          backgroundColor={
            winnerList[1] === null || winnerList[1] === undefined
              ? "gray.500"
              : isSettingMatched
              ? "green"
              : segColors[winnerList[1] - 1]
          }
          borderRadius={"10px"}
        >
          {winnerList[1] === null || winnerList[1] === undefined
            ? winnerList[1]
            : winnerList[1]}
        </Text>
        <Text
          fontWeight={700}
          fontSize="1.5rem"
          color="nairablue"
          p={"1em"}
          backgroundColor={
            winnerList[2] === null || winnerList[2] === undefined
              ? "gray.500"
              : isSettingMatched
              ? "green"
              : segColors[winnerList[2] - 1]
          }
          borderRadius={"10px"}
        >
          {winnerList[2] === null || winnerList[2] === undefined
            ? winnerList[2]
            : winnerList[2]}
        </Text>
        <Text
          fontWeight={700}
          fontSize="1.5rem"
          color="nairablue"
          p={"1em"}
          backgroundColor={
            winnerList[3] === null || winnerList[3] === undefined
              ? "gray.500"
              : isSettingMatched
              ? isSettingValue === "Jackpot"
                ? "green"
                : segColors[winnerList[3] - 1]
              : segColors[winnerList[3] - 1]
          }
          borderRadius={"10px"}
        >
          {winnerList[3] === null || winnerList[3] === undefined
            ? winnerList[3]
            : winnerList[3]}
        </Text>
      </Box> */}
      {/* <Button
        className="submit__reg"
        mt="2rem"
        w="8.6rem"
        border={"none"}
        color="white"
        bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
        type={"submit"}
        fontWeight={600}
        fontSize=".8rem"
        mb="2rem"
        cursor={"pointer"}
        _hover={{ transform: "scale(1.05)" }}
        onClick={() => {
          isCustomer
            ? router.push("/customer_dashboard/cashback")
            : router.push("/agent_dashboard/cashback");
          getter2();
        }}
      >
        Restart game
      </Button> */}

      <Modal isCentered isOpen={iisOpen} onClose={someFunc}>
        <ModalOverlay />
        <ModalContent
          fontFamily={"poppins"}
          w={{ base: "90%", md: "40%" }}
          maxW={"95%"}
          p={{ base: "1rem", md: "3rem" }}
        >
          {/* <ModalHeader textAlign={"center"} fontWeight={700} fontSize="1.5rem">
            {winnerList?.length === 1
              ? `You’ve got 3 more spins to go`
              : winnerList?.length === 2
              ? `Keep spinning!`
              : winnerList?.length === 3
              ? `One more spin.....`
              : winnerList?.length === 4
              ? `Sorry your colors didn’t match this time but you have
              qualified for Bonus Draw via your giveaway code: `
              : "Sorry Spin session has ended. Please restart game"}
          </ModalHeader> */}

          <ModalHeader textAlign={"center"} fontWeight={700} fontSize="1.5rem">
            {winnerList?.length === 1 ? (
              `You’ve got 3 more spins to go`
            ) : winnerList?.length === 2 ? (
              `Keep spinning!`
            ) : winnerList?.length === 3 ? (
              `One more spin.....`
            ) : winnerList?.length === 4 ? (
              Number(noOfGreens) === 3 ? (
                <>
                  <ModalHeader
                    textAlign={"center"}
                    fontWeight={600}
                    fontSize="1.2rem"
                  >
                    Boomgratulations
                  </ModalHeader>
                  <Box
                    mx={"auto"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Image
                      width={"150%"}
                      height={"150%"}
                      src={alert}
                      alt="frame"
                    />
                  </Box>
                  <ModalHeader
                    textAlign={"center"}
                    fontWeight={700}
                    fontSize="1.5rem"
                  >
                    YOU HAVE WON EVERY NAIRA IN YOUR Rollover WALLET
                    {/* YOU HAVE WON YOUR ALERT-2 */}
                  </ModalHeader>
                </>
              ) : Number(noOfGreens) === 4 ? (
                <>
                  <ModalHeader
                    textAlign={"center"}
                    fontWeight={600}
                    fontSize="1.2rem"
                  >
                    Congratulations! {`\n`} It&apos;s your lucky day
                  </ModalHeader>
                  <Box
                    mx={"auto"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Image
                      width={"150%"}
                      height={"150%"}
                      src={jackpot}
                      alt="frame"
                    />
                  </Box>
                  <ModalHeader
                    textAlign={"center"}
                    fontWeight={700}
                    fontSize="1.5rem"
                  >
                    YOU HAVE WON THE JACKPOT!!
                  </ModalHeader>
                </>
              ) : Number(noOfGreens) === 2 ? (
                <>
                  <ModalHeader
                    textAlign={"center"}
                    fontWeight={600}
                    fontSize="1.2rem"
                  >
                    Congratulations!
                  </ModalHeader>
                  <Box
                    mx={"auto"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Image
                      width={"150%"}
                      height={"150%"}
                      src={alert}
                      alt="frame"
                    />
                  </Box>
                  <ModalHeader
                    textAlign={"center"}
                    fontWeight={700}
                    fontSize="1.5rem"
                  >
                    {/* YOU HAVE WON THE BOOMCODE!. */}
                    YOUR CASHOUT IS SUCCESSFUL !!.
                  </ModalHeader>
                </>
              ) : settingsCheck(
                  winnerList[0],
                  winnerList[1],
                  winnerList[2],
                  winnerList[3]
                ) === "3" ? (
                <>
                  <ModalHeader
                    textAlign={"center"}
                    fontWeight={600}
                    fontSize="1.2rem"
                  >
                    Boomgratulations
                  </ModalHeader>

                  <ModalHeader
                    textAlign={"center"}
                    fontWeight={600}
                    fontSize="1.2rem"
                  >
                    You have successfully rolled over your alert plus 1,000 Naira
                    in your Rollover Wallet!
                  </ModalHeader>
                </>
              ) : settingsCheck(
                  winnerList[0],
                  winnerList[1],
                  winnerList[2],
                  winnerList[3]
                ) === "4" ? (
                // "You Just Won 250 Naira in your Boom Wallet!!"
                // "YOU HAVE WON 50% OF YOUR ALERT IN YOUR BOOM WALLET"

                <>
                  <ModalHeader
                    textAlign={"center"}
                    fontWeight={600}
                    fontSize="1.2rem"
                  >
                    Boomgratulations
                  </ModalHeader>
                  <ModalHeader
                    textAlign={"center"}
                    fontWeight={600}
                    fontSize="1.2rem"
                  >
                    You have successfully rolled over your alert plus 50% in your
                    Rollover Wallet!
                  </ModalHeader>
                </>
              ) : settingsCheck(
                  winnerList[0],
                  winnerList[1],
                  winnerList[2],
                  winnerList[3]
                ) === "5" ? (
                // "You Just Won 250% of Your Stake"
                <>
                  <ModalHeader
                    textAlign={"center"}
                    fontWeight={600}
                    fontSize="1.2rem"
                  >
                    Boomgratulations
                  </ModalHeader>
                  <ModalHeader
                    textAlign={"center"}
                    fontWeight={600}
                    fontSize="1.2rem"
                  >
                    You Just Won 250% of Your Stake
                  </ModalHeader>
                </>
              ) : settingsCheck(
                  winnerList[0],
                  winnerList[1],
                  winnerList[2],
                  winnerList[3]
                ) === "7" ? (
                // "You Just Won 250 Naira in your Boom Wallet!!"
                // "YOU HAVE WON 50% OF YOUR ALERT IN YOUR BOOM WALLET"

                <>
                  <ModalHeader
                    textAlign={"center"}
                    fontWeight={600}
                    fontSize="1.2rem"
                  >
                    Boomgratulations
                  </ModalHeader>
                  <ModalHeader
                    textAlign={"center"}
                    fontWeight={600}
                    fontSize="1.2rem"
                  >
                    YOU HAVE WON THE CROSSOVER
                  </ModalHeader>
                </>
              ) : (
                `Sorry your cashout keys & color codes didn't match but you have rolled over your Alert. Keep building your Rollover wallet!.
                `
              )
            ) : (
              "Sorry Spin session has ended. Please restart game"
            )}
          </ModalHeader>
          <div style={{ marginHorizontal: "auto" }}>
            <Text
              fontWeight={700}
              fontSize={{ base: "1.0rem", md: "1.25rem" }}
              color="nairablue"
              textAlign={"center"}
            >
              {/* Spin Result: {winner_} */}
            </Text>
          </div>
          <div style={{ marginHorizontal: "auto", marginTop: "20px" }}>
            <Text
              fontWeight={700}
              fontSize={{ base: "1.0rem", md: "1.25rem" }}
              color="gray.500"
              textAlign={"center"}
            >
              {winnerList?.length >= 4 ? "" : "Tap screen to keep spinning"}
            </Text>
          </div>
          <ModalCloseButton />
          <ModalBody>
            {/* {winnerList?.length === 4 && checkWin() && "You won"}
            {winnerList?.length === 4 && !checkWin() && "You Lost, try again"} */}
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Won Modal */}
      <Modal
        isCentered
        isOpen={wonModal}
        onClose={() => {
          setwonModal(false);
          setconfetti(false);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent
          fontFamily={"poppins"}
          w={{ base: "90%", md: "40%" }}
          maxW={"95%"}
          p={{ base: "1rem", md: "3rem" }}
        >
          {/* <ModalHeader textAlign={"center"} fontWeight={700} fontSize="1.5rem">
            Hurrayyyy!
          </ModalHeader>
          <div style={{ marginHorizontal: "auto" }}>
            <Text
              fontWeight={700}
              fontSize={{ base: "1.0rem", md: "1.25rem" }}
              color="nairablue"
              textAlign={"center"}
            >
              You won the {isSettingValue}
              {Number(settings?.spin_cycle_counter + 1) ===
              Number(settings?.spin_cycle_settings[0].ticket_cycle) + 1
                ? "ALERTBOOM"
                : Number(settings?.spin_cycle_counter + 1) ===
                  Number(settings?.spin_cycle_settings[1].ticket_cycle) + 1
                ? "JACKPOT"
                : null} 
               {isSettingValue}
            </Text>
          </div> */}
          {isSettingValue === "Alertboom" && (
            <>
              <ModalHeader
                textAlign={"center"}
                fontWeight={700}
                fontSize="1.2rem"
              >
                {/* Congratulations */}
                BOOM!
              </ModalHeader>
              <Box mx={"auto"} justifyContent={"center"} alignItems={"center"}>
                <Image width={"150%"} height={"150%"} src={alert} alt="frame" />
              </Box>
              <ModalHeader
                textAlign={"center"}
                fontWeight={700}
                fontSize="1.5rem"
              >
                YOU HAVE WON YOUR ROLLOVER WALLET
              </ModalHeader>
            </>
          )}
          {isSettingValue === "Jackpot" && (
            <>
              <ModalHeader
                textAlign={"center"}
                fontWeight={600}
                fontSize="1.2rem"
              >
                {/* Hurrayyyy...... It&apos;s your lucky day */}
                Congratulations!
                <br />
                It’s your lucky day
              </ModalHeader>
              <Box mx={"auto"} justifyContent={"center"} alignItems={"center"}>
                <Image
                  width={"150%"}
                  height={"150%"}
                  src={jackpot}
                  alt="frame"
                />
              </Box>
              <ModalHeader
                textAlign={"center"}
                fontWeight={700}
                fontSize="1.5rem"
              >
                YOU HAVE WON THE JACKPOT!!
              </ModalHeader>
            </>
          )}
          {isSettingValue === "Boomcode" && (
            <>
              <ModalHeader
                textAlign={"center"}
                fontWeight={600}
                fontSize="1.2rem"
              >
                Congratulations!
              </ModalHeader>
              <Box mx={"auto"} justifyContent={"center"} alignItems={"center"}>
                <Image width={"150%"} height={"150%"} src={alert} alt="frame" />
              </Box>
              <ModalHeader
                textAlign={"center"}
                fontWeight={700}
                fontSize="1.5rem"
              >
                YOUR CASHOUT IS SUCCESSFUL !!.
              </ModalHeader>
            </>
          )}

          <ModalCloseButton />
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
      <audio ref={audioRef} src="/musicend.mp3" />
    </>
  );
};

export default Wheelcomp;
