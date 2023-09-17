import {
  Box,
  useDisclosure,
  Text,
  Flex,
  Icon,
  Grid,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { BsList, BsFillPersonFill } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiHomeModern } from "react-icons/hi2";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import {
  BiLogOutCircle,
  BiDotsHorizontalRounded,
  BiSolidUser,
} from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { CgDetailsMore } from "react-icons/cg";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { GrStatusInfo } from "react-icons/gr";
import { MdOutlineBedroomChild, MdApartment } from "react-icons/md";
import OrderDetail from "./orderDetail";
import Pagination from "./Pagination";

import "@fontsource/barlow";
import FooterLandingPage from "./footerLandingPage";
import bgContent from "../assets/bgcontent.jpg";
import PropertyDetail from "./propertyDetail";
import "@fontsource/barlow";
import "@fontsource/gilda-display";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import "../styles/sliderLocation.css";
import "../styles/sliderCard.css";
import { motion } from "framer-motion";
import { api } from "../api/api";
import moment from "moment";
import NavbarMobile from "./navbarMobile";

export default function Transaction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const orderDetails = useDisclosure();
  const userSelector = useSelector((state) => state.auth);
  const [orderData, setOrderData] = useState();
  const [filter, setFilter] = useState({
    status: "",
  });
  const [orderId, setOrderId] = useState();

  const [totalPage, setTotalPage] = useState(0);
  const [id, setId] = useState(userSelector.id);
  const [page, setPage] = useState(0);
  const handlePageClick = (data) => {
    setPage(data.selected);
  };

  useEffect(() => {
    fetchOrderData(filter);
  }, [filter]);

  const fetchOrderData = async (filter) => {
    try {
      const res = await api.get(`/order?page=${page}`, {
        params: { filter: filter, id: id },
      });
      setOrderData(res.data.userOrders);
      setTotalPage(res.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        display={{ base: "flex", lg: "none" }}
        flexDir={"column"}
        bgColor={"#edf2f9"}
        h={"100vh"}
      >
        {/* navbar + sidebar + profile */}
        <NavbarMobile></NavbarMobile>

        {/* bg */}
        <Box py={"5%"} pt={"4em"}>
          <Flex flexDir={"column"} pos={"relative"} h={"30vh"} align={"center"}>
            <Image
              src={bgContent}
              pos={"absolute"}
              objectFit={"cover"}
              h={"100%"}
              w={"90%"}
              boxShadow={"lg"}
              borderRadius={"1em"}
            />
            <Text
              color={"#2c7be5"}
              pos={"absolute"}
              display={"flex"}
              alignItems={"center"}
              gap={"2%"}
              h={"100%"}
              w={"95%"}
              justifyContent={"center"}
              fontSize={{ base: "1.5em", lg: "3em" }}
              fontFamily={`'Gilda Display', sans-serif`}
              textAlign={"center"}
              fontWeight={"bold"}
              transition="transform 0.5s ease"
              _hover={{ transform: "translateX(20px)" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Your
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                Order
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                List
              </motion.div>
            </Text>
          </Flex>
        </Box>

        {/* orderList */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} // Efek muncul dari bawah
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            bgColor={"#edf2f9"}
            w={"100%"}
            pt={"2em"}
          >
            <Text
              fontSize={"20px"}
              display={"flex"}
              w={"90%"}
              justifyContent={"center"}
              fontFamily={`'Barlow', sans-serif`}
              py={"1em"}
              bgColor={"white"}
              borderRadius={"5px"}
              fontWeight={"bold"}
              border={"1px solid #dbdbdb"}
              boxShadow={"md"}
              transition="transform 0.5s ease"
              _hover={{ transform: "translateY(-10px)" }}
            >
              Order List
            </Text>
          </Box>
        </motion.div>

        {/* filter */}
        <Flex justifyContent={"center"} align={"center"} mt={"1em"}>
          <Select
            w={"90%"}
            bgColor={"white"}
            onChange={(e) => {
              const selectedStatus = e.target.value;
              setFilter((prevFilter) => ({
                ...prevFilter,
                status: selectedStatus,
              }));
            }}
            value={filter?.status}
          >
            <option value="">Order status</option>
            <option value="PAYMENT">PAYMENT</option>
            <option value="CONFIRM_PAYMENT">CONFIRM_PAYMENT</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="CANCELED">CANCELED</option>
            <option value="DONE">DONE</option>
          </Select>
        </Flex>

        {/* card */}
        <Grid
          templateColumns="repeat(1, 1fr)"
          gap={10}
          mt={"1em"}
          pb={"2em"}
          bgColor={"#edf2f9"}
        >
          {orderData?.map((val) => (
            <Box align={"center"} bgColor={"#edf2f9"}>
              <Box
                w={"90%"}
                bgColor={"white"}
                borderRadius={"md"}
                border={"1px solid #dbdbdb"}
                boxShadow={"md"}
                fontFamily={`'Barlow', sans-serif`}
                transition="transform 0.5s ease"
                _hover={{ transform: "translateY(-10px)" }}
              >
                <Box
                  pr={1}
                  display={"flex"}
                  w={"100%"}
                  justifyContent={"right"}
                >
                  <Menu>
                    <MenuButton>
                      <Image as={BiDotsHorizontalRounded} boxSize={7} />
                    </MenuButton>
                    <MenuList minW={"100px"}>
                      <MenuItem
                        onClick={() => {
                          orderDetails.onOpen();
                          setOrderId(val?.id);
                        }}
                        display={"flex"}
                        gap={"10px"}
                      >
                        <Icon as={CgDetailsMore} />
                        Details
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>

                <Box>
                  <Box display={"flex"} w={"90%"}>
                    <Flex
                      flex={1}
                      flexDir={"column"}
                      textAlign={"left"}
                      gap={"1em"}
                      textTransform={"uppercase"}
                    >
                      <Text
                        display={"flex"}
                        flexDir={"column"}
                        fontSize={"1.2em"}
                        justifyContent={"center"}
                      >
                        <Flex align={"center"} gap={"0.5em"}>
                          <Icon as={FaFileInvoiceDollar} />
                          No.Invoice
                        </Flex>
                        <Box fontSize={"0.6em"} pl={"2.5em"}>
                          {val?.no_invoice}
                        </Box>
                      </Text>

                      <Text
                        display={"flex"}
                        flexDir={"column"}
                        fontSize={"1.2em"}
                        justifyContent={"center"}
                      >
                        <Flex align={"center"} gap={"0.5em"}>
                          <Icon as={HiHomeModern} />
                          Property
                        </Flex>
                        <Box fontSize={"0.6em"} pl={"2.5em"}>
                          {val?.Property?.property_name}
                        </Box>
                      </Text>

                      <Text
                        display={"flex"}
                        flexDir={"column"}
                        fontSize={"1.2em"}
                        justifyContent={"center"}
                      >
                        <Flex align={"center"} gap={"0.5em"}>
                          <Icon as={BiSolidUser} />
                          Username
                        </Flex>
                        <Box fontSize={"0.6em"} pl={"2.5em"}>
                          {val?.User?.first_name}
                        </Box>
                      </Text>

                      <Text
                        display={"flex"}
                        flexDir={"column"}
                        fontSize={"1.2em"}
                        justifyContent={"center"}
                      >
                        <Flex align={"center"} gap={"0.5em"}>
                          <Icon as={GrStatusInfo} />
                          Status
                        </Flex>
                        <Box fontSize={"0.6em"} pl={"2.5em"}>
                          {val?.status}
                        </Box>
                      </Text>

                      <Text
                        display={"flex"}
                        flexDir={"column"}
                        fontSize={"1.2em"}
                        justifyContent={"center"}
                        mb={"0.5em"}
                      >
                        <Flex align={"center"} gap={"0.5em"}>
                          <Icon as={BsFillCalendar2DateFill} />
                          Order Date
                        </Flex>
                        <Box fontSize={"0.6em"} pl={"2.5em"}>
                          {moment(val?.createdAt).format("DD MMM YYYY, HH:MM")}
                        </Box>
                      </Text>
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>
        <OrderDetail
          isOpen={orderDetails.isOpen}
          onClose={() => {
            orderDetails.onClose();
            setOrderId("");
          }}
          id={orderId}
          fetch={fetchOrderData}
        />
        <Pagination data={{ totalPage, handlePageClick }} />

        <FooterLandingPage></FooterLandingPage>
      </Box>
    </>
  );
}
