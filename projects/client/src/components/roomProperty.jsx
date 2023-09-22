import {
  Box,
  useDisclosure,
  Text,
  Link,
  Flex,
  Icon,
  Grid,
  Image,
  Menu,
  MenuButton,
  Divider,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsList, BsFillPersonFill } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BiPencil } from "react-icons/bi";
import { CgDetailsMore } from "react-icons/cg";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import { SlTrash } from "react-icons/sl";
import { MdApartment } from "react-icons/md";
import "@fontsource/barlow";
import EditRooms from "./editRoom";
import DeleteRooms from "./deleteRoom";
import FooterLandingPage from "./footerLandingPage";
import bgContent from "../assets/bgcontent.jpg";
import { useEffect } from "react";
import "@fontsource/barlow";
import "@fontsource/gilda-display";
import { useFetchRoom } from "../hooks/useRoom";
import { motion } from "framer-motion";
import NavbarMobile from "./navbarMobile";
import PaginationRoom from "./Pagination_room";
export default function RoomProperty() {
  const EditRoom = useDisclosure();
  const DeleteRoom = useDisclosure();
  const [roomId, setRoomId] = useState();
  const { rooms, fetch, totalPage, handlePageClick } = useFetchRoom();
  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      <Box
        display={{ base: "flex", lg: "none" }}
        flexDir={"column"}
        bgColor={"#edf2f9"}
        h={"100vh"}
      >
        {/* navbar + sidebar + profile */}
        <NavbarMobile></NavbarMobile>

        {/* bg */}
        <Box py={"5%"} pt={"4em"}>
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
              gap={"2%"}
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
                Rooms
              </motion.div>
            </Text>
          </Flex>
        </Box>

        {/* room */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            bgColor={"#edf2f9"}
            w={"100%"}
            pt={"2em"}
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
          {rooms?.map((val) => (
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
                    src={`${process.env.REACT_APP_API_BASE_URL}${val.room_picture}`}
                    h={"250px"}
                    objectFit={"cover"}
                    borderRadius={"md"}
                    border={"1px solid #dbdbdb"}
                  ></Image>
                </Box>
                {/* edit/delete */}
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
                          setRoomId(val?.id);
                        }}
                      >
                        <Link href={`/roomdetailtenant/${val?.id}`}>
                          <Box
                            display={"flex"}
                            gap={"10px"}
                            alignItems={"center"}
                          >
                            <Icon as={CgDetailsMore} />
                            Room Detail
                          </Box>
                        </Link>
                      </MenuItem>

                      <Divider />

                      <MenuItem
                        onClick={() => {
                          EditRoom.onOpen();
                          setRoomId(val?.id);
                          // setProperty(val);
                        }}
                        display={"flex"}
                        gap={"10px"}
                      >
                        <Icon as={BiPencil} />
                        Edit Room
                      </MenuItem>

                      <Divider />

                      <MenuItem
                        onClick={() => {
                          DeleteRoom.onOpen();
                          setRoomId(val?.id);
                          // setProperty(val);
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
                    mb={"1em"}
                    w={"90%"}
                    display={"flex"}
                    justifyContent={"left"}
                    fontWeight={"bold"}
                    fontSize={"1.5em"}
                  >
                    {val.room_name}
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
                        <Icon as={MdApartment} /> {val?.Property?.property_name}
                      </Text>

                      <Text
                        display={"flex"}
                        fontSize={"0.8em"}
                        gap={"0.5em"}
                        alignItems={"center"}
                      >
                        <Icon as={BsFillPersonFill} /> {val?.max_guest} Guests
                      </Text>

                      <Text
                        display={"flex"}
                        fontSize={"0.8em"}
                        gap={"0.5em"}
                        alignItems={"center"}
                      >
                        <Icon as={BsList} /> {val?.details}
                      </Text>

                      <Text
                        fontSize={"1.5em"}
                        color={"red.500"}
                        display={"flex"}
                        gap={"0.2em"}
                      >
                        <Text display={"flex"}>
                          {val.main_price
                            ? val.main_price.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })
                            : "0"}
                          / day
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
                        {val?.room_status ? val?.room_status : "Status"}
                      </Text>
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}

          <EditRooms
            isOpen={EditRoom.isOpen}
            onClose={EditRoom.onClose}
            id={roomId}
            fetch={fetch}
          />

          <DeleteRooms
            isOpen={DeleteRoom.isOpen}
            onClose={DeleteRoom.onClose}
            id={roomId}
            fetch={fetch}
          />
        </Grid>
        <PaginationRoom data={{ totalPage, handlePageClick }} />
        <FooterLandingPage></FooterLandingPage>
      </Box>
    </>
  );
}
