import { Flex } from "@chakra-ui/react";
import Navbar from "../components/navbarLoginRegister";
import RegisterComp from "../components/register-tenant";
export default function RegisterTenantPages() {
  return (
    <>
      <Flex className="container">
        <Navbar />
        <RegisterComp />
      </Flex>
    </>
  );
}
