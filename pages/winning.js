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
import WinningModalities from "../components/dashboard/Modalities";
  
  const Winning = () => {
    const { user, authenticated } = useUser();
    const user_type = user?.details?.user_type;
  
    return (
      <Box>
        <Head>
          <title>Nairaboom - Winning Modalities</title>
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
        <WinningModalities/>
      </Box>
    );
  };
  
  export default Winning;
  