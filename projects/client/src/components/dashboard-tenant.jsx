import { Box, Center, Text, Link, Icon, Flex } from "@chakra-ui/react";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiHomeModern } from "react-icons/hi2";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";

export default function DashboardTenant() {
  return (
    <>
      <Center display={{ lg: "flex", base: "none" }}>
        <Box w={"20%"} className="sidebar" bgColor={"grey"} textAlign={"left"}>
          <Box>
            <Text fontSize={"25px"} letterSpacing={"1px"} color={"#ab854f"}>
              The Cappa
            </Text>
            <Text fontSize={"11px"} letterSpacing={"3px"} color={"white"}>
              Luxury Hotel
            </Text>
          </Box>

          <Flex align={"center"} gap={"1em"}>
            <Icon as={LuLayoutDashboard} />
            <Link>Dashboard</Link>
          </Flex>

          <Flex align={"center"} gap={"1em"}>
            <Icon as={HiHomeModern} />
            <Link>Property & Room</Link>
          </Flex>

          <Flex align={"center"} gap={"1em"}>
            <Icon as={AiOutlineDollarCircle} />
            <Link>Transaction</Link>
          </Flex>

          <Flex align={"center"} gap={"1em"}>
            <Icon as={TbReportAnalytics} />
            <Link>Report</Link>
          </Flex>
        </Box>
        <Box w={"80%"} bgColor={"black"}>
          b
        </Box>
      </Center>
    </>
  );
}
