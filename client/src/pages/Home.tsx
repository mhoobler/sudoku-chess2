import React, {useState} from "react";

import MenuButton from "./components/MenuButton";
import Test from './components/Test';
import Login from './components/Login';

import "./styles/MenuContainer.css";

const Home: React.FC = () => {
  const [display, setDisplay] = useState(false);

  const handleModal = () => {
    setDisplay(!display);
  }

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1> SuGoKu</h1>
        <div> {display.toString()} </div>
        <Login handleModal={handleModal}/>
        {display ? <Test timer={200} handleModal={handleModal}/> : null}
      </div>

      <MenuButton action={"/create"} text={"Create Game"} />

      <MenuButton action={"/join"} text={"Join Game"} />
    </div>
  );
};

export default Home;
