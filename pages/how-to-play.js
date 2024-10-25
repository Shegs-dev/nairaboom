import {
  Box,
  Heading,
  chakra,
  Text,
  Link,
  Square,
  Circle,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/legacy/image";
import NavBar from "../components/NavBar";
import FooterComponent from "../components/Footer";
import background from "../public/aboutpage/background.png";
import coil from "../public/how-it-works/coil.png";
import CashBack from "../components/CashBackMethod";
import icon1 from "../public/homepage/1.svg";
import icon2 from "../public/homepage/2.svg";
import icon3 from "../public/homepage/3.svg";
import icon4 from "../public/homepage/4.svg";
import icon5 from "../public/homepage/5.svg";
import icon6 from "../public/homepage/6.svg";
import number1 from "../public/how-it-works/number1.png";
import number2 from "../public/how-it-works/number2.png";
import number3 from "../public/how-it-works/number3.png";
import arrow from "../public/how-it-works/arrow.png";
import BackgroundTitle from "../components/BackgroundTitle";
import Getstarted from "../components/Getstarted";
import Head from "next/head";
import useUser from "../lib/hooks/useUser";
import HowToPlay from "../components/dashboard/HowToPlay";

const HowItWorks = () => {
  const { user, authenticated } = useUser();
  const user_type = user?.details?.user_type;

  return (
    <Box>
      <Head>
        <title>Nairaboom - How to Play</title>
        <meta name="description" content="World’sPioneerFintechBingoGame" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-904C1779CP"
          strategy="afterInteractive"
        />
        <script strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-904C1779CP');
          `}
        </script>
      </Head>
      <HowToPlay />
    </Box>
  );
  // return (
  //   <Box>
  //     <Head>
  //       <title>Nairaboom - How to Play</title>
  //       <meta name="description" content="World’sPioneerFintechBingoGame" />
  //     </Head>

  //     <NavBar />
  //     <BackgroundTitle image={background} longbit="How to p" shortbit="lay" />
  //     <Box
  //       bgColor={"white"}
  //       fontFamily="poppins"
  //       pt="4.8rem"
  //       pb="3rem"
  //       backgroundImage={`url(${coil.src})`}
  //       backgroundPosition="right center"
  //       backgroundRepeat="no-repeat"
  //     >
  //       <Text
  //         textAlign={"center"}
  //         fontWeight={500}
  //         w={{ base: "80%", md: "55%" }}
  //         margin={"auto"}
  //       >
  //         Once you get a credit alert or debit alert after any financial
  //         transaction you do, you can immediately click on {"  "}
  //         <Link color={"nairagreen"} href="/">
  //           Play Now
  //         </Link>{" "}
  //         to place a stake on your ALERT to win 30,000,000 Naira.
  //       </Text>
  //     </Box>
  //     <Box
  //       bgColor="#F5F5F5"
  //       display={"flex"}
  //       justifyContent="center"
  //       alignItems={"center"}
  //       flexDir="column"
  //       flexWrap={"wrap"}
  //       gap="5rem"
  //       pt="5rem"
  //       pb="5.2rem"
  //     >
  //       <Box
  //         display={"flex"}
  //         flexDir={{ base: "column", md: "row" }}
  //         gap={{ base: "2rem", md: "4rem", lg: "12rem" }}
  //         alignItems="center"
  //       ></Box>
  //       <Box
  //         display={"flex"}
  //         flexDir={{ base: "column", md: "row" }}
  //         gap={{ base: "2rem", md: "4rem", lg: "12rem" }}
  //         alignItems="center"
  //       ></Box>
  //     </Box>

  //     <Box
  //       fontFamily={"poppins"}
  //       pt="4rem"
  //       pb="7rem"
  //       display={"flex"}
  //       flexDir="column"
  //       alignItems={"center"}
  //       px={{ base: "2rem", lg: "6rem" }}
  //       bgColor={"white"}
  //     >
  //       <Heading fontFamily={"poppins"} pb="5rem">
  //         How to win
  //       </Heading>
  //       <Box
  //         // as={motion.div}
  //         whileInView={{ y: [70, 0] }}
  //         transition={{ type: "linear", duration: 0.5 }}
  //         display="flex"
  //         flexWrap={"wrap"}
  //         gap="3rem"
  //         justifyContent={{ base: "space-evenly", lg: "center" }}
  //       >
  //         <CashBack
  //           number={1}
  //           icon={icon1}
  //           title="Receive a Credit or Debit Alert"
  //           note="Anytime you receive a credit or debit alert
  //           from your bank, click on Play Now to create or login into your Nairaboom profile to play the game."
  //         />
  //         {/* <CashBack
  //           number={2}
  //           icon={icon2}
  //           title="Register Your Alert"
  //           note='Click "Boom My Alert" within your profile to register details of a valid credit or debit alert you received.'
  //         /> */}
  //         <CashBack
  //           number={2}
  //           icon={icon3}
  //           title="Fund Your Wallet"
  //           note="Fund your wallet by clicking on any
  //           of the available payment options within your profile."
  //         />
  //         <CashBack
  //           number={3}
  //           icon={icon4}
  //           title="Register Your Alert"
  //           note="Click the 'Boom My Alert' tab within your profile to
  //           register details of the alert you want to win"
  //         />
  //         <CashBack
  //           number={4}
  //           icon={icon6}
  //           title="Spin the Boomwheel"
  //           note="Spin the Boomwheel and match the boxes to start
  //           winning now!"
  //         />
  //         {/* <CashBak
  //           number={6}
  //           icon={icon6}
  //           title="Check The Boom Time"
  //           note="Winning Boom Numbers are announced daily at 8am. Check Daily Results on the website and all our social media platforms or agents."
  //         /> */}
  //       </Box>
  //       <NextLink href={"/"} passHref>
  //         <Link
  //           bgColor={"nairagreen"}
  //           color="white"
  //           fontWeight={600}
  //           fontSize="lg"
  //           p="1rem 3rem"
  //           mt="4.5rem"
  //           borderRadius={"md"}
  //           transitionDuration={".3s"}
  //           _hover={{ transform: "scale(1.02)" }}
  //         >
  //           Load More
  //         </Link>
  //       </NextLink>
  //     </Box>

  //     {/* winning modalities */}
  //     <Box
  //       display={"flex"}
  //       alignItems="center"
  //       bgColor="nairablue"
  //       pt="5.3rem"
  //       pb="4.5rem"
  //       flexDir={"column"}
  //       fontFamily="poppins"
  //     >
  //       <Heading
  //         fontFamily={"poppins"}
  //         fontSize={{ base: "2rem", md: "2.5rem" }}
  //         fontWeight={700}
  //         color="white"
  //       >
  //         Winning Modalities
  //       </Heading>
  //       <Box
  //         mt="7.3rem"
  //         display={"flex"}
  //         flexDir={{ base: "column", md: "row" }}
  //         bgColor="rgba(255, 255, 255, 0.03)"
  //         alignItems={"center"}
  //         w="80%"
  //         justifyContent={"space-evenly"}
  //         borderRadius="2rem"
  //       >
  //         {/* <Image src={number1} alt="number 1" /> */}
  //         <Box
  //           display={"flex"}
  //           flexDir="column"
  //           gap="2rem"
  //           w={{ base: "85%", md: "65%" }}
  //           pr={{ base: "0", md: "2rem" }}
  //           py="1rem"
  //         >
  //           <Text color="white" fontSize={"xl"}>
  //             To win on Nairaboom, all you have to do is spin the Boomwheel for
  //             each game you play. The Boomwheel consists of many color slices
  //             but only the green slices are the winning slices and to win a
  //             game, you must spin the wheel to get 3 or 4 green slices in 4
  //             spins.
  //           </Text>
  //         </Box>
  //       </Box>
  //       <Box
  //         mt="6.6rem"
  //         display={"flex"}
  //         flexDir={{ base: "column", md: "row-reverse" }}
  //         bgColor="rgba(255, 255, 255, 0.03)"
  //         alignItems={"center"}
  //         w="80%"
  //         justifyContent={"space-evenly"}
  //         borderRadius="2rem"
  //       >
  //         <Box
  //           display={"flex"}
  //           flexDir="column"
  //           gap="2rem"
  //           w={{ base: "85%", md: "65%" }}
  //           pl={{ base: "0", md: "2rem" }}
  //           py="1rem"
  //         >
  //           <Text color="white" fontSize={"xl"}>
  //             Get 3 green slices, you win your ALERT!
  //           </Text>
  //         </Box>
  //         <Image src={number1} alt="number 1" />
  //       </Box>

  //       <Box
  //         mt="6.6rem"
  //         display={"flex"}
  //         flexDir={{ base: "column", md: "row-reverse" }}
  //         bgColor="rgba(255, 255, 255, 0.03)"
  //         alignItems={"center"}
  //         w="80%"
  //         justifyContent={"space-evenly"}
  //         borderRadius="2rem"
  //       >
  //         <Image src={number2} alt="number 2" />
  //         <Box
  //           display={"flex"}
  //           flexDir="column"
  //           gap="2rem"
  //           w={{ base: "85%", md: "65%" }}
  //           pl={{ base: "0", md: "2rem" }}
  //           py="1rem"
  //         >
  //           <Text color="white" fontSize={"xl"}>
  //             Get 4 green slices, you win the JACKPOT!!!
  //           </Text>
  //         </Box>
  //       </Box>
  //       <Box
  //         mt="6.6rem"
  //         display={"flex"}
  //         flexDir={{ base: "column", md: "row" }}
  //         bgColor="rgba(255, 255, 255, 0.03)"
  //         alignItems={"center"}
  //         w="80%"
  //         justifyContent={"space-evenly"}
  //         borderRadius="2rem"
  //       >
  //         <Image src={number3} alt="number 3" />
  //         <Box
  //           display={"flex"}
  //           flexDir="column"
  //           gap="2rem"
  //           w={{ base: "85%", md: "65%" }}
  //           pr={{ base: "0", md: "2rem" }}
  //           py="1rem"
  //         >
  //           <Text color="white" fontSize={"xl"}>
  //             Start spinning to start winning today
  //           </Text>
  //         </Box>
  //       </Box>

  //       {/* button */}
  //       <NextLink
  //         href={
  //           user_type === "customer"
  //             ? "/customer_dashboard"
  //             : user_type === "agent"
  //             ? "agent_dashboard"
  //             : "auth?p=signupcustomer"
  //         }
  //         passHref
  //       >
  //         <Link
  //           bgColor={"nairagreen"}
  //           color="white"
  //           fontWeight={600}
  //           fontSize="lg"
  //           p="1rem 3rem"
  //           mt="4.5rem"
  //           borderRadius={"md"}
  //           transitionDuration={".3s"}
  //           _hover={{ transform: "scale(1.02)" }}
  //         >
  //           Play Now
  //         </Link>
  //       </NextLink>

  //       {/* <Box
  //         mt="6.6rem"
  //         display={"flex"}
  //         flexDir={{ base: "column", md: "row-reverse" }}
  //         bgColor="rgba(255, 255, 255, 0.03)"
  //         alignItems={"center"}
  //         w="80%"
  //         justifyContent={"space-evenly"}
  //         borderRadius="2rem"
  //       >
  //         <Circle bg={"nairagreen"} size={{ base: "10rem", md: "18.25rem" }}>
  //           <Text
  //             color={"white"}
  //             fontFamily="poppins"
  //             fontWeight={700}
  //             fontSize={{ base: "4rem", md: "9.25rem" }}
  //           >
  //             4
  //           </Text>
  //         </Circle>
  //         <Box
  //           display={"flex"}
  //           flexDir="column"
  //           gap="2rem"
  //           w={{ base: "85%", md: "65%" }}
  //           pl={{ base: "0", md: "2rem" }}
  //           py="1rem"
  //         >
  //           <Text color="white" fontSize={"xl"}>
  //             Start spinning to start winning today
  //           </Text>
  //         </Box>
  //       </Box> */}

  //       {/* <Box
  //         py="2rem"
  //         mt="6.6rem"
  //         display={"flex"}
  //         flexDir={{ base: "column", md: "row" }}
  //         bgColor="rgba(255, 255, 255, 0.03)"
  //         alignItems={"center"}
  //         w="80%"
  //         justifyContent={"space-evenly"}
  //         borderRadius="2rem"
  //       >
  //         <Circle bg={"nairagreen"} size={{ base: "10rem", md: "18.25rem" }}>
  //           <Text
  //             color={"white"}
  //             fontFamily="poppins"
  //             fontWeight={700}
  //             fontSize={{ base: "4rem", md: "9.25rem" }}
  //           >
  //             5
  //           </Text>
  //         </Circle>
  //         <Box
  //           display={"flex"}
  //           flexDir="column"
  //           gap="2rem"
  //           w={{ base: "85%", md: "65%" }}
  //           pr={{ base: "0", md: "2rem" }}
  //           py="1rem"
  //         >
  //           <Text color="white" fontSize={"xl"}>
  //             Match 3 numbers with the latest Boom Numbers in 4 consecutive
  //             plays to win your last Alert.
  //           </Text>
  //           <Text color="white" fontSize={"xl"}>
  //             If you match 3 Boom Numbers in four consecutive games played even
  //             if your third consecutive play is a loss, you win the last alert
  //             you staked!
  //           </Text>
  //           <Text color={"white"} fontSize={"xl"}>
  //             See explanation below; <br />
  //             <br />
  //             Alert 1 : 5,000 Naira <br />
  //             Alert 2 : 10,000 Naira <br />
  //             Alert 3 : 15,000 Naira <br />
  //             Alert 4 : 20,000 Naira <br />
  //             Daily Boom Numbers 1 : 01:22:36 <br />
  //             Daily Boom Numbers 2 : 18:48:35 <br />
  //             Daily Boom Numbers 3 : 14 :28:10 <br />
  //             Daily Boom Numbers 4 : 20 :11:58 <br />
  //             Your Boom Numbers 1 : 01:25:09 <br />
  //             Your Boom Numbers 2 : 04:48:18 <br />
  //             Your Boom Numbers 3: 11:34:42 <br />
  //             Your Boom Numbers 4: 12:16:58 <br />
  //             Matching Boom Numbers: 01, 48, 58 <br />
  //             You Win = 20,000 Naira ( Alert 4 ) <br />
  //           </Text>
  //         </Box>
  //       </Box> */}

  //       {/* Trench Jackpot */}
  //       {/* <Box
  //         py="2rem"
  //         mt="6.6rem"
  //         display={"flex"}
  //         flexDir={{ base: "column", md: "row-reverse" }}
  //         bgColor="rgba(255, 255, 255, 0.03)"
  //         alignItems={"center"}
  //         w="80%"
  //         justifyContent={"space-evenly"}
  //         borderRadius="2rem"
  //       >
  //         <Circle bg={"nairagreen"} size={{ base: "10rem", md: "18.25rem" }}>
  //           <Text
  //             color={"white"}
  //             fontFamily="poppins"
  //             fontWeight={700}
  //             fontSize={{ base: "4rem", md: "9.25rem" }}
  //           >
  //             6
  //           </Text>
  //         </Circle>
  //         <Box
  //           display={"flex"}
  //           flexDir="column"
  //           gap="2rem"
  //           w={{ base: "85%", md: "65%" }}
  //           pr={{ base: "0", md: "2rem" }}
  //           py="1rem"
  //         >
  //           <Text color="white" fontSize={"xl"}>
  //             Trench Burster Jackpot.
  //           </Text>
  //           <Text color="white" fontSize={"xl"}>
  //             Play 5 or more games monthly to qualify for the Trench Burster
  //             Jackpot.
  //           </Text>
  //         </Box>
  //       </Box> */}
  //     </Box>
  //     {/* winning modalities ends here */}
  //     <Box
  //       bgColor={"white"}
  //       fontFamily="poppins"
  //       display="flex"
  //       flexDir="column"
  //       alignItems="center"
  //       pt={{ base: "4rem", md: "6.68rem" }}
  //       pb="10rem"
  //     >
  //       <Text
  //         lineHeight={{ base: "2.5rem", md: "3.75rem" }}
  //         fontSize={{ base: "2rem", md: "2.5rem" }}
  //         color="nairablue"
  //         fontWeight={700}
  //         w={{ base: "80%", lg: "max-content" }}
  //         textAlign={{ base: "left", md: "center" }}
  //       >
  //         How To Qualify For <br /> Trench Burster Jackpot
  //       </Text>
  //       <Text
  //         fontSize={"lg"}
  //         color="#767676"
  //         w={{ base: "80%", lg: "50%" }}
  //         textAlign={{ base: "left", md: "center" }}
  //         pt="2rem"
  //         lineHeight={"1.8rem"}
  //       >
  //         At the end of every month if you played 5 or more games with your
  //         alerts, you qualify to enter the TRENCH BURSTER JACKPOT draw and stand
  //         a chance to win MILLIONS. Winners are announced at the end of every
  //         month..
  //       </Text>
  //       <Box
  //         pt="7rem"
  //         w="85%"
  //         display={"flex"}
  //         alignItems="center"
  //         flexDir={"column"}
  //         gap="2.5rem"
  //       >
  //         <Box
  //           display={"flex"}
  //           alignItems="flex-start"
  //           justifyContent={"center"}
  //           w="100%"
  //           gap={{ base: "1rem", md: "3rem" }}
  //         >
  //           <Text
  //             w="45%"
  //             textAlign={"right"}
  //             fontSize="xl"
  //             lineHeight={"1.8rem"}
  //           >
  //             Play 5 Games
  //           </Text>
  //           <Square h="39px" w="60px" borderRadius={"md"} bgColor="nairagreen">
  //             <Image src={arrow} alt="arrow icon" />
  //           </Square>
  //           <Text
  //             w="45%"
  //             textAlign={"left"}
  //             fontSize="xl"
  //             lineHeight={"1.8rem"}
  //           >
  //             Trench Burster Jackpot entry
  //           </Text>
  //         </Box>
  //       </Box>
  //     </Box>
  //     <Getstarted />
  //     <FooterComponent />
  //   </Box>
  // );
};

export default HowItWorks;
