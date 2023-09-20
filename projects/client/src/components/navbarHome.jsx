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
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Avatar,
  Icon,
  DrawerFooter,
} from "@chakra-ui/react";
import "@fontsource/gilda-display";
import "@fontsource/barlow";
import { BsList } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import LogOut from "./Logout";

export default function NavbarHome() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logOutModal = useDisclosure();
  const userSelector = useSelector((state) => state.auth);

  return (
    <>
      <Center>
        <Box display={"Flex"} flexDir={"column"} w={"100vw"}>
          <Box
            h={"90px"}
            w={"100%"}
            pl={{ lg: "2em", base: "0.5em" }}
            justifyContent={"space-between"}
            gap={"40px"}
            display={"flex"}
            textTransform={"uppercase"}
            fontFamily={`'Gilda Display', sans-serif`}
            alignItems={"center"}
            position={"fixed"}
            zIndex={2}
            bgColor={"black"}
            bgBlendMode={"Overlay"}
            bgPos={"center"}
            bgSize={"cover"}
            bg={`rgba(0, 0, 0, 0.15)`}
          >
            <Box
              display={"flex"}
              justifyContent={{ base: "none", lg: "space-between" }}
              w={"100%"}
            >
              <Box display={"block"} textAlign={"left"}>
                <Text fontSize={"25px"} letterSpacing={"1px"} color={"#ab854f"}>
                  The Cappa
                </Text>
                <Text fontSize={"11px"} color={"white"} letterSpacing={"3px"}>
                  Luxury Hotel
                </Text>
              </Box>

              {/* Navbar dekstop */}

              <Box
                display={{ base: "none", lg: "flex" }}
                gap={"30px"}
                alignItems={"center"}
                letterSpacing={"3px"}
                color={"white"}
              >
                <Link
                  href="/dashboardtenant"
                  className="dekstop-navbar"
                  _hover={{ color: "#ab854f" }}
                >
                  Tenant Page
                </Link>
                <Link
                  href="#"
                  className="dekstop-navbar"
                  _hover={{ color: "#ab854f" }}
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="dekstop-navbar"
                  _hover={{ color: "#ab854f" }}
                >
                  Content
                </Link>
                <Link
                  href="#"
                  className="dekstop-navbar"
                  _hover={{ color: "#ab854f" }}
                >
                  Contact
                </Link>

                <Popover>
                  <PopoverTrigger>
                    <Avatar size={"sm"}></Avatar>
                  </PopoverTrigger>
                  <PopoverContent
                    w={"100%"}
                    textAlign={"center"}
                    mt={"1em"}
                    border={"1px solid #dbdbdb"}
                    color={"black"}
                    fontSize={"15px"}
                    fontFamily={"sans-serif"}
                  >
                    <PopoverArrow />
                    <PopoverHeader>{userSelector?.first_name}</PopoverHeader>
                    <PopoverBody
                      display={"flex"}
                      alignItems={"center"}
                      gap={"0.8em"}
                    >
                      <Icon as={CgProfile} /> Profile
                    </PopoverBody>
                    <PopoverFooter
                      display={"flex"}
                      alignItems={"center"}
                      gap={"0.8em"}
                      cursor={"pointer"}
                      onClick={() => {
                        logOutModal.onOpen();
                      }}
                    >
                      <Icon as={BiLogOutCircle} /> LogOut
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
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
                      fontFamily={`'Barlow', sans-serif`}
                      letterSpacing={"3px"}
                      fontSize={"15px"}
                      gap={"2em"}
                    >
                      <Link
                        href="/dashboardtenant"
                        py={2}
                        _hover={{ color: "#ab854f" }}
                      >
                        Tenant Page
                      </Link>
                      <Link href="#" py={2} _hover={{ color: "#ab854f" }}>
                        Home
                      </Link>
                      <Link href="#" py={2} _hover={{ color: "#ab854f" }}>
                        Content
                      </Link>
                      <Link href="#" py={2} _hover={{ color: "#ab854f" }}>
                        Contact
                      </Link>
                    </Flex>
                  </DrawerBody>
                  <DrawerFooter justifyContent={"left"}>
                    <Flex
                      align={"center"}
                      gap={"1em"}
                      onClick={() => {
                        logOutModal.onOpen();
                      }}
                    >
                      <Icon as={BiLogOutCircle} />
                      <Link>Logout</Link>
                    </Flex>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </Box>
          </Box>
        </Box>
      </Center>
      <LogOut isOpen={logOutModal.isOpen} onClose={logOutModal.onClose} />
    </>
  );
}
