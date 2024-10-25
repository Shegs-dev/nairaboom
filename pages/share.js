import {
  Box,
  Heading,
  Text,
  chakra,
  List,
  ListItem,
  ListIcon,
  useToast,
  Button,
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
import { AUTH_API_ROUTES } from "../utils/routes";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;
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
  
  const toast = useToast();
  const [data, setData] = useState("");
  const router = useRouter();
  const { r, t, type } = router.query;
  useEffect(() => {
    async function fetchDailyWinners() {
      const config = {
        method: "get",
        url: `${BASE_URL}/api/share_ads_image`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
        },
      };
      try {
        // setIsLoading(true);
        const response = await axios(config);
        setData(response?.data);
      } catch (err) {
        // toast({
        //   status: "error",
        //   isClosable: true,
        //   duration: "5000",
        //   title: "Please check your connection and try again",
        //   position: "top",
        // });
      } finally {
        // setIsLoading(false);
      }
    }

    fetchDailyWinners();
  }, []);

  return (
    <Box>
      <Head>
        <title>Nairaboom - Share</title>
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
      {/* <Navbar2 /> */}

      <BackgroundTitle longbit="Cashout With Your " 
      shortbit="Alert"
       />
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
        <Box
          display={"flex"}
          gap=".6rem"
          flexDir="column"
          w={{ base: "90%", lg: "50%" }}
          float={"right"}
        >
          {/* <Text fontWeight={500} color="nairagreen">
            Share image 
          </Text> */}
          {/* <Box display={{ base: "block", lg: "block" }}>

            <Image width={200} height={200} src={"https://nairaboom.com.ng/uploads/share_ads/1_654a79b21370b_2023-11-07.png"} alt="homepage second picture" />
          </Box> */}

          {/* <Heading
            color="nairablue"
            fontFamily={"poppins"}
            fontSize={{ base: "2rem", lg: "2.5rem" }}
          >
            Nairaboom Ads Image
          </Heading> */}
          <Box display={{ base: "block", lg: "block" }}  mx={"auto"}>
            <img
              src={`${
                data?.payload?.share_ads_path ||
                "https://unsplash.com/photos/a-glass-of-wine-sitting-on-top-of-a-wooden-table-swtBKM_PUjA"
              }`}
              //   style={{ width: '80%', maxWidth: '80%', height: 'auto' }}
              alt="homepage second picture"
            />
          </Box>
          <Button
            type={"submit"}
            mx={"auto"}
            color="white"
            fontSize={"23px"}
            w={{ base: "85%", md: "30rem" }}
            mt="2rem"
            mb="2rem"
            h="3.5rem"
            fontWeight="600"
            bg={"linear-gradient(180deg, #02D95A 0%, #02B54C 100%)"}
            cursor="pointer"
            _hover={{ transform: "scale(1.05)" }}
            onClick={() => {
              router.push(`/auth/signup/customer?r=${r}&t=share`); 
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      {/* <Footer3 /> */}
    </Box>
  );
};

export default AboutPage;
