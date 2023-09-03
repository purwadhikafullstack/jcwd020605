import { Box, Image, Button, Icon, Text, Flex, Center } from "@chakra-ui/react";
import "@fontsource/gilda-display";
import "@fontsource/barlow";
import a from "../assets/1 (2).jpg";
import { LiaBedSolid } from "react-icons/lia";
import { IoFastFoodOutline } from "react-icons/io5";
import { BiShower } from "react-icons/bi";
import { BsArrowRightShort } from "react-icons/bs";
import { useState, useEffect } from "react";
import { api } from "../api/api";

export default function ProductSuggest() {
  const [productData, setProductData] = useState([]);
  console.log(productData);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const productData = await api.get("/properties/");
      setProductData(productData.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box bgColor={"#f8f5f0"} display={"flex"} justifyContent={"center"}>
        <Box
          my={"2em"}
          py={"8em"}
          fontFamily={`'Barlow', sans-serif`}
          fontSize={"15px"}
          fontWeight={"none"}
          w={{ base: "100%", lg: "80%" }}
        >
          <Box
            display={"flex"}
            flexDir={"column"}
            gap={"10px"}
            letterSpacing={"3px"}
            px={"10px"}
          >
            <Box
              textTransform={"uppercase"}
              color={"#666666"}
              h={"52px"}
              w={"256px"}
            >
              The Cappa Luxury Hotel
            </Box>
            <Box fontSize={"46px"} fontFamily={`'Gilda Display', sans-serif`}>
              Rooms & Suites
            </Box>
          </Box>

          {/* card */}
          <Box
            display={"flex"}
            flexDir={{ base: "column", lg: "row" }}
            gap={"2em"}
            flexWrap={"wrap"}
            justifyContent={"center"}
            py={"4em"}
          >
            {productData?.map((product) => (
              <Box px={"0.5em"} h={"50vh"} pos={"relative"}>
                <Image
                  src={a}
                  // h={"100%"}
                  objectFit={"cover"}
                  zIndex={"1"}
                  maxW={{ lg: "400px" }}
                  mb={"2em"}
                  h={"50vh"}
                  key={product.id}
                />
                <Flex
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
                  top={{ base: -10 }}
                >
                  <Box display={"flex"} flexDir={"column"} gap={"10px"}>
                    <Text
                      fontFamily={`'Barlow', sans-serif`}
                      textTransform={"uppercase"}
                    >
                      ${/* {product.Room.main_price}  */}/ Night
                    </Text>
                    <Text fontSize={"27px"}>{product.property_name}</Text>
                    <Text borderBottom={"1px solid white"} w={"4em"}></Text>
                  </Box>
                  <Box
                    display={"flex"}
                    gap={"2em"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Flex gap={"0.5em"} fontSize={"20px"}>
                      <Icon as={LiaBedSolid} />
                      <Icon as={BiShower} />
                      <Icon as={IoFastFoodOutline} />
                    </Flex>
                    <Box
                      display={"flex"}
                      gap={"0.5em"}
                      alignItems={"center"}
                      fontFamily={`'Barlow', sans-serif`}
                      textTransform={"uppercase"}
                      letterSpacing={"2px"}
                    >
                      Details
                      <Icon as={BsArrowRightShort} />
                    </Box>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Box>

          <Box
            mt={"1.5em"}
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent={"center"}
          ></Box>
        </Box>
      </Box>
    </>
  );
}
