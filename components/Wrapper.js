/* eslint-disable react/prop-types */
import { Box, Link, Text } from "@chakra-ui/react";

const Wrapper = ({ children }) => {
  return (
    <Box
      bgColor={"#F5F5F5"}
      borderRadius="2rem"
      mt={{ base: "1rem", md: "2rem" }}
      mb="4.8rem"
      mx={{ base: "auto", lg: "2rem" }}
      pl={{ base: "1rem", md: "3.8rem" }}
      pt={{ base: "1.5rem", md: "2.5rem" }}
      pr={{ base: "1rem", lg: "4rem" }}
      float={{ base: "none", lg: "right" }}
      width={{ base: "95%", lg: "68%" }}
      fontFamily="poppins"
    >
      {children}

      <Box pt={{ base: "1rem", md: "6.3rem" }} pb={{ base: "2rem", md: "0rem" }}>
        <Text
          fontSize={".9rem"}
          color={"#9E9E9E"}
          textAlign={{ base: "center" }}
        >
          &copy; 2024 Nairaboom. All Rights Reserved
        </Text>
        
      </Box>
    </Box>
  );
};

export default Wrapper;
