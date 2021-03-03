import React from "react";
import axios from "axios";

import MenuButton from "./components/MenuButton";

import "./styles/MenuContainer.css";

const Home: React.FC = () => {
  axios
    .get("/_firebase")
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1> SuGoKu</h1>
      </div>

      <MenuButton action={"/create"} text={"Create Game"} />

      <MenuButton action={"/join"} text={"Join Game"} />
    </div>
  );
};

export default Home;
