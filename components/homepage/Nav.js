import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Spacer,
  Stack,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { RiMenu3Fill } from "react-icons/ri";
import Link from "next/link";
import useUser from "../../lib/hooks/useUser";

const Navbar2 = () => {
  const router = useRouter();
  const { authenticated } = useUser();


  // const { authenticated, logout } = useUser(); // Assuming you have a logout function in your useUser hook
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  const onClose = () => {
    setIsOpen(false);
  };

  
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      removeTokenFromLocalStorage("token");
      removeTokenFromLocalStorage2("token2");
      toast({
        isClosable: true,
        duration: 5000,
        status: "success",
        title: "successfully logged out",
        position: "top",
      });
      // router.push("/auth?p=login");
      router.replace("/");
      return;
    } catch (err) {
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Flex
      fontFamily="Inter"
      bgImage="/redesign/homepage/top-component-background.svg"
      flexDir="row"
      justifyContent="center"
      p={5}
      h={{ base: "6rem", md: "7rem" }}
    >
      <Stack
        w="100%"
        maxW="75rem"
        color="white"
        alignItems="center"
        spacing={5}
      >
        <HStack w="100%" spacing={{ base: 3, md: 8 }}>
          <Image
            src="/redesign/logo.png"
            h={{ base: "2rem", md: "3rem" }}
            w="fit-content"
            alt=""
            onClick={() => router.push("/")}
          />
          <Spacer />

          {!authenticated ? (
            <>
              <Button
                variant="brand-outline"
                color="nairagreen"
                borderColor="nairagreen"
                onClick={() => router.push("/auth/login")}
              >
                Log in
              </Button>
              <Button
                variant="brand-solid"
                color="#012647"
                bg="nairagreen"
                onClick={() => router.push("/auth/signup/customer")}
              >
                Sign up
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="brand-outline"
                color="nairagreen"
                borderColor="nairagreen"
                onClick={() => router.push("/auth/login")}
              >
                Log Out
              </Button>
              <Button
                variant="brand-solid"
                color="#012647"
                bg="nairagreen"
                onClick={() => router.push("/customer_dashboard")}
              >
                View Dashboard
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
          )}

          <Popover>
            <PopoverTrigger>
              <IconButton colorScheme="none" color="nairagreen">
                <RiMenu3Fill size={30} />
              </IconButton>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverBody>
                  <VStack>
                    <Link href="/how-to-play">How To Play</Link>
                    <Link href="/winning">Winning Modalities</Link>
                    {/* <Link href="/daily-results">Winners</Link> */}
                    {/* <Link href="/about">About Us</Link> */}
                    <Link href="/contact">Contact Us</Link>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        </HStack>
      </Stack>
    </Flex>
  );
};

export default Navbar2;
