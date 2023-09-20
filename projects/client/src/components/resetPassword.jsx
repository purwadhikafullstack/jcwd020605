import {
  Box,
  Center,
  Input,
  Button,
  useToast,
  Text,
  Icon,
  FormControl,
  FormErrorMessage,
  Stack,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import bgforget from "../assets/bgforget.jpg";
import Navbar from "./navbarLoginRegister";

export default function ResetPassword() {
  const [token, setToken] = useState();
  const [user, setUser] = useState([]);
  const location = useLocation();
  const toast = useToast();
  console.log(token);

  useEffect(() => {
    const tokenUrl = location.pathname.split("/")[2];
    setToken(tokenUrl);
  }, []);

  const nav = useNavigate();
  YupPassword(Yup);
  const [seePassword, setSeePassword] = useState(false);
  const [seePassword1, setSeePassword1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm: "",
    },

    validationSchema: Yup.object().shape({
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
    onSubmit: async () => {
      try {
        await api
          .patch(`/tenant/resetpassword?token=${token}`, {
            password: formik.values.password,
            confirm: formik.values.confirm,
          })
          .then((res) => {
            toast({
              title: res.data.message,
              status: "success",
              position: "top",
              duration: 3000,
              isClosable: true,
            });
            return nav("/logintenant");
          });
      } catch (error) {
        console.log(error);
        toast({
          title: error.response.data.message,
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      }
    },
  });

  return (
    <>
      <Navbar></Navbar>
      <Box
        h={"100vh"}
        bgBlendMode={"Overlay"}
        bgPos={"center"}
        bgSize={"cover"}
        bg={`rgba(0, 0, 0, 0.5)`}
        bgImage={bgforget}
        display={"Flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          display={"Flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"10px"}
          boxShadow={{ lg: "1px 1px 50px black" }}
          w={"75%"}
          h={"80%"}
        >
          <Center>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Box
                className="Input"
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                fontFamily={`'Gilda Display', sans-serif`}
                gap={"20px"}
              >
                <Text
                  textTransform={"uppercase"}
                  fontSize={{ base: "20px", lg: "3em" }}
                  color={"white"}
                >
                  Reset Password
                </Text>

                <form onSubmit={formik.handleSubmit}>
                  <Stack spacing={"5"} w={"350px"}>
                    <FormControl isInvalid={formik.errors.password}>
                      <InputGroup>
                        <Input
                          placeholder="New Password"
                          variant={"flushed"}
                          color={"white"}
                          fontSize={"20px"}
                          focusBorderColor="#e2e2e2"
                          type={seePassword ? "text" : "password"}
                          name="password"
                          onChange={formik.handleChange}
                        ></Input>
                        <InputRightElement>
                          <Icon
                            as={
                              seePassword ? AiOutlineEye : AiOutlineEyeInvisible
                            }
                            boxSize={"25px"}
                            color={"#a5a5a5"}
                            cursor={"pointer"}
                            onClick={() => setSeePassword(!seePassword)}
                          />
                        </InputRightElement>
                      </InputGroup>

                      <FormErrorMessage fontSize={"12px"} textAlign={"left"}>
                        {formik.errors.password}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={formik.errors.password}>
                      <InputGroup>
                        <Input
                          placeholder="Confirm Password"
                          variant={"flushed"}
                          fontSize={"20px"}
                          color={"white"}
                          focusBorderColor="#e2e2e2"
                          type={seePassword1 ? "text" : "password"}
                          name="confirm"
                          onChange={formik.handleChange}
                        ></Input>
                        <InputRightElement>
                          <Icon
                            as={
                              seePassword1
                                ? AiOutlineEye
                                : AiOutlineEyeInvisible
                            }
                            boxSize={"25px"}
                            color={"#a5a5a5"}
                            cursor={"pointer"}
                            onClick={() => setSeePassword1(!seePassword1)}
                          />
                        </InputRightElement>
                      </InputGroup>

                      <FormErrorMessage fontSize={"12px"} textAlign={"left"}>
                        {formik.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  </Stack>
                </form>

                <Button
                  w={"100%"}
                  color={"white"}
                  bgColor="transparent"
                  textTransform={"uppercase"}
                  boxShadow={"dark-lg"}
                  letterSpacing={"5px"}
                  fontSize={"14px"}
                  isLoading={isLoading}
                  transition="transform 1s ease"
                  _hover={{
                    bgColor: "transparent",
                    transform: "translateY(-5px)",
                  }}
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      formik.handleSubmit();
                    }, 2000);
                  }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Center>
        </Box>
      </Box>
    </>
  );
}
