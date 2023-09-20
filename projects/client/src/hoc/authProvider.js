import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../api/api";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.auth);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    try {
      const token = JSON.parse(localStorage.getItem("tenant"));
      console.log(token);
      const tenant = await api
        .get("/tenant/token", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data.tenant);

      if (tenant) {
        dispatch({
          type: "login",
          payload: tenant.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return children;
}
