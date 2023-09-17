import { Box, Text, Link, Center, Flex } from "@chakra-ui/react";
import "@fontsource/gilda-display";
import "@fontsource/barlow";
import moment from "moment";
import { useState, useEffect } from "react";
export default function Navbar() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const formattedTime = moment(time).format("LTS");
  return (
    <>
      <Center>
        <Box display={"Flex"} flexDir={"column"} w={"100vw"}>
          <Box
            h={"90px"}
            w={"100%"}
            px={{ base: "10px", lg: "10em" }}
            justifyContent={"space-between"}
            display={"flex"}
            textTransform={"uppercase"}
            fontFamily={`'Gilda Display', sans-serif`}
            alignItems={"center"}
            position={{ lg: "fixed", base: "fixed" }}
            zIndex={2}
          >
            {/* Navbar */}
            {/* dekstop */}

            <Box
              display={"flex"}
              justifyContent={{
                base: "none",
              }}
              w={"100%"}
            >
              <Flex flexDir={"column"} align={"center"}>
                <Text fontSize={"25px"} letterSpacing={"1px"} color={"#ab854f"}>
                  The CAPPA
                </Text>
                <Flex
                  color={"white"}
                  justify={"center"}
                  fontSize={"13px"}
                  letterSpacing={"5px"}
                >
                  Luxury Hotel
                </Flex>
              </Flex>
            </Box>

            {/* mobile */}
            <Box
              display={"flex"}
              color={"white"}
              w={"40%"}
              justifyContent={"right"}
            >
              {formattedTime}
            </Box>
          </Box>
        </Box>
      </Center>
    </>
  );
}
