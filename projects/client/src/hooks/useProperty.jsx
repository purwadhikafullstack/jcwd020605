import { useEffect, useState } from "react";
import { api } from "../api/api";

export const useFetchProperty = (filter) => {
  const [properties, setProperties] = useState();

  const fetch = async () => {
    try {
      const res = await api.get("/properties/propertieslist", {
        params: filter,
      });
      setProperties(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { properties, fetch };
};
