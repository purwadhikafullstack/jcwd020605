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
  Select,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import bgContent from "../assets/bgcontent.jpg";
import { useState } from "react";
import DeleteProduct from "./deleteProduct";
import EditProperty from "./editProperty";
import AddRooms from "./addRoom";
import PropertyDetail from "./propertyDetail";
import AddPropertyModal from "./addProperty";
import FooterLandingPage from "./footerLandingPage";
import Pagination from "./Pagination";
import { api } from "../api/api";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { motion } from "framer-motion";
import { useFetchProperty } from "../hooks/useProperty";
import { useSelector } from "react-redux";
import { BsList } from "react-icons/bs";
import { SlTrash } from "react-icons/sl";
import { ImLocation } from "react-icons/im";
import { MdOutlineBedroomChild } from "react-icons/md";
import { FcRating } from "react-icons/fc";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiHomeModern } from "react-icons/hi2";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { BiLogOutCircle, BiDotsHorizontalRounded } from "react-icons/bi";
import { CgProfile, CgDetailsMore } from "react-icons/cg";
import { BsPatchPlusFill } from "react-icons/bs";
import { BiPlus, BiPencil } from "react-icons/bi";
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

export default function PropertiesDekstopComp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Edit = useDisclosure();
  const DeleteModal = useDisclosure();
  const addProperty = useDisclosure();
  const addRoom = useDisclosure();
  const propertyDetail = useDisclosure();
  const userSelector = useSelector((state) => state.auth);
  const [pcm, setPcm] = useState([]);
  const [propertyId, setPropertyID] = useState();
  const [keyword, setKeyword] = useState();
  const [selectedProperty, setSelectedProperty] = useState();

  const [filter, setFilter] = useState({
    pcm: "",
    search: "",
  });
  console.log(filter);
  useEffect(() => {
    fetch();
  }, [filter]);

  useEffect(() => {
    provinces();
  }, []);

  const { properties, totalPage, handlePageClick, fetch } =
    useFetchProperty(filter);

  const provinces = () => {
    api
      .get("/properties")
      .then((res) => {
        setPcm(res.data);
      })
      .catch((err) => console.log(err.response.data));
  };
  return (
    <>
      <Box
        flexDir={"column"}
        bgColor={"#edf2f9"}
        h={"100vh"}
        display={{ base: "none", lg: "flex" }}
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

        {/* bg */}
        <Box py={"5%"}>
          <Flex
            // pt={"4em"}
            flexDir={"column"}
            pos={"relative"}
            h={"20vh"}
            align={"center"}
            transition="transform 0.5s ease"
            _hover={{ transform: "translateY(-10px)" }}
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
                Manage
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                Your
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                Properties
              </motion.div>
            </Text>
          </Flex>
        </Box>

        {/* add properties */}
        <Flex flexDir={"column"} align={"center"}>
          <Box
            display={"flex"}
            flexDir={"column"}
            w={"50%"}
            bgColor={"white"}
            border={"1px solid #dbdbdb"}
            borderRadius={"5px"}
            boxShadow={"md"}
            transition="transform 0.5s ease"
            _hover={{ transform: "translateY(-10px)" }}
          >
            <Text
              fontSize={"20px"}
              w={"100%"}
              fontFamily={`'Barlow', sans-serif`}
              pl={"5%"}
              pt={"0.5em"}
              fontWeight={"bold"}
            >
              Add New Properties
            </Text>

            <Box
              fontSize={"13px"}
              w={"100%"}
              fontFamily={`'Barlow', sans-serif`}
              pl={"5%"}
              pt={"0.5em"}
              borderRadius={"5px"}
            >
              <Text> * Add properties Name</Text>
              <Text> * Add properties Description </Text>
              <Text> * Add properties Location</Text>
              <Text> * Add properties Picture Max 3 photos</Text>
            </Box>

            <Text
              fontSize={"20px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              fontFamily={`'Barlow', sans-serif`}
              px={"0.5em"}
              gap={"0.5em"}
              mt={"0.5em"}
              onClick={addProperty.onOpen}
              borderTop={"2px dashed black"}
            >
              <Icon as={BsPatchPlusFill} />
              New properties
            </Text>
          </Box>
        </Flex>

        {/* list based on location */}
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
          >
            <Text
              fontSize={"20px"}
              display={"flex"}
              w={"50%"}
              justifyContent={"center"}
              fontFamily={`'Barlow', sans-serif`}
              py={"1em"}
              my={"1em"}
              bgColor={"white"}
              borderRadius={"5px"}
              fontWeight={"bold"}
              border={"1px solid #dbdbdb"}
              boxShadow={"md"}
              transition="transform 0.5s ease"
              _hover={{ transform: "translateY(-10px)" }}
            >
              Properties
            </Text>
          </Box>
        </motion.div>

        {/* filter */}
        <Flex w={"100%"} flexDir={"column"} alignItems={"center"}>
          <Select
            p={2}
            bg={"white"}
            onChange={(e) =>
              setFilter({
                pcm: e.target.value,
              })
            }
            placeholder="Filter by province"
            color={"gray"}
            value={filter?.pcm}
            w={"50%"}
          >
            {pcm.map((prov) => (
              <option value={prov?.province}>{prov?.province}</option>
            ))}
          </Select>

          <InputGroup p={2} w={"50%"}>
            <Input
              bg={"white"}
              placeholder={"Search by property name, location"}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <InputRightAddon
              bg={"white"}
              onClick={() => {
                setFilter({ pcm: "", search: keyword });
                setKeyword("");
              }}
            >
              <Icon as={FaSearch} />
            </InputRightAddon>
          </InputGroup>
        </Flex>

        {/* product card */}
        <Grid
          templateColumns="repeat(1, 1fr)"
          gap={10}
          pb={"1em"}
          mt={"1em"}
          bgColor={"#edf2f9"}
        >
          {properties &&
            properties?.map((val) => (
              <Box align={"center"} bgColor={"#edf2f9"}>
                <Box
                  w={"50%"}
                  bgColor={"white"}
                  display={"flex"}
                  alignItems={"center"}
                  borderRadius={"md"}
                  border={"1px solid #dbdbdb"}
                  py={"1.5em"}
                  px={"1em"}
                  boxShadow={"md"}
                  fontFamily={`'Barlow', sans-serif`}
                  transition="transform 0.5s ease"
                  _hover={{ transform: "translateY(-10px)" }}
                >
                  <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="swipercard"
                    flex={1}
                  >
                    {val?.propertyImages?.map((pict) => (
                      <SwiperSlide className="swipercard-slide ">
                        <Image
                          src={`${process.env.REACT_APP_API_BASE_URL}${pict.picture}`}
                          h={"250px"}
                          objectFit={"cover"}
                          borderRadius={"md"}
                          border={"1px solid #dbdbdb"}
                        ></Image>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <Flex flex={3} flexDir={"column"}>
                    <Box display={"flex"} w={"100%"} justifyContent={"right"}>
                      <Menu>
                        <MenuButton>
                          <Image as={BiDotsHorizontalRounded} boxSize={7} />
                        </MenuButton>
                        <MenuList minW={"100px"}>
                          <MenuItem
                            onClick={() => {
                              propertyDetail.onOpen();
                              setPropertyID(val?.id);
                            }}
                            display={"flex"}
                            gap={"10px"}
                          >
                            <Icon as={CgDetailsMore} />
                            Details
                          </MenuItem>

                          <Divider />

                          <MenuItem
                            onClick={() => {
                              Edit.onOpen();
                              setSelectedProperty(val);
                            }}
                            display={"flex"}
                            gap={"10px"}
                          >
                            <Icon as={BiPencil} />
                            Edit Property
                          </MenuItem>

                          <Divider />

                          <Divider />

                          <MenuItem
                            onClick={() => {
                              addRoom.onOpen();
                              setPropertyID(val?.id);
                            }}
                            display={"flex"}
                            gap={"10px"}
                          >
                            <Icon as={BiPlus} />
                            add Room
                          </MenuItem>

                          <Divider />

                          <MenuItem
                            onClick={() => {
                              DeleteModal.onOpen();
                              setPropertyID(val?.id);
                            }}
                            display={"flex"}
                            gap={"10px"}
                            color={"red"}
                          >
                            <Icon as={SlTrash} />
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Box>

                    <Box>
                      <Box
                        mb={"0.5em"}
                        w={"90%"}
                        display={"flex"}
                        justifyContent={"left"}
                        fontWeight={"bold"}
                        fontSize={"1.5em"}
                      >
                        {val?.property_name}
                      </Box>

                      <Box
                        mb={"0.5em"}
                        w={"90%"}
                        display={"flex"}
                        justifyContent={"left"}
                        fontSize={"1em"}
                        overflow={"hidden"}
                        textAlign={"left"}
                      >
                        {val?.details_text}
                      </Box>

                      <Box display={"flex"} w={"90%"}>
                        <Flex
                          flex={1}
                          flexDir={"column"}
                          textAlign={"left"}
                          gap={"1em"}
                        >
                          <Text
                            display={"flex"}
                            fontSize={"0.8em"}
                            gap={"0.3em"}
                            alignItems={"center"}
                          >
                            <Icon as={ImLocation} />
                            {val?.city?.city_name}
                          </Text>

                          <Text
                            display={"flex"}
                            fontSize={"0.8em"}
                            gap={"0.3em"}
                            alignItems={"center"}
                          >
                            <Icon as={FcRating} />
                            Rating
                          </Text>
                        </Flex>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            ))}
          <AddPropertyModal
            isOpen={addProperty.isOpen}
            onClose={addProperty.onClose}
            fetch={fetch}
          />
          <EditProperty
            isOpen={Edit.isOpen}
            onClose={() => {
              Edit.onClose();
              setSelectedProperty(null);
            }}
            data={selectedProperty}
            fetch={fetch}
          />

          <DeleteProduct
            isOpen={DeleteModal.isOpen}
            onClose={DeleteModal.onClose}
            id={propertyId}
            fetch={fetch}
          />

          <AddRooms
            isOpen={addRoom.isOpen}
            onClose={addRoom.onClose}
            id={propertyId}
            fetch={fetch}
          />
          <PropertyDetail
            isOpen={propertyDetail.isOpen}
            onClose={propertyDetail.onClose}
            id={propertyId}
            properties={properties}
          />
        </Grid>

        <Pagination data={{ totalPage, handlePageClick }} />
        <FooterLandingPage></FooterLandingPage>
      </Box>
    </>
  );
}
