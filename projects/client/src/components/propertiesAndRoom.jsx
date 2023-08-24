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
  Grid,
  Select,
  Center,
  Image,
  Menu,
  MenuButton,
  Divider,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { useState } from "react";
import { BsList, BsCheckCircleFill } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiHomeModern } from "react-icons/hi2";
import { AiOutlineDollarCircle, AiOutlineRight } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import { BiLogOutCircle, BiDotsHorizontalRounded } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaBed } from "react-icons/fa6";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GoBookmarkSlash } from "react-icons/go";
import { IoReorderThree } from "react-icons/io5";
import a from "../assets/silverwolf-hack-silverwolf.gif";
import { useSelector } from "react-redux";
import { CiCalendarDate } from "react-icons/ci";
import {
  BsMessenger,
  BsThreeDotsVertical,
  BsThreeDotsHorizontal,
} from "react-icons/bs";

import { BiPlus, BiBookmark, BiPencil } from "react-icons/bi";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { SlTrash } from "react-icons/sl";
import "@fontsource/barlow";
import EditProduct from "./editProductTenant";
import DeleteProduct from "./deleteProduct";
import EditRoomProduct from "./roomProduct";

export default function PropertiesAndRoom() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Edit = useDisclosure();
  const EditRoom = useDisclosure();
  const DeleteModal = useDisclosure();

  const userSelector = useSelector((state) => state.auth);
  const [selectedDate, setSelectedDate] = useState(null);
  const [date1, setDate1] = useState(new Date());
  const calendar1 = useDisclosure();
  const onChangeDate1 = (date) => {
    setDate1(date);
  };

  return (
    <>
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
            <PopoverFooter display={"flex"} alignItems={"center"} gap={"0.8em"}>
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
                <Text fontSize={"25px"} letterSpacing={"1px"} color={"#ab854f"}>
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
                  <Link _hover={{ color: "#ab854f" }}>Property & Room</Link>
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

      <Grid templateColumns="repeat(1, 1fr)" gap={2}>
        <Box align={"center"}>
          <Box
            w={"70%"}
            bgColor={"#d3d3d3"}
            borderRadius={"md"}
            m={3}
            p={2}
            fontFamily={`'Barlow', sans-serif`}
          >
            <Image
              src={a}
              h={"250px"}
              objectFit={"cover"}
              borderRadius={"md"}
            ></Image>

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
                  <MenuItem onClick={Edit.onOpen} display={"flex"} gap={"10px"}>
                    <Icon as={BiPencil} />
                    Edit Product
                    <EditProduct
                      isOpen={Edit.isOpen}
                      onClose={Edit.onClose}
                      fetch={fetch}
                    />
                  </MenuItem>

                  <Divider />

                  <MenuItem
                    onClick={EditRoom.onOpen}
                    display={"flex"}
                    gap={"10px"}
                  >
                    <Icon as={BiPencil} />
                    Edit Room
                    <EditRoomProduct
                      isOpen={EditRoom.isOpen}
                      onClose={EditRoom.onClose}
                      fetch={fetch}
                    />
                  </MenuItem>

                  <Divider />

                  <MenuItem
                    onClick={DeleteModal.onOpen}
                    display={"flex"}
                    gap={"10px"}
                    color={"red"}
                  >
                    <Icon as={SlTrash} />
                    Delete
                    <DeleteProduct
                      // id={post.id}
                      isOpen={DeleteModal.isOpen}
                      onClose={DeleteModal.onClose}
                    />
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>

            <Box mb={"1em"}>abcd</Box>

            <Box display={"flex"} w={"90%"}>
              <Flex flex={1} flexDir={"column"} textAlign={"left"} gap={"1em"}>
                <Text>Price</Text>
                <Text>Rating</Text>
              </Flex>
              <Flex
                flex={1}
                flexDir={"column"}
                // mb={"1em"}
                textAlign={"right"}
                gap={"1em"}
              >
                <Text>Status</Text>
                <Text>Location</Text>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
