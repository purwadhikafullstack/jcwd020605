import { Box, Image, Button, Icon } from "@chakra-ui/react";
import a from "../assets/1 (2).jpg";
import b from "../assets/3 (2).jpg";
import c from "../assets/4(1).jpg";
import d from "../assets/wallpaperflare.com_wallpaper.jpg";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import React, { useState } from "react";
import "@fontsource/gilda-display";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "../styles/promoSlider.css";

// import required modules
import { Navigation } from "swiper/modules";

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
          my={{ lg: "8em" }}
          position={"relative"}
        >
          <Box
            display={"flex"}
            flexDir={"column"}
            className="swiper"
            w={{ base: "350px", lg: "650px" }}
            h={{ base: "300px", lg: "400px" }}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"5%"}
            boxShadow={"dark-lg"}
          >
            <Swiper navigation={true} modules={[Navigation]}>
              <SwiperSlide>
                <Image src={a} />
              </SwiperSlide>
              <SwiperSlide>
                <Image src={b} />
              </SwiperSlide>
              <SwiperSlide>
                <Image src={c} />
              </SwiperSlide>
              <SwiperSlide>
                <Image src={d} />
              </SwiperSlide>
            </Swiper>
          </Box>
        </Box>
      </Box>
    </>
  );
}
