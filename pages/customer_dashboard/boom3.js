/* eslint-disable react/prop-types */


import React from "react";
import ReactTurntable from "react-turntable";
import "react-turntable/assets/index.css";

const people = ["Alexis", "Romain", "Tom", "Aman"];
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

// const segments = [
//   "1",
//   "2",
//   "3",
//   "4",
//   "5",
//   "6",
// ];

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

const TurnTable = ({ onStart = () => {}, onComplete = () => {} }) => {
  const options = {
    prizes: segments,
    width: 600,
    height: 600,
    // primaryColor: "#32D5FF",
    // secondaryColor: "#F2D11E",
    colors: segColors,
    fontStyle: {
      color: "#fff",
      size: "14px",
      fontVertical: true,
      fontWeight: "normal",
      fontFamily: "Comic Sans MS"
    },
    speed: 1000,
    duration: 6000,
    clickText: "Spin!",
    onStart() {
      onStart();
      return true;
    },
    onComplete(prize){
    }
  };

  return <ReactTurntable {...options} />;
};

export default TurnTable;



