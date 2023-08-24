import {
  Button,
  Flex,
  FormControl,
  Box,
  Stack,
  FormErrorMessage,
  Icon,
  Input,
  Image,
  InputGroup,
  InputRightElement,
  useToast,
  Center,
} from "@chakra-ui/react";
import "@fontsource/barlow";
import React from "react";
import { PiArrowLeftLight } from "react-icons/pi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import BeatLoader from "react-spinners/BeatLoader";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useState, useRef } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function LoginTenant() {
  YupPassword(Yup);
  const [seePassword, setSeePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async () => {
      try {
        setIsLoading(true);
        const res = await api.post("/tenant/login", {
          email: formik.values.email,
          password: formik.values.password,
        });
        localStorage.setItem("tenant", JSON.stringify(res.data.token));
        dispatch({
          type: "login",
          payload: res.data.data,
        });
        toast({
          title: res.data.message,
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        nav("/landingpage");
        console.log(res);
      } catch (error) {
        toast({
          description: error.response.data.message,
          status: "error",
          duration: 1000,
          position: "top",
        });
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email("Example : test@gmail.com"),
      password: Yup.string()
        .required()
        .min(
          8,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
        .minUppercase(1)
        .minNumbers(1)
        .minSymbols(1),
    }),
  });
  return (
    <>
      <Center>
        <Flex className="form-wrap" w={"70%"} h={"100vh"} alignItems={"center"}>
          <Flex
            w={"100%"}
            h={"80%"}
            boxShadow={{ lg: "1px 1px 50px black" }}
            alignItems={"center"}
            justifyContent={"center"}
            flexDir={{ base: "column", lg: "row" }}
          >
            <Flex className="register" flex={{ lg: "1" }} gap={"2em"}>
              <Flex
                flexDir={"column"}
                alignItems={"center"}
                gap={{ base: "0.5em", lg: "1.5em" }}
              >
                <Flex
                  className="text-1"
                  textTransform={"uppercase"}
                  letterSpacing={"5px"}
                  fontSize={{ lg: "4rem" }}
                >
                  Login
                </Flex>

                <Flex
                  className="text-2"
                  justifyContent={"center"}
                  fontSize={{ base: "15px" }}
                >
                  Login to get free burger and fries!
                </Flex>

                <Flex className="text-3" py={0}>
                  By continuing, you hereby acknowledge and agree our terms and
                  conditions.
                </Flex>

                {/* <Button
                  w={"30%"}
                  isLoading
                  variant={"unstyled"}
                  spinner={<BeatLoader size={15} color="white" />}
                  justifyContent={"center"}
                  display={"flex"}
                >
                  Submit
                </Button> */}

                <Box>
                  <Button
                    bgColor={"transparent"}
                    boxShadow={"1px 1px 20px #635b4c"}
                    color={"#ffffff"}
                    display={{ base: "none", lg: "flex" }}
                    letterSpacing={"3px"}
                    w={"11em"}
                    h={"3em"}
                    fontSize={"18px"}
                    borderRadius={"7px"}
                    _hover={{ color: "#a07d4a" }}
                    textTransform={"uppercase"}
                    isLoading={isLoading}
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setIsLoading(false);
                        formik.handleSubmit();
                      }, 2000);
                    }}
                  >
                    Login
                  </Button>
                </Box>

                <Flex
                  className="go-login text-2"
                  alignItems={"center"}
                  justifyContent={{ lg: "center" }}
                  display={{ base: "none", lg: "flex" }}
                  fontSize={{ lg: "15px" }}
                >
                  <PiArrowLeftLight color="white" />
                  or continue login
                </Flex>
              </Flex>
            </Flex>

            <Center flex={{ lg: "1" }}>
              <Flex className="register-form">
                <Box className="Input" w={{ lg: "70%" }}>
                  <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={"2"}>
                      <FormControl isInvalid={formik.errors.email}>
                        <Input
                          placeholder="Email"
                          variant={"flushed"}
                          bgColor={"transparent"}
                          color={"white"}
                          name="email"
                          onChange={formik.handleChange}
                        ></Input>
                        <FormErrorMessage>
                          {formik.errors.email}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isInvalid={formik.errors.password}
                        mt={"1em"}
                      >
                        <InputGroup>
                          <Input
                            placeholder="Password"
                            variant={"flushed"}
                            type={seePassword ? "text" : "password"}
                            bgColor={"transparent"}
                            color={"white"}
                            name="password"
                            onChange={formik.handleChange}
                          ></Input>
                          <InputRightElement>
                            <Icon
                              as={
                                seePassword
                                  ? AiOutlineEye
                                  : AiOutlineEyeInvisible
                              }
                              boxSize={"25px"}
                              color={"#a5a5a5"}
                              cursor={"pointer"}
                              onClick={() => setSeePassword(!seePassword)}
                            />
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage textAlign={"left"}>
                          {formik.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    </Stack>
                  </form>
                </Box>
                <Button
                  bgColor={"transparent"}
                  boxShadow={"1px 1px 20px #635b4c"}
                  color={"#ffffff"}
                  display={{ lg: "none", base: "flex" }}
                  letterSpacing={"3px"}
                  justifyContent={"center"}
                  w={"11em"}
                  h={"3em"}
                  mt={"3em"}
                  fontSize={"18px"}
                  borderRadius={"7px"}
                  _hover={{ color: "#a07d4a" }}
                  textTransform={"uppercase"}
                  isLoading={isLoading}
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      formik.handleSubmit();
                    }, 2000);
                  }}
                >
                  Login
                </Button>

                <Flex
                  className="go-login text-2"
                  alignItems={"center"}
                  display={{ lg: "none" }}
                  fontSize={"15px"}
                  mt={"1em"}
                  justifyContent={"center"}
                >
                  <PiArrowLeftLight color="white" />
                  or continue login
                </Flex>
              </Flex>
            </Center>
          </Flex>
        </Flex>
      </Center>
    </>
  );
}
