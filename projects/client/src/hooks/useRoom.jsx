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
