import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function DeleteProduct(props) {
  console.log(props);
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // const DeleteContent = async () => {
  //   try {
  //     await api
  //       .delete("/posts/" + props.id)
  //       .then((res) => {
  //         console.log(res.data);
  //         toast({
  //           title: res.data.message,
  //           status: "success",
  //           position: "top",
  //           duration: 1000,
  //           isClosable: true,
  //         });
  //         props.onClose();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

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
            Delete this post?
          </ModalHeader>
          <ModalBody
            textAlign={"center"}
            fontSize={"13px"}
            display={"flex"}
            flexDir={"column"}
            gap={"40px"}
          >
            <Text>
              You can restore this post from Recently deleted in Your activity
              within 30 days. After that, it will be permanently deleted.
            </Text>
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
                      // DeleteContent();
                      // nav("/profile");
                    }, 2000);
                  }}
                >
                  Delete
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
