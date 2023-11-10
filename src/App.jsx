import { useState } from "react";
import "./App.css";
import { Link, Route } from "react-router-dom";
import Pokedex from "./components/Pokedex/Pokedex";
import CustomRoutes from "./Routes/CustomRoutes";
function App() {
  return (
    <div div className="outer-pokedex">
      <h1 id="pokedex-heading">
        {" "}
        <Link to={"/"}> Pokedex </Link>{" "}
      </h1>

      <CustomRoutes />
      
    </div>
  );
}

export default App;
