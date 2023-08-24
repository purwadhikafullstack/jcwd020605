import {
  Box,
  Text,
  Link,
  Center,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Flex,
} from "@chakra-ui/react";
import "@fontsource/gilda-display";
import "@fontsource/barlow";
import { BsList } from "react-icons/bs";

export default function NavbarHome() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Center>
        <Box display={"Flex"} flexDir={"column"} w={"100vw"}>
          <Box
            h={"90px"}
            w={"100%"}
            px={"20px"}
            // bgColor={"red.200"}
            justifyContent={"space-between"}
            gap={"40px"}
            display={"flex"}
            textTransform={"uppercase"}
            fontFamily={`'Gilda Display', sans-serif`}
            alignItems={"center"}
            position={"fixed"}
            zIndex={2}
          >
            {/* Navbar dekstop */}

            <Box
              display={"flex"}
              justifyContent={{ base: "none", xl: "space-around" }}
              w={"100%"}
            >
              <Box display={"block"} textAlign={"left"}>
                <Text fontSize={"25px"} letterSpacing={"1px"} color={"#ab854f"}>
                  The Cappa
                </Text>
                <Text fontSize={"11px"} letterSpacing={"3px"} color={"white"}>
                  Luxury Hotel
                </Text>
              </Box>

              <Box
                color={"white"}
                display={{ base: "none", sm: "flex" }}
                gap={"30px"}
                alignItems={"center"}
                letterSpacing={"3px"}
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
                display={{ base: "flex", md: "none" }}
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
                      fontFamily={`'Barlow', sans-serif`}
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
