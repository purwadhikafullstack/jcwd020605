import "./App.css";
import { Routes } from "react-router-dom";
import routes from "./routes/routes";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { Box } from "@chakra-ui/react";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <>
      {loading ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          h={"100vh"}
          bgColor={"#edf2f9"}
        >
          <HashLoader color="#2c7be5" size={100} />
        </Box>
      ) : (
        <Routes>{routes.map((val) => val)}</Routes>
      )}
    </>
  );
}

export default App;
