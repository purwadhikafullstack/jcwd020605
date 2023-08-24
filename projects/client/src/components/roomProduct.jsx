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

export default function EditRoomProduct(props) {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const [selectedFile, setSelectedFile] = useState(null);

  // console.log(post);

  // const inputHandler = (e) => {
  //   const { id, value } = e.target;
  //   const tempUser = { ...post };
  //   tempUser[id] = value;
  //   console.log(tempUser);
  //   setPost(tempUser);
  // };

  // const editContent = async () => {
  //   try {
  //     await api
  //       .patch("/posts/" + props.id, post)
  //       .then((res) => {
  //         console.log(res.data);
  //         toast({
  //           title: res.data.message,
  //           status: "success",
  //           position: "top",
  //           duration: 1000,
  //           isClosable: true,
  //         });
  //         props.fetch();
  //         props.onClose();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      location: "",
    },

    onSubmit: async () => {
      const formData = new FormData();
      formData.append("location", formik.values.first_name);
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
              Edit Room
            </Box>
            <Button
              bgColor={"#edf2f7"}
              isLoading={isLoading}
              variant={"ghost"}
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
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
            <Box pb={"10px"}>
              <Input
                // py={"20px"}
                id="caption"
                variant={"flushed"}
                // defaultValue={props.caption}
                placeholder="Room type..."
                // onChange={inputHandler}
              />
            </Box>

            <Box pb={"10px"}>
              <Input
                // py={"20px"}
                id="caption"
                variant={"flushed"}
                // defaultValue={props.caption}
                placeholder="Price..."
                // onChange={inputHandler}
              />
            </Box>

            <Box pb={"10px"}>
              <Input
                // py={"20px"}
                id="caption"
                variant={"flushed"}
                // defaultValue={props.caption}
                placeholder="Desc..."
                // onChange={inputHandler}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
