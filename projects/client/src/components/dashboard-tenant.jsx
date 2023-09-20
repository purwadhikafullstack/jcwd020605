import {
  Box,
  useDisclosure,
  Link,
  Text,
  Flex,
  Icon,
  Image,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
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
import NavbarDesktop from "./navbarDesktop";
export default function DashboardTenant() {
  const userSelector = useSelector((state) => state.auth);
  const [orderData, setOrderData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [roomLength, setRoomLength] = useState([]);
  const [properties, setProperties] = useState([]);
  const [id, setId] = useState(userSelector.id);

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
      const res = await api.get("/room", {
        params: { id: id },
      });
      setRoomLength(res.data.roomData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProperyData = async () => {
    try {
      const res = await api.get(`/properties/propertieslist`, {
        params: { id: id },
      });
      setProperties(res.data.property);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(orderData);
  return (
    <>
      <Box
        h={"100vh"}
        bgColor={"#edf2f9"}
        display={{ base: "none", lg: "flex" }}
        flexDir={"column"}
      >
        {/* Navbar + sidebar */}
        <NavbarDesktop></NavbarDesktop>

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
                    {roomLength.length} Rooms
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
