import React from "react";
import { connect } from "react-redux";

// Actions
import { newGame } from "../redux/actions/userActions";

import MenuButton from "./components/MenuButton";

type Props = {
  newGame: (n: 81 | 256) => void;
};

const CreateGame: React.FC<Props> = (P) => {
  const handleCreate = (num: 81 | 256) => {
    console.log(num);
    P.newGame(num);
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1> Create Game </h1>

        <h4> Select Board Size </h4>
      </div>

      <MenuButton action={() => handleCreate(81)} text={"9x9"} />
      <MenuButton action={() => handleCreate(256)} text={"14x14"} />
    </div>
  );
};

export default connect(null, { newGame })(CreateGame);
