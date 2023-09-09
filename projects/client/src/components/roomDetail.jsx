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
  useToast,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsList, BsFillPersonFill } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiHomeModern } from "react-icons/hi2";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { MdDoNotDisturbOn } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { BiLogOutCircle, BiDotsHorizontalRounded } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { BiPencil } from "react-icons/bi";
import { GrStatusUnknown } from "react-icons/gr";
import { MdOutlineBedroomChild, MdApartment } from "react-icons/md";
import FooterLandingPage from "./footerLandingPage";
import { api } from "../api/api";
import bgContent from "../assets/bgcontent.jpg";
import { useFetchRoomById } from "../hooks/useRoom";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "@fontsource/barlow";
import "@fontsource/gilda-display";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import "../styles/sliderLocation.css";
import "../styles/sliderCard.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import SpecialPrice from "./specialPrice";
import UnavailableRooms from "./UnavailableRoom";
import CalendarPrice from "./calendarPrice";

export default function RoomDetail(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const SpecialPriceModal = useDisclosure();
  const UnavailableRoomModal = useDisclosure();

  const userSelector = useSelector((state) => state.auth);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { rooms, price, fetch } = useFetchRoomById(id);

  const [priceDates, setPriceDates] = useState([]);
  const [nominal, setNominal] = useState("");
  const [percent, setPercent] = useState("");
  const [radioValue, setRadioValue] = useState("1");
  const toast = useToast();
  const [unavailable, setUnavailable] = useState([]);
  const [specialPrice, setSpecialPrice] = useState([]);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    fetch(id);
  }, []);

  useEffect(() => {
    fetchUnavailableRooms();
    fetchSpecialPriceRooms();
  }, []);

  const fetchUnavailableRooms = async () => {
    try {
      let res = await api.get("/unavailableroom/" + id);
      setUnavailable(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSpecialPriceRooms = async () => {
    try {
      let res = await api.get("/specialprice/" + id);
      setSpecialPrice(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const SpecialPrices = async () => {
    try {
      //getTime untuk ambil data dari 1970(timestamp Unix)
      //getTimezoneOffset mengambil perbedaan menit antara zona waktu lokal dan UTC,
      //selisih getTime dgn getTimezoneOffset di convert menggunakan toISOString
      let start_date = new Date(
        priceDates[0].getTime() - priceDates[0].getTimezoneOffset() * 60000
      ).toISOString();
      let end_date = new Date(
        priceDates[1].getTime() - priceDates[1].getTimezoneOffset() * 60000
      ).toISOString();
      let res = await api.post("/specialprice", {
        room_id: id,
        start_date,
        end_date,
        nominal,
        percent,
      });
      if (res.data.success) {
        toast({
          title: `${res.data.message}`,
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        fetchSpecialPriceRooms();
        nav("/roompropertiestenant");
      } else {
        toast({
          title: `${res.data.message}`,
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const unavailabilityRooms = async () => {
    try {
      let start_date = new Date(
        unavailableDates[0].getTime() -
          unavailableDates[0].getTimezoneOffset() * 60000
      ).toISOString();
      let end_date = new Date(
        unavailableDates[1].getTime() -
          unavailableDates[1].getTimezoneOffset() * 60000
      ).toISOString();
      let res = await api.post("/unavailableroom", {
        room_id: id,
        start_date,
        end_date,
      });
      if (res.data.success) {
        toast({
          title: `${res.data.message}`,
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        fetchUnavailableRooms();
      } else {
        toast({
          title: `${res.data.message}`,
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      }
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
                    <Link _hover={{ color: "#ab854f" }} href="/transaction">
                      Transaction
                    </Link>
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
              fontSize={{ base: "1.3em", lg: "3em" }}
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
                Special price
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                &
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                Room status
              </motion.div>
            </Text>
          </Flex>
        </Box>

        {/* room */}
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
              Rooms
            </Text>
          </Box>
        </motion.div>

        {/* room card */}
        <Grid
          templateColumns="repeat(1, 1fr)"
          pb={"1em"}
          mt={"1em"}
          gap={10}
          bgColor={"#edf2f9"}
        >
          <Box align={"center"} bgColor={"#edf2f9"}>
            <Box
              w={"90%"}
              bgColor={"white"}
              borderRadius={"md"}
              border={"1px solid #dbdbdb"}
              py={"1.5em"}
              boxShadow={"md"}
              fontFamily={`'Barlow', sans-serif`}
              transition="transform 0.5s ease"
              _hover={{ transform: "translateY(-10px)" }}
            >
              <Box w={"90%"}>
                <Image
                  src={`${process.env.REACT_APP_API_BASE_URL}${rooms?.room_picture}`}
                  h={"250px"}
                  objectFit={"cover"}
                  borderRadius={"md"}
                  border={"1px solid #dbdbdb"}
                ></Image>
              </Box>
              {/* SP,Room status */}
              <Box
                pt={1}
                pr={1}
                display={"flex"}
                w={"100%"}
                justifyContent={"right"}
              >
                <Menu>
                  <MenuButton>
                    <Image as={BiDotsHorizontalRounded} boxSize={5} />
                  </MenuButton>
                  <MenuList minW={"100px"}>
                    <MenuItem
                      onClick={() => {
                        SpecialPriceModal.onOpen();
                        fetchSpecialPriceRooms();
                      }}
                      display={"flex"}
                      gap={"10px"}
                    >
                      <Icon as={BiPencil} />
                      Special price
                    </MenuItem>
                    <Divider />

                    <MenuItem
                      onClick={() => {
                        UnavailableRoomModal.onOpen();
                        fetchUnavailableRooms();
                      }}
                      display={"flex"}
                      gap={"10px"}
                    >
                      <Icon as={MdDoNotDisturbOn} />
                      Unavalable Room
                    </MenuItem>
                    <Divider />
                  </MenuList>
                </Menu>
              </Box>

              <Box>
                <Box
                  mb={"1em"}
                  w={"90%"}
                  display={"flex"}
                  justifyContent={"left"}
                  fontWeight={"bold"}
                  fontSize={"1.5em"}
                >
                  {rooms?.room_name}
                </Box>

                <Box display={"flex"} w={"90%"}>
                  <Flex
                    flex={2}
                    flexDir={"column"}
                    textAlign={"left"}
                    gap={"1em"}
                  >
                    <Text
                      display={"flex"}
                      fontSize={"0.8em"}
                      gap={"0.5em"}
                      alignItems={"center"}
                    >
                      <Icon as={MdApartment} /> {rooms?.Property?.property_name}
                    </Text>

                    <Text
                      display={"flex"}
                      fontSize={"0.8em"}
                      gap={"0.5em"}
                      alignItems={"center"}
                    >
                      <Icon as={BsFillPersonFill} /> {rooms?.max_guest} Guests
                    </Text>

                    <Text
                      display={"flex"}
                      fontSize={"0.8em"}
                      gap={"0.5em"}
                      alignItems={"center"}
                    >
                      <Icon as={BsList} /> {rooms?.details}
                    </Text>

                    <Text
                      fontSize={"1.5em"}
                      color={"red.500"}
                      display={"flex"}
                      gap={"0.2em"}
                    >
                      Rp
                      <Text>
                        {rooms?.main_price ? rooms?.main_price : "0"},00 / day
                      </Text>
                    </Text>
                  </Flex>

                  <Flex
                    flex={1}
                    flexDir={"column"}
                    textAlign={"right"}
                    align={"end"}
                    justify={"end"}
                    gap={"1em"}
                  >
                    <Text>
                      {rooms?.room_status ? rooms?.room_status : "Status"}
                    </Text>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        <SpecialPrice
          data={{
            isOpen: SpecialPriceModal.isOpen,
            onClose: SpecialPriceModal.onClose,
            id: id,
            selectedDates: priceDates,
            onDateChange: setPriceDates,
            nominal,
            percent,
            value: radioValue,
            setValue: (e) => {
              setRadioValue(e.target.value);
              setNominal("");
              setPercent("");
            },
            onChangeNominal: (e) => {
              setNominal(e.target.value);
              setPercent(null);
            },
            onChangePercent: (e) => {
              setPercent(e.target.value);
              setNominal(null);
            },
            onClick: () => {
              SpecialPrices();
              fetchSpecialPriceRooms();
              SpecialPriceModal.onClose();
            },
          }}
        />
        <UnavailableRooms
          data={{
            isOpen: UnavailableRoomModal.isOpen,
            onClose: UnavailableRoomModal.onClose,
            id: id,
            selectedDates: unavailableDates,
            onDateChange: setUnavailableDates,
            onClick: () => {
              unavailabilityRooms();
              fetchUnavailableRooms();
              UnavailableRoomModal.onClose();
            },
          }}
        />
        <Box bgColor={"#edf2f9"}>
          <Box
            borderRadius={8}
            p={"1em"}
            m={"1em"}
            boxShadow={"md"}
            bgColor={"white"}
          >
            <CalendarPrice
              data={{
                unavailability: unavailable,
                specialPrice: specialPrice,
                price: price,
              }}
            />
          </Box>
        </Box>
        <FooterLandingPage></FooterLandingPage>
      </Box>
    </>
  );
}
