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

export default function AddPropertyModal(props) {
  YupPassword(Yup);
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [provinceId, setProvinceId] = useState();
  const { provinces } = useFetchProv();
  const { cities } = useFetchCity(provinceId);

  // console.log(provinceId);
  // console.log(CitiesName);

  const inputHandler = (e) => {
    const { target } = e;
    formik.setFieldValue(target.id, target.value);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(files);
    const images = [];
    const maxImages = 3;

    for (let i = 0; i < Math.min(files.length, maxImages); i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file);
      images.push(imageUrl);
    }
    setSelectedImages(images);
  };

  const formik = useFormik({
    initialValues: {
      property_name: "",
      details_text: "",
      province: "",
      city_id: "",
    },

    onSubmit: async () => {
      const formData = new FormData();
      formData.append("property_name", formik.values.property_name);
      formData.append("details_text", formik.values.details_text);
      formData.append("province", formik.values.province);
      formData.append("city_id", formik.values.city_id);

      for (const files of selectedFiles) {
        formData.append("property_img", files);
      }
      try {
        await api
          .post("/properties", formData)
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

    // validationSchema: Yup.object().shape({}),
  });
  // console.log(formik.values);
  // console.log(provinceId);

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
              Add property
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
                id="property_name"
                variant={"flushed"}
                // defaultValue={props.caption}
                placeholder="Property Name : "
                onChange={inputHandler}
              />
            </Box>

            <Box pb={"10px"}>
              <Input
                // py={"20px"}
                id="details_text"
                variant={"flushed"}
                placeholder="Property description :"
                onChange={inputHandler}
              />
            </Box>

            <Select
              id="province"
              placeholder="Province"
              variant={"flushed"}
              // value={provinceId}
              onChange={(e) => {
                setProvinceId(e.target.value.split("/")[1]);
                formik.setFieldValue("province", e.target.value.split("/")[0]);
              }}
            >
              {provinces &&
                provinces.map((val) => (
                  <option
                    key={val.province_id}
                    value={`${val.province}/${val.province_id}`}
                  >
                    {val.province}
                  </option>
                ))}
            </Select>

            <Select
              placeholder="City"
              variant={"flushed"}
              fontFamily={`'Barlow', sans-serif`}
              fontSize={"1em"}
              id="city_id"
              onChange={(e) => {
                inputHandler(e);
              }}
            >
              {cities?.map((city) => (
                <option value={city.city_id}>{city.city_name}</option>
              ))}
            </Select>

            <Box pb={"10px"}>
              <Input
                multiple
                type="file"
                accept="image/png, image/jpeg"
                variant={"flushed"}
                onChange={handleImageChange}
              />
              {selectedImages.length ? (
                <Flex flexDir={"column"} borderColor={"#E6EBF2"} gap={1}>
                  {selectedImages.map((imageUrl, index) => (
                    <Image
                      key={index}
                      src={imageUrl}
                      alt={`Product Image ${index + 1}`}
                    />
                  ))}
                </Flex>
              ) : null}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
