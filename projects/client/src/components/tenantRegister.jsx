import {
  Box,
  Flex,
  Center,
  Image,
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
import {
  AiFillFacebook,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useState, useRef } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Registercomp() {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  YupPassword(Yup);
  const [seePassword, setSeePassword] = useState(false);
  const [image, setImage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  const toast = useToast();
  const inputFileRef = useRef(null);
  const handleSubmit = async () => {
    alert(formik.values);
  };

  const inputHandler = (e) => {
    const { target } = e;
    formik.setFieldValue(target.id, target.value);
  };

  const imageHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  console.log(selectedFile);

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
      formData.append("id_card", selectedFile);
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      phone_number: Yup.string().required(),
      id_Number: Yup.string().required(),
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

  console.log(formik);

  const register = async () => {
    if (!formik.values.email || !formik.values.password) {
      toast({
        title: "Please, make sure all data already filled.",
        status: "warning",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
    } else {
      await api
        .post("/tenant/register", formik.values)
        .then((res) => {
          toast({
            title: res.data.message,
            status: "success",
            position: "top",
            duration: 1000,
            isClosable: true,
          });
          nav("/review");
        })
        .catch((err) => {
          toast({
            description: err.response.data.message,
            status: "error",
            duration: 1000,
            isClosable: true,
            position: "top",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <Center>
        <Box w={"100vw"} px={"25px"}>
          <Box border={"1px solid #e2e2e2"} marginY={"15px"}>
            <Box display={"flex"} justifyContent={"center"}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                w={"45%"}
                pt={"5%"}
              >
                <Image
                // src={igtitle}
                />
              </Box>
            </Box>

            <Center>
              <Box w={"80%"} textAlign={"center"} display={"grid"} gap={"10px"}>
                <Box color={"#73738a"} fontSize={"18px"} fontWeight={"medium"}>
                  Sign up
                </Box>

                <Box className="Input">
                  <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={"2"}>
                      <FormControl isInvalid={formik.errors.first_name}>
                        <Input
                          placeholder="FirstName"
                          fontSize={"13px"}
                          bgColor={"#fafafa"}
                          id="first_name"
                          onChange={inputHandler}
                        ></Input>
                        <FormErrorMessage fontSize={"12px"}>
                          {formik.errors.first_name}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={formik.errors.last_name}>
                        <Input
                          placeholder="LastName"
                          fontSize={"13px"}
                          bgColor={"#fafafa"}
                          id="last_name"
                          onChange={inputHandler}
                        ></Input>{" "}
                        <FormErrorMessage fontSize={"12px"}>
                          {formik.errors.last_name}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={formik.errors.email}>
                        <Input
                          placeholder="Email"
                          fontSize={"13px"}
                          bgColor={"#fafafa"}
                          id="email"
                          onChange={inputHandler}
                        ></Input>
                        <FormErrorMessage fontSize={"12px"}>
                          {formik.errors.email}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={formik.errors.password}>
                        <InputGroup>
                          <Input
                            placeholder="Password"
                            fontSize={"13px"}
                            type={seePassword ? "text" : "password"}
                            bgColor={"#fafafa"}
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
                        <FormErrorMessage fontSize={"12px"} textAlign={"left"}>
                          {formik.errors.password}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={formik.errors.phone_number}>
                        <Input
                          placeholder="Phone Number"
                          fontSize={"13px"}
                          bgColor={"#fafafa"}
                          id="phone_number"
                          onChange={inputHandler}
                        ></Input>
                        <FormErrorMessage fontSize={"12px"}>
                          {formik.errors.phone_number}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={formik.errors.id_Number}>
                        <Input
                          placeholder="No KTP"
                          fontSize={"13px"}
                          bgColor={"#fafafa"}
                          id="id_Number"
                          onChange={inputHandler}
                        ></Input>
                        <FormErrorMessage fontSize={"12px"}>
                          {formik.errors.id_Number}
                        </FormErrorMessage>
                      </FormControl>

                      <Box
                        w={"80px"}
                        h={"65px"}
                        border={"3px dashed #dbdbdb"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
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
                          h={"100%"}
                          src={image}
                          onClick={() => {
                            inputFileRef.current.click();
                          }}
                        />
                      </Box>
                    </Stack>
                  </form>
                </Box>

                <Box pb={"10px"}>
                  <Button
                    w={"90%"}
                    bgColor={"#4cb5f9"}
                    color={"#ffffff"}
                    h={"35px"}
                    fontSize={"14px"}
                    borderRadius={"7px"}
                    _hover={""}
                    isLoading={isLoading}
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setIsLoading(false);
                        register();
                        // upload();
                      }, 2000);
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </Box>
            </Center>
          </Box>

          <Flex
            justifyContent={"center"}
            textAlign={"center"}
            py={"15px"}
            fontSize={"15px"}
          >
            Get the app.
          </Flex>

          <Flex
            justifyContent={"center"}
            textAlign={"center"}
            fontSize={"12px"}
            gap={"10px"}
          >
            <Box>
              English <Icon as={BsChevronDown} />
            </Box>
            <Text>© 2023 MyApp Project</Text>
          </Flex>
        </Box>
      </Center>
    </>
  );
}
