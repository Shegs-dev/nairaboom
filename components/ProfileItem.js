/* eslint-disable react/prop-types */
import { Box, Text, Spinner } from "@chakra-ui/react";
import useUser from "../lib/hooks/useUser";

const ProfileItem = (props) => {
  const { user } = useUser();
  return (
    <Box w={{ base: "100%", md: "90%" }} pt="2.35rem">
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Text fontWeight={500} color="nairagrey" fontSize={"1rem"}>
          {props.title}
        </Text>
        <Box>
          {!user ? (
            <Spinner />
          ) : (
            <Text
              fontWeight={500}
              color="nairagrey"
              fontSize={{ base: "1rem", md: "1.2rem" }}
              maxW={{ base: "13rem", md: "max-content" }}
            >
              {props.item}
            </Text>
          )}
        </Box>
      </Box>
      <Box h="4px" mt=".8rem" bgColor="white" borderRadius={"4px"}></Box>
    </Box>
  );
};

export default ProfileItem;
