import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  useToast,
  Box,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
export default function EditRooms(props) {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
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
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <Modal size={"sm"} isOpen={props.isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} justifyContent={"space-between"}>
            <Button onClick={props.onClose}>Cancel</Button>

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
                }, 2000);
              }}
            >
              Save
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
