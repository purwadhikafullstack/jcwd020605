import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { api } from "../api/api";
import * as Yup from "yup";
import YupPassword from "yup-password";
export default function PropertyDetail(props) {
  YupPassword(Yup);
  const [propertyData, setPropertyData] = useState();
  const propertyDetails = async () => {
    const res = await api.get("/properties/" + props.id);
    setPropertyData(res.data);
  };

  useEffect(() => {
    if (props.isOpen) {
      propertyDetails();
    }
  }, [props.isOpen]);
  return (
    <>
      <Modal size={"sm"} isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader display={"flex"} justifyContent={"center"}>
            Property details
          </ModalHeader>
          <ModalBody
            display={"flex"}
            flexDir={"column"}
            gap={"10px"}
            fontSize={"18px"}
            fontWeight={"bold"}
          >
            <Box>
              <Text fontSize={"12px"}>Property Name :</Text>
              {propertyData?.property_name}
            </Box>

            <Box>
              <Text fontSize={"12px"}>Location :</Text>
              <Box>{propertyData?.City?.city_name}</Box>
            </Box>

            <Box>
              <Text fontSize={"12px"}>Property Description :</Text>
              <Box>{propertyData?.details_text}</Box>
            </Box>

            <Box>
              <Text fontSize={"12px"}>Room lists :</Text>
              {propertyData?.Rooms?.map((room, index) => (
                <Box key={index}>
                  Room {index + 1}: {room.room_name}
                </Box>
              ))}
            </Box>
          </ModalBody>
          <ModalFooter justifyContent={"center"} display={"flex"}>
            <Box>The Cappa</Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
