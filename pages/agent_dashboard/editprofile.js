import {
  Box,
  Text,
  Avatar,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Badge,
  ModalHeader,
  FormLabel,
  HStack,
  useToast,
  Select,
} from "@chakra-ui/react";
import Head from "next/head";
import { useDisclosure } from "@chakra-ui/react";
import Wrapper from "../../components/Wrapper";
import useUser from "../../lib/hooks/useUser";
import { useEffect, useState } from "react";
import { AUTH_API_ROUTES } from "../../utils/routes";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import axios from "axios";
import FormData from "form-data";
import ProfileItem from "../../components/ProfileItem";
import EditProfileItem from "../../components/Editprofilecomp";
import { getTokenFromLocalStorage2 } from "../../lib/hooks/getAuthUser";
// import DatePicker from "./react-datepicker";
// import DatePicker from "react-datepicker";
import KycProfileForm from "./KycProfileForm";
// import "react-datepicker/dist/react-datepicker.css";
// import "react-datepicker/dist/react-datepicker.css";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const EditProfile = () => {
  const { user } = useUser();

  const router = useRouter();
  const toast = useToast();

  const bearerToken = user?.token;

  useEffect(() => {
    const get = async () => {
      const blob = await fetch(user?.details.agent_path).then((res) =>
        res.blob()
      );

      // const path = URL.createObjectURL(user?.details?.agent_path);
    };
    get();
  }, [user?.details.agent_path]);

  // const [dob, setDob] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [file, setFile] = useState(user?.details.agent_path || "");
  const [picData, setpicData] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [section, setsection] = useState("1");
  //new
  const [accountNumber, setaccountNumber] = useState("");
  const [bankCode, setbankCode] = useState("");
  const [bankData, setBankData] = useState([]);

  //data
  const [email, setemail] = useState(user?.details.email || "");
  const [username, setusername] = useState(user?.details.fullname || "");
  const [phoneNumber, setphoneNumber] = useState(user?.phone_number || "");
  const [place_of_birth, setplace_of_birth] = useState("");
  const [dob, setdob] = useState("");
  const [gender, setgender] = useState(user?.gender || "");
  const [country, setcountry] = useState("");
  const [address, setaddress] = useState(user?.address || "");

  //address_part
  const [street, setstreet] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [postal_code, setpostal_code] = useState("");

  const [bvn_number, setBvnNumber] = useState("");

  // const prof = URL.createObjectURL(user?.details?.agent_path)

  const [kycvalidateComplete, setkycvalidateComplete] = useState(false);

  const dataObj = {
    bvn_number,
    // email,
    bankCode,
    accountNumber,
  };

  const dataObj1 = {
    bvn_number,
    email,
    place_of_birth,
    dob,
    gender,
    country,
  };
  const dataObj2 = {
    street,
    city,
    state,
    postal_code,
  };

  const checkIfEmpty = () => {
    Object.values(dataObj).every((value) => {
      if (value === null || value === undefined || value === "") {
        setkycvalidateComplete(true);
        return true;
      }
      setkycvalidateComplete(false);
      return false;
    });
  };

  // checks if the dataObj is complete
  function hasEmptyValue(obj) {
    for (let key in obj) {
      if (
        (typeof obj[key] === "string" &&
          (obj[key].trim() === "" ||
            obj[key] === null ||
            obj[key] === undefined)) ||
        obj[key] === null ||
        obj[key] === undefined ||
        (typeof obj[key] === "object" && !hasEmptyValue(obj[key]))
      ) {
        return false;
      }
    }
    return true;
  }

  function checkObjectFields(obj) {
    for (let key in obj) {
      if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
        return false;
      }
    }
    return true;
  }

  //----------data

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file?.type.match(imageMimeType)) {
      alert("Image type is not valid");
      return;
    }
    // setFile(e.target.files[0]);
    // handlePictureSubmit(e.target.files[0]);
  };
  const changeHandler2 = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const dat_ = URL.createObjectURL(event.target.files[0]);
      setFileDataURL(dat_);
      let reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target.result);
        setpicData(e.target.result);
        handlePictureSubmit(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const changeHandler_ = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      // Upload the image to the server
      await uploadImage(file);
      setFileDataURL(reader.result);
    };
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("customer_path", file);
    try {
      const response = await axios.post(`${BASE_URL}/api/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      toast({
        isClosable: true,
        duration: 3000,
        status: "success",
        title: "You've successfully updated your profile",
        position: "top",
      });

      // Handle success or update user profile with the new image
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        isClosable: true,
        duration: 5000,
        status: "error",
        title:
          error.message ||
          "Oops, some error occurred! check your connection and try again.",
        position: "top",
      });
      // Handle error
    }
  };

  // const uploadImage = async (file) => {
  //   const formData = new FormData();
  //   formData.append("agent_path", file);
  //   try {
  //     const response = await axios.post(`${BASE_URL}/api/profile`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         "X-APP-KEY": NAIRABOOM_KEY,
  //         Authorization: `Bearer ${bearerToken}`,
  //       },
  //     });
  //     // Handle success or update user profile with the new image
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //     // Handle error
  //   }
  // };
  // useEffect(() => {
  //   let fileReader,
  //     isCancel = false;
  //   if (file) {
  //     fileReader = new FileReader();
  //     fileReader.onload = (e) => {
  //       const { result } = e.target;
  //       if (result && !isCancel) {
  //         setFileDataURL(result);
  //       }
  //     };
  //     fileReader.readAsDataURL(file);
  //   }
  //   return () => {
  //     isCancel = true;
  //     if (fileReader && fileReader.readyState === 1) {
  //       fileReader.abort();
  //     }
  //   };
  // }, [file]);

  const bvn = Object.freeze({
    bvn_number: "",
  });

  const [verifyFormData, updateVerifyData] = useState(bvn);
  const handleChange = (e) => {
    updateVerifyData({
      ...verifyFormData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const verify_config = {
    method: "post",
    url: `${BASE_URL}/api/validate_profile_bvn`,
    headers: {
      "X-APP-KEY": NAIRABOOM_KEY,
      Authorization: `Bearer ${bearerToken}`,
    },
    // data: verifyFormData,
    data: {
      bvn_number: bvn_number,
      // email: email,
      account_number: accountNumber,
      bank_code: bankCode,
    },
  };

  const handleVerifySubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await axios(verify_config);
      if (response?.data?.status === false) {
        toast({
          isClosable: true,
          duration: 5000,
          status: "error",
          title: response?.data?.message,
          position: "top",
        });
        return;
      }
      toast({
        isClosable: true,
        duration: 5000,
        status: "success",
        title: response?.data?.message,
        position: "top",
      });
      router.push("/agent_dashboard");
    } catch (err) {
      toast({
        isClosable: true,
        duration: 5000,
        status: "error",
        title: err?.response?.data?.message
          ? err?.response?.data?.message
          : "Some error occurred! check your connection.",
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const picturePath = {
    agent_path: file,
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePictureSubmit = async (value) => {
    const picconfig = {
      method: "post",
      url: `${BASE_URL}/api/profile`,
      headers: {
        "X-APP-KEY": NAIRABOOM_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
      data: {
        agent_path: value,
      },
    };
    try {
      setLoading(true);
      const response = await axios(picconfig);
      if (response?.data?.status === false) {
        toast({
          isClosable: true,
          duration: 300,
          status: "error",
          message: response?.data?.message,
          position: "top",
        });
        return;
      }
      toast({
        isClosable: true,
        duration: 300,
        status: "success",
        message: response?.data?.message,
        position: "top",
      });
    } catch (err) {
      toast({
        isClosable: true,
        duration: 5000,
        status: "error",
        title:
          "Oops, some error occurred! check your connection and try again.",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  //Edit profile
  // const editprofile = {
  //   method: "post",
  //   url: `${BASE_URL}/api/profile`,
  //   headers: {
  //     "X-APP-KEY": NAIRABOOM_KEY,
  //     Authorization: `Bearer ${bearerToken}`,
  //   },
  //   data: {
  //     address: address,
  //     gender: gender,
  //     fullname: user?.details.fullname,
  //     email: email,
  //     agent_path: file,
  //   },
  // };

  const handleEditProfileSubmit = async () => {
    let profileData = {
      fullname: user?.details.fullname,
      // email: email,
      customer_path: file,
    };
    // Add optional properties if they are not empty or null
    if (!user?.details?.email) {
      profileData.email = email;
    }
    if (address) {
      profileData.address = address;
    }
    if (gender) {
      profileData.gender = gender;
    }
    if (country) {
      profileData.country = country;
    }
    if (state) {
      profileData.residence_state = state;
    }
    if (file) {
      profileData.agent_path = file;
    }
    const editprofile = {
      method: "post",
      url: `${BASE_URL}/api/profile`,
      headers: {
        "X-APP-KEY": NAIRABOOM_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
      data: profileData,
    };
    try {
      setLoading(true);
      const response = await axios(editprofile);
      if (response?.data?.status === false) {
        toast({
          isClosable: true,
          duration: 300,
          status: "error",
          message: response?.data?.message,
          position: "top",
        });
        return;
      }
      toast({
        isClosable: true,
        duration: 600,
        status: "success",
        message: "You've successfully updated your profile",
        title: "You've successfully updated your profile",
        position: "top",
      });
      router.push("/agent_dashboard");
    } catch (err) {
      toast({
        isClosable: true,
        duration: 5000,
        status: "error",
        title:
          "Oops, some error occurred! check your connection and try again.",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchBankData = async () => {
      const token = getTokenFromLocalStorage2();
      const bankconfig = {
        method: "get",
        url: `${BASE_URL}/api/bank_lists?start=0&len=209&paging=1`,
        headers: {
          "X-APP-KEY": NAIRABOOM_KEY,
          Authorization: `Bearer ${bearerToken}`,
        },
      };

      try {
        const response = await axios(bankconfig);
        setBankData(response.data?.payload.content);
      } catch (err) {
      }
    };
    fetchBankData();
  }, [bearerToken]);

  const [isEdited, setIsEdited] = useState(false);
  useEffect(() => {
    // Check if any of the fields have been edited
    if (
      gender !== user?.details.gender ||
      address !== user?.details.address ||
      state !== user?.details.residence_state ||
      country !== user?.details.country
    ) {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }
  }, [gender, address, state, country, user?.details]);

  return (
    <Wrapper>
      <Head>
        <title>NairaBoom Agent Edit Profilr</title>
        <meta name="user dashboard" content="nairaboom.ng agent dashboard" />
      </Head>
      <HStack alignItems={"flex-start"} justifyContent="space-between">
        <Text
          fontWeight={700}
          fontSize={{ base: "1.25rem", md: "1.5rem" }}
          pb={{ base: "3rem", md: "6rem" }}
        >
          Edit Profile
        </Text>
        <Box>
          {user?.details.kyc_approved === true ? (
            <Badge variant="solid" colorScheme="green">
              VERIFIED USER
            </Badge>
          ) : (
            <>
              <Badge variant="solid" colorScheme={"red"}>
                Unverified User
              </Badge>
              <>
                <Button
                  borderRadius={"0.1em"}
                  _hover={{ transform: "scale(1.1)" }}
                  ml="1.5rem"
                  fontSize={"12px"}
                  px="7px"
                  py="2px"
                  h=""
                  bgColor={"green"}
                  color="white"
                  onClick={() => {
                    if (user?.details?.agent_path?.length < 1) {
                      if (fileDataURL === null || fileDataURL?.length < 1) {
                        toast({
                          isClosable: true,
                          duration: 5000,
                          status: "error",
                          title: "Please update profile picture to proceed",
                          position: "top",
                        });
                      } else {
                        onOpen();
                      }
                    } else {
                      onOpen();
                    }
                  }}
                >
                  VERIFY NOW
                </Button>
              </>
            </>
          )}
        </Box>
      </HStack>
      <Box
        display={"flex"}
        flexDir="column"
        pl={{ base: "2rem", md: "7rem" }}
        maxW="90%"
      >
        <Box gap="2.125rem" display={"flex"} alignItems="center">
          <Avatar
            src={fileDataURL ? fileDataURL : user?.details?.agent_path}
            name={user?.details?.fullname}
            bg="rgba(30, 215, 96, 0.19)"
            w={{ base: "5rem", md: "14rem" }}
            h={{ base: "5rem", md: "14rem" }}
          />
          <Text
            fontWeight={500}
            fontSize={{ base: "1rem", md: "xl" }}
            w="max-content"
            color="nairablue"
            position={"relative"}
            textDecor="underline"
            cursor={"pointer"}
          >
            Change Image
            <Input
              onChange={changeHandler_}
              type="file"
              border={"none"}
              placeholder="Change Image"
              aria-hidden="true"
              accept="image/*"
              position={"absolute"}
              width={"100%"}
              height={"100%"}
              top={0}
              left={0}
              opacity={0}
            />
          </Text>
        </Box>
        <Text
          pt="4.9rem"
          pb="3.1rem"
          fontWeight={600}
          color="nairagrey"
          fontSize={"xl"}
        >
          Personal Biodata
        </Text>
        <Box w={{ base: "100%", md: "90%" }}>
          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Text fontWeight={500} color="nairagrey" fontSize={"1rem"}>
              Full Name
            </Text>
            <Box>
              {!user ? (
                <Spinner />
              ) : (
                <Text
                  fontWeight={500}
                  color="nairagrey"
                  fontSize={{ base: "1rem", md: "1.2rem" }}
                >
                  {user?.details.fullname}
                </Text>
              )}
            </Box>
          </Box>
          <Box h="4px" mt=".8rem" bgColor="white" borderRadius={"4px"}></Box>
        </Box>
        <ProfileItem
          title="Phone number"
          item={`${user?.details.phone_number}`}
        />
        <EditProfileItem
          title="Email"
          type="email"
          defaultValue={`${
            user?.details.email
              ? user?.details.email === undefined
                ? "Enter your email"
                : user?.details.email
              : ""
          }  `}
          handleChange={(e) => setemail(e)}
        />
        {user?.details?.kyc_approved === true && (
          <>
            <HStack
              my="2"
              w={{ base: "100%", md: "90%" }}
              flexDirection={"row"}
              justifyContent={"space-between"}
              pt="2.35rem"
            >
              <FormLabel
                fontWeight={500}
                fontSize={{ base: "1rem", md: "lg" }}
                w="max-content"
                color="nairagrey"
              >
                Gender
              </FormLabel>
              <Box>
                <Select
                  width={"20vw"}
                  placeholder="Gender"
                  value={user?.details.gender || gender}
                  onChange={(e) => setgender(e.target.value)}
                >
                  <option variant="filled" value="male">
                    Male
                  </option>
                  <option variant="filled" value="female">
                    Female
                  </option>
                  <option variant="filled" value="other">
                    Others
                  </option>
                </Select>
              </Box>
            </HStack>
            <EditProfileItem
              title="Address"
              type="type"
              defaultValue={`${
                user?.details.address
                  ? user?.details.address === undefined
                    ? ""
                    : user?.details.address
                  : ""
              }  `}
              handleChange={(e) => setaddress(e)}
            />
            <EditProfileItem
              title="Residence State"
              type="type"
              placeholder
              defaultValue={`${
                user?.details.residence_state
                  ? user?.details.residence_state === undefined
                    ? ""
                    : user?.details.residence_state
                  : ""
              }  `}
              handleChange={(e) => setstate(e)}
            />
            <HStack
              my="2"
              w={{ base: "100%", md: "90%" }}
              flexDirection={"row"}
              justifyContent={"space-between"}
              pt="2.35rem"
            >
              <FormLabel
                fontWeight={500}
                fontSize={{ base: "1rem", md: "lg" }}
                w="max-content"
                color="nairagrey"
              >
                Country
              </FormLabel>
              <Box>
                <Select
                  width={"20vw"}
                  value={user?.details.country || country}
                  placeholder="Country"
                  onChange={(e) => setcountry(e.target.value)}
                >
                  <option variant="filled" value="nigeria">
                    Nigeria
                  </option>
                  <option variant="filled" value="other">
                    Others
                  </option>
                </Select>
              </Box>
            </HStack>
          </>
        )}
        {user?.details?.kyc_approved === true && (
          <Button
            color="white"
            bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
            mt={{ base: "5rem", md: "6.825rem" }}
            w="26.8rem"
            maxW={"90%"}
            h="3rem"
            alignSelf={"flex-start"}
            focusBorderColor="nairagreen"
            _hover={{}}
            onClick={handlePictureSubmit}
            isDisabled={file === "" ? true : false}
          >
            {loading ? <Spinner /> : "Change Profile Picture"}
          </Button>
        )}

        <Button
          color="white"
          bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
          mt={{ base: "5rem", md: "6.825rem" }}
          w="26.8rem"
          maxW={"90%"}
          h="3rem"
          alignSelf={"flex-start"}
          focusBorderColor="nairagreen"
          _hover={{}}
          onClick={() => {
            if (!user?.details.fullname || email.length < 1) {
              toast({
                isClosable: true,
                duration: 5000,
                status: "error",
                title: "Incomplete form, Please fill all fields",
                position: "top",
              });
            } else {
              handleEditProfileSubmit();
            }
          }}
          isDisabled={!isEdited || loading}
          // isDisabled={file === "" ? true : false}
        >
          {loading ? <Spinner /> : "Edit Profile"}
        </Button>
      </Box>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={() => {
          setsection("1");
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent
          fontFamily={"poppins"}
          w={{ base: "90%", md: "60%", lg: "40%" }}
          maxW={"95%"}
          maxH={"90vh"}
          overflowX={"auto"}
          p={{ base: "1rem", md: "3rem" }}
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
              borderRadius: "8px",
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `rgba(0, 0, 0, 0.15)`,
            },
          }}
        >
          <ModalHeader textAlign={"center"} fontWeight={700} fontSize="1.5rem">
            Verify User
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody height={{ base: "100%", lg: "90vh" }}>
            <div style={{ overflowX: "scroll" }}>
              <form onSubmit={handleVerifySubmit}>
                {section === "1" && (
                  <>
                    <FormLabel>Enter BVN</FormLabel>
                    <Input
                      type="number"
                      focusBorderColor="nairagreen"
                      isRequired
                      name="bvn_number"
                      maxLength={11}
                      h="3.6rem"
                      w="100%"
                      border={"1px"}
                      bgColor="white"
                      _placeholder={{ fontSize: "17.62px" }}
                      mb="0rem"
                      // onChange={(handleChange)}
                      onChange={(e) => setBvnNumber(e.target.value.trim())}
                    />
                    {/* <Box mt={"1rem"}>
                      <FormLabel color="#A7A7A7">Email</FormLabel>
                      <Input
                        placeholder="Enter email"
                        w="100%"
                        h="3.6rem"
                        border={"1px"}
                        bgColor="white"
                        type={"email"}
                        isRequired
                        _placeholder={{ fontSize: "17.62px" }}
                        mb="0rem"
                        focusBorderColor="nairagreen"
                        name="email"
                        // defaultValue={`${
                        //   user?.details.email ? user?.details.email : ""
                        // }  `}
                        defaultValue={`${email}`}
                        onChange={(e) => {
                          setemail(e.target.value.trim());
                        }}
                      />
                    </Box> */}
                    <Box mt="1rem">
                      <FormLabel color="#A7A7A7">Select Bank</FormLabel>
                      <Select
                        bg="white"
                        type="text"
                        // borderRadius={50}
                        name="bank_code"
                        w={{ base: "100%", md: "26rem" }}
                        h="3.25rem"
                        border={"1px"}
                        bgColor="white"
                        placeholder="Bank"
                        _placeholder={{ fontWeight: 500 }}
                        color={"#A7A7A7"}
                        focusBorderColor="nairagreen"
                        isRequired
                        // onChange={handleChange}
                        onChange={(e) => {

                          setbankCode(e.target.value);
                        }}
                      >
                        {bankData.map((bank, index) => (
                          <option key={index} value={bank.bank_code}>
                            {bank.name}
                          </option>
                        ))}
                      </Select>
                    </Box>

                    <Box mt={"1rem"}>
                      <FormLabel color="#A7A7A7">Account Number</FormLabel>
                      <Input
                        placeholder="Enter Account Number"
                        w="100%"
                        h="3.6rem"
                        border={"1px"}
                        bgColor="white"
                        type={"number"}
                        isRequired
                        _placeholder={{ fontSize: "17.62px" }}
                        mb="0rem"
                        focusBorderColor="nairagreen"
                        name="account_number"
                        maxLength={11}
                        // defaultValue={`${
                        //   user?.details.email ? user?.details.email : ""
                        // }  `}
                        // defaultValue={`${email}`}
                        onChange={(e) => {
                          setaccountNumber(e.target.value.trim());
                        }}
                      />
                    </Box>

                    <Button
                      w="100%"
                      type="submit"
                      bgColor={"nairagreen"}
                      cursor="pointer"
                      color="white"
                      fontWeight={700}
                      mt="3rem"
                      mb={"2rem"}
                      onClick={() => {
                        // setsection("2");
                      }}
                      disabled={!checkObjectFields(dataObj)}
                      // disabled={(bvn_number.length < 1 || email.length < 1 ) ? true: false}
                      _hover={{ transform: "scale(1.05)" }}
                    >
                      {isLoading ? <Spinner /> : "Next"}
                    </Button>
                  </>
                )}
              </form>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Wrapper>
  );
};

export default EditProfile;

// import {
//   Box,
//   Text,
//   Avatar,
//   Input,
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalBody,
//   ModalCloseButton,
//   Spinner,
//   Badge,
//   ModalHeader,
//   FormLabel,
//   HStack,
//   useToast,
// } from "@chakra-ui/react";
// import Head from "next/head";
// import avatar from "../../public/edit-profile/avatar.png";
// import { useDisclosure } from "@chakra-ui/react";
// import Wrapper from "../../components/Wrapper";
// import useUser from "../../lib/hooks/useUser";
// import { useEffect, useState } from "react";
// import { AUTH_API_ROUTES } from "../../utils/routes";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import axios from "axios";
// import ProfileItem from "../../components/ProfileItem";

// const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
// const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

// const imageMimeType = /image\/(png|jpg|jpeg)/i;

// const EditProfile = () => {
//   const { user } = useUser();
//   const router = useRouter();
//   const toast = useToast();

//   const bearerToken = user?.token;

//   const [isLoading, setIsLoading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [file, setFile] = useState("");
//   const [fileDataURL, setFileDataURL] = useState(null);

//   const changeHandler = (e) => {
//     const file = e.target.files[0];
//     if (!file?.type.match(imageMimeType)) {
//       alert("Image type is not valid");
//       return;
//     }
//     setFile(e.target.files[0]);
//   };

//   useEffect(() => {
//     let fileReader,
//       isCancel = false;
//     if (file) {
//       fileReader = new FileReader();
//       fileReader.onload = (e) => {
//         const { result } = e.target;
//         if (result && !isCancel) {
//           setFileDataURL(result);
//         }
//       };
//       fileReader.readAsDataURL(file);
//     }
//     return () => {
//       isCancel = true;
//       if (fileReader && fileReader.readyState === 1) {
//         fileReader.abort();
//       }
//     };
//   }, [file]);

//   const bvn = Object.freeze({
//     bvn_number: "",
//   });

//   const [verifyFormData, updateVerifyData] = useState(bvn);
//   const handleChange = (e) => {
//     updateVerifyData({
//       ...verifyFormData,
//       [e.target.name]: e.target.value.trim(),
//     });
//   };

//   const verify_config = {
//     method: "post",
//     url: `${BASE_URL}/api/agent/validate_account`,
//     headers: {
//       "X-APP-KEY": NAIRABOOM_KEY,
//       Authorization: `Bearer ${bearerToken}`,
//     },
//     data: verifyFormData,
//   };

//   const handleVerifySubmit = async (e) => {
//     try {
//       e.preventDefault();
//       setIsLoading(true);
//       const response = await axios(verify_config);
//       if (response?.data?.status === false) {
//         toast({
//           isClosable: true,
//           duration: 5000,
//           status: "error",
//           title: response?.data?.message,
//           position: "top",
//         });
//         return;
//       }
//       toast({
//         isClosable: true,
//         duration: 5000,
//         status: "success",
//         title: response?.data?.message,
//         position: "top",
//       });
//       router.push("/customer_dashboard");
//     } catch (err) {
//       toast({
//         isClosable: true,
//         duration: 5000,
//         status: "error",
//         title: err?.response?.data?.message ? err?.response?.data?.message : "Some error occurred! check your connection.",
//         position: "top",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const picturePath = {
//     agent_path: file,
//   };

//   const picconfig = {
//     method: "post",
//     url: `${BASE_URL}/api/profile`,
//     headers: {
//       "X-APP-KEY": NAIRABOOM_KEY,
//       Authorization: `Bearer ${bearerToken}`,
//     },
//     data: picturePath,
//   };

//   const handlePictureSubmit = async () => {
//     try {
//       setLoading(true);
//       const response = await axios(picconfig);
//       if (response?.data?.status === false) {
//         toast({
//           isClosable: true,
//           duration: 300,
//           status: "error",
//           message: response?.data?.message,
//           position: "top",
//         });
//         return;
//       }
//       toast({
//         isClosable: true,
//         duration: 300,
//         status: "success",
//         message: response?.data?.message,
//         position: "top",
//       });
//     } catch (err) {
//       toast({
//         isClosable: true,
//         duration: 5000,
//         status: "error",
//         title: err?.response?.data?.message ? err?.response?.data?.message : "Some error occurred! check your connection.",
//         position: "top",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <Wrapper>
//       <Head>
//         <title>NairaBoom Agent Edit Profilr</title>
//         <meta name="user dashboard" content="nairaboom.ng agent dashboard" />
//       </Head>
//       <HStack alignItems={"flex-start"} justifyContent="space-between">
//         <Text
//           fontWeight={700}
//           fontSize={{ base: "1.25rem", md: "1.5rem" }}
//           pb={{ base: "3rem", md: "6rem" }}
//         >
//           Edit Profile
//         </Text>
//         <Box>
//           {user?.details?.kyc_approved === true ? (
//             <Badge variant="solid" colorScheme="green">
//               VERIFIED USER
//             </Badge>
//           ) : (
//             <>
//               <Badge variant="solid" colorScheme={"red"}>
//                 Unverified User
//               </Badge>
//               <>
//                 <Button
//                   borderRadius={"0.1em"}
//                   _hover={{ transform: "scale(1.1)" }}
//                   ml="1.5rem"
//                   fontSize={"12px"}
//                   px="7px"
//                   py="2px"
//                   h=""
//                   bgColor={"green"}
//                   color="white"
//                   onClick={onOpen}
//                 >
//                   VERIFY NOW
//                 </Button>
//                 <Modal isCentered isOpen={isOpen} onClose={onClose}>
//                   <ModalOverlay />
//                   <ModalContent
//                     fontFamily={"poppins"}
//                     w={{ base: "90%", md: "40%" }}
//                     maxW={"95%"}
//                     p={{ base: "1rem", md: "4rem" }}
//                   >
//                     <ModalHeader
//                       textAlign={"center"}
//                       fontWeight={700}
//                       fontSize="1.5rem"
//                     >
//                       Verify User
//                     </ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>
//                       <form onSubmit={handleVerifySubmit}>
//                         <FormLabel>Enter BVN</FormLabel>
//                         <Input
//                           type="number"
//                           focusBorderColor="nairagreen"
//                           isRequired
//                           name="bvn_number"
//                           onChange={handleChange}
//                         />

//                         <Button
//                           w="100%"
//                           type="submit"
//                           bgColor={"nairagreen"}
//                           cursor="pointer"
//                           color="white"
//                           fontWeight={700}
//                           mt="3rem"
//                           _hover={{ transform: "scale(1.05)" }}
//                         >
//                           {isLoading ? <Spinner /> : "Verify"}
//                         </Button>
//                       </form>
//                     </ModalBody>
//                   </ModalContent>
//                 </Modal>
//               </>
//             </>
//           )}
//         </Box>
//       </HStack>

//       <Box
//         display={"flex"}
//         flexDir="column"
//         pl={{ base: "2rem", md: "7rem" }}
//         maxW="90%"
//       >
//         <Box gap="2.125rem" display={"flex"} alignItems="center">
//           <Avatar
//             src={fileDataURL ? fileDataURL : user?.details?.agent_path}
//             name={user?.details?.fullname}
//             bg="rgba(30, 215, 96, 0.19)"
//             w={{ base: "5rem", md: "14rem" }}
//             h={{ base: "5rem", md: "14rem" }}
//           />
//           <Text
//             fontWeight={500}
//             fontSize={{ base: "1rem", md: "xl" }}
//             w="max-content"
//             color="nairablue"
//             position={"relative"}
//             textDecor="underline"
//             cursor={"pointer"}
//           >
//             Change Image
//             <Input
//               onChange={changeHandler}
//               type="file"
//               border={"none"}
//               placeholder="Change Image"
//               aria-hidden="true"
//               accept="image/*"
//               position={"absolute"}
//               width={"100%"}
//               height={"100%"}
//               top={0}
//               left={0}
//               opacity={0}
//             />
//           </Text>
//         </Box>

//         <Text
//           pt="4.9rem"
//           pb="3.1rem"
//           fontWeight={600}
//           color="nairagrey"
//           fontSize={"xl"}
//         >
//           Personal Biodata
//         </Text>

//         <Box w={{ base: "100%", md: "90%" }}>
//           <Box
//             display={"flex"}
//             justifyContent="space-between"
//             alignItems={"center"}
//           >
//             <Text fontWeight={500} color="nairagrey" fontSize={"1rem"}>
//               Full Name
//             </Text>
//             <Box
//               fontWeight={500}
//               color="nairagrey"
//               fontSize={{ base: "1rem", md: "1.2rem" }}
//             >
//               {!user ? <Spinner /> : <Text>{user?.details.fullname}</Text>}
//             </Box>
//           </Box>
//           <Box h="4px" mt=".8rem" bgColor="white" borderRadius={"4px"}></Box>
//         </Box>

//         <Box w={{ base: "100%", md: "90%" }} pt="2.35rem">
//           <Box
//             display={"flex"}
//             justifyContent="space-between"
//             alignItems={"center"}
//           >
//             <Text fontWeight={500} color="nairagrey" fontSize={"1rem"}>
//               Phone Number
//             </Text>
//             <Box>
//               {!user ? (
//                 <Spinner />
//               ) : (
//                 <Text
//                   fontWeight={500}
//                   color="nairagrey"
//                   fontSize={{ base: "1rem", md: "1.2rem" }}
//                 >
//                   {user?.details.phone_number}
//                 </Text>
//               )}
//             </Box>
//           </Box>
//           <Box h="4px" mt=".8rem" bgColor="white" borderRadius={"4px"}></Box>
//         </Box>

//         <Box w={{ base: "100%", md: "90%" }} pt="2.35rem">
//           <Box
//             display={"flex"}
//             justifyContent="space-between"
//             alignItems={"center"}
//           >
//             <Text fontWeight={500} color="nairagrey" fontSize={"1rem"}>
//               Email
//             </Text>
//             <Box>
//               {!user ? (
//                 <Spinner />
//               ) : (
//                 <Text
//                   fontWeight={500}
//                   color="nairagrey"
//                   fontSize={{ base: "1rem", md: "1.2rem" }}
//                   maxW={{ base: "13rem", md: "fit-content" }}
//                 >
//                   {user?.details.email}
//                 </Text>
//               )}
//             </Box>
//           </Box>
//           <Box h="4px" mt=".8rem" bgColor="white" borderRadius={"4px"}></Box>
//         </Box>
//         {user?.details?.kyc_approved === true && (
//           <>
//             <ProfileItem title="Gender" item={`${user.details.gender}`} />

//             <ProfileItem title="Address" item={`${user.details.address}`} />

//             <ProfileItem
//               title="Residence State"
//               item={`${user.details.residence_state}`}
//             />
//             <ProfileItem title="Country" item={`${user.details.country}`} />
//           </>
//         )}
//         <Button
//           color="white"
//           bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
//           mt={{ base: "5rem", md: "6.825rem" }}
//           w="26.8rem"
//           maxW={"90%"}
//           h="3rem"
//           alignSelf={"flex-start"}
//           focusBorderColor="nairagreen"
//           _hover={{}}
//           onClick={handlePictureSubmit}
//           isDisabled={file === "" ? true : false}
//         >
//           {loading ? <Spinner /> : "Change Profile Picture"}
//         </Button>
//       </Box>
//     </Wrapper>
//   );
// };

// export default EditProfile;
