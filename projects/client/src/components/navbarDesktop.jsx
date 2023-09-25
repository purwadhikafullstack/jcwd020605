import {
  Box,
  Link,
  Text,
  Flex,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Avatar,
  useDisclosure,
} from "@chakra-ui/react";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiHomeModern } from "react-icons/hi2";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import { BiLogOutCircle, BiSolidHomeSmile } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineBedroomChild } from "react-icons/md";
import { useSelector } from "react-redux";
import LogOut from "./Logout";
import EditProfile from "./editProfile";
import { useFetchProperty } from "../hooks/useProperty";
import { useEffect, useState } from "react";
import { api } from "../api/api";
export default function NavbarDesktop() {
  const userSelector = useSelector((state) => state.auth);
  const logOutModal = useDisclosure();
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
  console.log(tenantData);

  return (
    <>
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
              <Link _hover={{ color: "#ab854f" }} href="/dashboardtenant">
                Dashboard
              </Link>
            </Flex>

            <Flex align={"center"} gap={"1em"} _hover={{ color: "#ab854f" }}>
              <Icon as={HiHomeModern} />
              <Link _hover={{ color: "#ab854f" }} href="/propertiestenant">
                Property
              </Link>
            </Flex>

            <Flex align={"center"} gap={"1em"} _hover={{ color: "#ab854f" }}>
              <Icon as={MdOutlineBedroomChild} />
              <Link _hover={{ color: "#ab854f" }} href="/roompropertiestenant">
                Room
              </Link>
            </Flex>

            <Flex align={"center"} gap={"1em"} _hover={{ color: "#ab854f" }}>
              <Icon as={AiOutlineDollarCircle} />
              <Link href="/transaction" _hover={{ color: "#ab854f" }}>
                Transaction
              </Link>
            </Flex>

            <Flex align={"center"} gap={"1em"} _hover={{ color: "#ab854f" }}>
              <Icon as={TbReportAnalytics} />
              <Link href="/report" _hover={{ color: "#ab854f" }}>
                Report
              </Link>
            </Flex>

            <Flex align={"center"} gap={"1em"} _hover={{ color: "#ab854f" }}>
              <Icon as={BiSolidHomeSmile} />
              <Link href="/" _hover={{ color: "#ab854f" }}>
                Landing page
              </Link>
            </Flex>
          </Flex>

          {/* avatar profile */}
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
              <PopoverHeader>{userSelector?.first_name}</PopoverHeader>
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
                cursor={"pointer"}
                onClick={() => {
                  logOutModal.onOpen();
                }}
              >
                <Icon as={BiLogOutCircle} /> LogOut
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </Flex>
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
