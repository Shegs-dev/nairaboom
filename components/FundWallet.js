import { Box, Button, Link } from "@chakra-ui/react";

import { AUTH_API_ROUTES } from "../utils/routes";
import NextLink from "next/link";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

const FundWallet = () => {
  return <>
    <NextLink passHref href="./fund_account" legacyBehavior>
      <Button
        as={Link}
        fontWeight={600}
        fontSize=".8rem"
        bgColor="white"
        color="#02C251"
        borderRadius="3px"
        transition={"all ease-in-out .4s"}
        _hover={{}}
        textAlign="center"
        w="8.6rem"
        border={"1px solid"}
        py=".8rem"
      >
        Fund Wallet
      </Button>
    </NextLink>
  </>;
};

export default FundWallet;
