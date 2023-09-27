import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useSelector } from "react-redux";
export const useFetchProperty = (filter) => {
  const [properties, setProperties] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const userSelector = useSelector((state) => state.auth);
  const [id, setId] = useState(userSelector.id);
  const handlePageClick = (data) => {
    setPage(data.selected);
  };
  const fetch = async () => {
    try {
      const res = await api.get(`/properties/propertieslist?page=${page}`, {
        params: {
          filter: filter,
          id: id,
        },
      });
      setProperties(res.data.property);
      setTotalPage(res.data.totalPage);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetch();
  }, [page]);

  return { properties, totalPage, handlePageClick, fetch };
};
