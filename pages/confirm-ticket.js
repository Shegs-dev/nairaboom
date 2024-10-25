import { Box, Text, Input, FormLabel } from "@chakra-ui/react";
import FooterComponent from "../components/Footer";
import NavBar from "../components/NavBar";

const ConfirmTicket = () => {
  return (
    <Box>
      <NavBar />
      <Box mt="10.8rem">
        <Box
          pt="4.5rem"
          pb="4.1rem"
          px="7rem"
          w="50rem"
          borderRadius={"2rem"}
          bgColor={"#F6F6F6"}
          display="flex"
          flexDir={"column"}
          alignItems="center"
          margin={"auto"}
          fontFamily="poppins"
          color="nairablue"
        >
          <Text pb="4.5rem" fontWeight={700} fontSize="1.8rem">
            Confirm Ticket
          </Text>
          <form action="">
            <Box
              alignItems={"baseline"}
              display={"flex"}
              h="3.75rem"
              justifyContent={"space-between"}
              mb="2rem"
            >
              <FormLabel htmlFor="">Request</FormLabel>
              <Input
                value="2000 via Debit"
                w="24.75rem"
                h="3.75rem"
                id=""
                border={"none"}
                color={"nairablue"}
                bgColor="white"
                type={"text"}
                mb="3rem"
                focusBorderColor="nairagreen"
              />
            </Box>
            <Box
              alignItems={"baseline"}
              display={"flex"}
              h="3.75rem"
              justifyContent={"space-between"}
              mb="2rem"
            >
              <FormLabel htmlFor="">Request Made <br/> by</FormLabel>
              <Input
                value="John Akorede"
                w="24.75rem"
                h="3.75rem"
                id=""
                border={"none"}
                color={"nairablue"}
                bgColor="white"
                type={"text"}
                mb="3rem"
                focusBorderColor="nairagreen"
              />
            </Box>
            <Box
              alignItems={"baseline"}
              display={"flex"}
              h="3.75rem"
              justifyContent={"space-between"}
              mb="2rem"
            >
              <FormLabel htmlFor="">Phone number</FormLabel>
              <Input
                value="08028930207"
                w="24.75rem"
                h="3.75rem"
                id=""
                border={"none"}
                color={"nairablue"}
                bgColor="white"
                type={"number"}
                mb="3rem"
                focusBorderColor="nairagreen"
              />
            </Box>
            <Box
              alignItems={"baseline"}
              display={"flex"}
              h="3.75rem"
              justifyContent={"space-between"}
              mb="2rem"
            >
              <FormLabel htmlFor="">Account number</FormLabel>
              <Input
                value="0017287353"
                w="24.75rem"
                h="3.75rem"
                id=""
                border={"none"}
                color={"nairablue"}
                bgColor="white"
                type={"number"}
                mb="3rem"
                focusBorderColor="nairagreen"
              />
            </Box>
            <Box
              alignItems={"baseline"}
              display={"flex"}
              h="3.75rem"
              justifyContent={"space-between"}
              mb="2rem"
            >
              <FormLabel htmlFor="">Bank Name</FormLabel>
              <Input
                value={"First Bank"}
                w="24.75rem"
                h="3.75rem"
                id=""
                border={"none"}
                color={"nairablue"}
                bgColor="white"
                type={"text"}
                mb="3rem"
                focusBorderColor="nairagreen"
              />
            </Box>
            <Box
              alignItems={"baseline"}
              display={"flex"}
              h="3.75rem"
              justifyContent={"space-between"}
              mb="2rem"
            >
              <FormLabel htmlFor="">Lucky Time <br/> Chosen</FormLabel>
              <Input
                placeholder="First Bank"
                w="24.75rem"
                h="3.75rem"
                value={"20:12"}
                id=""
                border={"none"}
                color={"nairablue"}
                bgColor="white"
                type={"time"}
                _placeholder={{ fontSize: "16px", color: "nairablue" }}
                mb="3rem"
                focusBorderColor="nairagreen"
              />
            </Box>
            <Box
              alignItems={"baseline"}
              display={"flex"}
              h="3.75rem"
              justifyContent={"space-between"}
              mb="2rem"
            >
              <FormLabel htmlFor="">Boost Code</FormLabel>
              <Input
                value="637384"
                w="24.75rem"
                h="3.75rem"
                id=""
                border={"none"}
                color={"nairablue"}
                bgColor="white"
                type={"number"}
                _placeholder={{ fontSize: "16px", color: "nairablue" }}
                mb="3rem"
                focusBorderColor="nairagreen"
              />
            </Box>
            <Input
              value={"Proceed"}
              border={"none"}
              w="31.6rem"
              color="white"
              bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
              type={"submit"}
              fontWeight={600}
              fontSize="lg"
              mb="4.5rem"
              mt="3rem"
              cursor={"pointer"}
            />
          </form>
        </Box>
      </Box>

      <FooterComponent />
    </Box>
  );
};

export default ConfirmTicket;
