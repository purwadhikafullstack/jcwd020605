import {
  Box,
  IconButton,
  Video,
  Button,
  Flex,
  Text,
  Link,
  Icon,
} from "@chakra-ui/react";
import "@fontsource/gilda-display";
import "@fontsource/barlow";
import {
  BiPhoneCall,
  BiLogoFacebook,
  BiLogoPinterestAlt,
  BiCopyright,
} from "react-icons/bi";
import { AiOutlineInstagram } from "react-icons/ai";
import { CiTwitter } from "react-icons/ci";
import { ImYoutube2 } from "react-icons/im";

export default function FooterLandingPage() {
  return (
    <>
      <Box
        bgColor={"#222222"}
        fontFamily={`'Barlow', sans-serif`}
        w={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
      >
        <Box
          py={"5em"}
          textAlign={"left"}
          color={"#dbdbdb"}
          px={"0.5em"}
          display={{ lg: "flex" }}
          w={"100%"}
          justifyContent={"center"}
          gap={{ lg: "8em" }}
        >
          <Box pt={"2em"} w={{ lg: "15%" }}>
            <Text
              fontFamily={`'Gilda Display', sans-serif`}
              color={"white"}
              fontSize={"24px"}
            >
              About Hotel
            </Text>
            <Text
              pt={"1em"}
              fontSize={"15px"}
              fontFamily={`'Barlow', sans-serif`}
            >
              Welcome to the best five-star deluxe hotel in New York. Hotel
              elementum sesue the aucan vestibulum aliquam justo in sapien
              rutrum volutpat.
            </Text>
          </Box>

          <Box pt={"2em"}>
            <Text
              fontFamily={`'Gilda Display', sans-serif`}
              color={"white"}
              fontSize={"24px"}
            >
              Explore
            </Text>

            <Flex
              direction="column"
              textTransform={"uppercase"}
              fontFamily={`'Barlow', sans-serif`}
              letterSpacing={"3px"}
              fontSize={"15px"}
              pt={"2em"}
            >
              <Link href="#" py={2} _hover={{ color: "#ab854f" }}>
                Home
              </Link>
              <Link href="#" py={2} _hover={{ color: "#ab854f" }}>
                ROOMS & SUITES
              </Link>
              <Link href="#" py={2} _hover={{ color: "#ab854f" }}>
                RESTAURANT
              </Link>
              <Link href="#" py={2} _hover={{ color: "#ab854f" }}>
                SPA
              </Link>
              <Link href="#" py={2} _hover={{ color: "#ab854f" }}>
                About Hotel
              </Link>
              <Link href="#" py={2} _hover={{ color: "#ab854f" }}>
                CONTACT
              </Link>
            </Flex>
          </Box>

          <Box pt={"2em"}>
            <Text
              fontFamily={`'Gilda Display', sans-serif`}
              color={"white"}
              fontSize={"24px"}
            >
              Contact
            </Text>
            <Text pt={"1em"}>1616 Broadway NY, New York 10001</Text>
            <Text>United States of America</Text>

            <Flex pt={"1em"} fontSize={"24px"} alignItems={"center"}>
              <Icon as={BiPhoneCall} />
              855 100 4444
            </Flex>

            <Text
              pt={"1em"}
              textDecoration={"underline"}
              textDecorationColor={"gold"}
            >
              info@luxuryhotel.com
            </Text>

            <Flex pt={"1em"} fontSize={"1.5em"} gap={"0.5em"} color={"white"}>
              <Icon as={AiOutlineInstagram} />
              <Icon as={CiTwitter} />
              <Icon as={ImYoutube2} />
              <Icon as={BiLogoFacebook} />
              <Icon as={BiLogoPinterestAlt} />
            </Flex>
          </Box>
        </Box>

        <Flex
          color={"#dbdbdb"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"0.5em"}
          fontSize={"0.8em"}
          pb={"1em"}
        >
          <Icon as={BiCopyright} />
          <Text>CopyRight 2023 by</Text>
          <Text color={"white"}>Final Project.com</Text>
        </Flex>
      </Box>
    </>
  );
}
