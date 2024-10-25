// import React, { useState, useRef, useEffect } from "react";
// import Wrapper from "../../components/Wrapper";
// import WheelComponent from "react-wheel-of-prizes";
// import {
//   Box,
//   Button,
//   Modal,
//   useDisclosure,
//   ModalOverlay,
//   ModalContent,
//   ModalBody,
//   ModalCloseButton,
//   Spinner,
//   Input,
//   ModalHeader,
//   FormLabel,
//   Select,
//   Text,
//   useToast,
//   Toast,
//   useMediaQuery,
// } from "@chakra-ui/react";
// import Head from "next/head";
// import Image from "next/image";
// import useSound from "use-sound";
// import { useRouter } from "next/router";
// import BoomWheelComp from "./BoomWheelComp";
// import Confetti from "react-confetti";
// import { useWindowSize } from "react-use";
// import useUser from "../../lib/hooks/useUser";
// import { AUTH_API_ROUTES } from "../../utils/routes";
// import axios from "axios";
// import { getTokenFromLocalStorage } from "../../lib/hooks/getAuthUser";

// // import 'react-wheel-of-prizes/dist/index.css'
// const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
// const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;
// const Boomwheel = () => {
//   const router = useRouter();
//   const toast = useToast();
//   const { user } = useUser();
//   const bearerToken = user?.token;
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const [game_ref, setgame_ref] = useState(
//     router.query.ref ? router?.query?.ref : router?.query?.ref
//   );
//   const winList = ["7", "15", "23", "31"];
//   const segments = [
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//     "10",
//     "11",
//     "12",
//     "13",
//     "14",
//     "15",
//     "16",
//     "17",
//     "18",
//     "19",
//     "20",
//     "21",
//     "22",
//     "23",
//     "24",
//     "25",
//     "26",
//     "27",
//     "28",
//     "29",
//     "30",
//     "31",
//     "32",
//   ];

//   const segColors = [
//     "blue",
//     "red",
//     "purple",
//     "pink",
//     "orange",
//     "yellow",
//     "green",
//     "#FFDB58",
//     "blue",
//     "red",
//     "purple",
//     "pink",
//     "orange",
//     "yellow",
//     "green",
//     "#FFDB58",
//     "blue",
//     "red",
//     "purple",
//     "pink",
//     "orange",
//     "yellow",
//     "green",
//     "#FFDB58",
//     "blue",
//     "red",
//     "purple",
//     "pink",
//     "orange",
//     "yellow",
//     "green",
//     "#FFDB58",
//   ];
//   var randNum = Math.floor(Math.random() * 10) + 1;

//   useEffect(() => {
//     
//   }, [router.query]);

//   const [confetti, setconfetti] = useState(false);
//   const { width, height } = useWindowSize();
//   const [confettiWidth, setconfettiWidth] = useState(0);
//   const [settings, setsettings] = useState(null);
//   const [isSettingMatched, setisSettingMatched] = useState(false);
//   const [isSettingValue, setisSettingValue] = useState("Alertboom");
//   const [_token, set_token] = useState(null);

//   //verify gameRef
//   useEffect(() => {
//     if (!bearerToken) return;
//     // if (!game_ref || game_ref === undefined || game_ref === null) {
//     //   router.push("/agent_dashboard/cashback");
//     // }
//     const verifyGameRef = async () => {
//       const config = {
//         method: "post",
//         url: `${BASE_URL}/api/validate_game`,
//         headers: {
//           "X-APP-KEY": NAIRABOOM_KEY,
//           Authorization: `Bearer ${bearerToken}`,
//         },
//         data: {
//           game_ref: game_ref,
//         },
//       };
//       const response = await axios(config);
//       if (response?.data?.status === false) {
//         toast({
//           isClosable: true,
//           duration: 5000,
//           status: "error",
//           title: response.data.message,
//           position: "top",
//         });
//         router.push("/agent_dashboard/cashback");
//         return;
//       }
//       toast({
//         isClosable: true,
//         duration: 5000,
//         status: "success",
//         title: "Game Session Valid. Spin Now",
//         position: "top",
//       });
//     };
//     verifyGameRef();
//   }, [bearerToken, game_ref, router]);

//   //update play stake
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const UpdatePlaystake = async () => {
//     const config = {
//       method: "post",
//       url: "https://nairaboom.com.ng/api/update_play_stake",
//       headers: {
//         "X-APP-KEY": NAIRABOOM_KEY,
//         Authorization: `Bearer ${bearerToken || user?.token}`,
//         "Content-Type": "text/plain;charset=utf-8",
//       },
//       data: {
//         game_ref: game_ref || router?.query?.ref,
//         colour_scheme: `${
//           !isSettingMatched
//             ? segColors[winnerList[0] - 1]
//             : isSettingValue === ""
//             ? segColors[winnerList[0] - 1]
//             : isSettingValue === "Jackpot"
//             ? "green"
//             : segColors[winnerList[0] - 1]
//         }:${
//           !isSettingMatched
//             ? segColors[winnerList[1] - 1]
//             : isSettingValue === ""
//             ? segColors[winnerList[1] - 1]
//             : isSettingValue === "Alertboom"
//             ? "green"
//             : isSettingValue === "Jackpot"
//             ? "green"
//             : segColors[winnerList[1] - 1]
//         }:${
//           !isSettingMatched
//             ? segColors[winnerList[2] - 1]
//             : isSettingValue === ""
//             ? segColors[winnerList[2] - 1]
//             : isSettingValue === "Alertboom"
//             ? "green"
//             : isSettingValue === "Jackpot"
//             ? "green"
//             : segColors[winnerList[2] - 1]
//         }:${
//           !isSettingMatched
//             ? segColors[winnerList[3] - 1]
//             : isSettingValue === ""
//             ? segColors[winnerList[3] - 1]
//             : isSettingValue === "Alertboom"
//             ? "green"
//             : isSettingValue === "Jackpot"
//             ? "green"
//             : segColors[winnerList[3] - 1]
//         }`,
//         cashback_number: `${winnerList[0]}:${winnerList[1]}:${winnerList[2]}:${winnerList[3]}`,
//         boom_box_number: !isSettingMatched
//           ? "0"
//           : isSettingValue === ""
//           ? "0"
//           : isSettingValue === "Alertboom"
//           ? "1"
//           : "2",
//       },
//     };
//     const response = await axios(config);
//     if (response?.data?.status === false) {
//       toast({
//         isClosable: true,
//         duration: 5000,
//         status: "error",
//         title: response.data.message,
//         position: "top",
//       });
//       return;
//     }

//     if (
//       response?.data.message ===
//       "Your game session has ended. Restart game to play again"
//     ) {
//       // router.push("/agent_dashboard/cashback");
//     } else {
//       toast({
//         isClosable: true,
//         duration: 5000,
//         status: "success",
//         title: "Game entry recorded",
//         position: "top",
//       });
//     }

//     //check Win
//   };

//   const getter2 = async () => {
//     const wheelconfig = {
//       method: "get",
//       url: `${BASE_URL}/api/wheel_tracker`,
//       headers: {
//         "X-APP-KEY": NAIRABOOM_KEY,
//         Authorization: `Bearer ${bearerToken}`,
//       },
//     };
//     const response = await axios(wheelconfig);
//   };

//   useEffect(() => {
//     if (!bearerToken) return;
//     const getter = async () => {
//       const wheelconfig = {
//         method: "get",
//         url: `${BASE_URL}/api/wheel_tracker`,
//         headers: {
//           "X-APP-KEY": NAIRABOOM_KEY,
//           Authorization: `Bearer ${bearerToken}`,
//         },
//       };
//       const response = await axios(wheelconfig);

//       setsettings(response?.data?.payload);
//       if (response?.data) {
//         if (
//           Number(response?.data?.payload.spin_cycle_counter) ===
//           Number(response?.data?.payload.spin_cycle_settings[0].ticket_cycle) +
//             1
//         ) {
//           // settings === null ? 0: settings.spin_cycle_counter === settings.spin_cycle_settings[]
//           setisSettingMatched(true);
//           setisSettingValue("Alertboom");
//         } else if (
//           Number(response?.data?.payload.spin_cycle_counter) ===
//           Number(response?.data?.payload.spin_cycle_settings[1].ticket_cycle) +
//             1
//         ) {
//           setisSettingMatched(true);
//           setisSettingValue("Jackpot");
//         } else {
//           setisSettingMatched(false);
//           setisSettingValue("Alertboom");
//         }
//       }
//     };
//     getter();
//   }, [bearerToken]);

//   // check if win
//   const checkWin = () => {
//     if (winList.length === 3 && winList.includes(...winList)) {
//       return true;
//     }
//     if (winList.length === 3 && !winList.includes(...winList)) {
//       return false;
//     }
//     return;
//   };
//   const [play, { stop }] = useSound(
//     "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
//   );
//   const onFinished = async (winner) => {
//     setconfetti(width);
//     setiisOpen(true);
//     setwinner_(winner);
//     winnerList.push(winner);
//     setconfetti(true);

//     if (winnerList?.length === 4) {
//       if (isSettingMatched) {
//         setiisOpen(false);
//         setwonModal(true);
//         setconfetti(true);
//       }
//     }
//     //
//     musicPlayers.current?.play();
//     play();

//     setTimeout(() => {
//       musicPlayers.current?.pause();
//       musicPlayers.current?.pause();
//       stop();
//       setconfetti(0);
//     }, 2000);
//   };

//   const someFunc = () => {
//     musicPlayers.current?.pause();
//     musicPlayers.current?.pause();
//     setconfetti(0);
//     setiisOpen(false);
//     onClose();
//   };

//   const [iisOpen, setiisOpen] = useState(false);
//   const [wonModal, setwonModal] = useState(false);

//   const [winner_, setwinner_] = useState(null);

//   const [winnerList, setwinnerList] = useState([]);

//   //sound
//   const musicPlayers = useRef(
//     typeof Audio !== "undefined"
//       ? new Audio(
//           "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
//         )
//       : undefined
//   );
//   const [playing, setPlaying] = useState(false);
//   const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

//   useEffect(() => {
//     if (winnerList.length === 4) {
//       UpdatePlaystake();
//     } else {
//     }
//   }, [UpdatePlaystake, winnerList]);

//   return (
//     <Wrapper>
//       <Head>
//         <title>NairaBoom Agent BoomWheel</title>
//         <meta name="user dashboard" content="nairaboom.ng dashboard" />
//       </Head>
//       <div style={{ overflowX: "scroll" }}>
//         <BoomWheelComp
//           segments={randNum % 2 === 0 ? segments : segments.reverse()}
//           segColors={segColors}
//           size={290}
//           onFinished={onFinished}
//           isOnlyOnce={winnerList.length >= 4 ? true : false}
//         />
//       </div>
//       <Box
//         display={"flex"}
//         gap={{ base: "0.8rem", lg: "1.25em" }}
//         my={{ base: "2em" }}
//         justifyContent={"center"}
//         alignContent={"center"}
//       >
//         <Text
//           fontWeight={700}
//           fontSize="1.5rem"
//           color="nairablue"
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//           flexDirection="column"
//           p={"1em"}
//           backgroundColor={
//             winnerList[0] === null || winnerList[0] === undefined
//               ? "gray.500"
//               : isSettingMatched
//               ? "green"
//               : segColors[winnerList[0] - 1]
//           }
//           borderRadius={"10px"}
//         >
//           {winnerList[0] === null || winnerList[0] === undefined
//             ? winnerList[0]
//             : winnerList[0]}
//         </Text>
//         <Text
//           fontWeight={700}
//           fontSize="1.5rem"
//           color="nairablue"
//           p={"1em"}
//           backgroundColor={
//             winnerList[1] === null || winnerList[1] === undefined
//               ? "gray.500"
//               : isSettingMatched
//               ? "green"
//               : segColors[winnerList[1] - 1]
//           }
//           borderRadius={"10px"}
//         >
//           {winnerList[1] === null || winnerList[1] === undefined
//             ? winnerList[1]
//             : winnerList[1]}
//         </Text>
//         <Text
//           fontWeight={700}
//           fontSize="1.5rem"
//           color="nairablue"
//           p={"1em"}
//           backgroundColor={
//             winnerList[2] === null || winnerList[2] === undefined
//               ? "gray.500"
//               : isSettingMatched
//               ? "green"
//               : segColors[winnerList[2] - 1]
//           }
//           borderRadius={"10px"}
//         >
//           {winnerList[2] === null || winnerList[2] === undefined
//             ? winnerList[2]
//             : winnerList[2]}
//         </Text>
//         <Text
//           fontWeight={700}
//           fontSize="1.5rem"
//           color="nairablue"
//           p={"1em"}
//           backgroundColor={
//             winnerList[3] === null || winnerList[3] === undefined
//               ? "gray.500"
//               : isSettingMatched
//               ? isSettingValue === "Jackpot"
//                 ? "green"
//                 : segColors[winnerList[3] - 1]
//               : segColors[winnerList[3] - 1]
//           }
//           borderRadius={"10px"}
//         >
//           {winnerList[3] === null || winnerList[3] === undefined
//             ? winnerList[3]
//             : winnerList[3]}
//         </Text>
//       </Box>
//       <Button
//         className="submit__reg"
//         mt="2rem"
//         w="8.6rem"
//         border={"none"}
//         color="white"
//         bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
//         type={"submit"}
//         fontWeight={600}
//         fontSize=".8rem"
//         mb="2rem"
//         cursor={"pointer"}
//         _hover={{ transform: "scale(1.05)" }}
//         onClick={() => {
//           router.push("/agent_dashboard/cashback");
//           getter2();
//         }}
//       >
//         Restart game
//       </Button>

//       <Modal isCentered isOpen={iisOpen} onClose={someFunc}>
//         {/* <Confetti width={iisOpen ? width : 0} height={height} /> */}
//         <ModalOverlay />
//         <ModalContent
//           fontFamily={"poppins"}
//           w={{ base: "90%", md: "40%" }}
//           maxW={"95%"}
//           p={{ base: "1rem", md: "3rem" }}
//         >
//           <ModalHeader textAlign={"center"} fontWeight={700} fontSize="1.5rem">
//             {winnerList?.length === 1
//               ? `You’ve got 3 more spins to go`
//               : winnerList?.length === 2
//               ? `Keep spinning!`
//               : winnerList?.length === 3
//               ? `One more spin.....`
//               : winnerList?.length === 4
//               ? Number(settings.spin_cycle_counter) ===
//                 Number(settings.spin_cycle_settings[0].ticket_cycle) + 1
//                 ? "You JUST WON YOUR BOOM ALERT!!!. Congratulations"
//                 : Number(settings.spin_cycle_counter) ===
//                   Number(settings.spin_cycle_settings[1].ticket_cycle) + 1
//                 ? "YOU JUST WON THE JACTPOT !!!!!!!!!!!!!!!!...NAIRABOOM SAYS CONGRATULATIONS"
//                 : `Sorry your colors didn’t match this time but you have
//               qualified for Bonus Draw via your giveaway code: `
//               : "Sorry Spin session has ended. Please restart game"}
//           </ModalHeader>

//           <div style={{ marginHorizontal: "auto" }}>
//             <Text
//               fontWeight={700}
//               fontSize={{ base: "1.0rem", md: "1.25rem" }}
//               color="nairablue"
//               textAlign={"center"}
//             >
//               Spin Result: {winner_}
//             </Text>
//           </div>
//           <div style={{ marginHorizontal: "auto", marginTop: "20px" }}>
//             <Text
//               fontWeight={700}
//               fontSize={{ base: "1.0rem", md: "1.25rem" }}
//               color="gray.500"
//               textAlign={"center"}
//             >
//               {winnerList?.length >= 4 ? "" : "Tap screen to keep spinning"}
//             </Text>
//           </div>
//           <ModalCloseButton />
//           <ModalBody>
//             {/* {winnerList?.length === 4 && checkWin() && "You won"}
//             {winnerList?.length === 4 && !checkWin() && "You Lost, try again"} */}
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//       {/* Won Modal */}
//       <Modal
//         isCentered
//         isOpen={wonModal}
//         onClose={() => {
//           setwonModal(false);
//           setconfetti(false);
//           onClose();
//         }}
//       >
//         <Confetti width={wonModal ? width : 0} height={height} />
//         <ModalOverlay />
//         <ModalContent
//           fontFamily={"poppins"}
//           w={{ base: "90%", md: "40%" }}
//           maxW={"95%"}
//           p={{ base: "1rem", md: "3rem" }}
//         >
//           <ModalHeader textAlign={"center"} fontWeight={700} fontSize="1.5rem">
//             Hurrayyyy!
//           </ModalHeader>

//           <div style={{ marginHorizontal: "auto" }}>
//             <Text
//               fontWeight={700}
//               fontSize={{ base: "1.0rem", md: "1.25rem" }}
//               color="nairablue"
//               textAlign={"center"}
//             >
//               You won the {isSettingValue}
//             </Text>
//           </div>
//           <ModalCloseButton />
//           <ModalBody>
//             {/* {winnerList?.length === 4 && checkWin() && "You won"}
//             {winnerList?.length === 4 && !checkWin() && "You Lost, try again"} */}
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </Wrapper>
//   );
// };

// export default Boomwheel;

import React from 'react';
import Wheelcomp from '../../components/Wheelcomp';

export default function Boomwheel() {
  return (
    <>
      <Wheelcomp/>
    </>
  )
}

