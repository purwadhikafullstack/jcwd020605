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
  Image,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
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
  const [provinceId, setProvinceId] = useState("");
  const { provinces } = useFetchProv();
  const { cities } = useFetchCity(provinceId);

  const formik = useFormik({
    initialValues: {
      property_name: "",
      details_text: "",
      province: "",
      city_id: "",
      tenant_id: "",
    },

    onSubmit: async () => {
      const formData = new FormData();
      formData.append("property_name", formik.values.property_name);
      formData.append("details_text", formik.values.details_text);
      formData.append("city_id", formik.values.city_id);
      formData.append("province", formik.values.province);
      formData.append("tenant_id", props.id);

      for (const files of selectedFiles) {
        formData.append("property_img", files);
      }
      try {
        await api
          .patch("/properties/" + props?.data?.id, formData)
          .then((res) => {
            toast({
              title: res.data.message,
              status: "success",
              position: "top",
              duration: 1000,
            });
            props.fetch();
            props.fetchProv();
            props.onClose();
          })
          .catch((error) => {
            console.log(error);
            toast({
              description: error.response.data,
              status: "error",
              duration: 2000,
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
  useEffect(() => {
    formik.setValues(props?.data);
    setProvinceId(props?.data?.city?.province_id || 0);
  }, [props?.data]);

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
              Edit Property
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
            <Box pb={"10px"}>
              <Input
                id="property_name"
                variant={"flushed"}
                defaultValue={formik?.values?.property_name}
                placeholder="Property Name : "
                onChange={inputHandler}
              />
            </Box>

            <Box pb={"10px"}>
              <Input
                id="details_text"
                variant={"flushed"}
                defaultValue={formik?.values?.details_text}
                placeholder="Property description :"
                onChange={inputHandler}
              />
            </Box>

            <Select
              id="province"
              placeholder="Province"
              variant={"flushed"}
              onChange={(e) => {
                setProvinceId(e.target.value.split("/")[1]);
                formik.setFieldValue("province", e.target.value.split("/")[0]);
              }}
            >
              {provinces &&
                provinces.map((val, idx) =>
                  formik?.values?.city?.province_id != val.province_id ? (
                    <option
                      key={val.province_id}
                      value={`${val.province}/${val.province_id}`}
                    >
                      {val.province}
                    </option>
                  ) : (
                    <option
                      selected
                      key={val.province_id}
                      value={val.province_id}
                    >
                      {val.province}
                    </option>
                  )
                )}
            </Select>

            <Select
              placeholder="City"
              variant={"flushed"}
              fontFamily={`'Barlow', sans-serif`}
              fontSize={"1em"}
              id="city_id"
              value={formik?.values?.city_id}
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
