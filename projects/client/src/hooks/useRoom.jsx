import { useEffect, useState } from "react";
import { api } from "../api/api";

export const useFetchRoom = () => {
  const [rooms, setRooms] = useState();

  const fetch = async () => {
    try {
      const res = await api.get("/room");
      setRooms(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { rooms, fetch };
};
