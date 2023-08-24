import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { Routes } from "react-router-dom";
import routes from "./routes/routes";
import { useEffect, useState } from "react";

function App() {
  return <>{<Routes>{routes.map((val) => val)}</Routes>}</>;
}

export default App;
