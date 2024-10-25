/* eslint-disable react/prop-types */
import NextLink from "next/link";
import Image from "next/legacy/image";
import { Box, Link, Text } from "@chakra-ui/react";

const ActiveLink = (props) => {
  return (
    <NextLink href={props.href} passHref legacyBehavior>
      <Box
        borderRadius={"8px"}
        as={Link}
        display="flex"
        bg={props.bg}
        w="max-content"
        minW="90%"
        justifyContent={"flex-start"}
        gap="1.18rem"
        py="1rem"
        pl="1.5rem"
        pr="1rem"
        transitionDuration={".3s"}
        _hover={{ textDecoration: "none", bg: "currentlink" }}
        onClick={props.onClick}
      >
        <Image
          src={props.icon}
          alt="home icon"
          width={props.width}
          height={props.height}
        />
        <Text color={props.color} fontWeight={500} fontSize="xl">
          {props.name}
        </Text>
      </Box>
    </NextLink>
  );
};

export default ActiveLink;
