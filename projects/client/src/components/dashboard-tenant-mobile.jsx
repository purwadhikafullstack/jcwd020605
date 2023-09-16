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
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Avatar,
  Select,
  Center,
  Image,
} from "@chakra-ui/react";

import { useState } from "react";
import { BsList, BsCheckCircleFill } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiHomeModern } from "react-icons/hi2";
import { AiOutlineDollarCircle, AiOutlineRight } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import { BiLogOutCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaBed } from "react-icons/fa6";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GoBookmarkSlash } from "react-icons/go";
import { IoReorderThree } from "react-icons/io5";
import { MdOutlineBedroomChild } from "react-icons/md";
import { GiModernCity } from "react-icons/gi";

import { useEffect } from "react";
import { api } from "../api/api";
import { useSelector } from "react-redux";
import { CiCalendarDate } from "react-icons/ci";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import FooterLandingPage from "./footerLandingPage";
import bgContent from "../assets/bgcontent.jpg";
import { motion } from "framer-motion";

export default function DashboardTenantMobile() {
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
        display={{ base: "flex", lg: "none" }}
        flexDir={"column"}
      >
        {/* navbar */}
        <Box
          display={{ base: "flex", lg: "none" }}
          alignItems={"center"}
          justifyContent={"space-between"}
          px={"0.5em"}
          mt={"0.5em"}
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
              <PopoverHeader>{userSelector.first_name}</PopoverHeader>
              <PopoverBody display={"flex"} alignItems={"center"} gap={"0.8em"}>
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
                      href="/propertiestenant"
                      _hover={{ color: "#ab854f" }}
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
        {/* title */}
        <Box py={"5%"}>
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
              h={"100%"}
              w={"95%"}
              justifyContent={"center"}
              fontSize={{ base: "1.5em", lg: "3em" }}
              fontFamily={`'Gilda Display', sans-serif`}
              textAlign={"center"}
              fontWeight={"bold"}
              transition="transform 0.5s ease"
              _hover={{ transform: "translateY(20px)" }}
            >
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, y: 10 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                Dashboard
              </motion.div>
            </Text>
          </Flex>
        </Box>

        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, y: 10 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <Box
            display={{ base: "flex", lg: "none" }}
            fontSize={"25px"}
            flexDir={"column"}
            pl={"0.5em"}
            mt={"1em"}
            textTransform={"uppercase"}
          >
            Welcome, {userSelector.first_name} !
            <Text fontSize={"15px"} color={"grey"}>
              Don't forget to check your activity!
            </Text>
          </Box>
        </motion.div>

        {/* total */}

        <Box
          p={"0.5em"}
          bgColor={"#edf2f9"}
          mt={"1em"}
          display={{ base: "flex", lg: "none" }}
          flexDir={"column"}
        >
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, y: 10 }}
            transition={{ duration: 0.5, delay: 3 }}
          >
            <Flex p={"0.5em"} borderRadius={"0.5em"} boxShadow={"md"}>
              <Flex
                flex={4}
                flexDir={"column"}
                textTransform={"uppercase"}
                fontSize={"11px"}
                fontWeight={"bold"}
                color={"grey"}
              >
                <Icon
                  as={FaMoneyBillAlt}
                  mb={"0.5em"}
                  color={"green"}
                  fontSize={"18px"}
                />
                <Text fontWeight={"bold"} color={"black"} fontSize={"15px"}>
                  {totalAmount?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </Text>
                Total Earnings
              </Flex>
              <Link href="/report" flex={2}>
                <Flex
                  justify={"right"}
                  h={"100%"}
                  align={"center"}
                  fontWeight={"bold"}
                >
                  VIEW DETAILS <Icon as={AiOutlineRight} fontSize={"15px"} />
                </Flex>
              </Link>
            </Flex>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, y: 10 }}
            transition={{ duration: 0.5, delay: 4 }}
          >
            <Flex
              p={"0.5em"}
              borderRadius={"0.5em"}
              mt={"1em"}
              boxShadow={"md"}
            >
              <Flex
                flex={4}
                flexDir={"column"}
                textTransform={"uppercase"}
                fontSize={"11px"}
                fontWeight={"bold"}
                color={"grey"}
              >
                <Icon
                  as={IoReorderThree}
                  mb={"0.5em"}
                  color={"red.500"}
                  fontSize={"18px"}
                />
                <Text fontWeight={"bold"} color={"black"} fontSize={"15px"}>
                  {orderData.length} orders
                </Text>
                Total Order
              </Flex>
              <Link href="/report" flex={2}>
                <Flex
                  justify={"right"}
                  h={"100%"}
                  align={"center"}
                  fontWeight={"bold"}
                >
                  VIEW DETAILS <Icon as={AiOutlineRight} fontSize={"15px"} />
                </Flex>
              </Link>
            </Flex>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, y: 10 }}
            transition={{ duration: 0.5, delay: 5 }}
          >
            <Flex
              p={"0.5em"}
              borderRadius={"0.5em"}
              mt={"1em"}
              boxShadow={"md"}
            >
              <Flex
                flex={4}
                flexDir={"column"}
                textTransform={"uppercase"}
                fontSize={"11px"}
                fontWeight={"bold"}
                color={"grey"}
              >
                <Icon
                  as={GiModernCity}
                  mb={"0.5em"}
                  color={"brown.500"}
                  fontSize={"18px"}
                />
                <Text fontWeight={"bold"} color={"black"} fontSize={"15px"}>
                  {properties.length} properties
                </Text>
                Total Property
              </Flex>
              <Link href="/propertiestenant" flex={2}>
                <Flex
                  justify={"right"}
                  h={"100%"}
                  align={"center"}
                  fontWeight={"bold"}
                >
                  VIEW DETAILS <Icon as={AiOutlineRight} fontSize={"15px"} />
                </Flex>
              </Link>
            </Flex>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, y: 10 }}
            transition={{ duration: 0.5, delay: 6 }}
          >
            <Flex
              p={"0.5em"}
              borderRadius={"0.5em"}
              mt={"1em"}
              boxShadow={"md"}
            >
              <Flex
                flex={4}
                flexDir={"column"}
                textTransform={"uppercase"}
                fontSize={"11px"}
                fontWeight={"bold"}
                color={"grey"}
              >
                <Icon
                  as={FaBed}
                  mb={"0.5em"}
                  color={"blue.500"}
                  fontSize={"18px"}
                />
                <Text fontWeight={"bold"} color={"black"} fontSize={"15px"}>
                  {roomLength.length} Rooms
                </Text>
                Total Room
              </Flex>
              <Link href="/roompropertiestenant" flex={2}>
                <Flex
                  justify={"right"}
                  h={"100%"}
                  align={"center"}
                  fontWeight={"bold"}
                >
                  VIEW DETAILS <Icon as={AiOutlineRight} fontSize={"15px"} />
                </Flex>
              </Link>
            </Flex>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, y: 10 }}
            transition={{ duration: 0.5, delay: 7 }}
          >
            <Flex
              p={"0.5em"}
              borderRadius={"0.5em"}
              mt={"1em"}
              boxShadow={"md"}
            >
              <Flex
                flex={4}
                flexDir={"column"}
                textTransform={"uppercase"}
                fontSize={"11px"}
                fontWeight={"bold"}
                color={"grey"}
              >
                <Icon
                  as={BsCheckCircleFill}
                  mb={"0.5em"}
                  color={"green.500"}
                  fontSize={"18px"}
                />
                <Text fontWeight={"bold"} color={"black"} fontSize={"15px"}>
                  {roomLength.length - orderData.length} Rooms
                </Text>
                Available Room
              </Flex>
              <Link href="/roompropertiestenant" flex={2}>
                <Flex
                  justify={"right"}
                  h={"100%"}
                  align={"center"}
                  fontWeight={"bold"}
                >
                  VIEW DETAILS <Icon as={AiOutlineRight} fontSize={"15px"} />
                </Flex>
              </Link>
            </Flex>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, y: 10 }}
            transition={{ duration: 0.5, delay: 8 }}
          >
            <Flex
              p={"0.5em"}
              borderRadius={"0.5em"}
              mt={"1em"}
              mb={"3em"}
              boxShadow={"md"}
            >
              <Flex
                flex={4}
                flexDir={"column"}
                textTransform={"uppercase"}
                fontSize={"11px"}
                fontWeight={"bold"}
                color={"grey"}
              >
                <Icon
                  as={GoBookmarkSlash}
                  mb={"0.5em"}
                  color={"yellow.500"}
                  fontSize={"18px"}
                />
                <Text fontWeight={"bold"} color={"black"} fontSize={"15px"}>
                  {orderData.length} Rooms
                </Text>
                Booked Room
              </Flex>
              <Link href="/roompropertiestenant" flex={2}>
                <Flex
                  justify={"right"}
                  h={"100%"}
                  align={"center"}
                  fontWeight={"bold"}
                >
                  VIEW DETAILS <Icon as={AiOutlineRight} fontSize={"15px"} />
                </Flex>
              </Link>
            </Flex>
          </motion.div>
        </Box>

        <FooterLandingPage></FooterLandingPage>
      </Box>
    </>
  );
}
