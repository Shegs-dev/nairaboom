import React, { useState, useRef } from "react";
import Wrapper from "../../components/Wrapper";
import WheelComponent from "react-wheel-of-prizes";
import {
  Box,
  Button,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Input,
  ModalHeader,
  FormLabel,
  Select,
  Text,
  useToast,
  Toast,
  useMediaQuery,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/legacy/image";
import useSound from "use-sound";
import { useRouter } from "next/router";
import BoomWheelComp from "./BoomWheelComp";
import ReactTurn from "./boom3";
// import SpinWheel from "./bmwheel";

// import 'react-wheel-of-prizes/dist/index.css'
export default function Boomwheel(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const router = useRouter();


  // check if win
  const checkWin = () => {
    if (winList.length === 3 && winList.includes(...winList)) {
      return true;
    }
    if (winList.length === 3 && !winList.includes(...winList)) {
      return false;
    }
    return;
  };
  const [play, { stop }] = useSound(
    // "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    "https://www.chosic.com/wp-content/uploads/2021/07/Embrace(chosic.com).mp3"
  );
  const onFinished = (winner) => {
    setiisOpen(true);
    setwinner_(winner);
    winnerList.push(winner);
    musicPlayers.current?.play();
    play();

    setTimeout(() => {
      musicPlayers.current?.pause();
    }, 2000);
  };

  const someFunc = () => {
    setiisOpen(false);
    onClose();
  };

  const [iisOpen, setiisOpen] = useState(false);
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
  return (
    <Wrapper>
      {/* <div>boomwheel</div> */}

      {/* desktop */}
      {/* <Box display={{ base: "none", lg: "block" }}>
        <BoomWheelComp
          segments={segments}
          segColors={segColors}
          size={220}
          onFinished={onFinished}
        />
      </Box> */}

      <Box justifySelf={"center"} marginLeft={'auto'} display={'flex'}>
        {/* <BoomWheelComp
            segments={segments}
            segColors={segColors}
            size={220}
            onFinished={onFinished}
          /> */}
        <ReactTurn
          onStart={() => {}}
          onComplete={(winner) => {
          }}
        />
        {/* <div
          className="winner"
          style={{
            visibility: winner ? "visible" : "hidden",
          }}
        >
          {winner}!!!
        </div> */}
      </Box>

      {/* mobile */}

      {/* mobile boomwheel */}
      {/* <Box display={{ base: "block", md: "block", lg: "none" }}>
        mobile
        <WheelComponent
          segments={segments}
          segColors={segColors}
          // winningSegment='8'
          onFinished={(winner) => onFinished(winner)}
          primaryColor="black"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={false}
          size={120}
          upDuration={30}
          downDuration={150}
          fontFamily="Arial"
        />
      </Box> */}
      <Box
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
          p={"1em"}
          backgroundColor={
            winnerList[0] === 31
              ? "green.400"
              : winnerList[0] === 23
              ? "green.400"
              : winnerList[0] === 7
              ? "green.400"
              : winnerList[0] === 15
              ? "green.400"
              : "gray.500"
          }
          borderRadius={"10px"}
        >
          {winnerList[0]}
        </Text>
        <Text
          fontWeight={700}
          fontSize="1.5rem"
          color="nairablue"
          p={"1em"}
          // backgroundColor={"gray.500"}
          backgroundColor={
            winnerList[1] === 31
              ? "green.400"
              : winnerList[1] === 23
              ? "green.400"
              : winnerList[1] === 7
              ? "green.400"
              : winnerList[1] === 15
              ? "green.400"
              : "gray.500"
          }
          borderRadius={"10px"}
        >
          {winnerList[1]}
        </Text>
        <Text
          fontWeight={700}
          fontSize="1.5rem"
          color="nairablue"
          p={"1em"}
          backgroundColor={
            winnerList[2] === 31
              ? "green.400"
              : winnerList[2] === 23
              ? "green.400"
              : winnerList[2] === 7
              ? "green.400"
              : winnerList[2] === 15
              ? "green.400"
              : "gray.500"
          }
          borderRadius={"10px"}
        >
          {winnerList[2]}
        </Text>
        <Text
          fontWeight={700}
          fontSize="1.5rem"
          color="nairablue"
          p={"1em"}
          backgroundColor={
            winnerList[3] === 31
              ? "green.400"
              : winnerList[3] === 23
              ? "green.400"
              : winnerList[3] === 7
              ? "green.400"
              : winnerList[3] === 15
              ? "green.400"
              : "gray.500"
          }
          borderRadius={"10px"}
        >
          {winnerList[3]}
        </Text>
      </Box>
      <Button
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
          router.push("/customer_dashboard");
        }}
      >
        Restart game
      </Button>

      <Modal isCentered isOpen={iisOpen} onClose={someFunc}>
        <ModalOverlay />
        <ModalContent
          fontFamily={"poppins"}
          w={{ base: "90%", md: "40%" }}
          maxW={"95%"}
          p={{ base: "1rem", md: "3rem" }}
        >
          <ModalHeader textAlign={"center"} fontWeight={700} fontSize="1.5rem">
            {winnerList?.length === 0
              ? `You’ve got 3 more spins to go`
              : winnerList?.length === 1
              ? `Keep spinning!`
              : winnerList?.length === 2
              ? `One more spin.....`
              : ""}
          </ModalHeader>
          <div style={{ marginHorizontal: "auto" }}>
            <Text
              fontWeight={700}
              fontSize={{ base: "1.25rem", md: "1.5rem" }}
              color="nairablue"
              textAlign={"center"}
            >
              Winner is : {winner_}
            </Text>
          </div>
          {/* <Box display={"flex"} justifyItems={'center'} alignItems="center" >

          </Box> */}
          <ModalCloseButton />
          <ModalBody>
            {winnerList?.length === 3 && checkWin() && "You won"}
            {winnerList?.length === 3 && !checkWin() && "You Lost, try again"}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Wrapper>
  );
}
