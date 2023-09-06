import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useToast,
  Image,
  Box,
  Icon,
} from "@chakra-ui/react";
import { BiPencil } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function EditRooms(props) {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState(null);

  const inputHandler = (e) => {
    const { target } = e;
    formik.setFieldValue(target.id, target.value);
  };

  const formik = useFormik({
    initialValues: {
      room_name: "",
      details: "",
      main_price: "",
      max_guest: "",
    },

    onSubmit: async () => {
      try {
        await api
          .patch("/room/" + props.id, formik.values)
          .then((res) => {
            toast({
              title: res.data.message,
              status: "success",
              position: "top",
              duration: 1000,
            });
            props.fetch();
            props.onClose();
            nav("/roompropertiestenant");
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

    validationSchema: Yup.object().shape({}),
  });
  return (
    <>
      <Modal size={"sm"} isOpen={props.isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} justifyContent={"space-between"}>
            <Button onClick={props.onClose}>
              <Icon
                as={AiOutlineLeft}
                display={"flex"}
                alignItems={"center"}
                border={"2px solid #dbdbdb"}
                bgColor={"grey"}
                boxSize={"30px"}
                color={"white"}
                cursor={"pointer"}
                borderRadius={"20px"}
              />
            </Button>

            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"5px"}
              fontSize={"17px"}
            >
              Edit Rooms
            </Box>
            <Button
              bgColor={"#edf2f7"}
              isLoading={isLoading}
              variant={"ghost"}
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  formik.handleSubmit();
                  // editContent();
                  // nav("/profile");
                }, 2000);
              }}
            >
              <Icon
                as={AiOutlineRight}
                boxSize={"30px"}
                borderRadius={"30px"}
                border={"2px solid #dbdbdb"}
                bgColor={"grey"}
                color={"white"}
                cursor={"pointer"}
                display={"flex"}
                alignItems={"center"}
              />
            </Button>
          </ModalHeader>
          <ModalBody display={"flex"} flexDir={"column"} gap={"10px"}>
            <Box>
              <Input
                id="room_name"
                variant={"flushed"}
                defaultValue={props?.data?.room_name}
                placeholder="Room Name :"
                onChange={inputHandler}
              />
            </Box>

            <Box pb={"10px"}>
              <Input
                id="details"
                variant={"flushed"}
                defaultValue={props?.data?.details}
                placeholder="Room Description :"
                onChange={inputHandler}
              />
            </Box>

            <Box pb={"10px"}>
              <Input
                id="max_guest"
                variant={"flushed"}
                defaultValue={props?.data?.max_guest}
                placeholder="Max guest :"
                onChange={inputHandler}
              />
            </Box>

            <Box pb={"10px"}>
              <Input
                id="main_price"
                variant={"flushed"}
                defaultValue={props?.data?.main_price}
                placeholder="Price :"
                onChange={inputHandler}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
