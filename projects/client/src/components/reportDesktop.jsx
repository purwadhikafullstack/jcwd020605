import {
  Box,
  useDisclosure,
  Text,
  Link,
  Flex,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Avatar,
  Image,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tfoot,
  Button,
  InputGroup,
  Input,
  InputRightAddon,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiHomeModern } from "react-icons/hi2";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { BiLogOutCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import { MdOutlineBedroomChild, MdApartment } from "react-icons/md";
import "@fontsource/barlow";
import FooterLandingPage from "./footerLandingPage";
import Pagination from "./Pagination";
import bgContent from "../assets/bgcontent.jpg";
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

export default function ReportDesktop() {
  const userSelector = useSelector((state) => state.auth);
  const [orderData, setOrderData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const [datesRange, setDatesRange] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
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
        display={{ base: "none", lg: "flex" }}
        flexDir={"column"}
        bgColor={"#edf2f9"}
        h={"100vh"}
      >
        {/* navbar + sidebar + profile */}
        <Box
          display={{ base: "none", lg: "flex" }}
          alignItems={"center"}
          justifyContent={"space-between"}
          px={"0.5em"}
          w={"100%"}
          p={"0.5em"}
          bgColor={"#edf2f9"}
          pos={"fixed"}
          zIndex={3}
        >
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

          <Flex gap={"1.5em"}>
            {/* navigation */}
            <Flex
              textTransform={"uppercase"}
              fontFamily={`'Barlow Condensed', sans-serif`}
              letterSpacing={"2px"}
              fontSize={"15px"}
              gap={"3em"}
              color={"#5e6e82"}
            >
              <Flex align={"center"} gap={"1em"} _hover={{ color: "#ab854f" }}>
                <Icon as={LuLayoutDashboard} />
                <Link _hover={{ color: "#ab854f" }}>Dashboard</Link>
              </Flex>

              <Flex align={"center"} gap={"1em"} _hover={{ color: "#ab854f" }}>
                <Icon as={HiHomeModern} />
                <Link _hover={{ color: "#ab854f" }} href="/propertiestenant">
                  Property
                </Link>
              </Flex>

              <Flex align={"center"} gap={"1em"} _hover={{ color: "#ab854f" }}>
                <Icon as={MdOutlineBedroomChild} />
                <Link
                  _hover={{ color: "#ab854f" }}
                  href="/roompropertiestenant"
                >
                  Room
                </Link>
              </Flex>

              <Flex align={"center"} gap={"1em"} _hover={{ color: "#ab854f" }}>
                <Icon as={AiOutlineDollarCircle} />
                <Link _hover={{ color: "#ab854f" }}>Transaction</Link>
              </Flex>

              <Flex align={"center"} gap={"1em"} _hover={{ color: "#ab854f" }}>
                <Icon as={TbReportAnalytics} />
                <Link _hover={{ color: "#ab854f" }} href="/report">
                  Report
                </Link>
              </Flex>
            </Flex>

            {/* avatar profile */}
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
          </Flex>
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
                Report
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

        {/* filter */}
        <Flex justifyContent={"center"} align={"center"} py={"2em"}>
          <Flex w={"90%"} gap={"1em"}>
            {/* order date */}
            <Select
              bgColor={"white"}
              color={"gray"}
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
              bgColor={"white"}
              color={"gray"}
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
              w={"100%"}
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
            <InputGroup>
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
                <Th textAlign={"center"}>Revenue</Th>
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
                  <Td textAlign={"center"}>
                    {val?.Room?.main_price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th
                  colSpan={4}
                  textAlign={"center"}
                  borderRight={"1px solid #dbdbdb"}
                  borderTop={"1px solid #dbdbdb"}
                >
                  Total Amount
                </Th>
                <Th
                  colSpan={2}
                  borderTop={"1px solid #dbdbdb"}
                  textAlign={"center"}
                >
                  {totalAmount.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        </Flex>

        <Pagination data={{ totalPage, handlePageClick }} />

        <FooterLandingPage></FooterLandingPage>
      </Box>
    </>
  );
}
