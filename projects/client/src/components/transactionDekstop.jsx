import {
  Box,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Text,
  Link,
  Flex,
  IconButton,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Avatar,
  Grid,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
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
import { MdOutlineBedroomChild, MdApartment } from "react-icons/md";
import OrderDetail from "./orderDetail";
import "@fontsource/barlow";
import FooterLandingPage from "./footerLandingPage";
import Pagination from "./Pagination";
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
import NavbarDesktop from "./navbarDesktop";

export default function TransactionDekstop() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const orderDetails = useDisclosure();
  const userSelector = useSelector((state) => state.auth);
  const [orderData, setOrderData] = useState();
  const [filter, setFilter] = useState({
    status: "",
  });
  const [orderId, setOrderId] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const handlePageClick = (data) => {
    setPage(data.selected);
  };

  useEffect(() => {
    fetchOrderData(filter);
  }, [filter, page]);

  const fetchOrderData = async (filter) => {
    try {
      const res = await api.get(`/order?page=${page}`, {
        params: filter,
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
        display={{ base: "none", lg: "flex" }}
        flexDir={"column"}
        bgColor={"#edf2f9"}
        h={"100vh"}
      >
        {/* navbar + sidebar + profile */}
        <NavbarDesktop></NavbarDesktop>

        {/* bg */}
        <Box py={"5%"}>
          <Flex
            pt={"4em"}
            flexDir={"column"}
            pos={"relative"}
            h={"30vh"}
            align={"center"}
          >
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
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }} // Efek muncul dari bawah
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            bgColor={"#edf2f9"}
            w={"100%"}
            pt={"4em"}
          >
            <Text
              fontSize={"20px"}
              display={"flex"}
              w={"50%"}
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
        </motion.div> */}

        {/* filter */}
        <Flex justifyContent={"center"} align={"center"} py={"2em"}>
          <Select
            w={"50%"}
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

        <Flex justify={"center"} bgColor={"#edf2f9"}>
          <Table variant="simple" w={"90%"} boxShadow={"md"} bgColor={"white"}>
            <Thead>
              <Tr bgColor={"white"} textTransform={"uppercase"}>
                <Th textAlign={"center"} borderRight={"1px solid #dbdbdb"}>
                  No Invoice
                </Th>
                <Th textAlign={"center"} borderRight={"1px solid #dbdbdb"}>
                  Property Name
                </Th>
                <Th textAlign={"center"} borderRight={"1px solid #dbdbdb"}>
                  Customer
                </Th>
                <Th textAlign={"center"} borderRight={"1px solid #dbdbdb"}>
                  Status
                </Th>
                <Th textAlign={"center"} borderRight={"1px solid #dbdbdb"}>
                  Order Date
                </Th>
                <Th textAlign={"center"}>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orderData?.map((val) => (
                <Tr>
                  <Td borderRight={"1px solid #dbdbdb"} textAlign={"center"}>
                    {val?.no_invoice}
                  </Td>
                  <Td borderRight={"1px solid #dbdbdb"} textAlign={"center"}>
                    {val?.Property?.property_name}
                  </Td>
                  <Td borderRight={"1px solid #dbdbdb"} textAlign={"center"}>
                    {val?.User?.first_name}
                  </Td>
                  <Td borderRight={"1px solid #dbdbdb"} textAlign={"center"}>
                    {val?.status}
                  </Td>
                  <Td borderRight={"1px solid #dbdbdb"} textAlign={"center"}>
                    {moment(val?.createdAt).format("DD MMM YYYY")}
                  </Td>
                  <Td>
                    <Box
                      pr={1}
                      display={"flex"}
                      w={"100%"}
                      justifyContent={"center"}
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
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>

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
