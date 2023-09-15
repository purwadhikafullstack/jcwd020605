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
  InputGroup,
  Input,
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
  BiMoney,
} from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { CgDetailsMore } from "react-icons/cg";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FcMoneyTransfer } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";

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
import { RangeDatepicker } from "chakra-dayzed-datepicker";

export default function Report() {
  const userSelector = useSelector((state) => state.auth);
  const [orderData, setOrderData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const [datesRange, setDatesRange] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const handlePageClick = (data) => {
    setPage(data.selected);
  };
  const [filter, setFilter] = useState({
    sort: "",
    order: "",
  });
  const [search, setSearch] = useState();
  useEffect(() => {
    fetchOrderData();
  }, [filter, datesRange, search, page]);

  const fetchOrderData = async () => {
    try {
      let startDate = datesRange[0]
        ? new Date(
            datesRange[0].getTime() - datesRange[0].getTimezoneOffset() * 60000
          ).toISOString()
        : null;
      let endDate = datesRange[1]
        ? new Date(
            datesRange[1].getTime() - datesRange[1].getTimezoneOffset() * 60000
          ).toISOString()
        : null;
      const status = "DONE";
      const res = await api.get(`/order/done?page=${page}`, {
        params: {
          status,
          filter,
          startDate,
          endDate,
          search,
        },
      });
      setOrderData(res.data.orders);
      setTotalPage(res.data.totalPage);
      setTotalAmount(res.data.totalAmount);
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
        <Box
          display={{ base: "flex", lg: "none" }}
          alignItems={"center"}
          justifyContent={"space-between"}
          px={"0.5em"}
          w={"100%"}
          p={"0.5em"}
          bgColor={"#edf2f9"}
          pos={"fixed"}
          zIndex={3}
        >
          <IconButton
            aria-label="Open Menu"
            icon={<BsList />}
            size="md"
            fontSize={"25px"}
            color={"black"}
            variant="none"
            display={{ base: "flex", lg: "none" }}
            onClick={onOpen}
          />

          <Box
            display={"block"}
            textAlign={"center"}
            textTransform={"uppercase"}
            fontFamily={`'Gilda Display', sans-serif`}
          >
            <Text fontSize={"20px"} letterSpacing={"1px"} color={"#ab854f"}>
              The Cappa
            </Text>
            <Text fontSize={"10px"} letterSpacing={"3px"} color={"black"}>
              Luxury Hotel
            </Text>
          </Box>

          <Box pr={"0.5em"}>
            <Popover>
              <PopoverTrigger>
                <Avatar size={"sm"}></Avatar>
              </PopoverTrigger>
              <PopoverContent
                w={"100%"}
                textAlign={"center"}
                mt={"1em"}
                border={"1px solid #dbdbdb"}
              >
                <PopoverArrow />
                <PopoverHeader>{userSelector?.first_name}</PopoverHeader>
                <PopoverBody
                  display={"flex"}
                  alignItems={"center"}
                  gap={"0.8em"}
                >
                  <Icon as={CgProfile} /> Profile
                </PopoverBody>
                <PopoverFooter
                  display={"flex"}
                  alignItems={"center"}
                  gap={"0.8em"}
                >
                  <Icon as={BiLogOutCircle} /> LogOut
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </Box>

          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>
                <Box
                  display={"block"}
                  textAlign={"left"}
                  textTransform={"uppercase"}
                  fontFamily={`'Gilda Display', sans-serif`}
                >
                  <Text
                    fontSize={"25px"}
                    letterSpacing={"1px"}
                    color={"#ab854f"}
                  >
                    The Cappa
                  </Text>
                  <Text fontSize={"11px"} letterSpacing={"3px"} color={"black"}>
                    Luxury Hotel
                  </Text>
                </Box>
              </DrawerHeader>
              <DrawerBody>
                <Flex
                  direction="column"
                  textTransform={"uppercase"}
                  fontFamily={`'Barlow Condensed', sans-serif`}
                  letterSpacing={"2px"}
                  fontSize={"15px"}
                  gap={"3em"}
                  mt={"2em"}
                  color={"#5e6e82"}
                >
                  <Flex
                    align={"center"}
                    gap={"1em"}
                    _hover={{ color: "#ab854f" }}
                  >
                    <Icon as={LuLayoutDashboard} />
                    <Link _hover={{ color: "#ab854f" }}>Dashboard</Link>
                  </Flex>

                  <Flex
                    align={"center"}
                    gap={"1em"}
                    _hover={{ color: "#ab854f" }}
                  >
                    <Icon as={HiHomeModern} />
                    <Link
                      _hover={{ color: "#ab854f" }}
                      href="/propertiestenant"
                    >
                      Property
                    </Link>
                  </Flex>

                  <Flex
                    align={"center"}
                    gap={"1em"}
                    _hover={{ color: "#ab854f" }}
                  >
                    <Icon as={MdOutlineBedroomChild} />
                    <Link
                      _hover={{ color: "#ab854f" }}
                      href="/roompropertiestenant"
                    >
                      Room
                    </Link>
                  </Flex>

                  <Flex
                    align={"center"}
                    gap={"1em"}
                    _hover={{ color: "#ab854f" }}
                  >
                    <Icon as={AiOutlineDollarCircle} />
                    <Link _hover={{ color: "#ab854f" }}>Transaction</Link>
                  </Flex>

                  <Flex
                    align={"center"}
                    gap={"1em"}
                    _hover={{ color: "#ab854f" }}
                  >
                    <Icon as={TbReportAnalytics} />
                    <Link _hover={{ color: "#ab854f" }}>Report</Link>
                  </Flex>
                </Flex>
              </DrawerBody>
              <DrawerFooter justifyContent={"left"}>
                <Flex align={"center"} gap={"1em"}>
                  <Icon as={BiLogOutCircle} />
                  <Link>Logout</Link>
                </Flex>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Box>
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
            pt={"4em"}
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
        <Flex
          justifyContent={"center"}
          align={"center"}
          mt={"1em"}
          flexDir={"column"}
          gap={"1em"}
        >
          {/* order date */}
          <Select
            w={"90%"}
            bgColor={"white"}
            onClick={() => {
              setDatesRange("");
            }}
            onChange={(e) => {
              const selectedSort = e.target.value;
              const [sort, order] = selectedSort.split(",");

              setFilter((prevFilter) => ({
                ...prevFilter,
                sort: sort,
                order: order,
              }));
            }}
          >
            <option value="">Sort by order date</option>
            <option value="desc,createdAt">Order date up</option>
            <option value="asc,createdAt">Order date down</option>
          </Select>
          {/* revenue */}
          <Select
            w={"90%"}
            bgColor={"white"}
            onClick={() => {
              setDatesRange("");
            }}
            onChange={(e) => {
              const selectedSortBy = e.target.value;
              const [sort, order] = selectedSortBy.split(",");
              setFilter((prevFilter) => ({
                ...prevFilter,
                sort: sort,
                order: order,
              }));
            }}
          >
            <option value="">Sort by Revenue</option>
            <option value="desc,mainPrice">Revenue up</option>
            <option value="asc,mainPrice">Revenue down</option>
          </Select>

          {/* date range */}
          <Box
            cursor={"pointer"}
            w={"90%"}
            bgColor={"white"}
            borderRadius={"10%"}
            onClick={() => {
              setFilter("");
            }}
          >
            <RangeDatepicker
              selectedDates={datesRange}
              onDateChange={setDatesRange}
              closeOnSelect={true}
              propsConfigs={{
                inputProps: {
                  placeholder: "Date Range",
                },
              }}
              configs={{
                dateFormat: "dd/MM/yyyy",
              }}
            />
          </Box>

          {/* search */}
          <InputGroup w={"90%"}>
            <Input
              bgColor={"white"}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search..."
              color={"gray"}
              onClick={() => {
                setFilter("");
                setDatesRange("");
              }}
            />
          </InputGroup>
        </Flex>

        <Flex justify={"center"}>
          <Flex align={"center"} mt={"1.5em"} w={"90%"} gap={"0.5em"}>
            <Icon as={FcMoneyTransfer} display={"flex"} fontSize={"1.5em"} />
            <Box
              w={"100%"}
              fontSize={"30px"}
              fontFamily={`'Barlow Condensed', sans-serif`}
              textTransform={"uppercase"}
            >
              Total Revenue
              <Box fontStyle={"italic"} fontSize={"20px"} color={"green.700"}>
                {totalAmount?.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </Box>
            </Box>
          </Flex>
        </Flex>

        {/* card */}
        <Grid
          templateColumns="repeat(1, 1fr)"
          gap={10}
          mt={"2em"}
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
                <Box>
                  <Box display={"flex"} w={"90%"}>
                    <Flex
                      flex={1}
                      textAlign={"left"}
                      gap={"1em"}
                      py={"0.5em"}
                      textTransform={"uppercase"}
                    >
                      <Flex flexDir={"column"} flex={1} gap={"1em"}>
                        <Text
                          display={"flex"}
                          alignItems={"center"}
                          fontSize={"1.2em"}
                          gap={"0.5em"}
                        >
                          <Icon as={FaFileInvoiceDollar} />
                          <Box
                            w={"100%"}
                            borderLeft={"2px solid #dbdbdb"}
                            pl={"0.3em"}
                          >
                            No.Invoice
                            <Box
                              fontSize={"0.6em"}
                              pt={"0.5em"}
                              borderTop={"2px solid #dbdbdb"}
                            >
                              {val?.no_invoice}
                            </Box>
                          </Box>
                        </Text>

                        <Text
                          display={"flex"}
                          alignItems={"center"}
                          fontSize={"1.2em"}
                          gap={"0.5em"}
                        >
                          <Icon as={HiHomeModern} />
                          <Box
                            w={"100%"}
                            borderLeft={"2px solid #dbdbdb"}
                            pl={"0.3em"}
                          >
                            Property
                            <Box
                              fontSize={"0.6em"}
                              pt={"0.5em"}
                              borderTop={"2px solid #dbdbdb"}
                            >
                              {val?.Property?.property_name}
                            </Box>
                          </Box>
                        </Text>

                        <Text
                          display={"flex"}
                          alignItems={"center"}
                          fontSize={"1.2em"}
                          gap={"0.5em"}
                        >
                          <Icon as={BiSolidUser} />
                          <Box
                            w={"100%"}
                            borderLeft={"2px solid #dbdbdb"}
                            pl={"0.3em"}
                          >
                            Username
                            <Box
                              fontSize={"0.6em"}
                              pt={"0.5em"}
                              borderTop={"2px solid #dbdbdb"}
                            >
                              {val?.User?.first_name}
                            </Box>
                          </Box>
                        </Text>
                      </Flex>

                      <Flex flexDir={"column"} flex={1} gap={"1em"}>
                        <Text
                          display={"flex"}
                          alignItems={"center"}
                          fontSize={"1.2em"}
                          gap={"0.5em"}
                        >
                          <Icon as={GrStatusInfo} />
                          <Box
                            w={"100%"}
                            borderLeft={"2px solid #dbdbdb"}
                            pl={"0.3em"}
                          >
                            Status
                            <Box
                              fontSize={"0.6em"}
                              pt={"0.5em"}
                              borderTop={"2px solid #dbdbdb"}
                            >
                              {val?.status}
                            </Box>
                          </Box>
                        </Text>

                        <Text
                          display={"flex"}
                          alignItems={"center"}
                          fontSize={"1.2em"}
                          gap={"0.5em"}
                        >
                          <Icon as={BsFillCalendar2DateFill} />
                          <Box
                            w={"100%"}
                            borderLeft={"2px solid #dbdbdb"}
                            pl={"0.3em"}
                          >
                            Order Date
                            <Box
                              fontSize={"0.6em"}
                              pt={"0.5em"}
                              borderTop={"2px solid #dbdbdb"}
                            >
                              {moment(val?.createdAt).format(
                                "DD MMM YYYY, HH:MM"
                              )}
                            </Box>
                          </Box>
                        </Text>

                        <Text
                          display={"flex"}
                          alignItems={"center"}
                          fontSize={"1.2em"}
                          gap={"0.5em"}
                        >
                          <Icon as={GiMoneyStack} />
                          <Box
                            w={"100%"}
                            borderLeft={"2px solid #dbdbdb"}
                            pl={"0.3em"}
                          >
                            Revenue
                            <Box
                              fontSize={"0.6em"}
                              pt={"0.5em"}
                              borderTop={"2px solid #dbdbdb"}
                            >
                              {val?.Room?.main_price.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })}
                            </Box>
                          </Box>
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>

        <Pagination data={{ totalPage, handlePageClick }} />
        <FooterLandingPage></FooterLandingPage>
      </Box>
    </>
  );
}
