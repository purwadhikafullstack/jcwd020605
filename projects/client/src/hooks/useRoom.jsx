import { useEffect, useState } from "react";
import { api } from "../api/api";

export const useFetchRoom = () => {
  const [rooms, setRooms] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const handlePageClick = (data) => {
    setPage(data.selected);
  };
  const fetch = async () => {
    try {
      const res = await api.get(`/room?page=${page}`);
      setRooms(res.data.roomData);
      setTotalPage(res.data.totalPage);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch();
  }, [page]);

  return { rooms, totalPage, handlePageClick, fetch };
};

export const useFetchRoomById = (id) => {
  const [rooms, setRooms] = useState();
  const [price, setPrice] = useState();
  const fetch = async () => {
    try {
      const res = await api.get("/room/" + id);
      setRooms(res.data);
      setPrice(res.data.main_price);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { rooms, price, fetch };
};
