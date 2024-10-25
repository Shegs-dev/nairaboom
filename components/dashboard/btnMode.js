// components/InfoButtonModal.jsx
import React, { useState } from "react";
import {
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Text,
  Heading,
  OrderedList,
  ListItem,
  Image,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";
import { ImInfo } from "react-icons/im";

const InfoButtonModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* <Button
        position="fixed"
        right="4"
        bottom="4"
        size="md"
        onClick={onOpen}
      >
        Info
      </Button> */}
      <IconButton
        position="fixed"
        right="6vw"
        bottom="10vh"
        borderRadius={"full"}
        size="md"
        // icon={<BsPlayFill size={"6vw"} />}
        icon={<ImInfo size={40} color="#FFD700" />}
        backgroundColor="transparent"
        onClick={onOpen}
        _hover={{ backgroundColor: "transparent" }}
        display={{ base: "flex", lg: "none" }}
      />

      <Box>
        <ImInfo size={20} color="#002047" />
      </Box>
      <IconButton
        position="fixed"
        right="6vw"
        bottom="10vh"
        borderRadius={"full"}
        size="md"
        // icon={<BsPlayFill size={"3vw"} />}
        icon={<ImInfo size={40} color="#FFD700" />}
        backgroundColor="transparent"
        onClick={onOpen}
        _hover={{ backgroundColor: "transparent" }}
        display={{ base: "none", lg: "flex" }}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            <Text>How to Play</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box textAlign="center">
              <Text mb={4}>
                It&apos;s time to feel the thrill with every alert you receive
              </Text>
              <OrderedList textAlign="left">
                <ListItem>Tap Play Game</ListItem>
                <ListItem>Enter Alert Details</ListItem>
                <ListItem>Spin to Cashout</ListItem>
              </OrderedList>
            </Box>
            <Image
              src="./trophy.png"
              alt="Instr"
              my={4}
              mx="auto"
              boxSize="70%"
            />

            <Button onClick={onClose} colorScheme="green" my={4} w="100%">
              OK
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InfoButtonModal;
