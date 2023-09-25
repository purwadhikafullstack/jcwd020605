import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function LogOut(props) {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const LogOut = async () => {
    localStorage.removeItem("tenant");
    window.location.reload();
  };

  return (
    <>
      <Modal size={"xs"} isOpen={props.isOpen}>
        <ModalOverlay />
        <ModalContent borderRadius={"40px"}>
          <ModalHeader
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            fontWeight={"bold"}
          >
            Log out
          </ModalHeader>
          <ModalBody
            textAlign={"center"}
            fontSize={"13px"}
            display={"flex"}
            flexDir={"column"}
            gap={"40px"}
          >
            <Text>Are you sure want to Log out?</Text>
            <Box display={"flex"} flexDir={"column"} gap={"5px"}>
              <Box borderY={"1px solid #dbdbdb"}>
                <Button
                  color={"red"}
                  py={"10px"}
                  w={"60px"}
                  isLoading={isLoading}
                  variant={"ghost"}
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      LogOut();
                      // nav("/");
                    }, 2000);
                  }}
                >
                  Log out
                </Button>
              </Box>
              <Box>
                <Button
                  fontSize={"15px"}
                  fontWeight={"semibold"}
                  cursor={"pointer"}
                  bgColor={"white"}
                  w={"60px"}
                  onClick={props.onClose}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
