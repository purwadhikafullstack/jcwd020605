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
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { api } from "../api/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useSelector } from "react-redux";
import { useFetchRoom, useFetchRoomByPropertyID } from "../hooks/useRoom";
import { useFetchProperty } from "../hooks/useProperty";
import { FcInfo } from "react-icons/fc";
export default function AddOrders(props) {
  YupPassword(Yup);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [image, setImage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);
  const userSelector = useSelector((state) => state.auth);
  const [propertyId, setPropertyId] = useState();
  const { roomsByProperty, fetchRoom } = useFetchRoomByPropertyID(propertyId);
  const { properties, fetch } = useFetchProperty();
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
              duration: 2000,
            });
            formik.resetForm();
            props.onClose();
            selectedFile("");
          })
          .catch((error) => {
            toast({
              description: error.response.data,
              status: "error",
              duration: 2000,
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
            <Button
              onClick={() => {
                props.onClose();
                setImage("");
                setSelectedFile("");
              }}
            >
              Cancel
            </Button>
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
                formik.handleSubmit();
                setImage("");
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
              You can try clicking on "Details" in the order to send an email
              regarding the hotel rules.
            </Flex>
            <Flex align={"center"} gap={"1em"} fontSize={"0.8em"}>
              <Icon as={FcInfo} boxSize={6} />
              "Beta" means that the "User" feature we added here is intended to
              enhance the user experience.
            </Flex>
            <form onSubmit={formik.handleSubmit}>
              <Box pb={"10px"}>
                <Text color={"grey"}>Select Property :</Text>
                <Select
                  // placeholder="Select Property"
                  id="property_id"
                  onChange={(e) => {
                    setPropertyId(e?.target?.value);
                    formik.setFieldValue("property_id", e.target.value);
                  }}
                  variant="flushed"
                >
                  {properties?.map((val) => (
                    <option key={val?.id} value={val?.id}>
                      {val?.property_name}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box pb={"10px"}>
                <Text color={"grey"}>Select Room :</Text>

                <Select
                  id="room_id"
                  onChange={inputHandler}
                  variant="flushed"
                  placeholder="Select room"
                >
                  {roomsByProperty?.map((val) => (
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
                  autoComplete="off"
                />
              </Box>
              <Box pb={"10px"}>
                <Input
                  id="username"
                  variant={"flushed"}
                  placeholder="Username :"
                  onChange={inputHandler}
                  autoComplete="off"
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
              <Flex
                align={"center"}
                justify={"center"}
                gap={"0.5em"}
                fontSize={"0.8em"}
                fontWeight={"bold"}
              >
                Maximum upload file size: 1 MB
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
