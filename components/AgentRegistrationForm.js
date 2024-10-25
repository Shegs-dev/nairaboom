import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Select,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState, useContext, useRef } from "react";
import { getAuthenticatedUser } from "../lib/hooks/getAuthUser";
import { AUTH_API_ROUTES } from "../utils/routes";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useUser from "../lib/hooks/useUser";

const BASE_URL = AUTH_API_ROUTES.PRODUCTION_BASE_URL;
const NAIRABOOM_KEY = AUTH_API_ROUTES.PRODUCTION_X_APP_KEY;

const AgentRegisterForm = () => {
  const toast = useToast();
  const router = useRouter();

  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  //Redirect if authenticated.
  const redirectIfAuthenticated = async () => {
    const isUserAuthenticated = await getAuthenticatedUser();
    if (isUserAuthenticated?.authenticated) {
      if (user?.details?.user_type === "customer") {
        router.push("/customer_dashboard");
      } else if (user?.details?.user_type === "agent") {
        router.push("/agent_dashboard");
      }
    }
  };
  useEffect(() => {
    redirectIfAuthenticated();
  });

  //View eye icons
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegConfirm, setshowRegConfirm] = useState(false);

  //Password Views
  const handleClick1 = (e) => {
    setShowRegPass(!showRegPass);
  };

  const handleClick2 = (e) => {
    setshowRegConfirm(!showRegConfirm);
  };

  //Handling Register Form data
  const [pass, setPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const checkValid = () => {
    if (pass.length >= 8 && confirmPassword === pass) {
      return false;
    } else {
      return true;
    }
  };
  const params = {
    fullname: "",
    email: "",
    phone_number: "",
    password: "",
    user_type: "agent",
    superagent_code: "",
  };

  const initialData = params;

  const [RegformData, updateData] = useState(initialData);

  const handleRegChange = (e) => {
    if (RegformData.email === "") {
      delete RegformData.email;
    }

    updateData({
      ...RegformData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const regconfig = {
    method: "post",
    url: `${BASE_URL}/api/signup`,
    headers: {
      "X-APP-KEY": NAIRABOOM_KEY,
    },
    data: RegformData,
  };

  const handleRegFormSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await axios(regconfig);

      //Error from server
      if (
        response?.data?.status === false &&
        response?.data?.payload === null
      ) {
        toast({
          isClosable: true,
          duration: 5000,
          status: "error",
          title: response.data.message,
          position: "top",
        });
        return;
      }

      toast({
        isClosable: true,
        duration: 3000,
        status: "success",
        title: "Registration successful!",
        position: "top",
      });
      router.push("/auth?p=login");

      localStorage.setItem(
        "user_payload",
        JSON.stringify(response.data.payload)
      );
    } catch (err) {
      toast({
        isClosable: true,
        duration: 5000,
        status: "error",
        title: "Some error occurred! check your connection and try again.",
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form action="" onSubmit={handleRegFormSubmit}>
      {/* REGISTER */}
      <Input
        placeholder="Full Name"
        w="100%"
        h="3.6rem"
        border={"none"}
        bgColor="white"
        type={"text"}
        _placeholder={{ fontSize: "17.62px" }}
        mb="2rem"
        focusBorderColor="nairagreen"
        isRequired
        name="fullname"
        onChange={handleRegChange}
      />
      <Input
        placeholder="Email (this field is not compulsory)"
        w="100%"
        h="3.6rem"
        border={"none"}
        bgColor="white"
        type={"email"}
        _placeholder={{ fontSize: "17.62px" }}
        mb="2rem"
        focusBorderColor="nairagreen"
        name="email"
        onChange={handleRegChange}
      />
      <Input
        placeholder="Phone Number"
        w="100%"
        h="3.6rem"
        border={"none"}
        bgColor="white"
        type={"tel"}
        _placeholder={{ fontSize: "17.62px" }}
        mb="2rem"
        focusBorderColor="nairagreen"
        name="phone_number"
        onChange={handleRegChange}
      />
      <InputGroup w="100%">
        <Input
          onChange={(e) => {
            handleRegChange(e);
            setPass(e.target.value);
          }}
          placeholder="Password"
          w="100%"
          h="3.6rem"
          border={"none"}
          bgColor="white"
          type={showRegPass ? "text" : "password"}
          _placeholder={{ fontSize: "17.62px" }}
          focusBorderColor="nairagreen"
          isRequired
          name="password"
        />
        <InputRightElement onClick={handleClick1} width="4.5rem" pt="1rem">
          <Button h="1.75rem" size="sm">
            {showRegPass ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Text mt=".5rem" mb="1.5rem" color={"red"} fontSize=".6rem">
        {RegformData.password.length < 8
          ? "Password must have at least 8 characters"
          : ""}
      </Text>

      <InputGroup w="100%">
        <Input
          className="passwordconfirm__input"
          placeholder="Confirm Password"
          w="100%"
          h="3.6rem"
          border={"none"}
          bgColor="white"
          type={showRegConfirm ? "text" : "password"}
          _placeholder={{ fontSize: "17.62px" }}
          focusBorderColor="nairagreen"
          isRequired
          name="confirmPassword"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <InputRightElement onClick={handleClick2} width="4.5rem" pt="1rem">
          <Button h="1.75rem" size="sm">
            {showRegConfirm ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {/* <Text mt=".3rem" mb="1.5rem" color={"red"} fontSize=".6rem">
        {confirmPassword.length !== RegformData.password.length
          ? "passwords must match"
          : ""}
      </Text> */}

      <Input
        w="100%"
        h="3.6rem"
        border={"none"}
        bgColor="white"
        type="text"
        placeholder="Super Agent Code"
        focusBorderColor="nairagreen"
        isRequired
        name="superagent_code"
        onChange={handleRegChange}
      />

      <Button
        className="submit__reg"
        mt="2rem"
        w="100%"
        border={"none"}
        color="white"
        bgGradient="linear(180deg, #02D95A 0%, #02B54C 100%)"
        type={"submit"}
        fontWeight={600}
        fontSize="lg"
        mb="5rem"
        cursor={"pointer"}
        _hover={{ transform: "scale(1.05)" }}
        isDisabled={checkValid()}
      >
        {isLoading === true ? <Spinner /> : "Join now"}
      </Button>
    </form>
  );
};

export default AgentRegisterForm;
