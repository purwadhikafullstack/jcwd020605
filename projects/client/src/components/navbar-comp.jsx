import {
  Box,
  Text,
  Link,
  Center,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Flex,
} from "@chakra-ui/react";
import "@fontsource/gilda-display";
import "@fontsource/barlow";
import { BsList } from "react-icons/bs";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
                lg: "space-around",
              }}
              w={"100%"}
            >
              <Box display={"block"} textAlign={"center"} w={{ lg: "12%" }}>
                <Text fontSize={"25px"} letterSpacing={"1px"} color={"#ab854f"}>
                  The Verdé
                </Text>
                <Text fontSize={"10px"} className="text-2">
                  Luxury Booking
                </Text>
              </Box>

              <Box
                color={"white"}
                display={{
                  base: "none",
                  lg: "flex",
                }}
                justifyContent={"right"}
                gap={"30px"}
                alignItems={"center"}
                fontSize={"0.9em"}
                className="text-2"
              >
                <Link className="dekstop-navbar" _hover={{ color: "#ab854f" }}>
                  Home
                </Link>
                <Link className="dekstop-navbar" _hover={{ color: "#ab854f" }}>
                  Content
                </Link>
                <Link className="dekstop-navbar" _hover={{ color: "#ab854f" }}>
                  Contact
                </Link>
                <Link className="dekstop-navbar" _hover={{ color: "#ab854f" }}>
                  Footer
                </Link>
              </Box>
            </Box>

            {/* mobile */}
            <Box display={"flex"}>
              <IconButton
                aria-label="Open Menu"
                icon={<BsList />}
                size="md"
                fontSize={"25px"}
                color={"white"}
                variant="none"
                display={{ base: "flex", lg: "none" }}
                onClick={onOpen}
              />

              <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>
                    <Box
                      display={"block"}
                      textAlign={"left"}
                      textTransform={"uppercase"}
                      fontFamily={`'Gilda Display', sans-serif`}
                    >
                      <Text
                        fontSize={"25px"}
                        letterSpacing={"1px"}
                        color={"#ab854f"}
                      >
                        The Cappa
                      </Text>
                      <Text
                        fontSize={"11px"}
                        letterSpacing={"3px"}
                        color={"black"}
                      >
                        Luxury Hotel
                      </Text>
                    </Box>
                  </DrawerHeader>
                  <DrawerBody>
                    <Flex
                      direction="column"
                      textTransform={"uppercase"}
                      fontFamily={`'Barlow Condensed', sans-serif`}
                      letterSpacing={"3px"}
                      fontSize={"15px"}
                    >
                      <Link href="#" py={2} _hover={{ color: "#ab854f" }}>
                        HOME
                      </Link>
                      <Link href="#" py={2} _hover={{ color: "#ab854f" }}>
                        ABOUT
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
                        PAGES
                      </Link>
                      <Link href="#" py={2} _hover={{ color: "#ab854f" }}>
                        NEWS
                      </Link>
                      <Link href="#" py={2} _hover={{ color: "#ab854f" }}>
                        CONTACT
                      </Link>
                    </Flex>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Box>
          </Box>
        </Box>
      </Center>
    </>
  );
}
