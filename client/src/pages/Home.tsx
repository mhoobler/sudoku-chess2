import React, { useState } from "react";

import MenuButton from "./components/MenuButton";
import FadeModal from "./components/FadeModal";
import Login from "./components/Login";
import LoginMenu from "./components/LoginMenu";

import "./styles/MenuContainer.css";

const Home: React.FC = () => {
  const [display, setDisplay] = useState(false);

  const handleModal = () => {
    setDisplay(!display);
  };

  return (
    <div className="menu-container">
        {display ? (
          <FadeModal timer={400} handleModal={handleModal}>
            <LoginMenu
              handleHide={() => {
                /* Is assigned in FadeModal */
                console.warn("LoginMenu failed to load proper props");
              }}
            />
          </FadeModal>
        ) : null}

      <div className="menu-header">
        <h1> SuGoKu </h1>
        <Login handleModal={handleModal} />
      </div>

      <MenuButton action={"/create"} text={"Create Game"} />

      <MenuButton action={"/join"} text={"Join Game"} />
    </div>
  );
};

export default Home;
