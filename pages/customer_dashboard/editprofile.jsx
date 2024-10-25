import {
  Avatar,
  Badge,
  Box,
  Button,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import FormData from "form-data";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import EditProfileItem from "../../components/Editprofilecomp";
import ProfileItem from "../../components/ProfileItem";
import Wrapper from "../../components/Wrapper";
import { getTokenFromLocalStorage2 } from "../../lib/hooks/getAuthUser";
import useUser from "../../lib/hooks/useUser";
import { AUTH_API_ROUTES } from "../../utils/routes";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;
const EditProfileSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  // Add more validation for other fields as needed
});

const EditProfile = () => {
  const { user } = useUser();
  const router = useRouter();
  const toast = useToast();
  const bearerToken = user?.token;
  const [startDate, setStartDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState(user?.details.customer_path || "");
  const [picData, setpicData] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [section, setsection] = useState("1");
  // const [inValidEmail, setInValidEmail] = useState(false);
  //data
  const [email, setemail] = useState(user?.details.email ?? "");
  function validateEmail(email) {
    const forbiddenStarters = ["www.", "http://"];
    for (let starter of forbiddenStarters) {
      if (email.toLowerCase().startsWith(starter)) {
        // setInValidEmail(true);
        toast({
          isClosable: true,
          duration: 5000,
          status: "error",
          title: "Email cannot start with '" + starter + "'",
          position: "top",
        });
        return "email failed";
        // throw new Error("Email cannot start with '" + starter + "'");
      }
    }
  }

  const [phoneNumber, setphoneNumber] = useState(
    user?.details?.phone_number ?? ""
  );
  const [place_of_birth, setplace_of_birth] = useState("");
  const [dob, setdob] = useState(user?.details?.dob || "");
  const [gender, setgender] = useState(user?.details?.gender);
  const [country, setcountry] = useState(user?.details?.country ?? "");
  const [address, setaddress] = useState(user?.details?.address ?? "");
  //new
  const [accountNumber, setaccountNumber] = useState("");
  const [bankCode, setbankCode] = useState("");
  //address_part
  const [street, setstreet] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState(user?.details.residence_state || "");
  const [postal_code, setpostal_code] = useState("");
  const [bvn_number, setBvnNumber] = useState("");
  const [kycvalidateComplete, setkycvalidateComplete] = useState(false);
  const dataObj = {
    bvn_number,
    // email,
    accountNumber,
    bankCode,
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
  function checkObjectFields(obj) {
    for (let key in obj) {
      if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
        return false;
      }
    }
    return true;
  }
  const bvn = Object.freeze({
    bvn_number: "",
  });
  const [verifyFormData, updateVerifyData] = useState(bvn);
  const handleVerifySubmit = async (e) => {
    const verify_config = {
      method: "post",
      // url: `${BASE_URL}/api/validate_account`,
      url: `${BASE_URL}/api/validate_profile_bvn`,
      headers: {
        "X-APP-KEY": NAIRABOOM_KEY,
        Authorization: `Bearer ${bearerToken}`,
      },
      data: {
        bvn_number: bvn_number,
        account_number: accountNumber,
        // bank_code: bankCode,
        bank_code: bankCode.length === 2 ? `0${bankCode}` : bankCode,
      },
    };
    try {
      e.preventDefault();
      // if (verify_config.data.bank_code.length === 1) {
      //   verify_config.data.bank_code = "0" + data.bank_code;
      // }
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
      router.push("/customer_dashboard");
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
  // eslint-disable-next-line react-hooks/exhaustive-deps

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
  const handleEditProfileSubmit = async () => {
    let profileData = {
      fullname: user?.details.fullname,
      // email: email,
      customer_path: file,
    };

    // Add optional properties if they are not empty or null

    if (!user?.details?.email) {
      profileData.email = email;
      try {
        const valid = validateEmail(email);
        if (valid == "email failed") {
          return;
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
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
          duration: 3000,
          status: "error",
          message: response?.data?.message,
          position: "top",
        });
        return;
      }
      toast({
        isClosable: true,
        duration: 3000,
        status: "success",
        message: "You've successfully updated your profile",
        title: "You've successfully updated your profile",
        position: "top",
      });
      router.push("/customer_dashboard");
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
  const [bankData, setBankData] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  useEffect(() => {
    // Check if any of the fields have been edited
    const isGenderEdited = gender !== user?.details.gender;
    const isAddressEdited = address !== user?.details.address;
    const isStateEdited = state !== user?.details.residence_state;
    const isCountryEdited = country !== user?.details.country;

    if (isGenderEdited || isAddressEdited || isStateEdited || isCountryEdited) {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }
  }, [gender, address, state, country, user?.details]);

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

  return (
    <Wrapper>
      <Head>
        <title>NairaBoom Customer Edit Profile</title>
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
            src={fileDataURL ? fileDataURL : user?.details?.customer_path}
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
              // onChange={changeHandler2}
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

        {/* start */}

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
        {user?.details?.email ? (
          <ProfileItem title="Email" item={`${user?.details.email}`} />
        ) : (
          <EditProfileItem
            title="Email"
            type="email"
            defaultValue={`${
              user?.details.email
                ? user?.details.email === undefined
                  ? ""
                  : user?.details.email
                : ""
            }  `}
            placeholder={"Enter your email"}
            handleChange={(e) => setemail(e)}
          />
        )}
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
            {/* <EditProfileItem
              title="Country"
              type="type"
              placeholder
              defaultValue={`${
                user?.details.country
                  ? user?.details.country === undefined
                    ? ""
                    : user?.details.country
                  : ""
              }  `}
              handleChange={(e) => setcountry(e)}
            /> */}
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

        {/* end */}

        {/* <Formik
          initialValues={{
            email: user?.details.email || "",
            phoneNumber: user?.details.phone_number || "",
            // Add initial values for other fields as needed
          }}
          validationSchema={EditProfileSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleEditProfileSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field type="text" name="phoneNumber" />
                <ErrorMessage name="phoneNumber" component="div" />
              </div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : "Save Profile"}
              </button>
            </Form>
          )}
        </Formik> */}

        {!email && !user?.details?.email && !phoneNumber ? null : (
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
              if (
                !user?.details.fullname ||
                (!email && !user?.details?.email) ||
                !user?.details?.phone_number
              ) {
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
            // isDisabled={!isEdited || loading}
            isDisabled={
              !isEdited ||
              loading ||
              (!email && !user?.details?.email && !phoneNumber)
            }
            // isDisabled={file === "" ? true : false}
          >
            {loading ? <Spinner /> : "Save Profile"}
          </Button>
        )}

        {user?.details.kyc_approved !== true && (
          <>
            <Button
              borderRadius={"0.5em"}
              _hover={{ transform: "scale(1.1)" }}
              fontSize={"14px"}
              px="7px"
              py="2px"
              bgColor={"green"}
              color="white"
              bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
              mt={{ base: "1rem", md: "2.825rem" }}
              w="26.8rem"
              maxW={"90%"}
              fontWeight={"700"}
              h="3rem"
              alignSelf={"flex-start"}
              focusBorderColor="nairagreen"
              onClick={() => {
                if (
                  (!user?.details?.email && !email) ||
                  (!user?.details?.phone_number && !phoneNumber)
                ) {
                  if (!user?.details?.email && !email) {
                    toast({
                      isClosable: true,
                      duration: 5000,
                      status: "error",
                      title: "Please Enter Email",
                      position: "top",
                    });
                  }
                  if (!user?.details?.phone_number && !phoneNumber) {
                    toast({
                      isClosable: true,
                      duration: 5000,
                      status: "error",
                      title: "Please Enter Phone Number",
                      position: "top",
                    });
                  }
                } else {
                  onOpen();
                }
              }}
            >
              VERIFY NOW
            </Button>
          </>
        )}
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
          // mt={"5vh"}
          maxW={"95%"}
          height={"90vh"}
          overflowX={"auto"}
          p={{ base: "1rem", md: "3rem" }}
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
                      {isLoading ? <Spinner /> : "Verify Now"}
                    </Button>
                  </>
                )}
                {/* {section === "2" && (
                <>
                  <Box mt={"1rem"}>
                    <fieldset
                      style={{
                        border: "2px solid",
                        padding: "1em 2em",
                        borderRadius: "10px",
                        borderColor: "#A7A7A7",
                      }}
                    >
                      <legend color="#A7A7A7" style={{ color: "#A7A7A7" }}>
                        Address
                      </legend>
                      <Box mt={"0.25rem"}>
                        <FormLabel color="#A7A7A7">Street</FormLabel>
                        <Input
                          placeholder="Enter Street"
                          w="100%"
                          h="3.6rem"
                          border={"1px"}
                          bgColor="white"
                          type={"text"}
                          isRequired
                          _placeholder={{ fontSize: "17.62px" }}
                          mb="0rem"
                          focusBorderColor="nairagreen"
                          name="text"
                          onChange={(e) => {
                            setstreet(e.target.value.trim());
                          }}
                        />
                      </Box>
                      <EditProfileItem
                        title="State"
                        type="text"
                        handleChange={(e) => {
                          setstate(e);
                        }}
                      />
                      <EditProfileItem
                        title="City"
                        type="text"
                        handleChange={(e) => setcity(e)}
                      />
                      <EditProfileItem
                        title="Postal Code"
                        type="numeber"
                        max={6}
                        handleChange={(e) => setpostal_code(e)}
                      />
                    </fieldset>
                  </Box>
                  <Button
                    w="100%"
                    type="submit"
                    bgColor={"nairagreen"}
                    cursor="pointer"
                    color="white"
                    fontWeight={700}
                    mt="3rem"
                    disabled={!checkObjectFields(dataObj2)}
                    _hover={{ transform: "scale(1.05)" }}
                  >
                    {isLoading ? <Spinner /> : "Verify"}
                  </Button>
                </>
              )} */}
              </form>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Wrapper>
  );
};

export default EditProfile;
