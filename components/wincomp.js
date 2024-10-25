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

export default function Wincomp({ item }) {
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
          {item.date_won}
        </Td>
        <Td fontSize={{ base: "0.8rem", md: "1.125rem" }} color="nairablue">
          {`₦ ${item.amount_won} `}
        </Td>
        <Td fontSize={{ base: "0.8rem", md: "1.125rem" }} color="nairablue">
          {item.match_sequence}
        </Td>
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
          w={{ base: "90%", md: "50%" , lg:"40%" }}
          maxW={"95%"}
          p={{ base: "1rem", md: "3rem" }}
        >
          <ModalHeader>Win Details</ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Text color="nairablue" fontWeight={500}>
              Date: {item?.date_won}
            </Text>
            <Text
              color="nairablue"
              display={"flex"}
              flexDirection={"row"}
              fontWeight={500}
            >
              Amount:
              <Text marginLeft={3} fontWeight={700}>
                {`₦ ${item?.amount_won} `}
              </Text>
            </Text>
            <Text
              color="nairablue"
              display={"flex"}
              flexDirection={"row"}
              fontWeight={500}
            >
              match_sequence:
              <Text marginLeft={3} fontWeight={700}>
                {`${item?.match_sequence} `}
              </Text>
            </Text>
            <Text
              color="nairablue"
              display={"flex"}
              flexDirection={"row"}
              fontWeight={500}
            >
              Name Of Cutsomer:
              <Text marginLeft={3} fontWeight={700}>
                {`${item?.fullname}`}
              </Text>
            </Text>
            <Text
              color="nairablue"
              display={"flex"}
              flexDirection={"row"}
              fontWeight={500}
            >
              phone_number:
              <Text marginLeft={3} fontWeight={700}>
                {`${item?.phone_number} `}
              </Text>
            </Text>
            <Text
              color="nairablue"
              display={"flex"}
              flexDirection={"row"}
              fontWeight={500}
            >
              WinNumbers: 
              <Text marginLeft={3} overflow={"hidden"} fontWeight={700}>
                {`${item?.lucky_time}`}
              </Text>
            </Text>
            <Box
              py="1rem"
              display={"flex"}
              flexDir="column"
              alignItems={"center"}
            >
              <Button
                className="submit__reg"
                mt="2rem"
                w="8.6rem"
                alignSelf={"center"}
                border={"none"}
                color="white"
                bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
                type={"submit"}
                fontWeight={600}
                fontSize=".8rem"
                mb="2rem"
                cursor={"pointer"}
                _hover={{ transform: "scale(1.05)" }}
                onClick={() => {}}
              >
                Redeem Win
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
