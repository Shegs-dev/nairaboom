// import React from 'react'
import NaijaBoom from "../../assets/NairaBoomLogo.png";
import Monetize from "../../assets/Monetize.png";
import PlayNow from "../../assets/PlayNow.png";
import Sure3Cashout from "../../assets/3SureCashout.png";
import GreenCheck from "../../assets/GreenCheck.png";
import PlayNow1 from "../../assets/PlayNow1.png";
import Rollover from "../../assets/Rollover.png";
import CashoutKeys from "../../assets/CashoutKeys.png";
import FastestFingers from "../../assets/FastestFingers.png";
import Enter from "../../assets/Enter.png";
import PlayNow2 from "../../assets/PlayNow2.png";
import BigWin from "../../assets/BigWin.png";
import HowToPlay from "../../assets/HowToPlay.png";
import { IoReorderThree } from "react-icons/io5";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { HiSpeakerphone } from "react-icons/hi";
import {
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaXTwitter,
  FaYoutube,
  FaThreads
} from "react-icons/fa6";
// absolute inset-0

const Dashboard = () => {
  return (
    <div className="w-full" style={{ maxWidth: window.innerWidth }}>
      <div
        className=" px-6 justify-center background-ribbon bg-cover bg-center bg-no-repeat  h-auto"
        style={{ maxWidth: window.innerWidth }}
      >
        <div className="w-full">
          <div className="flex py-10 w-full justify-center">
            <img src={NaijaBoom} />
          </div>
          <div className="w-full flex justify-between">
            <div className="flex space-x-1 items-center">
              <IoReorderThree size={40} />
              <span className="text-lg">Hi, Drew</span>
            </div>
            <div className="flex space-x-1 items-center">
              <div
                onClick={() => console.log("reload")}
                className="cursor-pointer"
              >
                <img src={Monetize} />
              </div>
              <IoMdInformationCircleOutline size={30} />
            </div>
          </div>
          <p className="my-4 text-lg">Dashboard</p>
          <div className="max-w-full overflow-x-scroll flex space-x-4 scrollbar-hide mdd:justify-start">
            <div className="gradient-div w-fit rounded-lg p-4 text-secondary ">
              {/* first text */}
              <div className="text-3xl font-changa-one mb-4">
                <p>MAIN</p>
                <p>WALLET</p>
              </div>
              {/* balance */}
              <div className="mb-2 ">
                <p className="-mb-3">BALANCE</p>
                <div className="flex space-x-1 items-start">
                  <p className="font-changa-one text-2xl">56,621.40</p>
                  <p className="text-xs">NGN</p>
                </div>
              </div>
              {/* button */}
              <div
                onClick={() => console.log("reload")}
                className="bg-secondary cursor-pointer text-primary rounded-full py-2 px-4 w-fit"
              >
                FUND
              </div>
            </div>
            <div className="gradient-div w-fit rounded-lg p-4 text-secondary ">
              {/* first text */}
              <div className="text-3xl font-changa-one mb-4">
                <p>BOOM</p>
                <p>COINS</p>
              </div>
              {/* balance */}
              <div className="mb-2 ">
                <p className="-mb-3">BALANCE</p>
                <div className="flex space-x-1 items-start">
                  <p className="font-changa-one text-2xl">36,739.60</p>
                  <p className="text-xs">BMC</p>
                </div>
              </div>
              {/* button */}
              <div className="flex justify-between items-center">
                <div
                  onClick={() => console.log("reload")}
                  className="bg-secondary cursor-pointer text-primary rounded-full py-2 px-4 w-fit"
                >
                  SELL
                </div>
                <IoMdInformationCircleOutline size={30} color="white" />
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
              <img src={PlayNow} className="h-[24px] aspect-video" />
            </div>
          </div>
        </div>
        {/* Games Name */}
        <p className="my-4">Games</p>
      </div>
      {/* Games */}
      <div>
        <div className="lg:-mt-20 grid  grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className=" px-6 justify-center background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
            <div className="gradient-div relative mt-4 flex flex-col p-4 items-center w-full rounded-md text-secondary ">
              <img
                src={Sure3Cashout}
                className="max-w-[326px] max-h-[239px] min-w-[326px] min-h-[239px]"
              />
              <img
                src={GreenCheck}
                className="absolute mt-[135px] max-w-[230.33px] max-h-[26.78px] min-w-[230.33px] min-h-[26.78px]"
              />
              <img
                onClick={() => console.log("reload")}
                src={PlayNow1}
                className="absolute mt-[190px] cursor-pointer ml-[3px] max-w-[115.08px] max-h-[48.3px] min-w-[115.08px] min-h-[48.3px]"
              />
              <p className="mt-2 font-changa-one text-center text-xl">
                GET ONE GREEN BALL IN 3
              </p>
              <p className="-mt-2 font-changa-one text-center text-xl">
                CONSECUTIVE ROLLOVER GAMES
              </p>
              <p className="-mt-2 font-changa-one text-center text-xl">
                AND CASHOUT YOUR CUMULATIVE
              </p>
            </div>
          </div>
          <div className=" px-6 justify-center background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
            <div className="gradient-div relative mt-4 flex flex-col p-4 items-center w-full rounded-md text-secondary h-auto">
              <img
                src={Rollover}
                className="max-w-[326px] max-h-[239px] min-w-[326px] min-h-[239px]"
              />
              <img
                onClick={() => console.log("reload")}
                src={PlayNow2}
                className="absolute mt-[191px] cursor-pointer ml-[3px] max-w-[115.08px] max-h-[48.3px] min-w-[115.08px] min-h-[48.3px]"
              />
              <p className="mt-2 font-changa-one text-center text-xl">
                TAP TO PLAY AND ROLLOVER YOUR
              </p>
              <p className="-mt-2 font-changa-one text-center text-xl">
                BANK ALERTS TO CASHOUT
              </p>
            </div>
          </div>
          <div className=" px-6 justify-center background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
            <div className="gradient-div relative mt-4 flex flex-col p-4 items-center w-full rounded-md text-secondary ">
              <img
                src={FastestFingers}
                className="max-w-[326px] max-h-[239px] min-w-[326px] min-h-[239px]"
              />
              <input
                type="text"
                placeholder="Type here..."
                className="absolute mt-[140px] max-w-[167.87px] max-h-[45px] min-w-[167.87px] min-h-[45px] bg-white text-neutral-500 text-sm text-center border-8 border-secondary rounded-full"
              />
              <img
                onClick={() => console.log("reload")}
                src={Enter}
                className="absolute mt-[190px] cursor-pointer ml-[3px] max-w-[115.08px] max-h-[48.3px] min-w-[115.08px] min-h-[48.3px]"
              />
              <p className="mt-2 font-changa-one text-center text-xl">
                ENTER THE MONEY WORD TO WIN
              </p>
              <p className="-mt-2 font-changa-one text-center text-xl">
                QUICK CASH
              </p>
            </div>
          </div>
        </div>
        <div className="px-6 justify-center background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
          <div className="mt-8 relative flex flex-col items-center w-full rounded-md text-secondary ">
            <img
              src={CashoutKeys}
              className="max-w-[326px] max-h-[344px] min-w-[326px] min-h-[344px]"
            />
          </div>
        </div>
        <div className="lg:-mt-40 px-2 justify-center background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
          <div className="mt-8 relative flex flex-col items-center w-full rounded-md text-secondary ">
            <img
              src={BigWin}
              className="max-w-[350px] max-h-[344px] min-w-[344px] min-h-[350px]"
            />
            <img
              onClick={() => console.log("reload")}
              src={HowToPlay}
              className="absolute mt-[235px] cursor-pointer ml-[3px] max-w-[249.04px] max-h-[78.72px] min-w-[249.04px] min-h-[78.72px]"
            />
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex flex-col flex-1 px-2 justify-center background-ribbon bg-cover bg-center max-w-full bg-no-repeat min-w-full w-full h-auto">
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

export default Dashboard;
