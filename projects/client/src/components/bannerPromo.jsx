import { Box, Image, Button, Icon } from "@chakra-ui/react";

import a from "../assets/1 (2).jpg";
import b from "../assets/3 (2).jpg";
import c from "../assets/4(1).jpg";
import d from "../assets/wallpaperflare.com_wallpaper.jpg";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import React, { useState, useEffect } from "react";
import "@fontsource/gilda-display";

export default function BannerPromo() {
  const images = [a, b, c, d];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };
  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + images.length) % images.length
    );
  };
  return (
    <>
      <Box
        display={"flex"}
        flexDir={{ base: "column", lg: "row" }}
        gap={{ base: "7em", lg: "0em" }}
        alignItems={"center"}
        my={{ base: "5em", lg: "0em" }}
      >
        <Box
          flex={"1"}
          fontSize={{ base: "4em", lg: "5.5em" }}
          textAlign={{ base: "center", lg: "right" }}
          fontFamily={`'Gilda Display', sans-serif`}
        >
          Check Our Latest Discount!
        </Box>
        <Box
          flex={"1"}
          display={"flex"}
          class="banner-container"
          justifyContent={"center"}
          // px={{ base: "5px" }}
          my={{ lg: "8em" }}
          w={"100%"}
          h={"100%"}
          position={"relative"}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            w={"100%"}
            h={"100%"}
          >
            <Image
              src={images[currentSlide]}
              w={{ base: "100%", lg: "50%" }}
              borderRadius={"5px"}
              objectFit={"cover"}
              position={"relative"}
              zIndex={"2"}
            />
            <Box
              position="absolute"
              zIndex={"3"}
              top={{ lg: "120" }}
              fontFamily={`'Gilda Display', sans-serif`}
              display={"flex"}
              justifyContent={"space-between"}
              w={{ base: "100%", lg: "50%" }}
            >
              <Button
                variant={"ghost"}
                _hover={{ bgColor: "transparent" }}
                color="white"
                onClick={prevSlide}
              >
                <Icon as={AiOutlineLeft} fontSize={"1em"} />
              </Button>
              <Button
                variant={"ghost"}
                _hover={{ bgColor: "transparent" }}
                color="white"
                onClick={nextSlide}
              >
                <Icon as={AiOutlineRight} fontSize={"1em"} />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
