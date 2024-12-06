/* eslint-disable react/prop-types */
// import React from 'react'

import { IoReorderThree } from "react-icons/io5";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Spacer,
  Stack,
  Text,
  VStack
} from "@chakra-ui/react";
import { RiMenu3Fill } from "react-icons/ri";
import { BsXLg } from "react-icons/bs";
import Link from "next/link";
import { HiSpeakerphone } from "react-icons/hi";
import {
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaXTwitter,
  FaYoutube,
  FaThreads
} from "react-icons/fa6";
import { useState } from "react";
import { useRouter } from "next/router";
import { GiHamburgerMenu } from "react-icons/gi";

// absolute inset-0

const Home = () => {
  const router = useRouter();
  const [playGuide, setPlayGuide] = useState([
    {
      title: "RECEIVE A CREDIT OR DEBIT ALERT",
      description:
        "Sign up or Log into your Nairaboom profile anytime you get a valid credit or debit alert."
    },
    {
      title: "FUND YOUR WALLET",
      description:
        "Make your first deposit of ₦500 and receive 35,000 Boom Coin Tokens (BCT)."
    },
    {
      title: "CONVERT YOUR BANK ALERT",
      description:
        "Enter your alert details to rollover, swap them to Boom Coin Tokens (BCT) & Play 3 Sure Cashout."
    },
    {
      title: "SELL BOOM COINS TOKENS (BCT)",
      description: "Accumulate your Boom Coin Tokens (BCT) and sell them."
    },
    {
      title: "MONETIZE YOUR NAIRABOOM ACCOUNT",
      description: "Earn passive income three levels deep, from your Trybe."
    },
    {
      title: "WIN THE JACKPOT",
      description: "Match 4 Green balls when you rollover and Win The JACKPOT!"
    }
  ]);
  const HTPCards = ({ title, description, listing }) => {
    return (
      <div className="gradient-div mt-2 flex space-x-2 items-center w-full rounded-md text-secondary ">
        <img
          src="/mobile/assets/HalfWheel.png"
          className="max-w-[55px] max-h-[85px] min-w-[49.20px] min-h-[85px]"
        />
        <div className="pr-4 py-2">
          <p
            className=" text-[15px] leading-4"
            style={{ fontFamily: "Changa One" }}
          >
            {listing}. &nbsp;&nbsp;{title}
          </p>
          <p
            className=" leading-4 font-semibold mt-1 text-[13px]"
            style={{ fontFamily: "Source Sans Pro" }}
          >
            {description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full appearance-none bg-secondary text-white flex-1 overflow-y-auto">
      <div className="justify-center background-ribbon bg-cover bg-center bg-no-repeat  h-auto">
        <div className="w-full">
          <div className="flex py-10 w-full justify-center">
            <img src="/mobile/assets/NairaBoomLogo.svg" />
          </div>
          <div className="px-6 mb-16 w-full flex justify-between">
            <div className="flex space-x-1 items-center">
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      as={IconButton}
                      colorScheme="none"
                      isActive={isOpen}
                      color="nairagreen"
                    >
                      {isOpen ? (
                        <BsXLg size={20} color={"fff"} />
                      ) : (
                        <GiHamburgerMenu size={25} color={"fff"} />
                      )}
                    </MenuButton>
                    <MenuList>
                      <VStack color="#012647" py={3} spacing={5}>
                        <Link
                          href="/how-to-play"
                          style={{
                            background: "transparent",
                            fontWeight: "700"
                          }}
                        >
                          How To Play
                        </Link>
                        <Link href="/winning">Winning Modalities</Link>
                        <Link href="/contact">Contact Us</Link>
                      </VStack>
                    </MenuList>
                  </>
                )}
              </Menu>
            </div>
            <div className="flex space-x-1 items-center">
              <button
                onClick={() => router.push("/auth/login")}
                className="cursor-pointer"
              >
                <img src="/mobile/assets/Login.png" />
              </button>
              <button
                onClick={() => router.push("/auth/signup/customer")}
                className="cursor-pointer"
              >
                <img src="/mobile/assets/Signup.png" />
              </button>
            </div>
          </div>
          <div className="max-w-full flex -mt-5 scrollbar-hide mdd:justify-start">
            <div className="flex justify-between w-full  home-card bg-cover bg-center bg-no-repeat  h-auto  p-4 text-secondary ">
              {/* first text */}
              <div className="flex flex-col ml-2 -mt-1 text-3xl">
                <p style={{ fontFamily: "Changa One" }}>THE</p>
                <p className="-mt-3" style={{ fontFamily: "Changa One" }}>
                  BOOM
                </p>
                <p className="-mt-3" style={{ fontFamily: "Changa One" }}>
                  FOR
                </p>
                <p className="-mt-3" style={{ fontFamily: "Changa One" }}>
                  YOUR
                </p>
                <p className="-mt-3" style={{ fontFamily: "Changa One" }}>
                  BANK
                </p>
                <p className="-mt-3" style={{ fontFamily: "Changa One" }}>
                  ALERT
                </p>
              </div>
              <div className="relative w-[170px] -mt-2 flex flex-col justify-center items-center text-secondary ">
                <img
                  src="/mobile/assets/wheel.svg"
                  className="absolute mt-[0px] cursor-pointer ml-[3px] max-w-[170px] max-h-[175px] min-w-[170px] min-h-[175px]"
                />
              </div>
              <div className="flex flex-col mt-1 mr-2 justify-start items-center">
                <button
                  className="text-center text-[12px] text-[#1ED760] bg-secondary rounded-full max-w-[110px] max-h-[31px] min-w-[110px] min-h-[31px] mb-2"
                  style={{ fontFamily: "Source Code Pro", fontWeight: "700" }}
                >
                  <b>ROLLOVER</b>
                </button>
                <button
                  className="text-center text-[12px] text-[#1ED760] bg-secondary rounded-full max-w-[110px] max-h-[31px] min-w-[110px] min-h-[31px] mb-2"
                  style={{ fontFamily: "Source Code Pro", fontWeight: "700" }}
                >
                  <b>SWAP</b>
                </button>
                <button
                  className="text-center text-[12px] text-[#1ED760] bg-secondary rounded-full max-w-[110px] max-h-[31px] min-w-[110px] min-h-[31px] mb-2"
                  style={{ fontFamily: "Source Code Pro", fontWeight: "700" }}
                >
                  <b>SELL</b>
                </button>
                <button
                  className="text-center text-[12px] text-[#1ED760] bg-secondary rounded-full max-w-[110px] max-h-[31px] min-w-[110px] min-h-[31px]"
                  style={{ fontFamily: "Source Code Pro", fontWeight: "700" }}
                >
                  <b>CASHOUT</b>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* megaphone card */}
        <div className="gradient-div mt-1 w-full flex items-center justify-between text-secondary ">
          <div className="text-xs flex items-center p-[2px] ml-2">
            <img src="/mobile/assets/Group.svg" className="w-[25px] h-[25px]" />
            <div className="inline-block">
              <span
                className="ml-1 text-[13px] font-normal"
                style={{ fontFamily: "Source Sans Pro" }}
              >
                {" "}
                Femi won
              </span>{" "}
              <span
                className=" text-[13px] text-white font-bold"
                style={{ fontFamily: "Source Sans Pro" }}
              >
                NGN 50,000.00{" "}
              </span>{" "}
              <span
                className="text-[13px] font-normal"
                style={{ fontFamily: "Source Sans Pro" }}
              >
                {" "}
                in 3 Sure Cashout
              </span>
            </div>
          </div>
          <div className="flex items-center rounded-br-md rounded-tr-md justify-center aspect-video small-ribbon bg-cover bg-center bg-no-repeat  h-[32px]">
            <div
              onClick={() => console.log("reload")}
              className="cursor-pointer"
            >
              <img
                src="/mobile/assets/PlayNow.png"
                className="h-[24px] aspect-video"
              />
            </div>
          </div>
        </div>
      </div>
      {/* First Slide */}
      <div className="justify-center mt-1 background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
        <div className="flex items-start space-x-4 pt-2 pb-1 overflow-y-clip overflow-x-scroll">
          {/* <div className="relative ">
            <img
              src="/mobile/assets/Slide1.png"
              className="max-w-[390px] max-h-[160px] min-w-[390px] min-h-[160px]"
            />
            <img
              onClick={() => console.log("reload")}
              src="/mobile/assets/PlayNow4.png"
              className="absolute -mt-[65px] cursor-pointer ml-[3px] max-w-[153.97px] max-h-[65px] min-w-[153.97px] min-h-[65px]"
            />
          </div> */}
          <div className="gradient-div ml-1 min-w-[390px] max-w-[390px] relative overflow-y-hidden flex flex-col w-full rounded-lg text-secondary h-auto">
            <div className="flex items-center justify-between">
              <div className="ribbon-left"></div>
              <div className="ribbon-right"></div>
            </div>
            <div className="absolute ml-4 text-start text-3xl">
              <p
                className="mt-2 mb-1 text-[33px]"
                style={{ fontFamily: "Changa One" }}
              >
                WITHDRAW
              </p>
              <p
                className="-mt-3 mb-1 text-[33px]"
                style={{ fontFamily: "Changa One" }}
              >
                UP TO
              </p>
              <p
                className="-mt-3 text-[33px]"
                style={{ fontFamily: "Changa One" }}
              >
                <b>₦</b>35,000,000
              </p>
            </div>
            <img
              onClick={() => console.log("reload")}
              src="/mobile/assets/PlayNow2.png"
              className="absolute mt-[98px] cursor-pointer ml-[3px] max-w-[131px] max-h-[55.02px] min-w-[131px] min-h-[55.02px]"
            />
            <img
              src="/mobile/assets/Group_247.png"
              className="absolute bottom-0 cursor-pointer right-0 max-w-[222px] max-h-[160px] min-w-[222px] min-h-[160px]"
            />
          </div>
          <div className="gradient-div min-w-[390px] max-w-[390px] relative overflow-y-hidden flex flex-col w-full rounded-lg text-secondary h-auto">
            <div className="flex items-center justify-between">
              <div className="ribbon-left"></div>
              <div className="ribbon-right"></div>
            </div>
            <div className="absolute ml-4 text-start text-3xl">
              <p
                className="mt-2 mb-1 text-[30px]"
                style={{ fontFamily: "Changa One" }}
              >
                GET 35,000 BOOM
              </p>
              <p
                className="-mt-3 mb-1 text-[30px]"
                style={{ fontFamily: "Changa One" }}
              >
                COIN TOKENS ON YOUR
              </p>
              <p
                className="-mt-3 text-[30px]"
                style={{ fontFamily: "Changa One" }}
              >
                FIRST DEPOSIT
              </p>
            </div>
            <img
              onClick={() => console.log("reload")}
              src="/mobile/assets/SwapNow.png"
              className="absolute mt-[88px] cursor-pointer ml-[3px] max-w-[173.64px] max-h-[73.3px] min-w-[173.64px] min-h-[73.3px]"
            />
            <img
              src="/mobile/assets/Coins.png"
              className="absolute bottom-0 cursor-pointer right-2 max-w-[167px] max-h-[101px] min-w-[167px] min-h-[101px]"
            />
          </div>
          <div className="gradient-div min-w-[390px] max-w-[390px] relative overflow-y-hidden flex flex-col w-full rounded-md text-secondary h-auto">
            <div className="flex items-center justify-between">
              <div className="ribbon-left"></div>
              <div className="ribbon-right"></div>
            </div>
            <div className="absolute ml-4 text-start text-3xl">
              <p
                className=" mb-1 text-[30px]"
                style={{ fontFamily: "Changa One" }}
              >
                CASHOUT YOUR CUMULATIVE{" "}
              </p>
              <p
                className="-mt-3 text-[30px]"
                style={{ fontFamily: "Changa One" }}
              >
                WITH 3 SURE CASHOUT
              </p>
            </div>
            <img
              src="/mobile/assets/GreenCheckGold.png"
              className="absolute mt-[60px] cursor-pointer ml-4 max-w-[106.59px] max-h-[56.75px] min-w-[194px] min-h-[56.75px]"
            />
            <img
              onClick={() => console.log("reload")}
              src="/mobile/assets/PlayNow3.png"
              className="absolute mt-[115px] cursor-pointer ml-[50px] max-w-[194px] max-h-[45px] min-w-[106.59px] min-h-[45px]"
            />
            <img
              src="/mobile/assets/SmilingWoman.png"
              className="absolute bottom-0 cursor-pointer right-0 max-w-[97px] max-h-[131px] min-w-[97px] min-h-[131px]"
            />
          </div>
          <div className="gradient-div min-w-[390px] max-w-[390px] relative overflow-y-hidden flex flex-col w-full rounded-md text-secondary h-auto">
            <div className="flex items-center justify-between">
              <div className="ribbon-left"></div>
              <div className="ribbon-right"></div>
            </div>
            <div className="absolute ml-4 text-start text-2xl">
              <p
                className="mt-2 text-[25px]"
                style={{ fontFamily: "Changa One" }}
              >
                MONETIZE YOUR
              </p>
              <p
                className="-mt-2 text-[25px]"
                style={{ fontFamily: "Changa One" }}
              >
                ACCOUNT & EARN
              </p>
              <p
                className="-mt-2 text-[25px]"
                style={{ fontFamily: "Changa One" }}
              >
                FOR LIFE
              </p>
            </div>
            <img
              onClick={() => console.log("reload")}
              src="/mobile/assets/StartNow.png"
              className="absolute mt-[85px] cursor-pointer ml-[3px] max-w-[153.97px] max-h-[65px] min-w-[153.97px] min-h-[65px]"
            />
            <img
              src="/mobile/assets/SmilingMan.png"
              className="absolute cursor-pointer right-10 bottom-0 max-w-[153px] max-h-[151px] min-w-[153px] min-h-[151px]"
            />
          </div>
          <div className="gradient-div min-w-[390px] max-w-[390px] relative overflow-y-hidden flex flex-col w-full rounded-md text-secondary h-auto">
            <div className="flex items-center justify-between">
              <div className="ribbon-left"></div>
              <div className="ribbon-right"></div>
            </div>
            <div className="absolute ml-4 text-start text-2xl">
              <p
                className="mt-2 text-[25px]"
                style={{ fontFamily: "Changa One" }}
              >
                WIN QUICK CASH{" "}
              </p>
              <p
                className="-mt-2 text-[25px]"
                style={{ fontFamily: "Changa One" }}
              >
                WITH
              </p>
              <p
                className="-mt-2 text-[25px]"
                style={{ fontFamily: "Changa One" }}
              >
                FASTEST FINGERS
              </p>
              <p
                className="-mt-2 text-[25px]"
                style={{ fontFamily: "Changa One" }}
              >
                GAMEPLAY
              </p>
            </div>
            <div className="absolute mt-[110px] ml-[10px] flex items-center space-x-1">
              <input
                type="text"
                placeholder="Type here..."
                className="max-w-[125px] max-h-[33.48px] min-w-[125px] min-h-[33.48px] bg-white text-neutral-500 text-xs text-center border-4 border-secondary rounded-full"
              />
              <img
                onClick={() => console.log("reload")}
                src="/mobile/assets/Enter.png"
                className="cursor-pointer ml-[3px] max-w-[106.59px] max-h-[45px] min-w-[106.59px] min-h-[45px]"
              />
            </div>

            <img
              src="/mobile/assets/SmilingManBlue.png"
              className="absolute mt-[0px] cursor-pointer right-0 max-w-[137px] max-h-[160px] min-w-[137px] min-h-[160px]"
            />
            {/* <img
              src="/mobile/assets/Thousands.png"
              className="absolute mt-[30px] cursor-pointer ml-[200px] max-w-[190px] max-h-[129px] min-w-[190px] min-h-[129px]"
            /> */}
          </div>
          <div className="gradient-div min-w-[390px] max-w-[390px] relative overflow-y-hidden flex flex-col w-full rounded-md text-secondary h-auto">
            <div className="flex items-center justify-between">
              <div className="ribbon-left"></div>
              <div className="ribbon-right"></div>
            </div>
            <div className="absolute ml-4 text-start text-3xl">
              <p
                className="mt-2 text-[35px]"
                style={{ fontFamily: "Changa One" }}
              >
                SELL YOUR
              </p>
              <p
                className="-mt-3 text-[35px]"
                style={{ fontFamily: "Changa One" }}
              >
                BOOM COIN TOKENS
              </p>
              <p
                className="-mt-3 text-[35px]"
                style={{ fontFamily: "Changa One" }}
              >
                FOR CASH
              </p>
            </div>
            <img
              onClick={() => console.log("reload")}
              src="/mobile/assets/GetNow.png"
              className="absolute mt-[93px] cursor-pointer ml-[10px] max-w-[153.97px] max-h-[65px] min-w-[153.97px] min-h-[65px]"
            />
            <img
              src="/mobile/assets/Coins.png"
              className="absolute bottom-0 right-6 max-w-[167px] max-h-[101px] min-w-[167px] min-h-[101px]"
            />
            {/* <img
              src="/mobile/assets/ThousandsInverse.png"
              className="absolute mt-[0px] cursor-pointer ml-[240px] max-w-[146px] max-h-[105px] min-w-[146px] min-h-[105px]"
            /> */}
          </div>
        </div>
      </div>
      {/* Games */}
      <div className="-mt-8  px-4">
        <div className=" justify-center background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
          <p className="mt-1 text-[15px]" style={{ fontFamily: "Changa" }}>
            <b>Games</b>
          </p>
          <div className="flex items-start space-x-4 pt-1 pb-1 overflow-y-clip overflow-x-scroll">
            <div className="gradient-div min-h-[154.24px] max-h-[154.24px] relative mt-1 flex flex-col pt-1 pb-2 items-center max-w-[167px] min-w-[167px] rounded-md text-secondary ">
              <img
                src="/mobile/assets/3SureCashoutSmall.png"
                className="max-w-[157px] rounded-lg max-h-[115px] min-w-[157px] min-h-[115px]"
              />
              {/* <img
                src="/mobile/assets/GreenCheck.png"
                className="absolute mt-[65px] max-w-[113.14px] max-h-[12.69px] min-w-[113.14px] min-h-[12.69px]"
              /> */}
              <img
                onClick={() => console.log("reload")}
                src="/mobile/assets/PlayNow1.png"
                className="absolute mt-[91px] cursor-pointer ml-[3px] max-w-[58.92px] max-h-[25px] min-w-[58.92px] min-h-[25px]"
              />
              <p
                className="w-full leading-3 mt-1 text-center text-[8px]"
                style={{ fontFamily: "Changa One" }}
              >
                GET ONE GREEN BALL IN 3 CONSECUTIVE
              </p>
              <p
                className="w-full leading-3 -mt-1 text-center text-[8px]"
                style={{ fontFamily: "Changa One" }}
              >
                ROLLOVER GAMES AND CASHOUT YOUR
              </p>
              <p
                className="w-full leading-3 -mt-1 text-center text-[8px]"
                style={{ fontFamily: "Changa One" }}
              >
                CUMULATIVE
              </p>
            </div>
            <div className="gradient-div min-h-[154.24px] max-h-[154.24px] relative mt-1 flex flex-col pt-1 pb-2 items-center max-w-[167px] min-w-[167px] rounded-md text-secondary h-auto">
              <img
                src="/mobile/assets/RolloverSmall.png"
                className="rounded-lg max-w-[157.29px] max-h-[117.04px] min-w-[157.29px] min-h-[117.04px]"
              />
              <img
                onClick={() => console.log("reload")}
                src="/mobile/assets/PlayNow2.png"
                className="absolute mt-[93px] cursor-pointer ml-[3px] max-w-[58.92px] max-h-[25px] min-w-[58.92px] min-h-[25px]"
              />
              <p
                className="mt-2 leading-3 text-center text-[8px]"
                style={{ fontFamily: "Changa One" }}
              >
                TAP TO ROLLOVER AND SWAP YOUR BANK
              </p>
              <p
                className="leading-3 -mt-1 text-center text-[8px]"
                style={{ fontFamily: "Changa One" }}
              >
                ALERT
              </p>
            </div>
            <div className="gradient-div min-h-[154.24px] max-h-[154.24px] relative mt-1 flex flex-col pt-1 pb-2 items-center max-w-[167px] min-w-[167px] rounded-md text-secondary ">
              <img
                src="/mobile/assets/FastestFingersSmall.png"
                className="rounded-lg max-w-[157.78px] max-h-[115.56px] min-w-[157.78px] min-h-[115.56px]"
              />
              <input
                type="text"
                placeholder="Type here..."
                className="absolute mt-[65px] max-w-[94px] max-h-[25.18px] min-w-[94px] min-h-[25.18px] bg-white text-neutral-500 text-sm text-center border-2 border-secondary rounded-full"
              />
              <img
                onClick={() => console.log("reload")}
                src="/mobile/assets/Enter.png"
                className="absolute mt-[90px] cursor-pointer ml-[3px] max-w-[58.92px] max-h-[25px] min-w-[58.92px] min-h-[25px]"
              />
              <p
                className="mt-2 leading-3 text-center text-[8px]"
                style={{ fontFamily: "Changa One" }}
              >
                ENTER THE MONEY WORD TO WIN
              </p>
              <p
                className="leading-3 -mt-1 text-center text-[8px]"
                style={{ fontFamily: "Changa One" }}
              >
                QUICK CASH
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* How to play */}
      <div>
        <div className="lg:-mt-20 mb-4">
          <div className=" px-4 justify-center background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
            <p
              className="mt-4 mb-1 text-[15px]"
              style={{ fontFamily: "Changa" }}
            >
              <b>How to play</b>
            </p>
            {playGuide.map((each, index) => {
              return (
                <HTPCards
                  key={index}
                  listing={index + 1}
                  title={each.title}
                  description={each.description}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/*  */}
      <div>
        <div className="lg:-mt-40 justify-center background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
          <div className="gradient-div relative mt-2 max-w-screen overflow-x-hidden flex flex-col items-center max-w-screen mx-4 rounded-md">
            {/* <div className="-mt-3 mx-4 relative text-secondary justify-center background-ribbon1 bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto"> */}
            <img
              src="/mobile/assets/Group_246.png"
              // className="max-w-[350px] max-h-[344px] min-w-[344px] min-h-[350px] rounded-lg"
              className="w-full rounded-lg"
            />
            <img
              onClick={() => console.log("reload")}
              src="/mobile/assets/HowToPlay2.png"
              className="absolute bottom-8 cursor-pointer "
              // className="absolute bottom-0 cursor-pointer ml-[3px] max-w-[254.78px] max-h-[80.07px] min-w-[254.78px] min-h-[80.07px]"
            />
            {/* </div> */}
          </div>
        </div>
        <div className="lg:-mt-40 px-4 justify-center background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
          <div className="flex flex-col items-center w-full">
            <p
              className="text-[15px] text-primary mt-4 mb-1"
              style={{ fontFamily: "Changa One" }}
            >
              About Nairaboom
            </p>
            <p
              className="font-light text-[9px] mb-1"
              style={{ fontFamily: "Changa" }}
            >
              NairaBoom is Nigeria's premier, most trusted Financial Transaction{" "}
            </p>
            <p
              className="font-light text-[9px] mb-1"
              style={{ fontFamily: "Changa" }}
            >
              Notification (Bank Alert) Tokenization and Gamification platform.
              We bring{" "}
            </p>
            <p
              className="font-light text-[9px] mb-1"
              style={{ fontFamily: "Changa" }}
            >
              you an unmatched Swap to Earn + Play to Earn experience,
              transforming your{" "}
            </p>
            <p
              className="font-light text-[9px] mb-1"
              style={{ fontFamily: "Changa" }}
            >
              everyday bank alerts into valuable tokens you can sell and cash
              out. Plus,{" "}
            </p>
            <p
              className="font-light text-[9px] mb-1"
              style={{ fontFamily: "Changa" }}
            >
              with our one-of-a-kind "3 Sure Cashout" game, you're guaranteed
              thrilling{" "}
            </p>
            <p
              className="font-light text-[9px] mb-1"
              style={{ fontFamily: "Changa" }}
            >
              opportunities to earn big!{" "}
            </p>
            <p
              className="font-light text-[9px] mb-1"
              style={{ fontFamily: "Changa" }}
            >
              Beyond a gamification platform, Nairaboom is your gateway to
              monetizing{" "}
            </p>
            <p
              className="font-light text-[9px] mb-1"
              style={{ fontFamily: "Changa" }}
            >
              every bank alert, providing consistent financial gains and turning
              ordinary{" "}
            </p>
            <p
              className="font-light text-[9px] mb-1"
              style={{ fontFamily: "Changa" }}
            >
              transactions into real income with fast cashouts of up to
              ₦35,000,000.{" "}
            </p>
            <p
              className="font-light text-[9px] mb-1"
              style={{ fontFamily: "Changa" }}
            >
              So, are you ready to make every alert count? Jin Nairaboom today
              to Swap{" "}
            </p>
            <p
              className="font-light text-[9px] mb-1"
              style={{ fontFamily: "Changa" }}
            >
              your Bank Alerts, Stack up Boom Coin Tokens, Sell and Win.......&
              unleash the{" "}
            </p>
            <p
              className="font-light text-[9px]"
              style={{ fontFamily: "Changa" }}
            >
              power of your Bank Alerts
            </p>
            <div
              onClick={() => console.log("reload")}
              className="cursor-pointer mb-3"
            >
              <img
                src="/mobile/assets/ViewMore.png"
                className="w-[78px] h-[29px]"
              />
            </div>
            <img
              src="/mobile/assets/NairaBoomLogo.svg"
              className="w-[64px] h-[37px]"
            />
          </div>
        </div>
      </div>

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
              <p>0000006</p>
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

export default Home;
