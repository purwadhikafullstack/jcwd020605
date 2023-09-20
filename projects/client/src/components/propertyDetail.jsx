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
  Select,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useFetchCity, useFetchProv } from "../hooks/useProvAndCity";
import { useFetchProperty } from "../hooks/useProperty";

export default function PropertyDetail(props) {
  YupPassword(Yup);
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [selectedImages, setSelectedImages] = useState([]);
  const [provinceId, setProvinceId] = useState("");

  const { provinces } = useFetchProv();
  const { cities } = useFetchCity(provinceId);

  const [propertyData, setPropertyData] = useState();
  const propertyDetails = async () => {
    const res = await api.get("/properties/" + props.id);
    setPropertyData(res.data);
    console.log(res);
  };

  useEffect(() => {
    if (props.isOpen) {
      propertyDetails();
    }
  }, [props.isOpen]);
  console.log(propertyData);
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
              {propertyData && propertyData.property_name}
            </Box>

            <Box>
              <Text fontSize={"12px"}>Location :</Text>
              <Box>{propertyData && propertyData.city.city_name}</Box>
            </Box>

            <Box>
              <Text fontSize={"12px"}>Property Description :</Text>
              <Box>{propertyData && propertyData.details_text}</Box>
            </Box>

            <Box>
              <Text fontSize={"12px"}>Room lists :</Text>
              {propertyData &&
                propertyData.Rooms.map((room, index) => (
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
