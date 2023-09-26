import {
  Box,
  Center,
  Flex,
  Button,
  Select,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Drawer,
  useDisclosure,
  IconButton,
  Link,
} from "@chakra-ui/react";
import "@fontsource/barlow";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CiCalendarDate } from "react-icons/ci";
import React, { useState, useEffect } from "react";
import { api } from "../api/api";
export default function Filter() {
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const onChangeDate1 = (date) => {
    setDate1(date);
  };
  const onChangeDate2 = (date) => {
    setDate2(date);
  };
  const calendar1 = useDisclosure();
  const calendar2 = useDisclosure();
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  useEffect(() => {
    fetchProvinces();
  }, []);
  useEffect(() => {
    fetchCities(provinceId);
  }, [provinceId]);
  const fetchProvinces = async () => {
    try {
      const response = await api.get("/provincelist");
      setProvinces(response.data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };
  const fetchCities = async (id) => {
    try {
      const response = await api.get("/provincelist/" + id);
      setCities(response.data.cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };
  return (
    <>
      <Center>
        <Box w={"100vw"} bgColor={"#f8f5f0"} position={"relative"} zIndex={5}>
          <Box
            m={"15px 0px "}
            display={{ base: "flex", lg: "none" }}
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            w={"100%"}
            gap={"20px"}
            fontFamily={`'Barlow', sans-serif`}
            fontSize={"0.9em"}
            letterSpacing={"1px"}
            px={"15px"}
          >
            <Flex w={"100%"} justifyContent={"space-between"} bgColor={"white"}>
              <Box h={"3em"} display={"flex"} alignItems={"center"} pl={"1em"}>
                {date1.toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </Box>
              <Box h={"3em"} display={"flex"} alignItems={"center"}>
                <Box display={"flex"}>
                  <Center>Check in</Center>

                  <IconButton
                    aria-label="Open Menu"
                    icon={<CiCalendarDate />}
                    size="md"
                    fontSize={"25px"}
                    variant="none"
                    display={{ base: "flex", md: "none" }}
                    onClick={calendar1.onOpen}
                  />
                  <Drawer
                    isOpen={calendar1.isOpen}
                    placement="bottom"
                    onClose={calendar1.onClose}
                  >
                    <DrawerContent>
                      <DrawerCloseButton />
                      <DrawerBody bgColor={"#f8f5f0"}>
                        <Box
                          h={"25em"}
                          fontSize={{ base: "11px" }}
                          display={"flex"}
                          alignItems={"center"}
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

            <Flex w={"100%"} justifyContent={"space-between"} bgColor={"white"}>
              <Box h={"3em"} display={"flex"} alignItems={"center"} pl={"1em"}>
                {date2.toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </Box>
              <Box h={"3em"} display={"flex"} alignItems={"center"}>
                <Box display={"flex"}>
                  <Center>Check out</Center>
                  <IconButton
                    aria-label="Open Menu"
                    icon={<CiCalendarDate />}
                    size="md"
                    fontSize={"25px"}
                    variant="none"
                    display={{ base: "flex", md: "none" }}
                    onClick={calendar2.onOpen}
                  />
                  <Drawer
                    isOpen={calendar2.isOpen}
                    placement="bottom"
                    onClose={calendar2.onClose}
                  >
                    <DrawerContent>
                      <DrawerCloseButton />
                      <DrawerBody bgColor={"#f8f5f0"}>
                        <Box
                          h={"25em"}
                          fontSize={{ base: "11px" }}
                          display={"flex"}
                          alignItems={"center"}
                        >
                          <Calendar
                            onChange={onChangeDate2}
                            value={date2}
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

            <Flex w={"100%"} justifyContent={"space-between"} bgColor={"white"}>
              <Select
                placeholder=""
                variant={"ghost"}
                fontFamily={`'Barlow', sans-serif`}
                fontSize={"1em"}
              >
                <option value="option1">1 Adult</option>
                <option value="option1">2 Adult</option>
                <option value="option1">3 Adult</option>
                <option value="option1">4 Adult</option>
              </Select>
            </Flex>

            <Flex w={"100%"} justifyContent={"space-between"} bgColor={"white"}>
              <Select
                variant={"ghost"}
                fontFamily={`'Barlow', sans-serif`}
                placeholder="Province"
                fontSize={"1em"}
                value={provinceId}
                onChange={(e) => setProvinceId(e.target.value)}
              >
                {provinces?.map((province) => (
                  <option
                    key={province.province_id}
                    value={province.province_id}
                  >
                    {province.province}
                  </option>
                ))}
              </Select>
            </Flex>

            <Flex w={"100%"} justifyContent={"space-between"} bgColor={"white"}>
              <Select
                variant={"ghost"}
                fontFamily={`'Barlow', sans-serif`}
                fontSize={"1em"}
                placeholder="City"
              >
                {cities?.map((city) => (
                  <option>{city.city_name}</option>
                ))}
              </Select>
            </Flex>

            <Flex w={"100%"} justifyContent={"space-between"} bgColor={"white"}>
              <Select
                placeholder=""
                variant={"ghost"}
                fontFamily={`'Barlow', sans-serif`}
                fontSize={"1em"}
              >
                <option value="option1">1 Room</option>
                <option value="option1">2 Rooms</option>
                <option value="option1">3 Rooms</option>
                <option value="option1">4 Rooms</option>
              </Select>
            </Flex>

            <Button
              w={"100%"}
              letterSpacing={"2px"}
              textTransform={"uppercase"}
              borderRadius={"none"}
              bgColor={"#aa8453"}
              color={"white"}
              fontSize={"0.8em"}
              fontWeight={"none"}
              _hover={{ bgColor: "#aa8453", color: "white" }}
            >
              <Link href="#">Check Now</Link>
            </Button>
          </Box>
        </Box>
      </Center>
    </>
  );
}
