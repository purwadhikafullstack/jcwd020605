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
import { useNavigate } from "react-router-dom";
import LogOut from "./Logout";
export default function NavbarHome() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logOutModal = useDisclosure();
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();
  const isLoggedIn = userSelector.id;
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
            zIndex={4}
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
                <Text
                  fontSize={"11px"}
                  color={"white"}
                  letterSpacing={"3px"}
                  textShadow={"1px 1px 2px rgba(0, 0 ,0 ,1)"}
                >
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
                  // onClick={redirectRoute}
                  href={isLoggedIn ? "/dashboardtenant" : "/logintenant"}
                  className="dekstop-navbar"
                  _hover={{ color: "#ab854f" }}
                  textShadow={"1px 1px 2px rgba(0, 0 ,0 ,1)"}
                >
                  Tenant Page
                </Link>
                <Link
                  href="#"
                  className="dekstop-navbar"
                  _hover={{ color: "#ab854f" }}
                  textShadow={"1px 1px 2px rgba(0, 0 ,0 ,1)"}
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="dekstop-navbar"
                  _hover={{ color: "#ab854f" }}
                  textShadow={"1px 1px 2px rgba(0, 0 ,0 ,1)"}
                >
                  Content
                </Link>
                <Link
                  href="#"
                  className="dekstop-navbar"
                  _hover={{ color: "#ab854f" }}
                  textShadow={"1px 1px 2px rgba(0, 0 ,0 ,1)"}
                >
                  Contact
                </Link>

                <Popover>
                  <PopoverTrigger>
                    <Avatar
                      size={"sm"}
                      src={`${process.env.REACT_APP_API_BASE_URL}${userSelector?.profile_picture}`}
                    ></Avatar>
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
                    {/* <PopoverBody
                      display={"flex"}
                      alignItems={"center"}
                      gap={"0.8em"}
                    >
                      <Icon as={CgProfile} /> Profile
                    </PopoverBody> */}

                    <PopoverFooter>
                      {userSelector?.id ? (
                        <Flex
                          alignItems={"center"}
                          gap={"0.8em"}
                          cursor={"pointer"}
                          onClick={() => {
                            logOutModal.onOpen();
                          }}
                        >
                          <Icon as={BiLogOutCircle} /> LogOut
                        </Flex>
                      ) : (
                        <Link
                          display={"flex"}
                          justifyContent={"center"}
                          w={"100%"}
                          href="/logintenant"
                        >
                          Login
                        </Link>
                      )}
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
                color={"#b0b2b2"}
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
                        color={"white"}
                        textShadow={"1px 1px 2px rgba(0, 0 ,0 ,1)"}
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
                        // onClick={redirectRoute}
                        href={isLoggedIn ? "/dashboardtenant" : "/logintenant"}
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
                    {userSelector?.id ? (
                      <Flex
                        alignItems={"center"}
                        gap={"0.8em"}
                        cursor={"pointer"}
                        onClick={() => {
                          logOutModal.onOpen();
                        }}
                      >
                        <Icon as={BiLogOutCircle} /> LogOut
                      </Flex>
                    ) : (
                      <Link display={"flex"} w={"100%"} href="/logintenant">
                        Login
                      </Link>
                    )}
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
