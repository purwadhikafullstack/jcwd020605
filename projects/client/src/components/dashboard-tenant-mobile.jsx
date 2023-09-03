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

import { useEffect } from "react";
import { api } from "../api/api";
import { useSelector } from "react-redux";
import { CiCalendarDate } from "react-icons/ci";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function DashboardTenantMobile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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

      <Box
        fontSize={"25px"}
        pl={"0.5em"}
        mt={"1em"}
        textTransform={"uppercase"}
      >
        Welcome, {userSelector.first_name} !
        <Text fontSize={"15px"} color={"grey"}>
          Don't forget to check your activity!
        </Text>
      </Box>

      {/* calendar */}
      <Flex flexDir={"column"} align={"center"} mt={"2em"} gap={"3px"}>
        <Text w={"95%"} fontSize={"10px"} color={"grey"} fontWeight={"bold"}>
          DATE
        </Text>

        <Flex
          w={"95%"}
          h={"100%"}
          justifyContent={"space-between"}
          bgColor={"white"}
          border={"1px solid #dbdbdb"}
          borderRadius={"0.5em"}
          onClick={calendar1.onOpen}
        >
          <Box display={"flex"} alignItems={"center"} pl={"0.5em"}>
            {date1.toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Box>
          <Box display={"flex"}>
            <Box display={"flex"} alignItems={"center"}>
              <IconButton
                aria-label="Open Menu"
                icon={<CiCalendarDate />}
                size="md"
                fontSize={"25px"}
                variant="none"
                display="flex"
              />
              <Drawer
                isOpen={calendar1.isOpen}
                placement="top"
                onClose={calendar1.onClose}
              >
                <DrawerContent
                  // w={"25%"}
                  // ml={"15em"}
                  // mb={"8em"}
                  borderRadius={"10px"}
                >
                  <DrawerCloseButton />
                  <DrawerBody bgColor={"#f8f5f0"} borderRadius={"20px"}>
                    <Box
                      h={"25em"}
                      fontSize={{ base: "11px" }}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Calendar
                        onChange={onChangeDate1}
                        value={date1}
                        formatShortWeekday={(locale, date) =>
                          date.toLocaleDateString(locale, {
                            weekday: "short",
                          })
                        }
                        formatDay={(locale, date) =>
                          date.toLocaleDateString(locale, {
                            day: "2-digit",
                          })
                        }
                        formatMonth={(locale, date) =>
                          date.toLocaleDateString(locale, {
                            month: "short",
                          })
                        }
                        formatYear={(locale, date) =>
                          date.toLocaleDateString(locale, {
                            year: "numeric",
                          })
                        }
                      />
                    </Box>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Box>
          </Box>
        </Flex>
      </Flex>

      {/* total */}
      <Box p={"0.5em"} mt={"1em"}>
        <Flex p={"0.5em"} borderRadius={"0.5em"} border={"1px solid #dbdbdb"}>
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
              color={"red.500"}
              fontSize={"18px"}
            />
            <Text fontWeight={"bold"} color={"black"} fontSize={"15px"}>
              Rp. 1.000,00
            </Text>
            Total Earnings
          </Flex>
          <Flex flex={1} justify={"right"} align={"center"}>
            <Icon as={AiOutlineRight} fontSize={"15px"} />
          </Flex>
        </Flex>

        <Flex
          p={"0.5em"}
          borderRadius={"0.5em"}
          mt={"1em"}
          border={"1px solid #dbdbdb"}
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
              100
            </Text>
            Total Order
          </Flex>
          <Flex flex={1} justify={"right"} align={"center"}>
            <Icon as={AiOutlineRight} />
          </Flex>
        </Flex>

        <Flex
          p={"0.5em"}
          borderRadius={"0.5em"}
          mt={"1em"}
          border={"1px solid #dbdbdb"}
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
              40
            </Text>
            Total Room
          </Flex>
          <Flex flex={1} justify={"right"} align={"center"}>
            <Icon as={AiOutlineRight} />
          </Flex>
        </Flex>

        <Flex
          p={"0.5em"}
          borderRadius={"0.5em"}
          mt={"1em"}
          border={"1px solid #dbdbdb"}
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
              40
            </Text>
            Available Room
          </Flex>
          <Flex flex={1} justify={"right"} align={"center"}>
            <Icon as={AiOutlineRight} />
          </Flex>
        </Flex>

        <Flex
          p={"0.5em"}
          borderRadius={"0.5em"}
          mt={"1em"}
          border={"1px solid #dbdbdb"}
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
              40
            </Text>
            Booked Room
          </Flex>
          <Flex flex={1} justify={"right"} align={"center"}>
            <Icon as={AiOutlineRight} />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
