import {
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import BackgroundTitle from "../components/BackgroundTitle";
import FooterComponent from "../components/Footer";
import NavBar from "../components/NavBar";
import background from "../public/aboutpage/background.png";
import coil from "../public/how-it-works/coil.png";
import accordionContent from "../utils/accordionContent";
import Footer3 from "../components/homepage/Footer3";

const FaqPage = () => {
  const router = useRouter()
  return (
    <Box>
      <NavBar />
      <BackgroundTitle image={background} longbit="FAQ" shortbit="s" />
      <Box
        bgColor={"white"}
        fontFamily="poppins"
        pt="4.8rem"
        pb="3rem"
        backgroundImage={`url(${coil.src})`}
        backgroundPosition="right center"
        backgroundRepeat="no-repeat"
        px={{ base: "1rem", md: "2rem" }}
        display="flex"
        flexDir={"column"}
        alignItems="center"
      >
        <Heading
          pb="2rem"
          fontFamily={"poppins"}
          fontSize={{ base: "1.5rem", md: "2rem" }}
          textAlign={"center"}
        >
          Frequently asked Questions
        </Heading>
        <Box w={{ base: "100%", md: "90%" }} pb="2rem">
          <Accordion allowToggle defaultIndex={[0]}>
            {accordionContent.map((item, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton
                    _expanded={{ bg: "nairablue", color: "white" }}
                    py="1.5rem"
                  >
                    <Box flex="1" textAlign="left">
                      <Text fontSize={"1.25rem"}>{item[0]}</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  py="1.5rem"
                  fontSize={"1.25rem"}
                  color="nairablue"
                >
                  {item[1]}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>

        <Text fontSize={"1.3rem"}>
          Got more questions? Kindly
          <Text
            color={"nairagreen"}
            textDecor={"underline"}
            cursor={"pointer"}
            onClick={() => router.push("/contact")}
          >
            {" "}
            Contact our Customer Care{" "}
          </Text>
        </Text>
      </Box>
      {/* <FooterComponent /> */}
      <Footer3/>
    </Box>
  );
};

export default FaqPage;
