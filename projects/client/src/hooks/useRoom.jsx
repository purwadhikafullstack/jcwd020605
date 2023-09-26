import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useSelector } from "react-redux";

export const useFetchRoom = (propertyId) => {
  const [rooms, setRooms] = useState();
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const userSelector = useSelector((state) => state.auth);
  const [id, setId] = useState(userSelector.id);
  const handlePageClick = (data) => {
    setPage(data.selected);
  };
  const fetch = async () => {
    try {
      const res = await api.get(`/room?page=${page}`, {
        params: { id: id, propertyId: propertyId },
      });
      setRooms(res.data.roomData);
      setTotalPage(res.data.totalPage);
    } catch (error) {
      console.log(error);
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
      setRooms(res?.data);
      setPrice(res?.data?.main_price);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { rooms, price, fetch };
};

export const useFetchRoomByPropertyID = (property_id) => {
  const [roomsByProperty, setRoomsByProperty] = useState();
  const fetchRoom = async () => {
    try {
      const res = await api.get("/room/getroombyproperty/" + property_id);
      setRoomsByProperty(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, [property_id]);

  return { roomsByProperty, fetchRoom };
};
