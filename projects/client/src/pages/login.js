import { Flex } from "@chakra-ui/react";
import Navbar from "../components/navbarLoginRegister";
import LoginTenant from "../components/login-tenant";

export default function LoginTenantPages() {
  return (
    <>
      <Flex className="container">
        <Navbar />
        <LoginTenant />
      </Flex>
    </>
  );
}
