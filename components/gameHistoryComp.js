/* eslint-disable react/prop-types */
import React from "react";
import {
  Text,
  Tr,
  Td,
  Th,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  useDisclosure,
  Box,
  Tbody,
} from "@chakra-ui/react";
import { useState } from "react";

export default function GameComp({ item }) {
  const { onOpen, onClose } = useDisclosure();
  const someFunc = () => {
    setIsOpenModal(false);
    onClose();
  };
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <Tr
        display={"flex"}
        justifyContent={{
          base: "space-between",
          md: "space-evenly",
        }}
        fontFamily="poppins"
      >
        <Td fontSize={{ base: "0.8rem", md: "1.125rem" }} color="nairablue">
          <>
            {item.date_created.split(" ")[0]}
            <Text color={"nairagrey"} fontSize={13}>
              {item.date_created.split(" ")[1]}
            </Text>
          </>
        </Td>
        <Td fontSize={{ base: "0.8rem", md: "1.125rem" }} color="nairablue">
          {`₦ ${item.amount} `}
        </Td>
        <Td fontSize={{ base: "0.8rem", md: "1.125rem" }} color="nairablue">
          {`${item?.meta.fullname}`}
        </Td>
        <Td
          fontSize={{ base: "0.8rem", md: "1.125rem" }}
          color={item?.cashback_time ? "nairablue" : "transparent"}
        >
          {`${item?.cashback_time ? item?.cashback_time : "10:10:10:10"} `}
        </Td>
        {/* <Td fontSize={{ base: "0.8rem", md: "1.125rem" }} color="nairablue">
          {item.fullname}
        </Td> */}
        {/* <Td fontSize={{ base: "0.8rem", md: "1.125rem" }} color="nairablue">
          {item.alert_type}
        </Td> */}
        <Td>
          <Button
            onClick={() => {
              setIsOpenModal(!isOpenModal);
            }}
          >
            View More
          </Button>
        </Td>
      </Tr>
      <Modal isCentered isOpen={isOpenModal} onClose={someFunc}>
        <ModalOverlay />
        <ModalContent
          fontFamily={"poppins"}
          w={{ base: "90%", md: "40%" }}
          maxW={"95%"}
          p={{ base: "1rem", md: "3rem" }}
        >
          <ModalHeader>Game Details</ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Text
              color="nairablue"
              display={"flex"}
              flexDirection={"row"}
              fontWeight={500}
              fontSize={{ base: 14, md: 16 }}
            >
              Date created:
              <Text
                marginLeft={3}
                fontSize={{ base: 14, md: 16 }}
                fontWeight={600}
              >
                {item?.date_created}
              </Text>
            </Text>
            <Text
              fontSize={{ base: 14, md: 16 }}
              color="nairablue"
              fontWeight={500}
            >
              Date received: {item?.date_received_alert}
            </Text>
            <Text
              color="nairablue"
              display={"flex"}
              flexDirection={"row"}
              fontWeight={500}
              fontSize={{ base: 14, md: 16 }}
            >
              Reference:
              <Text marginLeft={3} fontWeight={700}>
                {`${item?.reference_hash} `}
              </Text>
            </Text>
            <Text
              color="nairablue"
              display={"flex"}
              flexDirection={"row"}
              fontWeight={500}
              fontSize={{ base: 14, md: 16 }}
            >
              Customer Bank:
              <Text marginLeft={3} fontWeight={700}>
                {`${item?.bank.name} `}
              </Text>
            </Text>
            <Text
              color="nairablue"
              display={"flex"}
              flexDirection={"row"}
              fontWeight={500}
              fontSize={{ base: 14, md: 16 }}
            >
              Wheel number:
              <Text marginLeft={3} fontWeight={700}>
                {`${item?.cashback_time} `}
              </Text>
            </Text>
            {/* <Text
              color="nairablue"
              display={"flex"}
              flexDirection={"row"}
              fontWeight={500}
              fontSize={{ base: 14, md: 16 }}
            >
              Bank:
              <Text marginLeft={3} fontWeight={700}>
                {`${item?.bank.name} `}
              </Text>
            </Text> */}
            <Text
              color="nairablue"
              display={"flex"}
              flexDirection={"row"}
              fontWeight={500}
              fontSize={{ base: 14, md: 16 }}
            >
              Customer Name :
              <Text marginLeft={3} fontWeight={700}>
                {`${item?.meta.fullname}`}
              </Text>
            </Text>
            <Text
              color="nairablue"
              display={"flex"}
              flexDirection={"row"}
              fontWeight={500}
              fontSize={{ base: 13.5, md: 16 }}
              noOfLines={1}
            >
              Customer Email:
              <Text
                noOfLines={1}
                fontSize={{ base: 12, md: 16 }}
                marginLeft={3}
                fontWeight={700}
              >
                {`${item?.meta.email} `}
              </Text>
            </Text>
            <Text
              color="nairablue"
              display={"flex"}
              flexDirection={"row"}
              fontWeight={500}
              fontSize={{ base: 13.5, md: 16 }}
              noOfLines={1}
            >
              Customer Phone:
              <Text
                noOfLines={1}
                fontSize={{ base: 12, md: 16 }}
                marginLeft={3}
                fontWeight={700}
              >
                {`${item?.meta.phone_number.slice(0, 4)}****${item?.meta.phone_number.slice(8, 11)} `}
              </Text>
            </Text>
            
            <Text
              color="nairablue"
              display={"flex"}
              flexDirection={"row"}
              fontWeight={500}
              fontSize={{ base: 14, md: 16 }}
            >
              Customer User ID:
              <Text marginLeft={3} fontWeight={700}>
                {`${item?.user_id} `}
              </Text>
            </Text>
            <Text
              color="nairablue"
              display={"flex"}
              flexDirection={"row"}
              fontWeight={500}
              fontSize={{ base: 14, md: 16 }}
            >
              Stake Amount:
              <Text marginLeft={3} fontWeight={700}>
                {`₦ ${
                  item?.amount > 1 && item?.amount < 20000
                    ? 200
                    : item?.amount >= 20000
                    ? 0.02 * item?.amount
                    : 0.0
                } `}
              </Text>
            </Text>
            <Text
              color="nairablue"
              display={"flex"}
              flexDirection={"row"}
              fontWeight={500}
              fontSize={{ base: 14, md: 16 }}
            >
              Alert Amount:
              <Text marginLeft={3} fontWeight={700}>
                {`₦ ${item?.amount} `}
              </Text>
            </Text>
            <Text
              color="nairablue"
              display={"flex"}
              flexDirection={"row"}
              fontWeight={500}
              fontSize={{ base: 14, md: 16 }}
            >
              Alert Type:
              <Text marginLeft={3} fontWeight={700}>
                {`${item?.alert_type} `}
              </Text>
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
