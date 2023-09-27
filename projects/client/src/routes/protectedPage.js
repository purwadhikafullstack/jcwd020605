import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedPage({
  children,
  guestOnly = false,
  needLogin = false,
}) {
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();
  const token = JSON.parse(localStorage.getItem("tenant"));

  useEffect(() => {
    if (guestOnly && userSelector?.email && token) {
      return nav("/dashboardtenant");
    } else if (needLogin && !userSelector.email && !token) {
      return nav("/");
    }
  }, [userSelector, needLogin]);

  return children;
}
