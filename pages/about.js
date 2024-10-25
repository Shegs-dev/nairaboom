import {
  Box,
  Heading,
  Text,
  chakra,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import FooterComponent from "../components/Footer";
import Image from "next/legacy/image";
import picture2 from "../public/homepage-secondpic.svg";
import reason4 from "../public/homepage/reason4.svg";
import coil from "../public/aboutpage/coil.png";
import coil2 from "../public/aboutpage/coil2.png";
import longpointer from "../public/aboutpage/longpointer.png";
import CustomListIcon from "../components/ListIcon";
import BackgroundTitle from "../components/BackgroundTitle";
import Head from "next/head";
import aboutimg from "../public/homepage/aboutimg.svg";
import Footer2 from "../components/homepage/Footer2";
import TopComponent from "../components/homepage/TopComponent";
import Navbar2 from "../components/homepage/Nav";
import Footer from "../components/homepage/Footer";
import Footer3 from "../components/homepage/Footer3";

const AboutPage = () => {
  const listcontent = [
    "2000 naira bonus upon activation",
    "Double cashback earnings",
    "Yearly cashback dividends",
    "Access to interest free loans",
    "Access to business grants",
    "Random giveaways",
    "Exclusive membership promotions",
    "Special shopping discount vouchers",
  ];
  return (
    <Box>
      <Head>
        <title>Nairaboom - About</title>
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
      {/* <NavBar /> */}
      <Navbar2/>
      
      <BackgroundTitle longbit="About " shortbit="Us" />
      <Box
        bgColor={"white"}
        fontFamily="poppins"
        display={"flex"}
        flexDir={{ base: "column", lg: "row" }}
        gap={{ base: "2rem", lg: "0" }}
        alignItems="center"
        justifyContent={"space-evenly"}
        py="5rem"
        backgroundImage={`url(${coil2.src})`}
        backgroundPosition="right top"
        backgroundRepeat="no-repeat"
      >
        <Box display={{ base: "none", lg: "block" }}>
          {/* <Image src={picture2} alt="homepage second picture" /> */}
          <Image src={aboutimg} alt="homepage second picture" />
        </Box>

        <Box
          display={"flex"}
          gap=".6rem"
          flexDir="column"
          w={{ base: "90%", lg: "50%" }}
          float={"right"}
        >
          <Text fontWeight={500} color="nairagreen">
            About Us
          </Text>
          <Heading
            color="nairablue"
            fontFamily={"poppins"}
            fontSize={{ base: "2rem", lg: "2.5rem" }}
          >
            World’s Pioneer Fingo Game
          </Heading>
          <Text color={"nairablue"} fontSize="xl" pt="1.4rem">
            Nairaboom is an exciting easy to play and easy to win fingo game
            that allows you to stake on any valid credit or debit alert you
            receive and win up to 30,000,000 Million Naira. <br /> <br />
            All you have to do is stake your alert on nairaboom.ng to win
            instantly.
          </Text>
          {/* <Text color={"nairablue"} fontSize="xl" pt="1rem">
            When you receive a Credit alert or Debit alert after making a
            successful financial transaction, for example, ATM withdrawal, POS
            payment, online bill payment, transfer or mobile money transaction,
            you can stake that alert on nairaboom.ng to win life changing
            payouts by just choosing 3 numbers that match the Daily Boom Time.
          </Text> */}
        </Box>
      </Box>

      {/* <Box
        backgroundImage={`url(${coil.src})`}
        backgroundPosition="left top"
        backgroundRepeat="no-repeat"
        pt={{ base: "6rem", lg: "10rem" }}
        pb={{ base: "4rem", lg: "9rem" }}
        display={"flex"}
        flexDir="row-reverse"
        justifyContent="space-evenly"
        alignItems={"center"}
      >
        <Box display={{ base: "none", lg: "block" }}>
          <Image src={reason4} alt="cashback reason" />
        </Box>

        <Box
          display="flex"
          flexDir="column"
          gap="2.2rem"
          w={{ base: "90%", lg: "40%" }}
          fontFamily={"poppins"}
        >
          <Text fontWeight={700} fontSize="2.3rem" color="nairablue">
            Naira Boom Dividends Membership
          </Text>
          <Text fontSize="xl" color="nairablue">
            Naira Boom Dividends Membership is an exclusive limited special
            access membership program for a select few. This Dividends
            Membership unlocks a world of perks and cashback privileges not
            available to other users of the 9jaCashBack service. When you
            activate 9jaCashBack Dividends Membership pre-launch, you gain
            exclusive access to cashback dividends for life.
          </Text>
        </Box>
      </Box> */}
      {/* <Box
        alignItems={"center"}
        justifyContent={"space-evenly"}
        display={"flex"}
        flexDir={{ base: "column", md: "row" }}
        bgColor="#F6F6F6"
        py={{ base: "6rem", lg: "12.5rem" }}
        mb="10.35rem"
        gap={{ base: "3rem", md: "0" }}
      >
        <Box
          fontFamily={"poppins"}
          w={{ base: "85%", md: "35%" }}
          position={"relative"}
        >
          <Text fontWeight={700} fontSize="2.3rem" color="nairablue">
            Your Naira Boom Dividends Membership benefits include:{" "}
          </Text>
          <chakra.span
            display={{ base: "none", lg: "block" }}
            position={"absolute"}
            right={-100}
            bottom={21}
          >
            <Image src={longpointer} alt="Long pointer" />
          </chakra.span>
        </Box>
        <Box w={{ base: "85%", md: "max-content" }}>
          <List spacing={5} fontFamily="poppins">
            {listcontent.map((listitem, index) => (
              <ListItem
                key={index}
                fontWeight={400}
                fontSize="xl"
                color="nairablue"
              >
                <ListIcon as={CustomListIcon} />
                <chakra.span pl="1.5rem">{listitem}</chakra.span>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box> */}
      {/* <FooterComponent /> */}
      {/* <Footer2/> */}
      <Footer3/>
    </Box>
  );
};

export default AboutPage;
