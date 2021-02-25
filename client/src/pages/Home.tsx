import React from "react";

import MenuButton from "./components/MenuButton";

import "./styles/MenuContainer.css";

const Home: React.FC = () => {
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
