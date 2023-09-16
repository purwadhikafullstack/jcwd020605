import {
  Box,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Link,
  Text,
  Flex,
  IconButton,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Avatar,
  Grid,
  Image,
  Menu,
  MenuButton,
  Divider,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiHomeModern } from "react-icons/hi2";
import { AiOutlineDollarCircle, AiOutlineLeft } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineBedroomChild, MdApartment } from "react-icons/md";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { BiLogOutCircle, BiDotsHorizontalRounded } from "react-icons/bi";
import { useState } from "react";
import { BsList, BsCheckCircleFill } from "react-icons/bs";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GoBookmarkSlash } from "react-icons/go";
import { IoReorderThree } from "react-icons/io5";
import { GiModernCity } from "react-icons/gi";
import { AiOutlineRight } from "react-icons/ai";
import { FaBed } from "react-icons/fa6";
import { useEffect } from "react";
import { api } from "../api/api";
import bgContent from "../assets/bgcontent.jpg";
import { motion } from "framer-motion";
import FooterLandingPage from "./footerLandingPage";

export default function DashboardTenant() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userSelector = useSelector((state) => state.auth);
  const [selectedDate, setSelectedDate] = useState(null);
  const [date1, setDate1] = useState(new Date());
  const calendar1 = useDisclosure();
  const onChangeDate1 = (date) => {
    setDate1(date);
  };

  const [orderData, setOrderData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [roomLength, setRoomLength] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchOrderData();
    fetchProperyData();
    fetchRoomData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const status = "DONE";
      const res = await api.get(`/order/done`, {
        params: {
          status,
        },
      });
      setOrderData(res.data.orders);
      setTotalAmount(res.data.totalAmount);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRoomData = async () => {
    try {
      const res = await api.get("/room");
      setRoomLength(res.data.roomData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProperyData = async () => {
    try {
      const res = await api.get(`/properties/propertieslist`);
      setProperties(res.data.property);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box
        h={"100vh"}
        bgColor={"#edf2f9"}
        display={{ base: "none", lg: "flex" }}
        flexDir={"column"}
      >
        {/* Navbar + sidebar */}
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
          {/* navbar */}
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
                <Link _hover={{ color: "#ab854f" }}>Report</Link>
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

        {/* title */}
        <Box py={"5%"}>
          <Flex
            // pt={"4em"}
            flexDir={"column"}
            pos={"relative"}
            h={"20vh"}
            align={"center"}
            transition="transform 0.5s ease"
            _hover={{ transform: "translateX(-10px)" }}
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
                transition={{ duration: 0.5, delay: 1 }}
              >
                Dashboard
              </motion.div>
            </Text>
          </Flex>
        </Box>

        <Box>
          <Box
            display={{ base: "none", lg: "flex" }}
            fontSize={"3em"}
            flexDir={"column"}
            pl={"10%"}
            textTransform={"uppercase"}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              Welcome, {userSelector.first_name} !
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 3 }}
            >
              <Text fontSize={"15px"} color={"grey"}>
                Don't forget to check your activity!
              </Text>
            </motion.div>
          </Box>
        </Box>

        {/* data */}
        <Flex
          p={"0.5em"}
          mt={"1em"}
          display={{ base: "none", lg: "flex" }}
          flexDir={"column"}
          bgColor={"#edf2f9"}
          align={"center"}
        >
          <Flex w={"40%"} flexDir={"column"} gap={"2em"}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 4 }}
            >
              <Box
                transition="transform 0.5s ease"
                _hover={{ transform: "translateX(-20px)" }}
                p={"0.5em"}
                w={"55%"}
                borderRadius={"0.5em"}
                boxShadow={"md"}
              >
                <Flex
                  flex={4}
                  textTransform={"uppercase"}
                  fontSize={"1.5em"}
                  fontWeight={"bold"}
                  color={"grey"}
                  align={"center"}
                  gap={"0.5em"}
                >
                  <Icon
                    as={FaMoneyBillAlt}
                    color={"green"}
                    fontSize={"1.7em"}
                  />
                  Total Earnings
                </Flex>
                <Text fontWeight={"bold"} color={"black"} fontSize={"2.7em"}>
                  {totalAmount?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </Text>
                <Link
                  href="/report"
                  fontWeight={"bold"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  View Detail <Icon as={AiOutlineRight} fontSize={"15px"} />
                </Link>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 5 }}
            >
              <Flex justifyContent={"right"}>
                <Box
                  transition="transform 0.5s ease"
                  _hover={{ transform: "translateX(20px)" }}
                  p={"0.5em"}
                  borderRadius={"0.5em"}
                  mt={"1em"}
                  w={"55%"}
                  boxShadow={"md"}
                >
                  <Flex
                    flex={4}
                    flexDir={"column"}
                    textTransform={"uppercase"}
                    fontSize={"1.5em"}
                    fontWeight={"bold"}
                    color={"grey"}
                    textAlign={"right"}
                  >
                    <Flex
                      justifyContent={"right"}
                      align={"center"}
                      gap={"0.1em"}
                    >
                      <Icon
                        as={IoReorderThree}
                        fontSize={"1.8em"}
                        color={"red.500"}
                      />
                      Total Order
                    </Flex>
                  </Flex>
                  <Text
                    fontWeight={"bold"}
                    color={"black"}
                    fontSize={"2.7em"}
                    textAlign={"right"}
                  >
                    {orderData.length} Orders
                  </Text>
                  <Link
                    href="/report"
                    fontWeight={"bold"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    View Detail <Icon as={AiOutlineRight} fontSize={"15px"} />
                  </Link>
                </Box>
              </Flex>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 6 }}
            >
              <Box
                transition="transform 0.5s ease"
                _hover={{ transform: "translateX(-20px)" }}
                p={"0.5em"}
                w={"55%"}
                mt={"1em"}
                borderRadius={"0.5em"}
                boxShadow={"md"}
              >
                <Flex
                  flex={4}
                  textTransform={"uppercase"}
                  fontSize={"1.5em"}
                  fontWeight={"bold"}
                  color={"grey"}
                  align={"center"}
                  gap={"0.5em"}
                >
                  <Icon
                    as={GiModernCity}
                    color={"brown.500"}
                    fontSize={"1.4em"}
                  />
                  Total Property
                </Flex>
                <Text fontWeight={"bold"} color={"black"} fontSize={"2.7em"}>
                  {properties.length} Properties
                </Text>
                <Link
                  href="/propertiestenant"
                  fontWeight={"bold"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  View Detail <Icon as={AiOutlineRight} fontSize={"15px"} />
                </Link>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 7 }}
            >
              <Flex justifyContent={"right"}>
                <Box
                  transition="transform 0.5s ease"
                  _hover={{ transform: "translateX(20px)" }}
                  p={"0.5em"}
                  borderRadius={"0.5em"}
                  mt={"1em"}
                  w={"55%"}
                  boxShadow={"md"}
                >
                  <Flex
                    flex={4}
                    flexDir={"column"}
                    textTransform={"uppercase"}
                    fontSize={"1.5em"}
                    fontWeight={"bold"}
                    color={"grey"}
                    textAlign={"right"}
                  >
                    <Flex
                      justifyContent={"right"}
                      align={"center"}
                      gap={"0.5em"}
                    >
                      <Icon as={FaBed} color={"blue.500"} fontSize={"1.6em"} />
                      Total Rooms
                    </Flex>
                  </Flex>
                  <Text
                    fontWeight={"bold"}
                    color={"black"}
                    fontSize={"2.7em"}
                    textAlign={"right"}
                  >
                    {orderData.length} Rooms
                  </Text>
                  <Link
                    href="/roompropertiestenant"
                    fontWeight={"bold"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    View Detail <Icon as={AiOutlineRight} fontSize={"15px"} />
                  </Link>
                </Box>
              </Flex>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 8 }}
            >
              <Box
                transition="transform 0.5s ease"
                _hover={{ transform: "translateX(-20px)" }}
                p={"0.5em"}
                w={"55%"}
                mt={"1em"}
                borderRadius={"0.5em"}
                boxShadow={"md"}
              >
                <Flex
                  flex={4}
                  textTransform={"uppercase"}
                  fontSize={"1.5em"}
                  fontWeight={"bold"}
                  color={"grey"}
                  align={"center"}
                  gap={"0.5em"}
                >
                  <Icon
                    as={BsCheckCircleFill}
                    color={"green"}
                    fontSize={"1.5em"}
                  />
                  Available Rooms
                </Flex>
                <Text fontWeight={"bold"} color={"black"} fontSize={"2.7em"}>
                  {roomLength.length - orderData.length} Available
                </Text>
                <Link
                  href="/roompropertiestenant"
                  fontWeight={"bold"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  View Detail <Icon as={AiOutlineRight} fontSize={"15px"} />
                </Link>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 9 }}
            >
              <Flex justifyContent={"right"} mb={"3em"}>
                <Box
                  transition="transform 0.5s ease"
                  _hover={{ transform: "translateX(20px)" }}
                  p={"0.5em"}
                  borderRadius={"0.5em"}
                  mt={"1em"}
                  w={"55%"}
                  boxShadow={"md"}
                >
                  <Flex
                    flex={4}
                    flexDir={"column"}
                    textTransform={"uppercase"}
                    fontSize={"1.5em"}
                    fontWeight={"bold"}
                    color={"grey"}
                    textAlign={"right"}
                  >
                    <Flex
                      justifyContent={"right"}
                      align={"center"}
                      gap={"0.5em"}
                    >
                      <Icon
                        as={GoBookmarkSlash}
                        fontSize={"1.8em"}
                        color={"yellow.500"}
                      />
                      Booked Rooms
                    </Flex>
                  </Flex>
                  <Text
                    fontWeight={"bold"}
                    color={"black"}
                    fontSize={"2.7em"}
                    textAlign={"right"}
                  >
                    {orderData.length} Rooms
                  </Text>
                  <Link
                    href="/roompropertiestenant"
                    fontWeight={"bold"}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    View Detail <Icon as={AiOutlineRight} fontSize={"15px"} />
                  </Link>
                </Box>
              </Flex>
            </motion.div>
          </Flex>
        </Flex>

        <FooterLandingPage></FooterLandingPage>
      </Box>
    </>
  );
}
