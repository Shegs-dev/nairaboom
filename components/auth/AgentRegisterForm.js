import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    FormControl,
    HStack,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Spinner,
    Stack,
    Text,
    useToast,
    VStack
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsArrowRightCircle, BsPerson } from "react-icons/bs";
import {
    HiOutlineLockClosed,
    HiOutlinePhone, 
    HiOutlineMail
} from "react-icons/hi";
import { getAuthenticatedUser } from "../../lib/hooks/getAuthUser";
import useUser from "../../lib/hooks/useUser";
import PlayResponsibly from "../general/PlayResponsibly";
import {
    registerAgent
  } from "../../src/apis/func";

const AgentRegisterForm = () => {
    const toast = useToast();
    const router = useRouter();

    const { user } = useUser();
    const [showAgent, setShowAgent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //Redirect if authenticated.
    const redirectIfAuthenticated = async() => {
        const isUserAuthenticated = await getAuthenticatedUser();
        // if (isUserAuthenticated === false) {

        // }
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

    function formatDate(inputDate) {
        const inputDateObject = new Date(inputDate);

        const month = (inputDateObject.getMonth() + 1).toString().padStart(2, "0");
        const day = inputDateObject.getDate().toString().padStart(2, "0");

        return `${month}/${day}`;
    }

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
        // dob: "",
    };

    const initialData = params;

    const [RegformData, updateData] = useState(initialData);

    const handleRegChange = (e) => {
        updateData({
            ...RegformData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleRegFormSubmit = async(e) => {
        try {
            setIsLoading(true);
            const response = await registerAgent(RegformData);

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
            router.push("/auth/agent");

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
        <>
            <Head>
            <title> Nairaboom | Sign Up </title> 
            </Head> 
            <Stack alignItems = "center"
            pt = { 10 }
            spacing = { 5 }
            bgImage = "/redesign/generalbackground.svg"
            bgPos = "center"
            bgSize = "cover"
            pos = "relative" >
            <Image src = "/redesign/logo.png"
            alt = "Nairaboom logo"
            h = "3rem"
            w = "fit-content" />
            <HStack color = "nairagreen"
            fontSize = {
                { md: "1.25rem" }
            } > { /* <Text color="white">Sign Up to</Text> */ } 
            <Text> Rollover </Text> 
            <Text> Accumulate </Text> 
            <Text> Cashout </Text> 
            </HStack>

            <Box>
            <Text fontWeight = { 700 }
            fontSize = { 20 }
            color = "white" > Agent Registration </Text> 
            </Box> 
            <Flex justifyContent = "center"
            w = "100%"
            maxW = "65rem"
            px = { 10 }
            gap = { 5 }
            flexFlow = {
                { base: "column-reverse wrap", md: "nowrap" }
            } >
            <Flex w = {
                { base: "100%", md: "50%" }
            }
            alignItems = "flex-end" >
            <Image src = "/redesign/auth/signuppagemockup.png"
            alt = "" />
            </Flex> 
            <Stack w = {
                { base: "100%", md: "sm" }
            }
            spacing = { 8 }
            alignItems = "center" >
            <FormControl>
            <InputGroup bg = "white"
            borderRadius = { 50 }>
            <InputLeftElement mt = { "0.4rem" }
            w = "3.6rem">
            <BsPerson size = { 20 }
            color = "gray" />
            </InputLeftElement> 
            <Input type = "text"
            h = "3.6rem"
            isRequired _placeholder = {
                { fontSize: "17.62px" }
            }
            name = "fullname"
            onChange = { handleRegChange }
            borderRadius = { 50 }
            focusBorderColor = "nairagreen"
            placeholder = "Full Name" />
            </InputGroup> </FormControl> 
            <FormControl>
            <InputGroup bg = "white"
            borderRadius = { 50 } >
            <InputLeftElement mt = { "0.4rem" }
            w = "3.6rem" >
            <HiOutlinePhone size = { 20 }
            color = "gray" />
            </InputLeftElement> 
            <Input borderRadius = { 50 }
            placeholder = "Phone Number"
            h = "3.6rem"
            isRequired type = { "tel" }
            _placeholder = {
                { fontSize: "17.62px" }
            }
            focusBorderColor = "nairagreen"
            name = "phone_number"
            onChange = { handleRegChange }
            /> 
            </InputGroup> 
            </FormControl> 

        <FormControl>
            <InputGroup bg = "white"
                borderRadius = { 50 } >
            <InputLeftElement mt = { "0.4rem" }
                w = "3.6rem" >
            <HiOutlineLockClosed size = { 20 }
                color = "gray" />
            </InputLeftElement> 
            <Input borderRadius = { 50 }
                onChange = {
                    (e) => {
                        handleRegChange(e);
                        setPass(e.target.value);
                    }
                }
                placeholder = "Password"
                w = "100%"
                h = "3.6rem"
                border = { "none" }
                bgColor = "white"
                type = { showRegPass ? "text" : "password" }
                _placeholder = {
                    { fontSize: "17.62px" }
                }
                focusBorderColor = "nairagreen"
                isRequired 
                name = "password" 
            />
            <InputRightElement w = "3rem"
                mt = { "0.4rem" } > {
                showRegPass ? ( 
                    <ViewIcon onClick = { handleClick1 }
                    color = "gray" />
                ) : ( 
                    <ViewOffIcon onClick = { handleClick1 }
                    color = "gray" />
                )
            } 
            </InputRightElement> 
            </InputGroup> 
            </FormControl> 
            {
                RegformData.password?.length < 8 && ( 
                    <Text style = {
                        { marginTop: 8 }
                    }
                    mb = "1.5rem"
                    color = { "#FF0000" }
                    fontSize = ".8rem" 
                    >
                        Minimum of 8 characters 
                    </Text>
                )
            } 
        <FormControl>
        <InputGroup bg = "white"
            borderRadius = { 50 }>
        <InputLeftElement mt = { "0.4rem" }
        w = "3.6rem" >
        <HiOutlineLockClosed size = { 20 }
            color = "gray" />
        </InputLeftElement> 
        <Input type = { showRegConfirm ? "text" : "password" }
            borderRadius = { 50 }
            placeholder = "Password"
            className = "passwordconfirm__input"
            w = "100%"
            h = "3.6rem"
            _placeholder = {
                { fontSize: "17.62px" }
            }
            focusBorderColor = "nairagreen"
            isRequired 
            name = "confirmPassword"
            onChange = {
                (e) => {
                    setConfirmPassword(e.target.value);
                }
            }
        /> 
        <InputRightElement w = "3rem"
        mt = { "0.4rem" } > {
        showRegConfirm ? ( 
            <ViewIcon onClick = { handleClick2 }
            color = "gray" />
        ) : ( 
            <ViewOffIcon onClick = { handleClick2 }
            color = "gray" />
        )
    } 
    </InputRightElement> 
    </InputGroup> 
    </FormControl> 
    <FormControl>
    <InputGroup bg = "white"
        borderRadius = { 50 } >
    <Input textAlign = "center"
    borderRadius = { 50 }
    placeholder = "Super agent code"
    w = "100%"
    h = "3.6rem"
    border = { "none" }
    bgColor = "white"
    type = { "text" }
    _placeholder = {
        { fontSize: "17.62px" }
    }
    focusBorderColor = "nairagreen"
    name = "superagent_code"
    onChange = { handleRegChange }
    /> 
    </InputGroup> 
    </FormControl> 
    <Button w = "100%"
    colorScheme = "none"
    bg = "nairagreen"
    color = "white"
    h = "3.6rem"
    mt = { "5rem" }
    borderRadius = { 50 }
    pos = "relative"
    className = "submit__reg"
    border = { "none" }
    type = { "submit" }
    fontWeight = { 600 }
    fontSize = "lg"
    cursor = { "pointer" }
    _hover = {
        { transform: "scale(1.05)" }
    }
    isDisabled = { checkValid() }
    onClick = {
        () => handleRegFormSubmit()
    } > { /* SIGN UP */ } { isLoading === true ? <Spinner /> : "SIGN UP" } 
    <Box pos = "absolute"
    right = { 3 }>
    <BsArrowRightCircle size = { 24 } /> 
    </Box> 
    </Button> 
    <VStack spacing = { 1 } >
    <Text color = "white" > Already have an account ? </Text> 
    <Button variant = "outline"
    colorScheme = "green"
    color = "nairagreen"
    borderRadius = { 50 }
    borderWidth = { 2 }
    borderColor = "nairagreen"
    px = { 5 }
    h = "2rem"
    onClick = {
        () => router.push("/auth/agent")
    } >
        Log in
    </Button> 
    </VStack> 
    <VStack w = "100%"
    py = {
        { base: 4, md: 14 }
    }
    pos = {
        { base: "absolute", md: "relative" }
    }
    bottom = { 0 }
    fontSize = {
        { base: "0.8rem", md: "1rem" }
    }
    background = {
        { base: "rgba( 255, 255, 255, 0.35 )", md: "none" }
    }
    boxShadow = {
        {
            base: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            md: "none",
        }
    }
    backdropFilter = {
        { base: "blur( 12px )", md: "none" }
    }
    borderRadius = {
        {
            base: "50% 50% 10% 10% / 40% 40% 0% 0%",
            md: "none",
        }
    } >
    <PlayResponsibly color = "white" />
    <HStack>
    <Text textAlign = "center"
    color = "white"
    maxW = {
        { base: "18rem", md: "23rem" }
    } >
        Nairaboom is licensed and regulated by the National Lottery Regulatory Commission(NLRC). { "" }
        License number 00000060 
    </Text> 
    <Image w = "2rem"
    src = "/redesign/nlrclogo.png"
    alt = "" />
    </HStack> 
    </VStack> 
    </Stack> 
    </Flex> 
    </Stack> 
    </>
);
};

export default AgentRegisterForm;