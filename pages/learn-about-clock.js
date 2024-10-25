import { Box, Text } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import FooterComponent from "../components/Footer";
import Clock from "../components/Clock";
import BackgroundTitle from "../components/BackgroundTitle";
import coil2 from "../public/aboutpage/coil2.png";
import Getstarted from "../components/Getstarted";

const LearnClock = () => {
  return (
    <Box>
      <NavBar />
      <BackgroundTitle longbit="Learn More About Wish Clo" shortbit="ck" />
      <Box
        bgColor={"white"}
        backgroundImage={`url(${coil2.src})`}
        backgroundPosition="right top"
        backgroundRepeat="no-repeat"
        pt="5rem"
        fontFamily={"poppins"}
        color="nairablue"
        display={"flex"}
        flexDir="column"
        alignItems="center"
      >
        <Text
          fontWeight={700}
          fontSize={{ base: "2rem", md: "2.5rem" }}
          pb="1.8rem"
        >
          Wish Clock
        </Text>
        <Text
          textAlign={{ base: "center", md: "left" }}
          pb="2.9rem"
          fontSize={{base:"1.3rem",md:"xl"}}
          fontWeight={500}
          w="75%"
        >
          Our wish clock picks daily winners, <br /> be that winner today!
        </Text>
        <Clock />
        <Box
          display={"flex"}
          flexDir="column"
          px={{ base: "2rem", md: "7.25rem" }}
          py="3.4rem"
          mt="5rem"
          mb="7.4rem"
          bgColor="#F6F6F6"
          w={{ base: "90%", md: "80%" }}
          borderRadius={"1rem"}
        >
          <Text
            fontWeight={500}
            fontSize={{ base: "1rem", md: "xl" }}
            pb="2rem"
          >
            The 9jaCashBack Wish Clock is a patented randomizer that generates
            time sets and chooses the winning time set for the day.
          </Text>
          <Text
            fontWeight={500}
            fontSize={{ base: "1rem", md: "xl" }}
            pb="3rem"
          >
            The clock comes in four (4) fields each bearing two(2) digits in the
            following sequence Hour – Minutes – Seconds – Percentage.
          </Text>
          <Text
            pb="1.8rem"
            color="nairagreen"
            fontWeight={700}
            fontSize={{ base: "1.5rem", md: "2rem" }}
          >
            Clock Reward Positions Clock
          </Text>
          <Text
            fontWeight={500}
            fontSize={{ base: "1rem", md: "xl" }}
            pb="2rem"
          >
            Hour: If the Lucky CashBack Time you choose for your transaction
            matches the Hour field of the winning clock set of the day , you
            immediately enter the Daily Bronze Giveaway Belt where you can get a
            Bronze Belt Giveaway.
          </Text>
          <Text
            fontWeight={500}
            fontSize={{ base: "1rem", md: "xl" }}
            pb="2rem"
          >
            Minutes: If the Lucky CashBack Time you choose for your transaction
            matches the Hour and Minutes field of the winning clock set of the
            day , you immediately enter the Daily Silver Giveaway Belt where you
            get a Silver Belt Giveaway.
          </Text>
          <Text
            fontWeight={500}
            fontSize={{ base: "1rem", md: "xl" }}
            pb="2rem"
          >
            Seconds: If the Lucky CashBack Time you choose for your transaction
            matches the Hour, Minutes & Seconds field of the winning clock set
            of the day, you instantly gets Cashback for your last registered
            financial electronic transaction and also gets entered for the
            Bronze and Silver Giveaway Belt.
          </Text>
          <Text fontWeight={500} fontSize={{ base: "1rem", md: "xl" }}>
            Percentage (%): The Percentage (%) field determines the percentage
            of cashback you gets on your transaction e.g. if the winning time
            stamp reflects 200% then you will get a payout of 200% (2X) of your
            last registered financial transaction. So if Mr A registered an ATM
            transaction of 5000 Naira and his chosen lucky time matches the time
            of the day then he gets instant payout of 10,000 Naira because the
            percentage is 200(%).
          </Text>
        </Box>
      </Box>
      <Getstarted />
      <FooterComponent />
    </Box>
  );
};

export default LearnClock;
