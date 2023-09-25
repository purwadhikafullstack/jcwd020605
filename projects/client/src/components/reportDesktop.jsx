import {
  Box,
  Text,
  Flex,
  Image,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tfoot,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
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
import NavbarDesktop from "./navbarDesktop";

export default function ReportDesktop() {
  const userSelector = useSelector((state) => state.auth);
  const [orderData, setOrderData] = useState([]);
  console.log(orderData);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const [datesRange, setDatesRange] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [id, setId] = useState(userSelector.id);
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
          id,
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
                    {val?.username}
                  </Td>
                  <Td borderRight={"1px solid #dbdbdb"} textAlign={"center"}>
                    {val?.status}
                  </Td>
                  <Td borderRight={"1px solid #dbdbdb"} textAlign={"center"}>
                    {moment(val?.createdAt).format("DD MMM YYYY")}
                  </Td>
                  <Td textAlign={"center"}>
                    {val?.Room?.main_price?.toLocaleString("id-ID", {
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
                  {totalAmount
                    ? totalAmount?.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })
                    : 0}
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
