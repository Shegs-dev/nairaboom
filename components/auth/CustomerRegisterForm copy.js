import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Link,
    Spinner,
    Stack,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { BsArrowRightCircle, BsChevronLeft, BsPerson } from "react-icons/bs";
import {
    HiOutlineLockClosed,
    HiOutlinePhone
} from "react-icons/hi";
import * as Yup from "yup";
import { useDatePicker } from "../../utils/dobContext";
import CustomDatePicker from "../general/CustomDatePicker";
import PlayResponsibly from "../general/PlayResponsibly";
import {
    registerCustomer
  } from "../../src/apis/func";

const CustomerRegisterForm2 = () => {
    const { onChange } = useDatePicker();
    const toast = useToast();
    const router = useRouter();
    const { r, t, type } = router.query;

    const [isLoading, setIsLoading] = useState(false);
    const [showRegPass, setShowRegPass] = useState(false);
    const [showRegConfirm, setshowRegConfirm] = useState(false);

    const [checkbox, setcheckbox] = useState(false);
    const validationSchema = Yup.object().shape({
        fullname: Yup.string()
            .required("Full Name is required")
            .matches(/^[^\d]+$/, "Full Name must not contain numbers"),
        phone_number: Yup.string().required("Phone Number is required"),
        email: Yup.string().email("Invalid email").notRequired(),
        dob: Yup.string()
            .min(3, "Please complete date of birth")
            .required("Birthday is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
        referral_code: Yup.string().notRequired(),
        promo_code: Yup.string().notRequired(),
    });

    const formik = useFormik({
        initialValues: {
            fullname: "",
            phone_number: "",
            email: "",
            dob: null,
            password: "",
            confirmPassword: "",
            referral_code: r || "",
            promo_code: "",
        },
        validationSchema: validationSchema,
        onSubmit: async(values) => {
            try {
                setIsLoading(true);
                const requestData = {...values, user_type: "customer" };
                if (requestData.dob) {
                    requestData.dob = formatDate(requestData.dob);
                }
                if (!requestData.email) {
                    delete requestData.email;
                }
                if (requestData.dob === null || requestData.dob === "") {
                    toast({
                        isClosable: true,
                        duration: 5000,
                        status: "error",
                        title: "Birthday not captured",
                        position: "top",
                    });
                    setIsLoading(false);
                    return;
                }
                if (requestData.password.length < 8) {
                    toast({
                        isClosable: true,
                        duration: 5000,
                        status: "error",
                        title: "Password must be 8 characters long",
                        position: "top",
                    });
                    setIsLoading(false);
                    return;
                }

                const response = await registerCustomer(requestData);

                if (
                    response.data?.status === false &&
                    response.data?.payload === null
                ) {
                    toast({
                        isClosable: true,
                        duration: 5000,
                        status: "error",
                        title: response.data.message,
                        position: "top",
                    });
                    setIsLoading(false);
                    return;
                }

                toast({
                    isClosable: true,
                    duration: 2000,
                    status: "success",
                    title: "Registration successful!",
                    position: "top",
                });
                toast({
                    isClosable: true,
                    duration: 6000,
                    status: "success",
                    title: " Refer 10 people and start earning regular income with your Nairaboom account!",
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
        },
    });

    function formatDate(inputDate) {
        const inputDateObject = new Date(inputDate);
        const month = (inputDateObject.getMonth() + 1).toString().padStart(2, "0");
        const day = inputDateObject.getDate().toString().padStart(2, "0");

        return `${month}/${day}`;
    }

    useEffect(() => {
        if (r) {
            formik.setFieldValue("referral_code", r);
        }
        if (onChange) {
            formik.setFieldValue("dob", onChange);
        }
    }, [r, onChange]);

    const handleClick1 = () => {
        setShowRegPass(!showRegPass);
    };

    const handleClick2 = () => {
        setshowRegConfirm(!showRegConfirm);
    };

    useEffect(() => {
    }, [checkbox]);

    return (
        <>
            <Head>
                <title> Nairaboom | Sign Up </title> 
                <script async src = "https://www.googletagmanager.com/gtag/js?id=G-904C1779CP"
                strategy = "afterInteractive" />
                <script strategy = "afterInteractive" > 
                    { `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-904C1779CP');
                    ` } 
                </script> 
            </Head> 
            <Stack alignItems = "center"
                pt = { 10 }
                spacing = { 5 }
                bgImage = "/redesign/generalbackground.svg"
                bgPos = "center"
                bgSize = "cover"
                pos = "relative" >
                <HStack w = "100%"
                justifyContent = "center"
                pos = "relative"
                pt = {
                    { base: 10, md: 0 }
                } >
                <Box pos = "absolute"
                left = { 10 }
                top = {
                    { base: 0, md: 3 }
                }
                cursor = "pointer"
                onClick = {
                    () => router.replace("/")
                } >
                <BsChevronLeft size = { 30 }
                color = "white"
                onClick = {
                    () => router.replace("/")
                }
                /> 
                </Box> 
                <Image src = "/redesign/logo.png"
                alt = "Nairaboom logo"
                h = "3rem"
                w = "fit-content" />
                </HStack> 
                <HStack color = "nairagreen"
                fontSize = {
                    { md: "1.25rem" }
                } >
                <Text color = "white" > Sign Up to </Text> 
                <Text> Rollover </Text> 
                <Text> Accumulate </Text> 
                <Text> Cashout </Text> 
                </HStack> 
                <Flex justifyContent = "center"
                w = "100%"
                maxW = "85rem"
                px = { 10 }
                gap = { 5 }
                flexFlow = {
                    { base: "column-reverse wrap", md: "nowrap" }
                }>
                <Flex w = {
                    { base: "100%", md: "50%", lg: "70%" }
                }
                position = { "relative" }
                bottom = {
                    { xs: "5rem", md: "0" }
                }
                alignItems = "flex-end"
                mt = {
                    { xs: "6rem", md: "0" }
                } >
                <Image src = "/redesign/auth/signuppagemockup.png"
                alt = "" />
                </Flex> 
                <Stack w = {
                    { base: "100%", md: "sm" }
                }
                spacing = { 8 }
                alignItems = "center" >
                <form onSubmit = { formik.handleSubmit } >
                <FormControl mb = { "1rem" } >
                <InputGroup bg = "white"
                borderRadius = { 50 }>
                <InputLeftElement mt = { "0.4rem" }
                w = "3.6rem" >
                <BsPerson size = { 20 }
                color = "gray" />
                </InputLeftElement> 
                <Input type = "text"
                h = "3.6rem"
                isRequired name = "fullname"
                onChange = { formik.handleChange }
                onBlur = { formik.handleBlur }
                value = { formik.values.fullname }
                borderRadius = { 50 }
                focusBorderColor = "nairagreen"
                placeholder = "Full Name" />
                </InputGroup> {
                formik.touched.fullname && formik.errors.fullname ? ( 
                    <Text color = "red.500" > { formik.errors.fullname } </Text>
                ) : null
            } 
            </FormControl> 
            <FormControl mb = { "1rem" } >
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
                name = "phone_number"
                onChange = { formik.handleChange }
                onBlur = { formik.handleBlur }
                value = { formik.values.phone_number }
                _placeholder = {
                    { fontSize: "17.62px" }
                }
                focusBorderColor = "nairagreen" />
            </InputGroup> {
                formik.touched.phone_number && formik.errors.phone_number ? ( 
                    <Text color = "red.500" > { formik.errors.phone_number } </Text>
                ) : null
            } 
        </FormControl> 
        <FormControl mb = { "1rem" }>
        <FormLabel px = { 5 }
            color = { "white" }
            fontWeight = { 500 }
            display = { "flex" }>
            Birthday { " " } 
            <Text ml = { "0.2rem" }
                color = { "yellow" } > { " " }
                (Required for Birthday Boom) 
            </Text> 
        </FormLabel> 
    <CustomDatePicker selected = { null }
        onChange = {
            (date) => formik.setFieldValue("dob", date)
        }
    />  
    {
    formik.touched.dob && formik.errors.dob ? ( 
        <Text color = "red.500" > { formik.errors.dob } </Text>
    ) : null
    } 
    </FormControl> 
    <FormControl mb = { "1rem" }>
    <InputGroup bg = "white"
        borderRadius = { 50 } >
    <InputLeftElement mt = { "0.4rem" }
        w = "3.6rem" >
    <HiOutlineLockClosed size = { 20 }
        color = "gray" />
    </InputLeftElement> 
    <Input borderRadius = { 50 }
        placeholder = "Password"
        w = "100%"
        h = "3.6rem"
        border = { "none" }
        type = { showRegPass ? "text" : "password" }
        name = "password"
        onChange = { formik.handleChange }
        onBlur = { formik.handleBlur }
        value = { formik.values.password }
        _placeholder = {
            { fontSize: "17.62px" }
        }
        focusBorderColor = "nairagreen"
        isRequired 
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
    {
        formik.touched.password && formik.errors.password ? ( 
            <Text color = "red.500" > { formik.errors.password } </Text>
        ) : null
    } 
    </FormControl> 
    <FormControl mb = { "1rem" }>
    <InputGroup bg = "white"
        borderRadius = { 50 }>
    <InputLeftElement mt = { "0.4rem" }
        w = "3.6rem">
    <HiOutlineLockClosed size = { 20 }
        color = "gray" />
    </InputLeftElement> 
    <Input type = { showRegConfirm ? "text" : "password" }
        borderRadius = { 50 }
        placeholder = "Confirm Password"
        className = "passwordconfirm__input"
        w = "100%"
        h = "3.6rem"
        _placeholder = {
            { fontSize: "17.62px" }
        }
        focusBorderColor = "nairagreen"
        isRequired 
        name = "confirmPassword"
        onChange = { formik.handleChange }
        onBlur = { formik.handleBlur }
        value = { formik.values.confirmPassword }
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
    {
        formik.touched.confirmPassword &&
        formik.errors.confirmPassword ? ( 
            <Text color = "red.500" > { formik.errors.confirmPassword } </Text>
        ) : null
    } 
    </FormControl>

    <FormControl mb = { "1rem" }>
    <InputGroup bg = "white"
        borderRadius = { 50 }>
    <Input textAlign = "center"
        borderRadius = { 50 }
        placeholder = "Referral Link (Optional)"
        w = "100%"
        h = "3.6rem"
        border = { "none" }
        bgColor = "white"
        type = { "text" }
        _placeholder = {
            { fontSize: "17.62px" }
        }
        focusBorderColor = "nairagreen"
        name = "referral_code"
        value = { formik.values.referral_code }
        onChange = { formik.handleChange }
    /> 
    </InputGroup> 
    </FormControl> 
    <FormControl mb = { "1rem" }>
    <InputGroup bg = "white"
        borderRadius = { 50 } >
    <Input textAlign = "center"
        borderRadius = { 50 }
        placeholder = "Promo Code (Optional)"
        w = "100%"
        h = "3.6rem"
        border = { "none" }
        bgColor = "white"
        type = { "text" }
        _placeholder = {
            { fontSize: "17.62px" }
        }
        focusBorderColor = "nairagreen"
        name = "promo_code"
        value = { formik.values.promo_code }
        onChange = { formik.handleChange }
    /> 
    </InputGroup>

    <FormControl>
    <InputGroup mt = { "1em" }
        justifyContent = { "center" }
        alignItems = { "center" }
        textAlign = "center"
        borderRadius = { 50 } >
        <Checkbox colorScheme = "nairagreen"
            color = { "white" }
            p = { "0.5em" }
            display = {
                { base: "flex" }
            }
            onChange = {
                (e) => setcheckbox(e.target.checked)
            } 
        >
            I Agree to 
        </Checkbox> 
        <Link as = { Link }
            to = "/terms_conditions"
            href = "/terms_conditions"
            color = "blue.500" >
            <Text color = { "nairagreen" }
                style = {
                    { textDecoration: "underline" }
                } 
            >
                T & Cs 
            </Text> 
        </Link> 
    </InputGroup> 
    </FormControl>

    </FormControl>

    { /* Repeat similar pattern for other fields */ } { /* Your JSX for other form fields */ } 
    <Button type = "submit"
        w = "100%"
        colorScheme = "none"
        bg = "nairagreen"
        color = "white"
        h = "3.6rem"
        borderRadius = { 50 }
        pos = "relative"
        className = "submit__reg"
        border = { "none" }
        fontWeight = { 600 }
        fontSize = "lg"
        cursor = { "pointer" }
        _hover = {
            { transform: "scale(1.05)" }
        }
        isLoading = { isLoading }
        disabled = {!formik.isValid || !checkbox }> { isLoading ? <Spinner /> : "SIGN UP" } 
        <Box pos = "absolute" right = { 3 }>
            <BsArrowRightCircle size = { 24 } /> 
        </Box> 
    </Button> 
    <VStack spacing = { 1 }>
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
            () => router.push("/auth?p=login")
        } 
    >
        Log in
    </Button> 
    </VStack> 
    <VStack w = "100%"
        py = {
            { base: 2, md: 14 }
        }
        ml = {
            { base: -10, md: 0 }
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
        } 
    >
        <PlayResponsibly color = "white" />
        <HStack>
            <Text textAlign = "center"
                color = "white"
                maxW = {
                    { base: "18rem", md: "23rem" }
                } 
            >
                Nairaboom is licensed and regulated by the National Lottery Regulatory Commission(NLRC). { "" }
                License number 00000060 
            </Text> 
            <Image w = "2rem"
                src = "/redesign/nlrclogo.png"
                alt = "" />
        </HStack> 
    </VStack> 
    </form> 
    </Stack> 
    </Flex> 
    </Stack> 
    </>
);
};

export default CustomerRegisterForm2;