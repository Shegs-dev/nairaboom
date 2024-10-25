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
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { AUTH_API_ROUTES } from "../utils/routes";
import useUser from "../lib/hooks/useUser";
import axios from "axios";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

export default function AgentWinnings({ item }) {
  const { user } = useUser();
  const bearerToken = user?.token;
  //
  const { onOpen, onClose } = useDisclosure();
  const someFunc = () => {
    setIsOpenModal(false);
    onClose();
  };
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [code, setcode] = useState("");

  const redeemWinning = async () => {
    const config = {
      method: "get",
      url: `${BASE_URL}/api/redeem_winning?code=${code}`,
      headers: {
        "X-APP-KEY": NAIRABOOM_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    try {
      setIsLoading(true);
      const response = await axios(config);
      if (
        response?.status === 200 &&
        response.data.message === "Please provide a valid code"
      ) {
        toast({
          status: "error",
          isClosable: true,
          duration: "5000",
          title: response.data.message,
          position: "top",
        });
      }
    } catch (err) {
      // toast({
      //   status: "error",
      //   isClosable: true,
      //   duration: "5000",
      //   title: "Please check your connection and try again",
      //   position: "top",
      // });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    let value = e.target.value.trim();
    setcode(value);
  };

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
          {item.fullname}
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
          w={{ base: "90%", md: "50%", lg: "40%" }}
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
              status:
              <Text marginLeft={3} fontWeight={700}>
                {`${item?.phone_number} `}
              </Text>
            </Text>
            <Box mt={"1rem"}>
              <FormLabel color="#A7A7A7">Enter Code</FormLabel>
              <Input
                name="date_received_alert"
                w={{ base: "100%", md: "20rem" }}
                h="4rem"
                border={"1px"}
                color={"#A7A7A7"}
                bgColor="white"
                type={"text"}
                mb="1.5rem"
                focusBorderColor="nairagreen"
                isRequired
                onChange={handleChange}
              />
            </Box>
            <Box
              py="1rem"
              display={"flex"}
              flexDir="column"
              alignItems={"center"}
            >
              <Button
                className="submit__reg"
                mt="0rem"
                w="8.6rem"
                alignSelf={"center"}
                border={"none"}
                color="white"
                bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
                type={"submit"}
                fontWeight={600}
                fontSize=".8rem"
                mb="0rem"
                cursor={"pointer"}
                _hover={{ transform: "scale(1.05)" }}
                onClick={() => {
                  if (code.length < 2) {
                    toast({
                      status: "error",
                      isClosable: true,
                      duration: "2000",
                      title: "Please enter a valid code",
                      position: "top",
                    });
                  } else {
                    redeemWinning();
                  }
                }}
              >
                Redeem Win
              </Button>
            </Box>

            {/* <Box>
  <Text
    fontWeight={700}
    fontSize="1.5rem"
    color="nairablue"
    p={"1em"}
    backgroundColor="gray.500"
    borderRadius={"10px"}
  >
    {item.cashback_time || (
      <p
        color="transparent"
        style={{ color: "transparent" }}
      >
        14:12:12:14
      </p>
    )}
  </Text>
</Box> */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
