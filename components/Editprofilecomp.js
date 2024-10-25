/* eslint-disable react/prop-types */
import { Box, Text, Spinner, Input } from "@chakra-ui/react";
import useUser from "../lib/hooks/useUser";

const EditProfileItem = (props) => {
  return (
    <Box w={{ base: "100%", md: "90%" }} pt="2.35rem">
      <Box
        display={"flex"}
        gap="2em"
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Text
          fontWeight={500}
          width="max-content"
          color="nairagrey"
          fontSize={"1rem"}
        >
          {props.title}
        </Text>
        <Input
          textAlign={"right"}
          type={props.type}
          defaultValue={props.defaultValue}
          rounded="md"
          _focus={"none"}
          focusBorderColor="white"
          max={props.max}
          isRequired
          placeholder={props.placeholder}
          p="4"
          onChange={(e) => props.handleChange(e.target.value)}
        />
      </Box>
      <Box h="4px" mt=".8rem" bgColor="white" borderRadius={"4px"}></Box>
    </Box>
  );
};

export default EditProfileItem;
