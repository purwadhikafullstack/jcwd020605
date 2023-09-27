import {
  Box,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
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
  useDisclosure,
  PopoverFooter,
  Avatar,
} from "@chakra-ui/react";
import { BsList } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiHomeModern } from "react-icons/hi2";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import { BiLogOutCircle, BiSolidHomeSmile } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { MdOutlineBedroomChild } from "react-icons/md";
import LogOut from "./Logout";
import EditProfile from "./editProfile";
import { useFetchProperty } from "../hooks/useProperty";
import { useState } from "react";
import { api } from "../api/api";

export default function NavbarMobile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logOutModal = useDisclosure();
  const userSelector = useSelector((state) => state.auth);
  const editProfile = useDisclosure();
  const { properties, fetch } = useFetchProperty();
  const [tenantData, setTenantData] = useState();

  const tenantDatas = async () => {
    try {
      const res = await api.get("/tenant/tenantbyid/" + userSelector.id);
      setTenantData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box
        display={{ base: "flex", lg: "none" }}
        alignItems={"center"}
        justifyContent={"space-between"}
        px={"0.5em"}
        pos={"fixed"}
        h={"60px"}
        w={"100%"}
        bgColor={"#edf2f9"}
        zIndex={5}
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
            <Avatar
              size={"sm"}
              src={`${process.env.REACT_APP_API_BASE_URL}${userSelector?.profile_picture}`}
            ></Avatar>
          </PopoverTrigger>
          <PopoverContent
            w={"100%"}
            textAlign={"center"}
            mt={"1em"}
            border={"1px solid #dbdbdb"}
          >
            <PopoverArrow />
            <PopoverHeader>{userSelector.first_name}</PopoverHeader>
            <PopoverBody
              display={"flex"}
              alignItems={"center"}
              gap={"0.8em"}
              onClick={() => {
                editProfile.onOpen();
                tenantDatas();
              }}
            >
              <Icon as={CgProfile} /> Profile
            </PopoverBody>
            <PopoverFooter
              display={"flex"}
              alignItems={"center"}
              gap={"0.8em"}
              onClick={() => {
                logOutModal.onOpen();
              }}
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
                  <Link href="/dashboardtenant" _hover={{ color: "#ab854f" }}>
                    Dashboard
                  </Link>
                </Flex>

                <Flex
                  align={"center"}
                  gap={"1em"}
                  _hover={{ color: "#ab854f" }}
                >
                  <Icon as={HiHomeModern} />
                  <Link href="/propertiestenant" _hover={{ color: "#ab854f" }}>
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
                  <Link href="/transaction" _hover={{ color: "#ab854f" }}>
                    Transaction
                  </Link>
                </Flex>

                <Flex
                  align={"center"}
                  gap={"1em"}
                  _hover={{ color: "#ab854f" }}
                >
                  <Icon as={TbReportAnalytics} />
                  <Link href="/report" _hover={{ color: "#ab854f" }}>
                    Report
                  </Link>
                </Flex>

                <Flex
                  align={"center"}
                  gap={"1em"}
                  _hover={{ color: "#ab854f" }}
                >
                  <Icon as={BiSolidHomeSmile} />
                  <Link href="/" _hover={{ color: "#ab854f" }}>
                    Landing page
                  </Link>
                </Flex>
              </Flex>
            </DrawerBody>
            <DrawerFooter justifyContent={"left"}>
              <Flex
                align={"center"}
                gap={"1em"}
                onClick={() => {
                  logOutModal.onOpen();
                }}
              >
                <Icon as={BiLogOutCircle} />
                <Link>Logout</Link>
              </Flex>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
      <LogOut isOpen={logOutModal.isOpen} onClose={logOutModal.onClose} />
      <EditProfile
        fetch={fetch}
        isOpen={editProfile.isOpen}
        onClose={editProfile.onClose}
        data={{
          email: tenantData?.email,
          idNumber: tenantData?.id_Number,
          phone_number: tenantData?.phone_number,
        }}
      />
    </>
  );
}
