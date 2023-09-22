import {
  Box,
  Flex,
  Image,
  Input,
  Button,
  useToast,
  Text,
  Link,
} from "@chakra-ui/react";
import locked from "../assets/Untitled-2.png";
import { useState } from "react";
import { api } from "../api/api";
import bgforget from "../assets/bgforget.jpg";
import { PiArrowLeftLight } from "react-icons/pi";
import Navbar from "./navbarLoginRegister";
export default function ForgetPassword() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ForgotPassword = async () => {
    if (!email) {
      toast({
        title: "Email field data required",
        status: "error",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
    } else {
      await api
        .post("/tenant/forgetpassword", {
          email,
        })
        .then((res) => {
          toast({
            title: res.data.message,
            status: "success",
            position: "top",
            duration: 2000,
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            title: err.response.data,
            status: "error",
            position: "top",
            duration: 2000,
            isClosable: true,
          });
        });
    }
  };
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
          <Box bgColor={"white"} borderRadius={"50%"}>
            <Image src={locked} boxSize={"100px"} />
          </Box>

          <Box
            display={"flex"}
            flexDir={"column"}
            textAlign={"center"}
            gap={"15px"}
            px={"30px"}
            color={"white"}
          >
            <Box display={"flex"} flexDir={"column"} gap={"5px"}>
              <Text fontWeight={"semibold"} fontSize={"17px"}>
                Trouble logging in?
              </Text>
              <Text fontSize={"14px"} px={"5px"}>
                Enter your email, and we'll send you a link to get back into
                your account.
              </Text>
            </Box>
            <Box display={"flex"} flexDir={"column"} gap={"2em"} px={"18px"}>
              <Input
                placeholder="Email"
                variant={"flushed"}
                fontSize={"14px"}
                focusBorderColor="#e2e2e2"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
              ></Input>
              <Button
                color={"white"}
                bgColor="transparent"
                textTransform={"uppercase"}
                boxShadow={"dark-lg"}
                letterSpacing={"2px"}
                fontSize={"14px"}
                isLoading={isLoading}
                transition="transform 0.5s ease"
                _hover={{
                  bgColor: "transparent",
                  transform: "translateY(-5px)",
                }}
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    ForgotPassword();
                  }, 2000);
                }}
              >
                Send email link
              </Button>
            </Box>

            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              px={"10px"}
              gap={"15px"}
              fontSize={"13px"}
              color={"#73738a"}
              pt={"10px"}
            >
              <Box borderBottom={"1px solid #e2e2e2 "} w={"40%"}></Box>
              OR
              <Box borderBottom={"1px solid #e2e2e2"} w={"40%"}></Box>
            </Box>
            <Text fontSize={"14px"} fontWeight={"semibold"} pb={"1em"}>
              <Link href={"/registertenant"}>Create new account</Link>
            </Text>
          </Box>

          <Link href={"/logintenant"}>
            <Flex
              className="go-login text-2"
              alignItems={"center"}
              justifyContent={{ lg: "center" }}
              display={"flex"}
              fontSize={"1em"}
            >
              <PiArrowLeftLight color="white" />
              or back to login
            </Flex>
          </Link>
        </Box>
      </Box>
    </>
  );
}
