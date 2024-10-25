/* eslint-disable react/prop-types */
import { Box, Circle, Text } from "@chakra-ui/react";
import Image from "next/legacy/image";

const CashBack = (props) => {
  return (
    <Box
      w={"30%"}
      minW={{ base: "95%", md: "22rem" }}
      bgColor="#F6F6F6"
      borderRadius={"24px"}
      pb="4rem"
      mb={{base:"1rem", lg:"0"}}
      boxShadow={"md"}
      _hover={{ boxShadow: "lg" }}
    >
      <Circle size="40px" top={0} left={0} bgColor="white">
        <Circle size="20px" bgColor={"#f6f6f6"}>
          <Text fontSize={"xl"} fontWeight={700}>
            {props.number}
          </Text>
        </Circle>
      </Circle>
      <Box
        display={"flex"}
        flexDir="column"
        alignItems={"flex-start"}
        gap="2rem"
        pl={{ base: "2rem", md: "3rem" }}
        pr={{ base: "2rem", md: "4rem" }}
        pt="1rem"
      >
        <Image src={props.icon} alt="icon 1" />
        <Text fontWeight={600} fontSize="17px">
          {props.title}
        </Text>
        <Text>{props.note}</Text>
      </Box>
    </Box>
  );
};

export default CashBack;
