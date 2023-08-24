import { Route } from "react-router-dom";
import RegisterTenantPages from "../pages/register";
import LoginTenantPages from "../pages/login";
import LandingPages from "../pages/landingPage";
import DashboardTenantPages from "../pages/dashboardTenant";
import PropertiesAndRoomTenantPages from "../pages/propertiesAndRoomTenant";

const routes = [
  <Route
    path="/registertenant"
    key={"register"}
    element={
      // <ProtectedPage>
      <RegisterTenantPages />
      // </ProtectedPage>
    }
  />,
  <Route
    path="/landingpage"
    key={"landingpage"}
    element={
      // <ProtectedPage>
      <LandingPages />
      // </ProtectedPage>
    }
  />,
  <Route
    path="/logintenant"
    key={"logintenant"}
    element={
      // <ProtectedPage>
      <LoginTenantPages />
      // </ProtectedPage>
    }
  />,
  <Route
    path="/dashboardtenant"
    key={"dashboardtenant"}
    element={
      // <ProtectedPage>
      <DashboardTenantPages />
      // </ProtectedPage>
    }
  />,
  <Route
    path="/propertiestenant"
    key={"dashboardtenant"}
    element={
      // <ProtectedPage>
      <PropertiesAndRoomTenantPages />
      // </ProtectedPage>
    }
  />,
];

export default routes;
