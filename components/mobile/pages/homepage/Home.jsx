/* eslint-disable react/prop-types */
// import React from 'react'

import { IoReorderThree } from "react-icons/io5";
// import { IoMdInformationCircleOutline } from "react-icons/io";
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
// absolute inset-0

const Home = () => {
  const [playGuide, setPlayGuide] = useState([
    {
      title: "RECEIVE A CREDIT OR DEBIT ALERT",
      description:
        "Sign up or Login to your Nairaboom game profile anytime you get a valid credit or debit alert"
    },
    {
      title: "FUND YOUR WALLET",
      description:
        "Make your first deposit of ₦500 and receive 35,000 Boom Coins."
    },
    {
      title: "PLAY GAME",
      description:
        "Enter your alert details to rollover & accumulate every valid credit or debit alert you receive into Boom Coins."
    },
    {
      title: "SPIN TO CASHOUT",
      description:
        "Spin the wheel and match the cashout keys or 3 green balls to cashout your Boom Coins instantly."
    },
    {
      title: "WIN THE JACKPOT",
      description:
        "Match all 4 Green balls when you spin To Cashout and Win The JACKPOT! "
    }
  ]);
  const HTPCards = ({ title, description, listing }) => {
    return (
      <div className="gradient-div mt-2 flex space-x-4 items-center w-full rounded-md text-secondary ">
        <img
          src="/mobile/assets/HalfWheel.png"
          className="max-w-[55px] max-h-[97px] min-w-[49.20px] min-h-[97px]"
        />
        <div className="pr-4 py-2">
          <p className=" font-changa-one text-lg leading-4">{`${listing}. ${title}`}</p>
          <p className=" font-changa leading-4 font-semibold mt-1">
            {description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full" style={{ maxWidth: window.innerWidth }}>
      <div
        className="justify-center background-ribbon bg-cover bg-center bg-no-repeat  h-auto"
        style={{ maxWidth: window.innerWidth }}
      >
        <div className="w-full">
          <div className="flex py-10 w-full justify-center">
            <img src="/mobile/assets/NairaBoomLogo.png" />
          </div>
          <div className="px-6 mb-16 w-full flex justify-between">
            <div className="flex space-x-1 items-center">
              <IoReorderThree size={40} />
            </div>
            <div className="flex space-x-1 items-center">
              <div
                onClick={() => console.log("reload")}
                className="cursor-pointer"
              >
                <img src="/mobile/assets/Login.png" />
              </div>
              <div
                onClick={() => console.log("reload")}
                className="cursor-pointer"
              >
                <img src="/mobile/assets/Signup.png" />
              </div>
            </div>
          </div>
          <div className="max-w-full flex space-x-4 scrollbar-hide mdd:justify-start">
            <div
              className="flex justify-between w-full  home-card bg-cover bg-center bg-no-repeat  h-auto  p-4 text-secondary "
              style={{ maxWidth: window.innerWidth }}
            >
              {/* first text */}
              <div className="text-3xl font-changa-one">
                <p>THE</p>
                <p className="-mt-3">GAME</p>
                <p className="-mt-3">FOR</p>
                <p className="-mt-3">YOUR</p>
                <p className="-mt-3">BANK</p>
                <p className="-mt-3">ALERT</p>
              </div>
              {/* man and wheel */}
              <div className="relative w-[153px] flex flex-col items-center text-secondary ">
                <img
                  src="/mobile/assets/MoneyMan.png"
                  className="absolute -mt-[100px] max-w-[165px] max-h-[192px] min-w-[165px] min-h-[192px]"
                />
                <img
                  src="/mobile/assets/Wheel.png"
                  className="absolute mt-[20px] cursor-pointer ml-[3px] max-w-[153px] max-h-[153px] min-w-[153px] min-h-[153px]"
                />
              </div>
              <div className="flex flex-col justify-center space-y-3">
                <button className="py-[6px] px-6 text-primary bg-secondary rounded-full">
                  ROLLOVER
                </button>
                <button className="py-[6px] px-6 text-primary bg-secondary rounded-full">
                  ACCUMULATE
                </button>
                <button className="py-[6px] px-6 text-primary bg-secondary rounded-full">
                  CASHOUT
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* megaphone card */}
        <div className="gradient-div mt-4 w-full flex items-center justify-between text-secondary ">
          <div className="text-xs flex items-center p-[2px]">
            <HiSpeakerphone
              size={24}
              className="ml-2 -rotate-45 inline-block"
            />
            <div className="inline-block">
              <span className="ml-1">rael won</span>{" "}
              <span className=" text-base text-white">NGN 50,000</span>{" "}
              <span className="">in 3 Sure Cashout</span>
            </div>
          </div>
          <div className="flex items-center rounded-br-md rounded-tr-md justify-center aspect-video small-ribbon bg-cover bg-center bg-no-repeat  h-[32px]">
            <div
              onClick={() => console.log("reload")}
              className="cursor-pointer"
            >
              <img src="/mobile/assets/PlayNow.png" className="h-[24px] aspect-video" />
            </div>
          </div>
        </div>
      </div>
      {/* First Slide */}
      <div className="justify-center  background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
        <div className="flex items-start space-x-4 pt-2 pb-1 overflow-y-clip overflow-x-scroll">
          <div className="relative ">
            <img
              src="/mobile/assets/Slide1.png"
              className="max-w-[390px] max-h-[160px] min-w-[390px] min-h-[160px]"
            />
            <img
              onClick={() => console.log("reload")}
              src="/mobile/assets/PlayNow4.png"
              className="absolute -mt-[65px] cursor-pointer ml-[3px] max-w-[153.97px] max-h-[65px] min-w-[153.97px] min-h-[65px]"
            />
          </div>
          <div className="gradient-div min-w-[390px] max-w-[390px] relative overflow-y-hidden flex flex-col w-full rounded-md text-secondary h-auto">
            <div className="flex items-center justify-between">
              <div className="ribbon-left"></div>
              <div className="ribbon-right"></div>
            </div>
            <div className="absolute ml-4 text-start font-changa-one text-3xl">
              <p className="mt-2">GET 35,500 BOOM</p>
              <p className="-mt-3">COINS ON YOUR</p>
              <p className="-mt-3">FIRST DEPOSIT</p>
            </div>
            <img
              onClick={() => console.log("reload")}
              src="/mobile/assets/PlayNow3.png"
              className="absolute mt-[88px] cursor-pointer ml-[3px] max-w-[173.64px] max-h-[73.3px] min-w-[173.64px] min-h-[73.3px]"
            />
            <img
              src="/mobile/assets/Coins.png"
              className="absolute mt-[55px] cursor-pointer ml-[215px] max-w-[167px] max-h-[101px] min-w-[167px] min-h-[101px]"
            />
          </div>
          <div className="gradient-div min-w-[390px] max-w-[390px] relative overflow-y-hidden flex flex-col w-full rounded-md text-secondary h-auto">
            <div className="flex items-center justify-between">
              <div className="ribbon-left"></div>
              <div className="ribbon-right"></div>
            </div>
            <div className="absolute ml-4 text-start font-changa-one text-3xl">
              <p className="">CASHOUT YOUR CUMULATIVE </p>
              <p className="-mt-3">WITH 3 SURE CASHOUT</p>
            </div>
            <img
              src="/mobile/assets/GreenCheckGold.png"
              className="absolute mt-[58px] cursor-pointer ml-[3px] max-w-[106.59px] max-h-[56.75px] min-w-[194px] min-h-[56.75px]"
            />
            <img
              onClick={() => console.log("reload")}
              src="/mobile/assets/PlayNow3.png"
              className="absolute mt-[115px] cursor-pointer ml-[50px] max-w-[194px] max-h-[45px] min-w-[106.59px] min-h-[45px]"
            />
            <img
              src="/mobile/assets/MoneyMan2.png"
              className="absolute mt-[10px] cursor-pointer ml-[240px] max-w-[142px] max-h-[152.31px] min-w-[142px] min-h-[152.31px]"
            />
          </div>
          <div className="gradient-div min-w-[390px] max-w-[390px] relative overflow-y-hidden flex flex-col w-full rounded-md text-secondary h-auto">
            <div className="flex items-center justify-between">
              <div className="ribbon-left"></div>
              <div className="ribbon-right"></div>
            </div>
            <div className="absolute ml-4 text-start font-changa-one text-2xl">
              <p className="mt-2">MONETIZE YOUR</p>
              <p className="-mt-2">ACCOUNT & EARN</p>
              <p className="-mt-2">FOR LIFE</p>
            </div>
            <img
              onClick={() => console.log("reload")}
              src="/mobile/assets/PlayNow3.png"
              className="absolute mt-[85px] cursor-pointer ml-[3px] max-w-[173.64px] max-h-[73.3px] min-w-[173.64px] min-h-[73.3px]"
            />
            <img
              src="/mobile/assets/SuitMoneyMan.png"
              className="absolute mt-[0px] cursor-pointer ml-[170px] max-w-[213px] max-h-[161px] min-w-[213px] min-h-[161px]"
            />
          </div>
          <div className="gradient-div min-w-[390px] max-w-[390px] relative overflow-y-hidden flex flex-col w-full rounded-md text-secondary h-auto">
            <div className="flex items-center justify-between">
              <div className="ribbon-left"></div>
              <div className="ribbon-right"></div>
            </div>
            <div className="absolute ml-4 text-start font-changa-one text-2xl">
              <p className="mt-2">WIN QUICK CASH </p>
              <p className="-mt-2">WITH</p>
              <p className="-mt-2">FASTEST FINGERS</p>
              <p className="-mt-2">GAMEPLAY</p>
            </div>
            <div className="absolute mt-[110px] ml-[10px] flex items-center space-x-1">
              <input
                type="text"
                placeholder="Type here..."
                className="max-w-[125px] max-h-[33.48px] min-w-[125px] min-h-[33.48px] bg-white text-neutral-500 text-xs text-center border-4 border-secondary rounded-full"
              />
              <img
                onClick={() => console.log("reload")}
                src="/mobile/assets/PlayNow3.png"
                className="cursor-pointer ml-[3px] max-w-[106.59px] max-h-[45px] min-w-[106.59px] min-h-[45px]"
              />
            </div>
            <img
              src="/mobile/assets/Thousands.png"
              className="absolute mt-[30px] cursor-pointer ml-[200px] max-w-[190px] max-h-[129px] min-w-[190px] min-h-[129px]"
            />
          </div>
          <div className="gradient-div min-w-[390px] max-w-[390px] relative overflow-y-hidden flex flex-col w-full rounded-md text-secondary h-auto">
            <div className="flex items-center justify-between">
              <div className="ribbon-left"></div>
              <div className="ribbon-right"></div>
            </div>
            <div className="absolute ml-4 text-start font-changa-one text-3xl">
              <p className="mt-2">SELL YOUR</p>
              <p className="-mt-3">BOOM COINS</p>
              <p className="-mt-3">FOR COOL CASH</p>
            </div>
            <img
              onClick={() => console.log("reload")}
              src="/mobile/assets/GetNow.png"
              className="absolute mt-[88px] cursor-pointer ml-[10px] max-w-[153.97px] max-h-[65px] min-w-[153.97px] min-h-[65px]"
            />
            <img
              src="/mobile/assets/Coins2.png"
              className="absolute mt-[60px] cursor-pointer ml-[180px] max-w-[185px] max-h-[96px] min-w-[185px] min-h-[96px]"
            />
            <img
              src="/mobile/assets/ThousandsInverse.png"
              className="absolute mt-[0px] cursor-pointer ml-[240px] max-w-[146px] max-h-[105px] min-w-[146px] min-h-[105px]"
            />
          </div>
        </div>
      </div>
      {/* Games */}
      <div className="-mt-8  px-6">
        <p className="">Games</p>
        <div className=" justify-center background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
          <div className="flex items-start space-x-4 pt-2 pb-1 overflow-y-clip overflow-x-scroll">
            <div className="gradient-div min-h-[210px] max-h-[210px] relative mt-4 flex flex-col p-4 items-center w-full rounded-md text-secondary ">
              <img
                src="/mobile/assets/Sure3Cashout.png"
                className="max-w-[157px] rounded-lg max-h-[115px] min-w-[157px] min-h-[115px]"
              />
              <img
                src="/mobile/assets/GreenCheck.png"
                className="absolute mt-[65px] max-w-[113.14px] max-h-[12.69px] min-w-[113.14px] min-h-[12.69px]"
              />
              <img
                onClick={() => console.log("reload")}
                src="/mobile/assets/PlayNow1.png"
                className="absolute mt-[91px] cursor-pointer ml-[3px] max-w-[58.92px] max-h-[25px] min-w-[58.92px] min-h-[25px]"
              />
              <p className="w-full leading-3 mt-2 font-changa-one text-center text-xs">
                GET ONE GREEN BALL IN 3
              </p>
              <p className="w-full leading-3 font-changa-one text-center text-xs">
                CONSECUTIVE ROLLOVER GAMES
              </p>
              <p className="w-full leading-3 font-changa-one text-center text-xs">
                AND CASHOUT YOUR CUMULATIVE
              </p>
            </div>
            <div className="gradient-div min-h-[210px] max-h-[210px] relative mt-4 flex flex-col p-4 items-center w-full rounded-md text-secondary h-auto">
              <img
                src="/mobile/assets/Rollover.png"
                className="rounded-lg max-w-[157.29px] max-h-[117.04px] min-w-[157.29px] min-h-[117.04px]"
              />
              <img
                onClick={() => console.log("reload")}
                src="/mobile/assets/PlayNow2.png"
                className="absolute mt-[93px] cursor-pointer ml-[3px] max-w-[58.92px] max-h-[25px] min-w-[58.92px] min-h-[25px]"
              />
              <p className="mt-2 leading-3 font-changa-one text-center text-xs">
                TAP TO PLAY AND ROLLOVER YOUR
              </p>
              <p className="leading-3 font-changa-one text-center text-xs">
                BANK ALERTS TO CASHOUT
              </p>
            </div>
            <div className="gradient-div min-h-[210px] max-h-[210px] relative mt-4 flex flex-col p-4 items-center w-full rounded-md text-secondary ">
              <img
                src="/mobile/assets/FastestFingers.png"
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
              <p className="mt-2 leading-3 font-changa-one text-center text-xs">
                ENTER THE MONEY WORD TO WIN
              </p>
              <p className="leading-3 font-changa-one text-center text-xs">
                QUICK CASH
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* How to play */}
      <div>
        <div className="lg:-mt-20 mb-4">
          <div className=" px-6 justify-center background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
            <p className="my-4">How to play</p>
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
          <div className="mt-8 relative flex flex-col items-center w-full rounded-md text-secondary ">
            <img
              src="/mobile/assets/BigWin.png"
              className="max-w-[350px] max-h-[344px] min-w-[344px] min-h-[350px]"
            />
            <img
              onClick={() => console.log("reload")}
              src="/mobile/assets/HowToPlay.png"
              className="absolute mt-[235px] cursor-pointer ml-[3px] max-w-[249.04px] max-h-[78.72px] min-w-[249.04px] min-h-[78.72px]"
            />
          </div>
        </div>
        <div className="lg:-mt-40 px-6 justify-center background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
          <div className="flex flex-col items-center w-full">
            <p className="font-changa-one text-xl text-primary mt-8">
              About Nairaboom
            </p>
            <p className="font-extralight font-sans text-center">
              NairaBoom is the ultimate Play2Earn experience crafted around your
              bank alerts! As a licensed, proprietary Alert Rollover Game,
              NairaBoom transforms your credit and debit alerts into Boom
              Coins—the key to unlocking massive wins. Rollover and accumulate
              your alerts through gameplay, and once you hit the cashout
              criteria, you convert your Boom Coins into instant cash rewards of
              up to ₦35,000,000! But NairaBoom is more than just a game; it’s a
              platform where your alerts become real, tangible earnings. Not
              only can you cash out instantly, but you can also monetize your
              account for ongoing earnings, securing a financial boost for life.
              Ready to turn your alerts into cash? Dive into the world of
              NairaBoom today and start stacking those Boom Coins!
            </p>
            <div
              onClick={() => console.log("reload")}
              className="cursor-pointer my-4"
            >
              <img src="/mobile/assets/ViewMore.png" className="w-[78px] h-[29px]" />
            </div>
            <img src="/mobile/assets/NairaBoomLogo.png" className="w-[64px] h-[37px] mt-4" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col flex-1 px-6 justify-center background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
        <div className="flex flex-col flex-1">
          <div className="mt-8 flex flex-col text-center items-center w-full">
            <div className="mb-4">
              <span className="py-[4px] px-[7px] text-xl border-4 border-red-600 mr-2 rounded-full">
                18+
              </span>
              <span className="text-xl">Play Responsibly</span>
            </div>
            <div className="font-extralight font-sans">
              <p>© 2024 Nairaboom. All Rights Reserved.</p>
              <p>Nairaboom is licensed and regulated by the National</p>
              <p>Lottery Regulatory</p>
              <p>(NLRC). License number</p>
              <p>0000006</p>
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-end my-4">
            <div className="my-4 flex justify-between items-end font-sans">
              <div>
                <div>
                  <p className="hover:border-b border-b-white inline-block">
                    FAQS
                  </p>
                </div>
                <div>
                  <p className="hover:border-b border-b-white inline-block">
                    Terms & Conditions
                  </p>
                </div>
                <div>
                  <p className="hover:border-b border-b-white inline-block">
                    Privacy Policy
                  </p>
                </div>
                <div>
                  <p className="hover:border-b border-b-white inline-block">
                    Blog
                  </p>
                </div>
                <div>
                  <p className="hover:border-b border-b-white inline-block">
                    Responsible Gambling
                  </p>
                </div>
              </div>
              <div className="text-primary space-x-2">
                <FaInstagram size={24} className="inline-block" />
                <FaTiktok size={24} className="inline-block" />
                <FaFacebook size={24} className="inline-block" />
                <FaXTwitter size={24} className="inline-block" />
                <FaYoutube size={24} className="inline-block" />
                <FaThreads size={24} className="inline-block" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
