import {
  Box,
  Image,
  Button,
  Icon,
  Text,
  Flex,
  Center,
  Link,
} from "@chakra-ui/react";
import "@fontsource/gilda-display";
import "@fontsource/barlow";
import a from "../assets/1 (2).jpg";
import { LiaBedSolid } from "react-icons/lia";
import { IoFastFoodOutline } from "react-icons/io5";
import { BiShower } from "react-icons/bi";
import { BsArrowRightShort } from "react-icons/bs";
import { useState, useEffect } from "react";
import { api } from "../api/api";
import { FcInfo } from "react-icons/fc";
import { useSelector } from "react-redux";
import { useFetchProperty } from "../hooks/useProperty";
import Pagination from "./Pagination";
import "../styles/productSuggest.css";
export default function ProductSuggest() {
  const userSelector = useSelector((state) => state.auth);
  const { properties, totalPage, handlePageClick, fetch } = useFetchProperty();
  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <Box bgColor={"#f8f5f0"} display={"flex"} justifyContent={"center"}>
        <Box
          my={"2em"}
          py={{ lg: "6em", base: "2em" }}
          fontFamily={`'Barlow', sans-serif`}
          fontSize={"15px"}
          fontWeight={"none"}
          w={{ base: "100%", lg: "80%" }}
        >
          <Box
            display={"flex"}
            flexDir={"column"}
            letterSpacing={"1px"}
            px={"10px"}
          >
            <Flex
              align={"center"}
              gap={"1em"}
              fontSize={{ base: "12px" }}
              py={{ lg: "2em", base: "0.5em" }}
              pb={{ base: "3em" }}
            >
              <Icon as={FcInfo} boxSize={8} />
              We apologize for the inconvenience, but the "user" feature is
              still under development. We will provide an update as soon as
              possible. Please navigate to the tenant page accessible in the
              navbar for features that are already completed. We apologize for
              any inconvenience this may cause.
            </Flex>
            <Box
              textTransform={"uppercase"}
              color={"#666666"}
              fontSize={{ lg: "2em", base: "1.7em" }}
              pb={{ base: "1em" }}
            >
              The Cappa Luxury Hotel
            </Box>
            <Box
              fontSize={{ lg: "4em", base: "2.7em" }}
              fontFamily={`'Gilda Display', sans-serif`}
            >
              Rooms & Suites
            </Box>
          </Box>

          {/* card */}
          <Box
            display={"flex"}
            flexDir={{ base: "column", lg: "row" }}
            gap={"3em"}
            flexWrap={"wrap"}
            justifyContent={"center"}
            py={"4em"}
          >
            {properties?.map((product) => (
              <Flex flexDir={"column"} align={"center"}>
                <Flex
                  w={{ base: "95%", lg: "100%" }}
                  h={"50vh"}
                  pos={"relative"}
                  transition="transform 0.5s ease"
                  _hover={{ transform: "translateY(-10px)" }}
                >
                  <Box className="image-container">
                    <Image
                      borderRadius={"3%"}
                      src={`${process.env.REACT_APP_API_BASE_URL}${product?.PropertyImages[0]?.picture}`}
                      objectFit={"cover"}
                      maxW={{ lg: "400px" }}
                      mb={"2em"}
                      h={"50vh"}
                      key={product.id}
                      boxShadow={"lg"}
                    />
                  </Box>
                  <Flex
                    borderRadius={"3%"}
                    position={"absolute"}
                    color={"white"}
                    fontFamily={`'Gilda Display', sans-serif`}
                    display={"flex"}
                    flexDir={"column"}
                    justifyContent={"end"}
                    gap={"2em"}
                    w={{ base: "96%", lg: "100%" }}
                    px={{ base: "1em", lg: "2em" }}
                    h={"100%"}
                    top={{ base: -5 }}
                    textShadow={"2px 2px 4px rgba(0, 0, 0, 1)"}
                  >
                    <Box display={"flex"} flexDir={"column"} gap={"10px"}>
                      <Text fontSize={"2em"}>{product.property_name}</Text>
                      <Text
                        fontFamily={`'Barlow', sans-serif`}
                        textTransform={"uppercase"}
                        fontSize={"1em"}
                      >
                        {product?.City?.city_name}, {product?.City?.province}
                      </Text>
                      <Text
                        fontFamily={`'Barlow', sans-serif`}
                        textTransform={"uppercase"}
                        fontSize={"1em"}
                      >
                        {product?.Rooms[0]?.main_price
                          ? product?.Rooms[0]?.main_price?.toLocaleString(
                              "id-ID",
                              {
                                style: "currency",
                                currency: "IDR",
                              }
                            )
                          : "-"}{" "}
                        / Day
                      </Text>

                      <Text borderBottom={"2px solid white"} w={"8em"}></Text>
                    </Box>
                    <Box
                      display={"flex"}
                      gap={"2em"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Flex gap={"0.5em"} fontSize={"20px"} color={"#ECFCFC"}>
                        <Icon as={LiaBedSolid} />
                        <Icon as={BiShower} />
                        <Icon as={IoFastFoodOutline} />
                      </Flex>
                      <Link
                        display={"flex"}
                        gap={"0.5em"}
                        alignItems={"center"}
                        fontFamily={`'Barlow', sans-serif`}
                        textTransform={"uppercase"}
                        letterSpacing={"2px"}
                      >
                        Details
                        <Icon as={BsArrowRightShort} />
                      </Link>
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Box>
        </Box>
      </Box>
      <Box bgColor={"#f8f5f0"}>
        <Pagination data={{ totalPage, handlePageClick }} />
      </Box>
    </>
  );
}
