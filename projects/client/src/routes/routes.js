import { Route } from "react-router-dom";
import RegisterTenantPages from "../pages/register";
import LoginTenantPages from "../pages/login";
import LandingPages from "../pages/landingPage";
import DashboardTenantPages from "../pages/dashboardTenant";
import PropertiesAndRoomTenantPages from "../pages/propertiesAndRoomTenant";
import RoomPropertyPages from "../pages/room";
import RoomDetailPage from "../pages/roomDetail";
import ProtectedPage from "./protectedPage";
import TransactionPages from "../pages/transaction";
const routes = [
  <Route
    path="/registertenant"
    key={"register"}
    element={
      <ProtectedPage guestOnly={true}>
        <RegisterTenantPages />
      </ProtectedPage>
    }
  />,
  <Route
    path="/logintenant"
    key={"logintenant"}
    element={
      <ProtectedPage guestOnly={true}>
        <LoginTenantPages />
      </ProtectedPage>
    }
  />,
  <Route
    path="/landingpage"
    key={"landingpage"}
    element={
      <ProtectedPage needLogin={true}>
        <LandingPages />
      </ProtectedPage>
    }
  />,
  <Route
    path="/dashboardtenant"
    key={"dashboardtenant"}
    element={
      <ProtectedPage needLogin={true}>
        <DashboardTenantPages />
      </ProtectedPage>
    }
  />,
  <Route
    path="/propertiestenant"
    key={"propertiestenant"}
    element={
      <ProtectedPage needLogin={true}>
        <PropertiesAndRoomTenantPages />
      </ProtectedPage>
    }
  />,
  <Route
    path="/roompropertiestenant"
    key={"roompropertiestenant"}
    element={
      <ProtectedPage needLogin={true}>
        <RoomPropertyPages />
      </ProtectedPage>
    }
  />,
  <Route
    path="/roomdetailtenant/:id"
    key={"roomdetailtenant"}
    element={
      <ProtectedPage needLogin={true}>
        <RoomDetailPage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/transaction/"
    key={"transaction"}
    element={
      <ProtectedPage needLogin={true}>
        <TransactionPages />
      </ProtectedPage>
    }
  />,
];

export default routes;
