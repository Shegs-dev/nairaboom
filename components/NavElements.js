/* eslint-disable react/prop-types */
import {
  Box,
  Link,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import ActiveLink from "./ActiveLink";
import useUser from "../lib/hooks/useUser";
import { useState } from "react";
import { removeTokenFromLocalStorage, removeTokenFromLocalStorage2 } from "../lib/hooks/getAuthUser";

const NavElements = (props) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { authenticated } = useUser();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      removeTokenFromLocalStorage("token");
      removeTokenFromLocalStorage2("token2");
      // router.push("/auth?p=login");
      router.replace("/");
      toast({
        isClosable: true,
        duration: 5000,
        status: "success",
        title: "successfully logged out",
        position: "top",
      });

      return;
    } catch (err) {
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const NavElement = [
    ["Home", "/"],
    ["How To Play", "/how-to-play"],
    ["About Us", "/about"],
    ["Contact Us", "/contact"],
  ];

  return (
    <Box
      display={props?.display}
      flexDir={{ base: "column", sm: "column", lg: "row" }}
      gap={"3rem"}
      alignItems="center"
      w={"max-content"}
      margin={{ base: "auto", lg: "0" }}
      pt={{ base: "2.5rem", lg: "0" }}
    >
      <Box
        display={"flex"}
        gap="2.5rem"
        flexDir={{ base: "column", sm: "column", lg: "row" }}
      >
        {NavElement.map((element, index) =>
          router.pathname == `${element[1]}` ? (
            <ActiveLink key={index} name={element[0]} link={element[1]} />
          ) : (
            <Box key={index}>
              <NextLink href={element[1]} passHref legacyBehavior>
                <Link fontSize={"sm"} color={"nairagreen"} _hover={{}}>
                  {element[0]}
                </Link>
              </NextLink>
            </Box>
          )
        )}
      </Box>

      {/* <Button
          fontWeight={400}
          bgColor="nairagreen"
          color="white"
          padding={"1.5rem 1.8rem"}
          borderRadius="md"
          transitionDuration={".3s"}
          _hover={{ transform: "scale(1.02)" }}
          onClick={() => {
            if (authenticated) {
              handleLogout();
            }

            router.push("/daily-results");
          }}
        >
          Winners
        </Button> */}
        
      <Box
        display={"flex"}
        gap={{ base: "2rem", lg: "1rem" }}
        flexDir={{ base: "column", sm: "column", lg: "row" }}
      >
        <NextLink
          href={authenticated ? "/customer_dashboard" : "/auth?p=login"}
          passHref
          legacyBehavior>
          <Link
            fontWeight={400}
            color="white"
            border={"1.2px solid"}
            borderColor="nairagreen"
            padding={"0.7rem 1.8rem"}
            borderRadius="md"
            _hover={{}}
            textAlign="center"
          >
            {authenticated ? "View Dashboard" : "Log In"}
          </Link>
        </NextLink>
        {authenticated ? (
          <>
            <Button
              onClick={onOpen}
              fontWeight={400}
              bgColor="nairagreen"
              h={"auto"}
              color="white"
              padding={"0.7rem 1.8rem"}
              borderRadius="md"
              transitionDuration={".3s"}
              _hover={{ transform: "scale(1.02)" }}
            >
              Log Out
            </Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent py="1rem">
                <ModalCloseButton />
                <ModalBody
                  textAlign={"center"}
                  fontSize={"1.5rem"}
                  fontFamily="poppins"
                >
                  Are you sure <br /> you want to log out?
                </ModalBody>
                <ModalFooter display={"flex"} justifyContent="center">
                  <Button w="5rem" colorScheme="red" mr={3} onClick={onClose}>
                    No
                  </Button>
                  <Button
                    onClick={handleLogout}
                    w="5rem"
                    colorScheme="green"
                    mr={3}
                  >
                    {isLoading ? <Spinner /> : "Yes"}
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        ) : (
          <>
            <Button
              fontWeight={400}
              bgColor="nairagreen"
              color="white"
              padding={"1.5rem 1.8rem"}
              borderRadius="md"
              transitionDuration={".3s"}
              _hover={{ transform: "scale(1.02)" }}
              onClick={() => {
                router.push("/auth?p=signupcustomer");
              }}
            >
              Sign Up
            </Button>
          </>
        )}

        


      </Box>
    </Box>
  );
};

export default NavElements;
