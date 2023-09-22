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
  Image,
  Select,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { api } from "../api/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useSelector } from "react-redux";
import { useFetchRoom } from "../hooks/useRoom";
export default function AddOrders(props) {
  YupPassword(Yup);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [image, setImage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);
  const userSelector = useSelector((state) => state.auth);
  const { rooms, fetch } = useFetchRoom();
  useEffect(() => {
    fetch();
  }, []);
  const imageHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  const inputHandler = (e) => {
    const { target } = e;
    formik.setFieldValue(target.id, target.value);
  };

  const formik = useFormik({
    initialValues: {
      property_id: "",
      room_id: "",
      email: "",
      username: "",
      tenant_id: "",
    },
    onSubmit: async () => {
      const formData = new FormData();
      formData.append("property_id", formik.values.property_id);
      formData.append("room_id", formik.values.room_id);
      formData.append("email", formik.values.email);
      formData.append("username", formik.values.username);
      formData.append("tenant_id", userSelector.id);
      formData.append("payment_proof", selectedFile);

      try {
        await api
          .post("/order/addorder", formData)
          .then((res) => {
            toast({
              title: "Success add Order",
              status: "success",
              position: "top",
              duration: 1000,
            });
            formik.resetForm();
            props.onClose();
            selectedFile("");
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
              Add Order(Beta)
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
            <form onSubmit={formik.handleSubmit}>
              <Box pb={"10px"}>
                <Select
                  id="property_id"
                  onChange={inputHandler}
                  variant="flushed"
                  placeholder="Select Property"
                >
                  {rooms?.map((val) => (
                    <option key={val?.Property?.id} value={val?.Property?.id}>
                      {val?.Property?.property_name}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box pb={"10px"}>
                <Select
                  id="room_id"
                  onChange={inputHandler}
                  variant="flushed"
                  placeholder="Select Room"
                >
                  {rooms?.map((val) => (
                    <option key={val?.id} value={val?.id}>
                      {val?.room_name}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box pb={"10px"}>
                <Input
                  id="email"
                  variant={"flushed"}
                  placeholder="Email :"
                  onChange={inputHandler}
                />
              </Box>
              <Box pb={"10px"}>
                <Input
                  id="username"
                  variant={"flushed"}
                  placeholder="Username :"
                  onChange={inputHandler}
                />
              </Box>
              <Box
                display={"flex"}
                flexDir={"column"}
                justifyContent={"center"}
                color={"grey"}
              >
                Payment proof :
                <Input
                  mt={2}
                  type="file"
                  accept="image/png, image/jpeg"
                  ref={inputFileRef}
                  variant={"flushed"}
                  name="payment_proof"
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
