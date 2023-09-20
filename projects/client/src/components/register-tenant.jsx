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
  Link,
} from "@chakra-ui/react";
import "@fontsource/barlow";
import React from "react";
import { PiArrowLeftLight } from "react-icons/pi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import bg from "../assets/2.jpg";
import BeatLoader from "react-spinners/BeatLoader";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useState, useRef } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function RegisterComp() {
  YupPassword(Yup);
  const [seePassword, setSeePassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const toast = useToast();
  const inputFileRef = useRef(null);

  const inputHandler = (e) => {
    const { target } = e;
    formik.setFieldValue(target.id, target.value);
  };

  const imageHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone_number: "",
      id_Number: "",
    },

    onSubmit: async () => {
      const formData = new FormData();
      formData.append("first_name", formik.values.first_name);
      formData.append("last_name", formik.values.last_name);
      formData.append("email", formik.values.email);
      formData.append("password", formik.values.password);
      formData.append("phone_number", formik.values.phone_number);
      formData.append("id_Number", formik.values.id_Number);
      formData.append("id_card", selectedFile);

      try {
        await api
          .post("/tenant/register", formData)
          .then((res) => {
            toast({
              title: res.data.message,
              status: "success",
              position: "top",
              duration: 1000,
            });
            nav("/logintenant");
          })
          .catch((err) => {
            toast({
              description: err.response.data.message,
              status: "error",
              duration: 1000,
              position: "top",
            });
            console.log(err.response.data);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    },

    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("First Name is required field"),
      last_name: Yup.string().required("Last Name is required field"),
      phone_number: Yup.string().required("Phone Number is required field"),
      id_Number: Yup.string().required("ID Number is required field"),
      email: Yup.string()
        .required("Email is required field")
        .email("Example : test@gmail.com"),
      password: Yup.string()
        .required("Password is required field")
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
        <Flex
          className="form-wrap"
          w={{ lg: "70%", base: "85%" }}
          pt={"2em"}
          h={"100vh"}
          alignItems={"center"}
        >
          <Flex
            w={"100%"}
            h={{ base: "100%", lg: "80%" }}
            boxShadow={{ lg: "1px 1px 50px black" }}
            // alignItems={"center"}
            justifyContent={"center"}
            flexDir={{ base: "column", lg: "row" }}
          >
            <Flex
              className="register"
              flex={{ lg: "1" }}
              mt={{ base: "2em", lg: "7em" }}
            >
              <Flex
                flexDir={"column"}
                alignItems={"center"}
                gap={{ lg: "2em" }}
              >
                <Flex
                  className="text-1"
                  textTransform={"uppercase"}
                  letterSpacing={"5px"}
                  fontSize={{ lg: "4rem" }}
                >
                  Register
                </Flex>
                <Flex
                  className="text-2"
                  fontSize={{ base: "10px", lg: "15px" }}
                  justifyContent={{ lg: "center" }}
                >
                  register to continue using our services.
                </Flex>

                <Flex
                  className="text-3"
                  py={0}
                  display={{ base: "none", lg: "flex" }}
                  fontSize={{ lg: "15px" }}
                >
                  By continuing, you hereby acknowledge and agree our terms and
                  conditions.
                </Flex>

                {/* sign up dekstop */}
                <Box>
                  <Button
                    bgColor={"transparent"}
                    boxShadow={"dark-lg"}
                    color={"#ffffff"}
                    display={{ base: "none", lg: "flex" }}
                    letterSpacing={"3px"}
                    w={"11em"}
                    h={"3em"}
                    fontSize={"18px"}
                    borderRadius={"7px"}
                    _hover={{
                      color: "#a07d4a",
                      bgColor: "transparent",
                      transform: "translateY(-5px)",
                    }}
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
                    Sign Up
                  </Button>
                </Box>
                <Link href={"/logintenant"} pt={"1em"}>
                  <Flex
                    className="go-login text-2"
                    alignItems={"center"}
                    justifyContent={{ base: "center" }}
                    display={{ base: "none", lg: "flex" }}
                    fontSize={{ base: "15px" }}
                  >
                    <PiArrowLeftLight color="white" />
                    or continue login
                  </Flex>
                </Link>
              </Flex>
            </Flex>

            <Center flex={{ lg: "1" }} w={"100%"}>
              <Flex className="register-form" w={{ base: "100%" }}>
                <Box
                  className="Input"
                  w={{ lg: "55%" }}
                  fontSize={{ base: "15px" }}
                  ml={{ lg: "6em" }}
                >
                  <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={"2"}>
                      <FormControl isInvalid={formik.errors.first_name}>
                        <Input
                          placeholder="FirstName"
                          fontSize={"13px"}
                          bgColor={"transparent"}
                          color={"white"}
                          variant={"flushed"}
                          id="first_name"
                          onChange={inputHandler}
                        ></Input>
                        <FormErrorMessage
                          fontSize={{ base: "10px", lg: "13px" }}
                        >
                          {formik.errors.first_name}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={formik.errors.last_name}>
                        <Input
                          placeholder="LastName"
                          fontSize={"13px"}
                          bgColor={"transparent"}
                          variant={"flushed"}
                          color={"white"}
                          id="last_name"
                          onChange={inputHandler}
                        ></Input>{" "}
                        <FormErrorMessage
                          fontSize={{ base: "10px", lg: "13px" }}
                        >
                          {formik.errors.last_name}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={formik.errors.email}>
                        <Input
                          placeholder="Email"
                          fontSize={"13px"}
                          variant={"flushed"}
                          bgColor={"transparent"}
                          color={"white"}
                          id="email"
                          onChange={inputHandler}
                        ></Input>
                        <FormErrorMessage
                          fontSize={{ base: "10px", lg: "13px" }}
                        >
                          {formik.errors.email}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={formik.errors.password}>
                        <InputGroup>
                          <Input
                            placeholder="Password"
                            fontSize={"13px"}
                            variant={"flushed"}
                            type={seePassword ? "text" : "password"}
                            bgColor={"transparent"}
                            color={"white"}
                            id="password"
                            onChange={inputHandler}
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
                        <FormErrorMessage
                          textAlign={"left"}
                          fontSize={{ base: "10px", lg: "13px" }}
                        >
                          {formik.errors.password}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={formik.errors.phone_number}>
                        <Input
                          placeholder="Phone Number"
                          fontSize={"13px"}
                          bgColor={"transparent"}
                          variant={"flushed"}
                          color={"white"}
                          id="phone_number"
                          onChange={inputHandler}
                        ></Input>
                        <FormErrorMessage
                          fontSize={{ base: "10px", lg: "13px" }}
                        >
                          {formik.errors.phone_number}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={formik.errors.id_Number}>
                        <Input
                          placeholder="No KTP"
                          fontSize={"13px"}
                          bgColor={"transparent"}
                          color={"white"}
                          variant={"flushed"}
                          id="id_Number"
                          onChange={inputHandler}
                        ></Input>
                        <FormErrorMessage
                          fontSize={{ base: "10px", lg: "13px" }}
                        >
                          {formik.errors.id_Number}
                        </FormErrorMessage>
                      </FormControl>

                      <Box
                        h={{ lg: "16em", base: "10em" }}
                        w={"100%"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        pos={"relative"}
                        zIndex={3}
                      >
                        <Input
                          type="file"
                          accept="image/png, image/jpeg"
                          display="none"
                          ref={inputFileRef}
                          onChange={imageHandler}
                        />
                        <Image
                          cursor={"pointer"}
                          w={"100%"}
                          objectFit={"cover"}
                          h={{ lg: "85%", base: "100%" }}
                          src={image}
                          position="absolute"
                          zIndex={2}
                          onClick={() => {
                            inputFileRef.current.click();
                          }}
                        />

                        <Flex
                          position="absolute"
                          zIndex={1}
                          color="gray.500"
                          fontSize="18px"
                          w={"60%"}
                          textTransform={"uppercase"}
                          top="50%"
                          left="50%"
                          justifyContent={"center"}
                          textAlign={{ base: "center" }}
                          transform="translate(-50%, -50%)"
                        >
                          Upload your id card
                        </Flex>
                      </Box>

                      {/* sign up mobile */}
                      <Box
                        w={"100%"}
                        my={{ lg: "1em" }}
                        mt={{ base: "0.5em" }}
                        display={"flex"}
                        gap={"1em"}
                        flexDir={"column"}
                      >
                        <Button
                          bgColor={"transparent"}
                          boxShadow={"dark-lg"}
                          color={"#ffffff"}
                          letterSpacing={"3px"}
                          h={"3em"}
                          w={"100%"}
                          fontSize={"14px"}
                          borderRadius={"7px"}
                          _hover={{
                            color: "#a07d4a",
                            bgColor: "transparent",
                            transform: "translateY(-5px)",
                          }}
                          textTransform={"uppercase"}
                          display={{ lg: "none", base: "flex" }}
                          justifyContent={"center"}
                          isLoading={isLoading}
                          onClick={() => {
                            setIsLoading(true);
                            setTimeout(() => {
                              setIsLoading(false);
                              formik.handleSubmit();
                            }, 2000);
                          }}
                        >
                          Sign Up
                        </Button>
                        <Link href={"/logintenant"}>
                          <Flex
                            className="go-login text-2"
                            alignItems={"center"}
                            justifyContent={{ base: "center" }}
                            display={{ base: "flex", lg: "none" }}
                            fontSize={{ base: "15px" }}
                          >
                            <PiArrowLeftLight color="white" />
                            or continue login
                          </Flex>
                        </Link>
                      </Box>
                    </Stack>
                  </form>
                </Box>
              </Flex>
            </Center>
          </Flex>
        </Flex>
      </Center>
    </>
  );
}
