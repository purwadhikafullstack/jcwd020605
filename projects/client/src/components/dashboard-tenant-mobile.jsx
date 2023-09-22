import {
  Box,
  useDisclosure,
  Link,
  Text,
  Flex,
  Icon,
  Image,
} from "@chakra-ui/react";
import { BsCheckCircleFill } from "react-icons/bs";
import { AiOutlineRight } from "react-icons/ai";
import { FaBed } from "react-icons/fa6";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GoBookmarkSlash } from "react-icons/go";
import { IoReorderThree } from "react-icons/io5";
import { GiModernCity } from "react-icons/gi";
import { useEffect } from "react";
import { api } from "../api/api";
import { useSelector } from "react-redux";
import { useState } from "react";
import bgContent from "../assets/bgcontent.jpg";
import { motion } from "framer-motion";
import NavbarMobile from "./navbarMobile";
import FooterLandingPage from "./footerLandingPage";
export default function DashboardTenantMobile() {
  const userSelector = useSelector((state) => state.auth);
  const [orderData, setOrderData] = useState();
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
          id,
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

  return (
    <>
      <Box
        h={"100vh"}
        bgColor={"#edf2f9"}
        display={{ base: "flex", lg: "none" }}
        flexDir={"column"}
      >
        {/* navbar */}
        <NavbarMobile></NavbarMobile>
        {/* title */}
        <Box py={"5%"} pt={"5em"}>
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
            <Flex
              p={"0.5em"}
              borderRadius={"0.5em"}
              boxShadow={"md"}
              transition="transform 0.5s ease"
              _hover={{ transform: "translateY(10px)" }}
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

            <Flex
              p={"0.5em"}
              borderRadius={"0.5em"}
              mt={"1em"}
              boxShadow={"md"}
              transition="transform 0.5s ease"
              _hover={{ transform: "translateY(10px)" }}
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
                  {orderData?.length} orders
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

            <Flex
              p={"0.5em"}
              borderRadius={"0.5em"}
              mt={"1em"}
              boxShadow={"md"}
              transition="transform 0.5s ease"
              _hover={{ transform: "translateY(10px)" }}
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
                  {properties?.length} properties
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

            <Flex
              p={"0.5em"}
              borderRadius={"0.5em"}
              mt={"1em"}
              boxShadow={"md"}
              transition="transform 0.5s ease"
              _hover={{ transform: "translateY(10px)" }}
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
                  {roomLength?.length} Rooms
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

            <Flex
              p={"0.5em"}
              borderRadius={"0.5em"}
              mt={"1em"}
              boxShadow={"md"}
              transition="transform 0.5s ease"
              _hover={{ transform: "translateY(10px)" }}
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
                  {roomLength?.length - orderData?.length} Available
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

            <Flex
              p={"0.5em"}
              borderRadius={"0.5em"}
              mt={"1em"}
              mb={"3em"}
              boxShadow={"md"}
              transition="transform 0.5s ease"
              _hover={{ transform: "translateY(10px)" }}
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
                  {orderData?.length} Rooms
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
