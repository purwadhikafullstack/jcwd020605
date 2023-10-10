import {
  Box,
  Flex,
  Center,
  Input,
  Text,
  Icon,
  Avatar,
  InputGroup,
  useToast,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
// import Avatar1 from "../assets/avatar.png";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../api/api";
import { RxCross2 } from "react-icons/rx";
import { FcInfo } from "react-icons/fc";
import { MdOutlineDone } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { fetch } from "../hoc/authProvider";

export default function EditProfile(props) {
  const nav = useNavigate();
  const toast = useToast();
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const inputFileRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(userSelector.id);
  const [image, setImage] = useState(userSelector.avatar_url);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tenant, setTenant] = useState({
    ...userSelector,
  });
  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempTenant = { ...tenant };
    tempTenant[id] = value;
    setTenant(tempTenant);
  };
  const avatarPict = (e) => {
    setSelectedFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };
  const profileData = async () => {
    const formData = new FormData();
    formData.append("first_name", tenant.first_name);
    formData.append("last_name", tenant.last_name);
    formData.append("profile_picture", selectedFile);
    await api
      .patch("/tenant/editprofile/" + id, formData)
      .then((res) => {
        localStorage.setItem("tenant", JSON.stringify(res.data.token));
        toast({
          title: res.data.message,
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        props.onClose();
        window.location.reload();
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: err.response.data,
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      });
  };

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
              Edit Profile
            </Box>
            <Button
              bgColor={"#edf2f7"}
              isLoading={isLoading}
              variant={"ghost"}
              onClick={() => {
                setIsLoading(true);
                profileData();
                setImage("");
              }}
            >
              Save
            </Button>
          </ModalHeader>
          <ModalBody display={"flex"} flexDir={"column"} gap={"10px"}>
            <Box pt={"10px"}>
              <Box display={"flex"} justifyContent={"center"} gap={"15px"}>
                <Input
                  accept="image/jpeg, image/png"
                  ref={inputFileRef}
                  type="file"
                  display="none"
                  onChange={avatarPict}
                />
                <Avatar
                  src={
                    image
                      ? image
                      : `${process.env.REACT_APP_API_BASE_URL}${userSelector?.profile_picture}`
                  }
                  size={"lg"}
                  border={"1px solid #dbdbdb"}
                  cursor={"pointer"}
                  onClick={() => {
                    inputFileRef.current.click();
                  }}
                />
              </Box>

              <Box display={"flex"} flexDir={"column"} alignItems={"center"}>
                <Box
                  w={"50%"}
                  color={"blue.300"}
                  textAlign={"center"}
                  fontSize={"13px"}
                  fontWeight={"bold"}
                  pt={"10px"}
                  cursor={"pointer"}
                  onClick={() => {
                    inputFileRef.current.click();
                  }}
                >
                  Edit picture or avatar{" "}
                </Box>
                <Flex
                  align={"center"}
                  gap={"0.5em"}
                  fontSize={"0.8em"}
                  fontWeight={"bold"}
                >
                  <Icon as={FcInfo} boxSize={6} />
                  Maximum upload file size: 1 MB
                </Flex>
              </Box>
            </Box>

            <Text>First name</Text>
            <Input
              variant="flushed"
              h={"30px"}
              fontWeight={"bold"}
              id="first_name"
              defaultValue={userSelector.first_name}
              onChange={inputHandler}
            />

            <Text>Last name</Text>
            <Input
              variant="flushed"
              h={"30px"}
              fontWeight={"bold"}
              id="last_name"
              defaultValue={userSelector.last_name}
              onChange={inputHandler}
            />
            <Text>Email</Text>
            <Text fontWeight={"bold"}>{props?.data?.email}</Text>

            <Text>ID Number</Text>
            <Text fontWeight={"bold"}>{props?.data?.idNumber}</Text>

            <Text>Phone Number</Text>
            <Text fontWeight={"bold"}>{props?.data?.phone_number}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
