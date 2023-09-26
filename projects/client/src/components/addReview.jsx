import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useToast,
  Box,
  Input,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { api } from "../api/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { FcInfo } from "react-icons/fc";

export default function AddOrders(props) {
  YupPassword(Yup);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const inputHandler = (e) => {
    const { target } = e;
    formik.setFieldValue(target.id, target.value);
  };

  const formik = useFormik({
    initialValues: {
      review: "",
      property_id: "",
    },
    onSubmit: async () => {
      try {
        await api
          .patch("/review/addreview", {
            review: formik.values.review,
            property_id: props.id,
          })
          .then((res) => {
            toast({
              title: "Success add Review",
              status: "success",
              position: "top",
              duration: 2000,
            });
            formik.resetForm();
            props.fetch();
            props.onClose();
          })
          .catch((error) => {
            toast({
              description: error.response.data,
              status: "error",
              duration: 1000,
              position: "top",
            });
            console.log(error);
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
              Add Review(Beta)
            </Box>
            <Button
              bgColor={"#edf2f7"}
              isLoading={isLoading}
              variant={"ghost"}
              onClick={() => {
                setIsLoading(true);
                formik.handleSubmit();
              }}
            >
              Save
            </Button>
          </ModalHeader>
          <ModalBody
            display={"flex"}
            flexDir={"column"}
            gap={"10px"}
            fontWeight={"bold"}
          >
            <Flex align={"center"} gap={"1em"} fontSize={"0.8em"}>
              <Icon as={FcInfo} boxSize={6} />
              Please input 1-10 number.
            </Flex>
            <Flex align={"center"} gap={"1em"} fontSize={"0.8em"}>
              <Icon as={FcInfo} boxSize={6} />
              "Beta" means that the "User" feature we added here is intended to
              enhance the user experience.
            </Flex>
            <form onSubmit={formik.handleSubmit}>
              <Box pb={"10px"}>
                <Input
                  id="review"
                  variant={"flushed"}
                  placeholder="Rating :"
                  onChange={inputHandler}
                  autoComplete="off"
                />
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
