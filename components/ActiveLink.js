/* eslint-disable react/prop-types */
import { Box, Link } from "@chakra-ui/react";
import NextLink from "next/link";

const ActiveLink = (props) => {
  return (
    <Box>
      <NextLink href={`${props.link}`} passHref legacyBehavior>
        <Link fontSize={"sm"} color={"white"} _hover={{}}>
          &#9679; {props.name}
        </Link>
      </NextLink>
    </Box>
  );
};

export default ActiveLink;
