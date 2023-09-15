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
  // Image,
  Icon,
  Select,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Image } from "react-bootstrap";
import paymentproof from "../assets/payment.png";

export default function OrderDetail(props) {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState();
  const [update, setUpdate] = useState();
  const toast = useToast();
  const imageUrl = orderData?.payment_proof
    ? `${process?.env?.REACT_APP_API_BASE_URL}${orderData?.payment_proof}`
    : paymentproof;

  const orderDataByID = async () => {
    try {
      const res = await api.get("/orderbyid/" + props.id);
      setOrderData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const confirmOrReject = async (status) => {
    try {
      const res = await api.post("/order/confirmorreject", status);
      setUpdate(res.data);
      console.log(res?.data);
      if (res.data === "Rejected success") {
        toast({
          title: res.data,
          status: "warning",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      } else if (res.data === "Cancel success") {
        toast({
          title: res.data,
          status: "info",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: res.data,
          description: "We've send email to you",
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      }
      props.fetch();
      props.onClose();
    } catch (error) {
      toast({
        title: error?.response?.data,
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    orderDataByID();
  }, [props.id]);

  return (
    <>
      <Modal size={"sm"} isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader display={"flex"} justifyContent={"center"}>
            Order details
          </ModalHeader>
          <ModalBody
            display={"flex"}
            flexDir={"column"}
            gap={"10px"}
            fontSize={"18px"}
            fontWeight={"bold"}
          >
            <Box>
              <Image src={imageUrl}></Image>
            </Box>

            <Box>
              <Text fontSize={"12px"}>Property Name :</Text>
              {orderData?.Property?.property_name}
            </Box>

            <Box>
              <Text fontSize={"12px"}>Room type :</Text>
              {orderData?.Room?.room_name}
            </Box>

            <Box>
              <Text fontSize={"12px"}>Room price :</Text>
              {orderData?.Room?.main_price}
            </Box>

            <Box>
              <Text fontSize={"12px"}>Username :</Text>
              {orderData?.User?.first_name}
            </Box>

            <Box>
              <Text fontSize={"12px"}>Email :</Text>
              {orderData?.User?.email}
            </Box>

            <Box>
              <Text fontSize={"12px"}>Order Date :</Text>
              {moment(orderData?.createdAt).format("DD MMM YYYY, HH:MM")}
            </Box>

            <Box>
              <Text fontSize={"12px"}>No invoice :</Text>
              {orderData?.no_invoice}
            </Box>

            <Box>
              <Text fontSize={"12px"}>Status :</Text>
              {orderData?.status}
            </Box>
          </ModalBody>
          <ModalFooter
            alignContent={"center"}
            display={"flex"}
            flexDir={"column"}
            gap={"1em"}
          >
            <Flex w={"100%"} justify={"space-around"}>
              <Button
                w={"48%"}
                onClick={() => {
                  const shouldReject = window.confirm(
                    "Foto bukti pembayaran juga akan dihapus, yakin?"
                  );
                  if (shouldReject) {
                    confirmOrReject({ status: "PAYMENT", id: props.id });
                  }
                }}
                value="PAYMENT"
              >
                Reject
              </Button>

              <Button
                w={"48%"}
                isLoading={isLoading}
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    confirmOrReject({ status: "PROCESSING", id: props.id });
                  }, 3000);
                }}
                value="PROCESSING"
              >
                Confirm
              </Button>
            </Flex>

            <Flex w={"100%"}>
              <Button
                w={"100%"}
                colorScheme="red"
                onClick={() => {
                  const shouldReject = window.confirm(
                    "Apakah Anda yakin ingin menolak pesanan ini?"
                  );
                  if (shouldReject) {
                    confirmOrReject({ status: "CANCELED", id: props.id });
                  }
                }}
                value="CANCELED"
              >
                Cancel Order
              </Button>
            </Flex>

            <Box>The Cappa</Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
