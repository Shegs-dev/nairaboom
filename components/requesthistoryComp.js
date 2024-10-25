/* eslint-disable react/prop-types */
import React from "react";
import {
  Box,
  Text,
  Avatar,
  HStack,
  Spinner,
  useToast,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Square,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import useUser from "../lib/hooks/useUser";
import { useEffect, useRef, useState } from "react";

export default function RequesthistoryComp({ item }) {
  const { onOpen, onClose } = useDisclosure();
  const someFunc = () => {
    setIsOpen(false);
    onClose();
  };

  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Tr
      display={"flex"}
      justifyContent={{
        base: "space-between",
        md: "space-evenly",
      }}
      fontFamily="poppins"
    >
      <Td fontSize={{ base: "0.8rem", md: "1.125rem" }} color="nairablue">
        {item.date_received_alert}
      </Td>
      <Td fontSize={{ base: "0.8rem", md: "1.125rem" }} color="nairablue">
        {item.alert_type}
      </Td>
      <Td fontSize={{ base: "0.8rem", md: "1.125rem" }} color="nairablue">
        {/* {item.cashback_time || <p color="transparent" style={{color: 'transparent'}}>
        14:12:12:14
        </p>} */}
        {`₦ ${item.amount} `}
      </Td>
      <Td>
        <Button onClick={() => setIsOpen(true)}>View More</Button>
      </Td>
      <Modal isCentered isOpen={isOpen} onClose={someFunc}>
        <ModalOverlay
          backdropFilter="auto"
          backdropInvert="40%"
          backdropBlur="2px"
        />
        <ModalContent
          fontFamily={"poppins"}
          w={{ base: "90%", md: "40%" }}
          maxW={"95%"}
          p={{ base: "1rem", md: "3rem" }}
        >
          <ModalHeader>Game Play Ticket</ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Text color="nairablue" fontWeight={500}>
              Date : {item.date_created}
            </Text>
            <Text color="nairablue" fontWeight={500}>
              Alert Type: {`${item.alert_type}`}
            </Text>
            <Text color="nairablue" fontWeight={500}>
              Alert Amount: {`₦ ${item.amount} `}
            </Text>
            <Text
              color="nairablue"
              display={"flex"}
              flexDirection={"row"}
              fontWeight={500}
            >
              Alert Bank:{" "}
              <Text marginLeft={3} fontWeight={700}>
                {`${item.bank.name} `}{" "}
              </Text>
            </Text>
            <Text
              color="nairablue"
              display={"flex"}
              flexDirection={"row"}
              fontWeight={500}
            >
              Alert date:{" "}
              <Text marginLeft={3} fontWeight={700}>
                {" "}
                {`${item.date_received_alert} `}
              </Text>
            </Text>
            <Text
              color="nairablue"
              display={"flex"}
              flexDirection={"row"}
              fontWeight={500}
            >
              Stake Amount:{" "}
              <Text marginLeft={3} fontWeight={700}>
                {" "}
                {`₦ ${item.deducted_amount} `}
              </Text>
            </Text>
            <Text color="nairablue" fontWeight={500}>
              Potential winning: {`₦ ${item.amount} `}
            </Text>
            <Text color="nairablue" fontWeight={500}>
              Alert Amount: {`₦ ${item.amount} `}
            </Text>
            <Text color="nairablue" fontWeight={500}>
              Cashout Keys: {item.cashback_time}
            </Text>
            <Text color="nairablue" fontWeight={500}>
              Reference Number: {`${item.reference_hash} `}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Tr>
  );
}
