import {
  Box,
  Button,
  HStack,
  Input,
  Spinner,
  Text,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useState } from "react";
import BackgroundTitle from "../components/BackgroundTitle";
import Getstarted from "../components/Getstarted";
import coil from "../public/contactpage/coil.png";
import coil2 from "../public/contactpage/coil2.png";
import email from "../public/contactpage/email.png";
import ladycalling from "../public/contactpage/ladycalls.svg";
import whatsapp from "../public/contactpage/whatsapp.png";
import { AUTH_API_ROUTES } from "../utils/routes";
// import Footer from "../components/homepage/Footer2";
// import Footer2 from "../components/homepage/Footer2";
import Footer3 from "../components/homepage/Footer3";
import Navbar2 from "../components/homepage/Nav";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;

const ContactPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const initialContact = {
    fullname: "",
    phone_number: "",
    email: "",
    message: "",
  };

  const [contactMessage, setContactMessage] = useState(initialContact);
  const handleContactChange = (e) => {
    setContactMessage({
      ...contactMessage,
      [e.target.name]: e.target.value,
    });
  };

  const contactconfig = {
    method: "post",
    url: `${BASE_URL}/api/contact_us`,
    headers: {
      "X-APP-KEY": "FEIX9997eQFKBCjk9FaP95YOOk013XkKgGLVz",
    },
    data: contactMessage,
  };

  const contactconfig2 = {
    method: "post",
    url: `https://mail.zoho.com/api/accounts/845963820/messages`,
    headers: {
      "X-APP-KEY": "FEIX9997eQFKBCjk9FaP95YOOk013XkKgGLVz",
    },
    data: {
      fromAddress: contactMessage?.email,
      toAddress: "info@nairaboom.ng",
      // ccAddress: "colleagues@mywork.com",
      // bccAddress: "restadmin1@restapi.com",
      subject: "Email - Contact us",
      content: contactMessage?.message,
      // askReceipt: "yes",
    },
    // Rn87SbQYSw6u
  };
  // https://nairaboom.ng/?code=1000.e3bce637abe3e769e1f63884bfb3abcd.c7e94cb80549b16e9e680254d22bb072&location=us&accounts-server=https%3A%2F%2Faccounts.zoho.com&

  const handleContactSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await axios(contactconfig2);

      if (response?.data?.status === false) {
        toast({
          isClosable: true,
          duration: 5000,
          status: "error",
          title: response.data.message,
          position: "top",
        });
        return;
      }
      toast({
        isClosable: true,
        duration: 5000,
        status: "success",
        title: response?.data?.message,
        position: "top",
      });
      router.push("/");
    } catch (err) {
      toast({
        isClosable: true,
        duration: 5000,
        status: "error",
        title: err?.response?.data?.message
          ? err?.response?.data?.message
          : "Some error occurred! check your connection.",
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box>
      <Head>
        <title>Nairaboom - Contact Us</title>
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
      <Navbar2 />
      <BackgroundTitle longbit="Contact " shortbit="Us" />
      <Box
        bgColor={"white"}
        backgroundImage={`url(${coil2.src}), url(${coil.src})`}
        backgroundPosition="left top, left bottom"
        backgroundRepeat="no-repeat"
        display={"flex"}
        flexDir={{ base: "column", lg: "row" }}
        justifyContent="center"
        alignItems={"center"}
        pb={{ base: "5rem", md: "10rem" }}
        gap="5rem"
      >
        <Box
          w={{ base: "75%", lg: "30%" }}
          display={"flex"}
          gap="1.85rem"
          flexDir="column"
          fontFamily={"poppins"}
          pt={{ base: "3rem", md: "7rem", lg: "10rem" }}
        >
          <Box>
            <Image src={ladycalling} alt="contact us" />
          </Box>

          <Text fontWeight={500} fontSize="21.22px" color={"nairablue"}>
            Need Help? Reach out to us, We got answers to your questions
          </Text>
          <HStack spacing={5}>
            <Image src={whatsapp} alt="phone icon" />{" "}
            <Text color={"nairablue"} fontWeight={400} fontSize="21.22px">
              0916-000-2597
            </Text>
          </HStack>
          <HStack spacing={5}>
            <Image src={email} alt="email icon" />{" "}
            <Text color={"nairablue"} fontWeight={400} fontSize="21.22px">
              {" "}
              info@nairaboom.ng
            </Text>
          </HStack>
        </Box>
        <Box
          pt={{ base: "2rem", lg: "10rem" }}
          w={{ base: "70%", lg: "35%" }}
          fontFamily={"poppins"}
          display="flex"
          flexDir={"column"}
        >
          <Text
            pb="3rem"
            color={"nairagreen"}
            fontWeight={500}
            fontSize="21.22px"
          >
            Make Enquiries
          </Text>
          <form onSubmit={handleContactSubmit}>
            <Input
              placeholder="Full Name"
              name="fullname"
              w={{ base: "100%", lg: "27.5rem" }}
              h="3.6rem"
              border={"none"}
              bgColor="#F6F6F6"
              type={"text"}
              _placeholder={{ fontSize: "17.62px" }}
              mb="1.85rem"
              focusBorderColor="nairagreen"
              onChange={handleContactChange}
              isRequired
            />
            <Input
              placeholder="Email"
              name="email"
              w={{ base: "100%", lg: "27.5rem" }}
              h="3.6rem"
              border={"none"}
              bgColor="#F6F6F6"
              type={"email"}
              _placeholder={{ fontSize: "17.62px" }}
              mb="1.85rem"
              focusBorderColor="nairagreen"
              onChange={handleContactChange}
              isRequired
            />
            <Input
              placeholder="Phone number"
              name="phone_number"
              w={{ base: "100%", lg: "27.5rem" }}
              h="3.6rem"
              border={"none"}
              bgColor="#F6F6F6"
              type={"number"}
              _placeholder={{ fontSize: "17.62px" }}
              mb="1.85rem"
              focusBorderColor="nairagreen"
              onChange={handleContactChange}
              isRequired
            />
            <Input
              placeholder="Enter your message"
              w={{ base: "100%", lg: "27.5rem" }}
              pt="1.3rem"
              pb="9.7rem"
              border={"none"}
              bgColor="#F6F6F6"
              type={"text"}
              _placeholder={{ fontSize: "17.62px" }}
              mb="1.85rem"
              focusBorderColor="nairagreen"
              onChange={handleContactChange}
              name="message"
              isRequired
            />
            <Button
              type="submit"
              w={{ base: "100%", lg: "27.5rem" }}
              border={"none"}
              color="white"
              bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
              fontWeight={600}
              fontSize="lg"
              mb="1.85rem"
              cursor={"pointer"}
              transitionDuration={".3s"}
              _hover={{ transform: "scale(1.02)" }}
            >
              {isLoading ? <Spinner /> : "Send Message"}
            </Button>
          </form>
        </Box>
      </Box>
      <Getstarted />
      {/* <FooterComponent /> */}
      <Footer3 />
    </Box>
  );
};

export default ContactPage;
