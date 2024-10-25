import {
  Box,
  Heading,
  chakra,
  Text,
  Input,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import FooterComponent from "../components/Footer";
import BackgroundTitle from "../components/BackgroundTitle";
import coil2 from "../public/aboutpage/coil2.png";

const PlayAsGuest = () => {
  return (
    <Box>
      <NavBar />
      <BackgroundTitle longbit="Play As A Gu" shortbit="est" />
      <Box
        backgroundImage={`url(${coil2.src})`}
        backgroundPosition="right top"
        backgroundRepeat="no-repeat"
        pt={{base:"6rem",md:"8rem"}}
        fontFamily={"poppins"}
        display="flex"
        flexDir={"column"}
        alignItems="center"
      >
        <Text
          textAlign={"center"}
          fontWeight={500}
          fontSize={{ base: "1.5rem", lg: "2rem" }}
          pb={{base:"4rem",md:"6.1rem"}}
          w={{base:"80%", lg:"max-content"}}
        >
          Wish to get cashback for your transaction?
          <br /> Fill the form below
        </Text>
        <Box
          mb="9.8rem"
          pt="7.3rem"
          w="90%"
          borderRadius={"2rem"}
          bgColor={"#F6F6F6"}
        >
          <form action="">
            <Box
              justifyContent={"space-evenly"}
              alignItems="center"
              display="flex"
              flexWrap={"wrap"}
              gap={{base:"0",md:"2rem"}}
              w="95%"
              margin={"auto"}
            >
              <Input
                placeholder="Amount"
                w="25.125rem"
                h="4.8rem"
                border={"none"}
                bgColor="white"
                type={"number"}
                _placeholder={{ fontSize: "16px", color: "#A7A7A7" }}
                mb="3rem"
                focusBorderColor="nairagreen"
              />
              <Select
                w="25.125rem"
                h="4.8rem"
                border={"none"}
                bgColor="white"
                placeholder="Transaction Type"
                mb="3rem"
                color={"#A7A7A7"}
                focusBorderColor="nairagreen"
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </Select>
              <Input
                placeholder="First Name"
                w="25.125rem"
                h="4.8rem"
                border={"none"}
                color={"#A7A7A7"}
                bgColor="white"
                type={"text"}
                _placeholder={{ fontSize: "16px", color: "#A7A7A7" }}
                mb="3rem"
                focusBorderColor="nairagreen"
              />
              <Select
                w="25.125rem"
                h="4.8rem"
                border={"none"}
                bgColor="white"
                placeholder="Make My Cashback Payout To"
                mb="3rem"
                color={"#A7A7A7"}
                focusBorderColor="nairagreen"
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </Select>

              <Input
                placeholder="Last Name"
                w="25.125rem"
                h="4.8rem"
                color={"#A7A7A7"}
                border={"none"}
                bgColor="white"
                type={"text"}
                _placeholder={{ fontSize: "16px", color: "#A7A7A7" }}
                mb="3rem"
                focusBorderColor="nairagreen"
              />
              <Input
                placeholder="Account Number"
                w="25.125rem"
                h="4.8rem"
                border={"none"}
                color={"#A7A7A7"}
                bgColor="white"
                type={"number"}
                _placeholder={{ fontSize: "16px", color: "#A7A7A7" }}
                mb="3rem"
                focusBorderColor="nairagreen"
              />
              <Input
                placeholder="Phone Number"
                w="25.125rem"
                h="4.8rem"
                border={"none"}
                color={"#A7A7A7"}
                bgColor="white"
                type={"tel"}
                _placeholder={{ fontSize: "16px", color: "#A7A7A7" }}
                mb="3rem"
                focusBorderColor="nairagreen"
              />

              <Input
                placeholder="Choose Lucky Time(24hr format)"
                w="25.125rem"
                h="4.8rem"
                border={"none"}
                color={"#A7A7A7"}
                _before={{
                  content: `"Choose Lucky Time(24hr format)"`,
                  postion: "absolute",
                  width: "100%",
                  fontSize: "sm",
                }}
                _focus={{ _before: { content: `""`, w: 0 } }}
                bgColor="white"
                type={"time"}
                _placeholder={{ fontSize: "16px", color: "#A7A7A7" }}
                mb="3rem"
                focusBorderColor="nairagreen"
              />
              <Box
                margin={"auto"}
                alignItems="center"
                display={"flex"}
                flexDir="column"
              >
                <Input
                  placeholder="Boost Code(if any)"
                  w={{ base: "100%", lg: "25.125rem" }}
                  h="4.8rem"
                  border={"none"}
                  color={"#A7A7A7"}
                  bgColor="white"
                  type={"text"}
                  _placeholder={{ fontSize: "16px", color: "#A7A7A7" }}
                  mb="3rem"
                  focusBorderColor="nairagreen"
                />

                <Checkbox mb="5rem" colorScheme={"green"} color="#A7A7A7">
                  I agree to the terms and conditions
                </Checkbox>

                <Input
                  value={"Proceed"}
                  border={"none"}
                  w={{ base: "100%", lg: "31.6rem" }}
                  color="white"
                  bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
                  type={"submit"}
                  fontWeight={600}
                  fontSize="lg"
                  mb="4.5rem"
                  cursor={"pointer"}
                />
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
      <FooterComponent />
    </Box>
  );
};

export default PlayAsGuest;
