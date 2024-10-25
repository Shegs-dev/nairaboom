/* eslint-disable react/prop-types */
import { Box } from "@chakra-ui/react";
import React from "react";
import WheelComponent from "react-wheel-of-prizes";

function BoomWheelComp({ onFinished, size, segments, segColors, isOnlyOnce }) {
  const _segments = [
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

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  const rndInt = randomIntFromInterval(1, 6)
  return (
    <WheelComponent
      key={Math.random()}
      segments={segments || _segments}
      segColors={segColors}
      // winningSegment='8'
      onFinished={(winner) => onFinished(winner)}
      primaryColor="black"
      contrastColor="white"
      buttonText="Spin it!"
      isOnlyOnce={isOnlyOnce}
      size={size}
      upDuration={randomIntFromInterval(50, 100)}
      downDuration={randomIntFromInterval(150, 300)}
      fontFamily="Arial"
    />
  );
}

export default BoomWheelComp;
