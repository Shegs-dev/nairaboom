/* eslint-disable react/prop-types */
import { Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";

const PlayResponsibly = ({ color, fontSize }) => {
  return (
    <HStack
      color={color || "black"}
      spacing={3}
      fontSize={{ base: fontSize || "1rem", md: "1rem" }}
    >
      <Flex
        borderWidth={2}
        borderColor={color || "black"}
        borderRadius="100%"
        p={1}
      >
        <Text>18+</Text>
      </Flex>
      <Text fontSize={"lg"}>Play Responsibly</Text>

    </HStack>
  );
};

export default PlayResponsibly;
