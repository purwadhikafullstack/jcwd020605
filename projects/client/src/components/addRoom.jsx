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
  Input,
  Flex,
  Image,
  Icon,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";

export default function AddRooms(props) {
  YupPassword(Yup);
  // console.log(props);
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [image, setImage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);

  const imageHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
  };
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
      const formData = new FormData();
      formData.append("room_picture", selectedFile);
      formData.append("details", formik.values.details);
      formData.append("room_name", formik.values.room_name);
      formData.append("main_price", formik.values.main_price);
      formData.append("max_guest", formik.values.max_guest);

      try {
        await api
          .post("/room/" + props.id, formData)
          .then((res) => {
            toast({
              title: res.data.message,
              status: "success",
              position: "top",
              duration: 1000,
            });
            props.fetch();
            props.onClose();
            nav("/propertiestenant");
          })
          .catch((error) => {
            toast({
              description: error.response.data.message,
              status: "error",
              duration: 1000,
              position: "top",
            });
            console.log(error.response.data);
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
  // console.log(props);
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
              Add Room
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
            <form onSubmit={formik.handleSubmit}>
              <Box pb={"10px"}>
                <Input
                  id="room_name"
                  variant={"flushed"}
                  placeholder="Room Name :"
                  onChange={inputHandler}
                />
              </Box>

              <Box pb={"10px"}>
                <Input
                  id="details"
                  variant={"flushed"}
                  placeholder="Room Description :"
                  onChange={inputHandler}
                />
              </Box>

              <Box pb={"10px"}>
                <Input
                  id="main_price"
                  variant={"flushed"}
                  placeholder="Price :"
                  onChange={inputHandler}
                />
              </Box>

              <Box pb={"10px"}>
                <Input
                  id="max_guest"
                  variant={"flushed"}
                  placeholder="max guest :"
                  onChange={inputHandler}
                />
              </Box>

              <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"center"}
                color={"grey"}
              >
                Picture :
                <Input
                  mt={2}
                  type="file"
                  accept="image/png, image/jpeg"
                  ref={inputFileRef}
                  variant={"flushed"}
                  name="room_picture"
                  onChange={imageHandler}
                />
                <Image
                  cursor={"pointer"}
                  src={image}
                  onClick={() => {
                    inputFileRef.current.click();
                  }}
                />
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}