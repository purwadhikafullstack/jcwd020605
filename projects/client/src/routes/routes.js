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
import ReportPages from "../pages/report";
import ResetPassword from "../components/resetPassword";
import ForgetPassword from "../components/forgetPassword";
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
    path="/forgetpassword"
    key={"forgetpassword"}
    element={
      <ProtectedPage guestOnly={true}>
        <ForgetPassword />
      </ProtectedPage>
    }
  />,
  <Route
    path="/resetpassword/:token"
    key={"resetpassword"}
    element={
      <ProtectedPage guestOnly={true}>
        <ResetPassword />
      </ProtectedPage>
    }
  />,

  <Route path="/" key={"landingpage"} element={<LandingPages />} />,
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
  <Route
    path="/report/"
    key={"report"}
    element={
      <ProtectedPage needLogin={true}>
        <ReportPages />
      </ProtectedPage>
    }
  />,
];

export default routes;
