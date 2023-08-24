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
  const token = JSON.parse(localStorage.getItem("user"));

  // console.log(userSelector);
  // console.log(needLogin);
  // console.log(token);

  useEffect(() => {
    if (guestOnly && userSelector?.email && token) {
      return nav("/homepage");
    } else if (needLogin && !userSelector.email && !token) {
      return nav("/");
    }
  }, [userSelector, needLogin]);

  return children;
}
