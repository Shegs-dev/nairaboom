import { Box } from "@chakra-ui/react";
import axios from "axios";
import { AUTH_API_ROUTES } from "../utils/routes";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import useUser from "../lib/hooks/useUser";

const TestingPage = () => {
  const { user } = useUser();
  const bearerToken = user?.token;
  // const config = {
  //   method: "get",
  //   url: "https://staging.nairaboom.ng/api/fetch_clock",
  //   headers: {
  //     "X-APP-KEY": "7ey11nw9z2L6j6V4bZQ4594",
  //   },
  // };

 
  // axios(config)
  //   .then(function (response) {
  //   })
  //   .catch(function (error) {
  //   });

  return (
    <>
      {" "}
      <Box display={"flex"} flexDir="column" alignItems={"center"}>
        Testing
      </Box>
      {/* <Modal
          motionPreset="slideInBottom"
          isOpen={isOpen}
          onClose={onClose}
          size="xl"
        >
          <ModalOverlay />
          <ModalContent
            borderRadius={"1.8rem"}
            pt="3.37rem"
            pb="3.8rem"
            h="max-content"
            w={{ base: "90%", md: "60%" }}
          >
            <ModalCloseButton
              mt="3.37rem"
              mr={{ base: ".5rem", md: "3.5rem" }}
              colorScheme={"red"}
            />
            <ModalBody>
              <Box
                display={"flex"}
                flexDir="column"
                alignItems={"center"}
                justifyContent="center"
                fontFamily={"poppins"}
              >
                <Text
                  alignSelf={"flex-start"}
                  ml={{ base: "2erem", md: "6rem" }}
                  pb="4rem"
                  fontWeight={700}
                  fontSize={{ base: "1rem", md: "1.5rem" }}
                >
                  Edit Profile
                </Text>
                <form action="">
                  <Box
                    alignItems={"center"}
                    w={{ base: "max-content", md: "21rem" }}
                    gap="2.3rem"
                    display={"flex"}
                    flexDir="column"
                    margin={"auto"}
                  >
                    <Box w="100%">
                      <label htmlFor="name">
                        <Text
                          color="nairagrey"
                          fontWeight={500}
                          fontSize=".9rem"
                        >
                          Full Name
                        </Text>{" "}
                      </label>
                      <Input
                        _placeholder={{
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "niaragrey",
                        }}
                        h="4rem"
                        border={"none"}
                        bgColor={"#F5F5F5"}
                        type="text"
                        placeholder={
                          !user ? <Spinner /> : user?.details.fullname
                        }
                        focusBorderColor="nairagreen"
                      />
                    </Box>
                    <Box w="100%">
                      <label htmlFor="name">
                        <Text
                          color="nairagrey"
                          fontWeight={500}
                          fontSize=".9rem"
                        >
                          Phone Number
                        </Text>{" "}
                      </label>
                      <Input
                        _placeholder={{ fontSize: "13px", fontWeight: 500 }}
                        h="4rem"
                        border="none"
                        bgColor={"#F5F5F5"}
                        type="number"
                        placeholder={
                          !user ? <Spinner /> : user?.details.phone_number
                        }
                        focusBorderColor="nairagreen"
                      />
                    </Box>
                  </Box>
                  <Button
                    color="white"
                    bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
                    w={{ base: "90%", md: "25rem" }}
                    type="submit"
                    mt="4rem"
                    _hover={{}}
                  >
                    Update
                  </Button>
                </form>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal> */}
    </>
  );
};

export default TestingPage;
