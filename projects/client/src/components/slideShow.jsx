import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import "../styles/Slideshow1.css";
import "@fontsource/gilda-display";
import videos1 from "../assets/1.mp4";
import videos2 from "../assets/2.mp4";
export default function Slideshow() {
  const videosArr = [videos1, videos2];
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % videosArr.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [videosArr.length]);
  return (
    <>
      <div class="slide-container fade">
        <Box className="video overlay">
          <video src={videosArr[currentSlide]} loop muted autoPlay></video>
        </Box>
        <Box
          position="absolute"
          zIndex={"3"}
          w={"100%"}
          h={"100%"}
          fontFamily={`'Gilda Display', sans-serif`}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          className="overlay"
        >
          <Box textAlign={"center"} color="white" className="text">
            <Box
              fontSize={{ base: "10px", lg: "20px" }}
              textTransform={"uppercase"}
              letterSpacing={"5px"}
            >
              The Ultimate Luxury Experience
            </Box>
            <Box
              fontSize={{ base: "30px", lg: "70px" }}
              textTransform={"uppercase"}
              letterSpacing={"5px"}
            >
              Enjoy A Luxury Experience
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
}
